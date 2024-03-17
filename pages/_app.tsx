import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";

import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { lineaTestnet, sepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// Define FHEnix chain configuration
  const fhenixChain = {
    id: "42069",
    name: 'Fhenix Frontier',
    network: 'fhenix',
    nativeCurrency: { name: 'FHE Token', symbol: 'FHE', decimals: 18 },
    rpcUrls: {
      default: {
        http: ["https://api.testnet.fhenix.zone:7747/"],
      },
      public: {
        http: ["https://api.testnet.fhenix.zone:7747/"],
      },
    },
    blockExplorers: {
      default: {
        name: 'Fhenix Explorer',
        url: "https://explorer.testnet.fhenix.zone/",
      },
    },
  }

// Add FHEnix chain to the existing chains array
const config = getDefaultConfig({
  appName: "Cloak Coin App",
  projectId: "YOUR_PROJECT_ID",
  chains: [sepolia, fhenixChain], // Include fhenixChain here
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
