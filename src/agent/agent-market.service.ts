import { Injectable, Logger } from '@nestjs/common';
import { ethers } from 'ethers';
import { ConfigService } from '@nestjs/config';

// ABIs
const FACTORY_ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "question", "type": "string" },
      { "internalType": "string", "name": "optionA", "type": "string" },
      { "internalType": "string", "name": "optionB", "type": "string" },
      { "internalType": "uint256", "name": "endTime", "type": "uint256" }
    ],
    "name": "createMarket",
    "outputs": [{ "internalType": "address", "name": "", "type": "address" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getMarketCreationFee",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "bytes32", "name": "marketId", "type": "bytes32" },
      { "indexed": true, "internalType": "address", "name": "marketContract", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }
    ],
    "name": "MarketCreated",
    "type": "event"
  }
];

const USDT_ABI = [
  {
    "inputs": [
      { "internalType": "address", "name": "spender", "type": "address" },
      { "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "approve",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      { "internalType": "address", "name": "owner", "type": "address" },
      { "internalType": "address", "name": "spender", "type": "address" }
    ],
    "name": "allowance",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "account", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
];

export interface MarketCreationResult {
  success: boolean;
  marketId?: string;
  contractAddress?: string;
  transactionHash?: string;
  error?: string;
}

@Injectable()
export class AgentMarketService {
  private readonly logger = new Logger(AgentMarketService.name);
  private provider: ethers.JsonRpcProvider;
  private wallet: ethers.Wallet;
  private factoryContract: ethers.Contract;
  private usdtContract: ethers.Contract;

  constructor(private configService: ConfigService) {
    // Initialize blockchain connection
    const rpcUrl = this.configService.get<string>('RPC_URL');
    const privateKey = this.configService.get<string>('FP_MANAGER_PRIVATE_KEY');
    const factoryAddress = this.configService.get<string>('FACTORY_ADDRESS');
    const tokenAddress = this.configService.get<string>('TOKEN_ADDRESS');

    if (!rpcUrl || !privateKey || !factoryAddress || !tokenAddress) {
      throw new Error('Missing required blockchain configuration in environment variables');
    }

    this.provider = new ethers.JsonRpcProvider(rpcUrl);
    this.wallet = new ethers.Wallet(privateKey, this.provider);
    
    this.factoryContract = new ethers.Contract(
      factoryAddress,
      FACTORY_ABI,
      this.wallet
    );

    this.usdtContract = new ethers.Contract(
      tokenAddress,
      USDT_ABI,
      this.wallet
    );

    this.logger.log(`Agent wallet address: ${this.wallet.address}`);
  }

  async createMarketOnBlockchain(
    question: string,
    endTime: Date
  ): Promise<MarketCreationResult> {
    try {
      this.logger.log(`Creating market: ${question}`);

      // Step 1: Get market creation fee
      const creationFee = await this.factoryContract.getMarketCreationFee();
      this.logger.log(`Market creation fee: ${ethers.formatUnits(creationFee, 6)} USDT`);

      // Step 2: Check USDT balance
      const usdtBalance = await this.usdtContract.balanceOf(this.wallet.address);
      this.logger.log(`Agent USDT balance: ${ethers.formatUnits(usdtBalance, 6)} USDT`);

      if (usdtBalance < creationFee) {
        throw new Error(`Insufficient USDT balance. Need ${ethers.formatUnits(creationFee, 6)} USDT`);
      }

      // Step 3: Check and approve USDT if needed
      const currentAllowance = await this.usdtContract.allowance(
        this.wallet.address,
        this.factoryContract.target
      );

      if (currentAllowance < creationFee) {
        this.logger.log('Approving USDT for factory...');
        const approveTx = await this.usdtContract.approve(
          this.factoryContract.target,
          creationFee
        );
        await approveTx.wait();
        this.logger.log('USDT approved successfully');
      }

      // Step 4: Create market on factory
      const endTimeUnix = Math.floor(endTime.getTime() / 1000);
      this.logger.log(`Creating market with end time: ${endTimeUnix}`);

      const createTx = await this.factoryContract.createMarket(
        question,
        "YES",
        "NO",
        endTimeUnix
      );

      this.logger.log(`Transaction sent: ${createTx.hash}`);
      const receipt = await createTx.wait();
      this.logger.log(`Transaction confirmed in block ${receipt.blockNumber}`);

      // Step 5: Extract marketId and contractAddress from events
      let marketId: string | undefined;
      let contractAddress: string | undefined;

      for (const log of receipt.logs) {
        try {
          const parsedLog = this.factoryContract.interface.parseLog({
            topics: log.topics,
            data: log.data
          });

          if (parsedLog?.name === 'MarketCreated') {
            marketId = parsedLog.args[0]; // marketId (bytes32)
            contractAddress = parsedLog.args[1]; // marketContract (address)
            this.logger.log(`Market created - ID: ${marketId}, Address: ${contractAddress}`);
            break;
          }
        } catch (error) {
          // Not our event, continue
          continue;
        }
      }

      if (!marketId || !contractAddress) {
        throw new Error('Failed to extract market data from transaction');
      }

      return {
        success: true,
        marketId,
        contractAddress,
        transactionHash: receipt.hash
      };

    } catch (error) {
      this.logger.error(`Failed to create market on blockchain: ${error.message}`);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async getAgentBalance(): Promise<{
    eth: string;
    usdt: string;
    address: string;
  }> {
    const ethBalance = await this.provider.getBalance(this.wallet.address);
    const usdtBalance = await this.usdtContract.balanceOf(this.wallet.address);

    return {
      eth: ethers.formatEther(ethBalance),
      usdt: ethers.formatUnits(usdtBalance, 6),
      address: this.wallet.address
    };
  }
}