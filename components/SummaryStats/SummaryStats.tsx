import React from "react"

import styles from "./SummaryStats.module.scss"
import { tickerSelections$ } from "../TickerSearch"
import { bind } from "@react-rxjs/core"
import { map, switchMap, tap } from "rxjs/operators"
import { ajax } from "rxjs/ajax"
import { ISummaryStats } from "../../models/SummaryStats"
import { summaryStatsConfig } from "./SummaryStats.config"

interface IRow {
  label: string
  value: any
}

interface SummaryStatsViewModel {
  companyName: string
  stats: IRow[]
}

const [useSummaryStats] = bind(
  tickerSelections$.pipe(
    switchMap((ticker) =>
      ajax.getJSON<ISummaryStats>(`/api/summary-stats/${ticker}`).pipe(
        map(({ companyName, ...summaryStats }) => ({
          companyName,
          stats: Object.entries(summaryStats).map(([statKey, statValue]) => {
            const { label, formatter } = summaryStatsConfig[statKey]
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

  if (!Object.keys(summaryStats)) {
    return <h2>Search a stock ticker</h2>
  }

  return (
    <div className={styles.wrapper}>
      <h2>{summaryStats.companyName}</h2>
      <table className={styles.summaryStats}>
        <caption>Summary</caption>
        <tbody>
          {summaryStats.stats?.map(({ label, value }) => <Row key={label} label={label} value={value} />) || null}
        </tbody>
      </table>
    </div>
  )
}
