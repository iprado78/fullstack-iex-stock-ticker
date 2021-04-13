import { ISummaryStats } from "@/models/SummaryStats"
import { toUSD, toUsNum, toPercent } from "@/utils/numbers"

export type SummaryStatsConfigKey = keyof ISummaryStats

export const summaryStatsConfig: Record<
  SummaryStatsConfigKey,
  {
    label: string
    formatter?: (input: any) => any
  }
> = {
  week52high: {
    label: "Highest Price (52 weeks)",
    formatter: toUSD,
  },
  week52low: {
    label: "Lowest Price (52 weeks)",
    formatter: toUSD,
  },
  avg30Volume: {
    label: "Average Volume (30 days)",
    formatter: toUsNum,
  },
  day30ChangePercent: {
    label: "Change Percentage (30 days)",
    formatter: toPercent,
  },
  employees: {
    label: "Employees",
    formatter: toUsNum,
  },
}
