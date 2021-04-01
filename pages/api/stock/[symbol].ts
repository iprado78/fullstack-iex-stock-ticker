import axios from "axios"
import { StockData } from "../../../types/stockData"

const BASE_URL = "https://cloud.iexapis.com"
const TOKEN = "pk_63509e5b43384ab08845be28759fb5ea"

const fetcher = async (symbol: string): Promise<StockData> => {
  try {
    const { data } = await axios.get<StockData>(`${BASE_URL}/stable/stock/${symbol}/stats?token=${TOKEN}`)
    return data
  } catch (error) {
    console.error(error)
    return {} as StockData
  }
}

export default (req, res) => {
  const { symbol } = req.query
  fetcher(symbol)
    .then((data) => {
      res.status(200).json(data)
    })
    .catch(() => {
      res.status(404).json({})
    })
}
