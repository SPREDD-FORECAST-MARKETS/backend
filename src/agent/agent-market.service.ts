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
      { "indexed": true, "internalType": "address", "name": "owner", "type": "address" },
      { "indexed": false, "internalType": "address", "name": "token", "type": "address" },
      { "indexed": false, "internalType": "string", "name": "question", "type": "string" },
      { "indexed": false, "internalType": "string", "name": "optionA", "type": "string" },
      { "indexed": false, "internalType": "string", "name": "optionB", "type": "string" },
      { "indexed": false, "internalType": "uint256", "name": "endTime", "type": "uint256" }
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
    const privateKey = this.configService.get<string>('AGENT_PRIVATE_KEY');
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

      // Enhanced balance checking with production alerts
      if (usdtBalance < creationFee) {
        const requiredAmount = ethers.formatUnits(creationFee, 6);
        const currentAmount = ethers.formatUnits(usdtBalance, 6);
        
        this.logger.error(`🚨 CRITICAL: Insufficient USDT balance for market creation`);
        this.logger.error(`   Required: ${requiredAmount} USDT`);
        this.logger.error(`   Current: ${currentAmount} USDT`);
        this.logger.error(`   Deficit: ${(parseFloat(requiredAmount) - parseFloat(currentAmount)).toFixed(6)} USDT`);
        this.logger.error(`   Agent Wallet: ${this.wallet.address}`);
        
        throw new Error(`Insufficient USDT balance. Need ${requiredAmount} USDT, have ${currentAmount} USDT`);
      }

      // Warn if balance is getting low (less than 5 markets worth)
      const warningThreshold = creationFee * BigInt(5);
      if (usdtBalance < warningThreshold) {
        this.logger.warn(`⚠️  LOW BALANCE WARNING: USDT balance is running low`);
        this.logger.warn(`   Current: ${ethers.formatUnits(usdtBalance, 6)} USDT`);
        this.logger.warn(`   Can create ~${Math.floor(Number(usdtBalance / creationFee))} more markets`);
        this.logger.warn(`   Recommended to refill soon`);
      }

      // Step 3: Check and approve USDT if needed
      const currentAllowance = await this.usdtContract.allowance(
        this.wallet.address,
        this.factoryContract.target
      );

      if (currentAllowance < creationFee) {
        this.logger.log('Approving USDT for factory...');
        // Approve a higher amount to avoid rounding/gas issues
        const approvalAmount = creationFee * BigInt(2); // 2x the fee
        const approveTx = await this.usdtContract.approve(
          this.factoryContract.target,
          approvalAmount
        );
        await approveTx.wait();
        this.logger.log(`USDT approved successfully: ${ethers.formatUnits(approvalAmount, 6)} USDT`);
      }

      // Step 4: Create market on factory
      // Get current blockchain timestamp to ensure end time is in the future
      const currentBlock = await this.provider.getBlock('latest');
      if (!currentBlock) {
        throw new Error('Failed to get current block');
      }
      const currentBlockTime = currentBlock.timestamp;
      
      let endTimeUnix = Math.floor(endTime.getTime() / 1000);
      
      // Ensure end time is at least 1 day in the future from blockchain time
      const minFutureTime = currentBlockTime + (24 * 60 * 60); // 1 day from now
      if (endTimeUnix <= currentBlockTime) {
        // If the provided time is in the past, set it to 30 days from blockchain time
        endTimeUnix = currentBlockTime + (30 * 24 * 60 * 60);
        this.logger.log(`Adjusted end time to 30 days from blockchain time`);
      } else if (endTimeUnix < minFutureTime) {
        // If less than 1 day in future, adjust to 1 day
        endTimeUnix = minFutureTime;
        this.logger.log(`Adjusted end time to 1 day from blockchain time`);
      }
      
      this.logger.log(`Blockchain time: ${currentBlockTime}, Market end time: ${endTimeUnix}`);

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
          // Check if it's from the factory contract
          if (log.address.toLowerCase() !== this.factoryContract.target.toString().toLowerCase()) {
            continue;
          }

          const parsedLog = this.factoryContract.interface.parseLog({
            topics: log.topics as string[],
            data: log.data
          });

          if (parsedLog?.name === 'MarketCreated') {
            // For indexed parameters, they come from topics
            marketId = parsedLog.args.marketId || parsedLog.args[0]; // marketId (bytes32)
            contractAddress = parsedLog.args.marketContract || parsedLog.args[1]; // marketContract (address)
            this.logger.log(`Market created - ID: ${marketId}, Address: ${contractAddress}`);
            break;
          }
        } catch (error) {
          // Not our event, continue
          this.logger.debug(`Could not parse log: ${error.message}`);
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