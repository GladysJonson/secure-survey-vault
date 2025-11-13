import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { sepolia, localhost } from 'wagmi/chains';

// Enhanced configuration with proper TypeScript types for FHE survey operations
// Supports both Sepolia testnet and local Hardhat network for FHE development

export const config = getDefaultConfig({
  appName: 'Secure Survey Vault',
  projectId: 'ef3325a718834a2b1b4134d3f520933d', // WalletConnect Project ID
  chains: [
    sepolia,
    {
      ...localhost,
      id: 31337,
      rpcUrls: {
        default: { http: ['http://localhost:8545'] },
        public: { http: ['http://localhost:8545'] },
      },
    }
  ],
  ssr: false,
});

// Export config as named export for better type inference
export default config;
