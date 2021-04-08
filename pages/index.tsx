import React from "react"
import Head from "next/head"
import styles from "@/styles/Home.module.css"
import Header from "@/components/Header"
import AppContainer from "@/components/AppContainer"
import Main from "@/components/Main"
import SummaryStats from "@/components/SummaryStats"
import Footer from "@/components/Footer"
import TickerSearch from "@/components/TickerSearch"
import CompanyOverview from "@/components/CompanyOverview"
import HistoricalByDay from "@/components/HistoricalByDay"
import Tabs from "@/components/Tabs"

const appTitle = "US Bank - Stock Analytics"

// todo: hide tabs until a ticker search exists

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
          <TickerSearch />
        </div>
        <div className={styles.contentWrapper}>
          <CompanyOverview />
          <Tabs tabLabels={["Summary", "Historical"]}>
            <SummaryStats />
            <HistoricalByDay />
          </Tabs>
        </div>
      </Main>
      <Footer />
    </AppContainer>
  )
}
