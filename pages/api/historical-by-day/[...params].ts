import axios from "axios"
import type { NextApiRequest, NextApiResponse } from "next"

const BASE_URL = "https://cloud.iexapis.com"
const TOKEN = process.env["IEX_API_TOKEN"]

const fetcher = async (symbol: string, date: string) => {
// 
// trying with just a single param:
  try {
    const { data } = await axios.get(`${BASE_URL}/stable/stock/${symbol}/chart/date/${date}?chartByDay=${true}&token=${TOKEN}`)
    return data
  } catch (error) {
    console.error(error)
    return {error: error}
  }
}

const chartByDay = (req: NextApiRequest, res: NextApiResponse) => {
  const { params: [ symbol, date ]  } = req.query
  // const [ symbol, date ] = slug;
    console.log(`***
      symbol: ${symbol}
      date: ${date}
    `)
  fetcher(symbol as string, date as string)
    .then((r) => {
      res
        .status(200)
        .json(r)
    })
    .catch(() => {
      res.status(404).json({})
    })
}

export default chartByDay


/**
 * https://cloud.iexapis.com/stable/stock/AAPL-MM/chart/5d?token=pk_0ba07bbedab1475889e00bf6fc2d46e6
`${BASE_URL}/stable/stock/${symbol}/chart/5d?token=${TOKEN}` 
*/