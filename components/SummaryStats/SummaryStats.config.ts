import { ISummaryStats } from "@/models/SummaryStats"
import { toUSD, toUsNum } from "@/utils/numbers"

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
    formatter: (data) => (data * 100).toFixed(2),
  },
  employees: {
    label: "Employees",
    formatter: toUsNum,
  },
}
