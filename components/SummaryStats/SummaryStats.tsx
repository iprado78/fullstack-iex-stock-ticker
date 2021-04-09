import React from "react"
import { map, switchMap, tap } from "rxjs/operators"
import { ajax } from "rxjs/ajax"
import { bind } from "@react-rxjs/core"
import { ISummaryStats } from "@/models/SummaryStats"
import { tickerSelections$ } from "../TickerSearch"
// import StatsTable from
import {
  summaryStatsConfig,
  SummaryStatsConfigKey,
} from "./SummaryStats.config"
import styles from "./SummaryStats.module.scss"
import StatsTable from "../StatsTable"

// move somewhere that this can be shared
interface IRow {
  label: string
  value: any
}

const [useSummaryStats] = bind(
  tickerSelections$.pipe(
    switchMap((ticker) =>
      ajax.getJSON<ISummaryStats>(`/api/summary-stats/${ticker}`).pipe(
        map((summaryStats) =>
          Object.entries(summaryStats).map(([statKey, statValue]) => {
            const { label, formatter } = summaryStatsConfig[
              statKey as SummaryStatsConfigKey
            ] // ToDo: create type-preserving Object.entries, Array.prototype.map
            return {
              label,
              value: formatter?.(statValue) ?? statValue,
            } as IRow
          }),
        ),
      ),
    ),
  ),
  {} as IRow[],
)

export default function SummaryStats() {
  const summaryStats = useSummaryStats()
  if (!Object.keys(summaryStats).length) {
    return null
  }

  return <StatsTable stats={summaryStats} caption={"Summary"} />
}
