import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from '../components/Header';

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Medium Blog Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <div className={styles.banner}>
        <div>
          <h2 className={styles.bannerHeader}>Stay curious.</h2>
        </div>
      </div>
    </div>
  )
}
