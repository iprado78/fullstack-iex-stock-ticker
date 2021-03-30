import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Header  from "../components/Header"
import AppContainer from "../components/AppContainer"
import Main  from "../components/Main"
import  CompanyInfo  from "../components/CompanyInfo"
import SummaryStats from "../components/SummaryStats"
import Footer from "../components/Footer"

const appTitle = "IEX Ticker Dashboard"

export default function Home() {
  return (
    <AppContainer>
      <Head>
        <title>{appTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title={appTitle} />
      <Main >
          <p className={styles.description}>
            Get started by editing{' '}
            <code className={styles.code}>pages/index.js</code>
          </p>

          <SummaryStats />
      </Main>
      <Footer/>
    </AppContainer>
  )
}
