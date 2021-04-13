import axios from "axios"
import type { NextApiRequest, NextApiResponse } from "next"
import { ISummaryStats } from "@/models/SummaryStats"

const BASE_URL = "https://cloud.iexapis.com"
const TOKEN = process.env["IEX_API_TOKEN"]

const fetcher = async (symbol: string) => {
  try {
    const { data } = await axios.get<ISummaryStats>(
      `${BASE_URL}/stable/stock/${symbol}/stats?token=${TOKEN}`,
    )
    return data
  } catch (error) {
    console.error(error)
    return {} as ISummaryStats
  }
}

const summaryStats = (req: NextApiRequest, res: NextApiResponse) => {
  const { symbol } = req.query
  fetcher(symbol as string)
    .then(
      ({
        week52high,
        week52low,
        avg30Volume,
        day30ChangePercent,
        employees,
      }) => {
        res.status(200).json({
          week52high,
          week52low,
          avg30Volume,
          day30ChangePercent,
          employees,
        } as ISummaryStats)
      },
    )
    .catch(() => {
      res.status(404).json({})
    })
}

export default summaryStats
