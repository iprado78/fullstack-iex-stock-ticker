import { IHistoricalByDay } from "@/models/HistoricalByDay"
import axios from "axios"
import type { NextApiRequest, NextApiResponse } from "next"

const BASE_URL = "https://cloud.iexapis.com"
const TOKEN = process.env["IEX_API_TOKEN"]

const fetcher = async (symbol: string, date: string) => {
  try {
    const { data } = await axios.get<IHistoricalByDay[]>(
      `${BASE_URL}/stable/stock/${symbol}/chart/date/${date}?chartByDay=${true}&token=${TOKEN}`,
    )
    return data[0]
  } catch (error) {
    console.error(error)
    return {} as IHistoricalByDay
  }
}

const chartByDay = (req: NextApiRequest, res: NextApiResponse) => {
  const { params } = req.query
  const [symbol, date] = params as string[]

  fetcher(symbol, date)
    .then(({ open, close, high, low, changePercent }) => {
      res
        .status(200)
        .json({ open, close, high, low, changePercent } as IHistoricalByDay)
    })
    .catch(() => {
      res.status(404).json({})
    })
}

export default chartByDay
