import axios from "axios"
import type { NextApiRequest, NextApiResponse } from "next"
import { ISummaryStats } from "@/models/SummaryStats"

const { IEX_API_TOKEN: TOKEN } = process.env

const fetcher = async (symbol: string) => {
  try {
    const { data } = await axios.get<ISummaryStats>(
      `https://cloud.iexapis.com/stable/stock/${symbol}/stats?token=${TOKEN}`,
    )
    console.log("Backend ****", data)
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
        companyName,
        week52high,
        week52low,
        avg30Volume,
        day30ChangePercent,
        employees,
      }) => {
        res.status(200).json({
          companyName,
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
