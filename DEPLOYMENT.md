# Secure Survey Vault Deployment Guide

## Overview

This guide provides comprehensive instructions for deploying the Secure Survey Vault application, a privacy-preserving income survey system built with FHEVM technology.

## Prerequisites

### System Requirements
- Node.js 18.x or higher
- npm or yarn package manager
- Git for version control

### Network Requirements
- Ethereum Sepolia testnet for production deployment
- Local Hardhat network for development and testing

## Local Development Setup

### 1. Clone and Install Dependencies

```bash
git clone https://github.com/GladysJonson/secure-survey-vault.git
cd secure-survey-vault
npm install
```

### 2. Configure Environment

Create a `.env` file in the root directory:

```bash
# Wallet private key for deployment (use test wallet for development)
PRIVATE_KEY=your_private_key_here

# WalletConnect Project ID for frontend
WALLETCONNECT_PROJECT_ID=ef3325a718834a2b1b4134d3f520933d

# Network selection
NETWORK=localhost  # or 'sepolia' for testnet
```

### 3. Start Local Development Network

```bash
# Terminal 1: Start Hardhat local network
npm run node

# Terminal 2: Deploy contracts
npm run deploy:localhost

# Terminal 3: Start frontend development server
cd frontend
npm install
npm run dev
```

## Production Deployment

### Sepolia Testnet Deployment

1. **Configure Sepolia Network**

Update `hardhat.config.ts` with your Sepolia RPC URL and private key:

```typescript
sepolia: {
  url: "https://sepolia.infura.io/v3/YOUR_INFURA_KEY",
  accounts: [process.env.PRIVATE_KEY],
}
```

2. **Deploy Contracts**

```bash
npm run deploy:sepolia
```

3. **Verify Contracts**

```bash
npm run verify:sepolia
```

4. **Update Frontend Configuration**

Update `frontend/src/config/contracts.ts` with deployed contract addresses.

### Frontend Deployment

#### Vercel Deployment

1. **Connect Repository**

Connect your GitHub repository to Vercel and configure build settings:

```bash
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

2. **Environment Variables**

Set the following environment variables in Vercel:

```
WALLETCONNECT_PROJECT_ID=ef3325a718834a2b1b4134d3f520933d
VITE_CONTRACT_ADDRESS_SEPOLIA=your_deployed_contract_address
```

## Contract Management

### Administrative Operations

#### Add Authorized Operator

```bash
npx hardhat add-operator --address 0x1234... --network sepolia
```

#### Emergency Stop

```bash
npx hardhat emergency-stop --network sepolia
```

#### Check Contract Status

```bash
npm run check-contract
```

## Security Considerations

### Private Key Management
- Never commit private keys to version control
- Use environment variables for sensitive data
- Consider using hardware wallets for mainnet deployments

### Access Control
- Only authorized operators can perform administrative functions
- Regular users can only submit surveys and view public statistics
- Emergency stop functionality available for security incidents

### Network Security
- Test thoroughly on local network before mainnet deployment
- Use reputable RPC providers for production
- Monitor contract events and gas usage

## Troubleshooting

### Common Issues

1. **Contract Deployment Fails**
   - Check private key format and balance
   - Verify network configuration in hardhat.config.ts
   - Ensure sufficient gas limit for deployment

2. **Frontend Connection Issues**
   - Verify WalletConnect Project ID
   - Check contract addresses in configuration
   - Ensure MetaMask is connected to correct network

3. **FHE Operations Fail**
   - Verify FHEVM plugin installation
   - Check if network supports FHE operations
   - Review encryption key management

### Support

For additional support, please refer to:
- [FHEVM Documentation](https://docs.zama.ai/fhevm)
- [Hardhat Documentation](https://hardhat.org/docs)
- [RainbowKit Documentation](https://www.rainbowkit.com/docs)
