import { useWallet } from '@solana/wallet-adapter-react';
import Head from 'next/head'
import Image from 'next/image'
import Footer from '../components/Footer';
import LoginBox from '../components/LoginBox';
import MainView from '../components/MainView';
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css'

export default function Home() {
  const { connected } = useWallet()
  return (
    <div className='layout'>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Navbar connected={connected} />
        <div className={styles.container}>
          {connected ? <MainView /> : <LoginBox />}
        </div>
      </div>
      <Footer />
    </div>
  )
}
