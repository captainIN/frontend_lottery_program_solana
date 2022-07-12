import '../styles/globals.css'
import '../styles/Main.scss'
import React from 'react';
import Head from 'next/head';
import CssBaseline from '@material-ui/core/CssBaseline';
require('@solana/wallet-adapter-react-ui/styles.css');
import dynamic from 'next/dynamic'

export default function MyApp({ Component, pageProps }) {
  const WalletConnectProvider = dynamic(
    () => import('../context/WalletConnectionProvider'),
    { ssr: false }
  );
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>BetSol - Solana based lottery program</title>
        <meta name="title" content="BetSol - Solana based lottery program" />
        <meta name="description" content="Take part in range of lotteries on the decentralised infrastructure. Developed by Jaymanyoo Singh Chouhan (@captainIN)" />
        <meta name="keywords" content="solana, anchor, lottery, dapp" />
        <meta name="robots" content="index,follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />

      <WalletConnectProvider>
        <Component {...pageProps} />
      </WalletConnectProvider>

    </React.Fragment>
  );
}

