import axios from "axios"
import type { NextApiRequest, NextApiResponse } from "next"
import { ITickerSearchResult } from "@/models/TickerSearchResult"

const BASE_URL = "https://cloud.iexapis.com"
const TOKEN = process.env["IEX_API_TOKEN"]

const fetcher = async (fragment: string) => {
  try {
    const { data } = await axios.get<ITickerSearchResult[]>(
      `${BASE_URL}/stable/search/${fragment}?token=${TOKEN}`,
    )
    return data
  } catch (error) {
    console.error(error)
    return [] as ITickerSearchResult[]
  }
}

const tickerSearch = (req: NextApiRequest, res: NextApiResponse) => {
  const { fragment } = req.query
  fetcher(fragment as string)
    .then((data) => {
      res
        .status(200)
        .json(
          data.map(
            ({ symbol, sector }) => ({ symbol, sector } as ITickerSearchResult),
          ),
        )
    })
    .catch(() => {
      res.status(404).json({})
    })
}

export default tickerSearch
