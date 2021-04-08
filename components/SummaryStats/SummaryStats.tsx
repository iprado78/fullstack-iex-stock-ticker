import React from "react"
import { map, switchMap } from "rxjs/operators"
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

export default function SummaryStats() {
  const summaryStats = useSummaryStats()

  return <StatsTable stats={summaryStats} caption={"Summary"} />
}
