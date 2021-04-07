import React from "react"
import { map, switchMap } from "rxjs/operators"
import { ajax } from "rxjs/ajax"
import { bind } from "@react-rxjs/core"
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

// must please typescript
// there's gotta be a cleaner way of doing this
interface IStatsTableProps {
  stats: IStats
  caption: string
}

interface IStat {
  label: string
  value: string
}

interface IStats {
  stats: IStat[]
}

function StatsTable({ stats, caption }: IStatsTableProps) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.summaryStats}>
        <caption className="visually-hidden">{caption}</caption>
        <tbody>
          {stats.stats?.map(({ label, value }) => (
            <Row key={label} label={label} value={value} />
          )) || null}
        </tbody>
      </table>
    </div>
  )
}

export default function SummaryStats() {
  const summaryStats = useSummaryStats()
  if (!Object.keys(summaryStats).length) {
    return null
  }

  return <StatsTable stats={summaryStats} caption={"Summary"} />
}
