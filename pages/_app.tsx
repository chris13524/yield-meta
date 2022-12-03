import type { AppProps } from 'next/app';
import '@rainbow-me/rainbowkit/styles.css';
import {
  ConnectButton,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { MantineProvider } from '@mantine/core';
import Head from 'next/head';

const { chains, provider } = configureChains(
  [
    // chain.mainnet,
    // chain.polygon,
    chain.polygonMumbai,
  ],
  [
    alchemyProvider({ apiKey: "E0obo9iM1x_92GbGIKj4ZY0i96aFne9M" }),
    // publicProvider(),
  ],
);
const { connectors } = getDefaultWallets({
  appName: 'Yield Meta',
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Yield Meta</title>
        <meta name="description" content="Yield meta" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <MantineProvider withGlobalStyles withNormalizeCSS>
            <Component {...pageProps} />
          </MantineProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}
