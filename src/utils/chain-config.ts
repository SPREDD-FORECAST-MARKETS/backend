import { defineChain } from "viem";

export const baseSepolia = defineChain({
  id: 84532,
  name: 'Base Sepolia',
  network: 'base-sepolia',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://sepolia.base.org'],
    },
    public: {
      http: ['https://sepolia.base.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'Basescan',
      url: 'https://sepolia.basescan.org',
    },
  },
});



export const CONTRACT_ADDRESSES = {
  token: "0x4a2661Ab44eD073Eb8a5834cBcBD287bfB4d1CFF",
  factory: "0x18080fB292586e8DB1dD08698cd1a168E5F8B669",
  fpManager: "0x8F982751CDc4FCfD8505999f7C0dC285C0D39616"
};
