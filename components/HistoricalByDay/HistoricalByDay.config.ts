import { IHistoricalByDay } from "@/models/HistoricalByDay"
import { toUSD, toUsNum } from "@/utils/numbers"

export const historicalByDayConfig: Record<
  keyof IHistoricalByDay,
  {
    label: string
    formatter?: (input: any) => any
  }
> = {
  open: {
    label: "Open",
    formatter: toUSD,
  },
  close: {
    label: "Close",
    formatter: toUSD,
  },
  high: {
    label: "High",
    formatter: toUSD,
  },
  low: {
    label: "Low",
    formatter: toUSD,
  },
  changePercent: {
    label: "Change %",
    formatter: toUsNum,
  },
}
