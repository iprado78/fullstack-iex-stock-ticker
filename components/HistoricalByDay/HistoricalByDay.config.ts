import { IHistoricalByDay } from "@/models/HistoricalByDay"
import { toUSD, toPercent } from "@/utils/numbers"

export const historicalByDayConfig: Record<
  keyof IHistoricalByDay,
  {
    label: string
    formatter?: (input: number) => string
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
    label: "Change",
    formatter: toPercent,
  },
}
