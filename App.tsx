import './polyfills';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { WagmiConfig } from 'wagmi';
import { mainnet, polygon, arbitrum, polygonMumbai } from 'wagmi/chains';
import {
  createWeb3Modal,
  defaultWagmiConfig,
  Web3Modal,
} from '@web3modal/wagmi-react-native';
import HomePage from './src/pages/HomePage';

// ⚠️ Be careful: in production apps, your WalletConnect Cloud project ID should be properly secured,
// and not exposed to the client like we're doing in this example with the EXPO_PUBLIC environment variables.
// For more information on how to secure your secrets, read https://reactnative.dev/docs/security#storing-sensitive-info
const projectId = process.env.EXPO_PUBLIC_WALLETCONNECT_CLOUD_PROJECT_ID;

// Metadata to show about the dApp when deep-linking to the wallet
const metadata = {
  name: 'Example dApp',
  description: 'Modern dApp example from Callstack',
  url: 'https://callstack.com/',
  icons: ['https://avatars.githubusercontent.com/u/42239399'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com',
  },
};

// Chains that will be supported by the dApp
const chains = [mainnet, polygon, polygonMumbai, arbitrum];

// Create wagmi config
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// Create actual Web3Modal instance
createWeb3Modal({
  projectId,
  chains,
  wagmiConfig,
});

export default function App() {
  return (
    <WagmiConfig config={wagmiConfig}>
      <StatusBar style="auto" />
      <HomePage />
      <Web3Modal />
    </WagmiConfig>
  );
}
