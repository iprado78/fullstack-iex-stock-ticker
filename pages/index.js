import Head from "next/head"
import styles from "../styles/Home.module.css"
import Header from "../components/Header"
import AppContainer from "../components/AppContainer"
import Main from "../components/Main"
import SummaryStats from "../components/SummaryStats"
import Footer from "../components/Footer"
import TickerTypeahead from "../components/TickerTypeahead"

const appTitle = "IEX Ticker Dashboard"

export default function Home() {
  return (
    <AppContainer>
      <Head>
        <title>{appTitle}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header title={appTitle} />
      <Main>
        <div className={styles.description}>
          <TickerTypeahead />
        </div>

        <SummaryStats />
      </Main>
      <Footer />
    </AppContainer>
  )
}
