import "../styles/globals.css";
import type { AppProps } from "next/app";
import { sepolia } from "wagmi/chains";
import {
  DynamicContextProvider,
  DynamicWidget,
  EvmNetwork,
} from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

import { createPublicClient, http, createWalletClient, custom } from "viem";

const evmNetworks: EvmNetwork[] = [{
  blockExplorerUrls: [
    "https://explorer.testnet.fhenix.zone/"
  ],
  chainId: 42069,
  name: 'Fhenix Frontier',
  iconUrls: [
    "http://example.com" // TODO ????
  ],
  nativeCurrency: {
    decimals: 18,
    name: "FHE Token",
    symbol: "FHE"
  },
  networkId: "fhenix",
  rpcUrls: [
    "https://api.testnet.fhenix.zone:7747/"
  ]
}]

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DynamicContextProvider 
    settings={{ 
      environmentId: 'c1ec8a24-888d-4482-acdf-49a70614aca5',
      walletConnectors: [ EthereumWalletConnectors ],
      evmNetworks
    }}> 
    <DynamicWagmiConnector>
    <Component {...pageProps} />
    </DynamicWagmiConnector>
</DynamicContextProvider>
  );
}

export default MyApp;
