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
        <div className={styles.textContainer}>
          <h2 className={styles.bannerHeader}>Stay curious.</h2>
          <p className={styles.bannerText}>Discover stories, thinking, and expertise from writers on any topic.</p>
          <div className={styles.button}>Start Reading</div>
        </div>
        <img className={styles.logoImage}src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png" alt=""/>
      </div>

      {/* add posts here */}
    </div>
  )
}
