import React, { useContext, useEffect } from "react"
import { map, switchMap } from "rxjs/operators"
import { ajax } from "rxjs/ajax"
import { bind } from "@react-rxjs/core"
import { SocketIOContext } from "@/components/SocketIOProvider"
import Ticker from "@/components/Ticker"
import { ISummaryStats } from "@/models/SummaryStats"
import { tickerSelections$ } from "../TickerSearch"
import {
  summaryStatsConfig,
  SummaryStatsConfigKey,
} from "./SummaryStats.config"
import styles from "./SummaryStats.module.scss"

interface IRow {
  label: string
  value: any
}

interface SummaryStatsViewModel {
  companyName: string
  stats: IRow[]
}

const [useTickerSelection] = bind(tickerSelections$, "")

const [useSummaryStats] = bind(
  tickerSelections$.pipe(
    switchMap((ticker) =>
      ajax.getJSON<ISummaryStats>(`/api/summary-stats/${ticker}`).pipe(
        map(({ companyName, ...summaryStats }) => ({
          companyName,
          stats: Object.entries(summaryStats).map(([statKey, statValue]) => {
            const { label, formatter } = summaryStatsConfig[
              statKey as SummaryStatsConfigKey
            ] // ToDo: create type-preserving Object.entries, Array.prototype.map
            return {
              label,
              value: formatter?.(statValue) ?? statValue,
            } as IRow
          }),
        })),
      ),
    ),
  ),
  {} as SummaryStatsViewModel,
)

function Row({ label, value }: IRow) {
  return (
    <tr>
      <th>{label}</th>
      <td>{value}</td>
    </tr>
  )
}

export default function SummaryStats() {
  const summaryStats = useSummaryStats()
  const symbol = useTickerSelection()
  const socket = useContext(SocketIOContext)

  useEffect(() => {
    if (symbol && symbol.length > 0) {
      socket.send(symbol)
    }
  }, [symbol])

  if (!Object.keys(summaryStats).length) {
    return null
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.flexContainer}>
        <h2 className={styles.title}>{summaryStats.companyName}</h2>
        <Ticker symbol={symbol} />
      </div>
      <table className={styles.summaryStats}>
        <caption>Summary</caption>
        <tbody>
          {summaryStats.stats?.map(({ label, value }) => (
            <Row key={label} label={label} value={value} />
          )) || null}
        </tbody>
      </table>
    </div>
  )
}
