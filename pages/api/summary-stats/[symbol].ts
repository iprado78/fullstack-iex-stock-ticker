import axios from "axios"
import { ISummaryStats } from "../../../models/SummaryStats"

const BASE_URL = "https://cloud.iexapis.com"
const TOKEN = process.env["IEX_API_TOKEN"];

const fetcher = async (symbol: string) => {
  try {
    console.log("Backend ****", symbol)
    const { data } = await axios.get<ISummaryStats>(`${BASE_URL}/stable/stock/${symbol}/stats?token=${TOKEN}`)
    console.log("Backend ****", data)
    return data
  } catch (error) {
    console.error(error)
    return {} as ISummaryStats
  }
}

export default (req, res) => {
  const { symbol } = req.query
  fetcher(symbol)
    .then(({ companyName, week52high, week52low, avg30Volume, day30ChangePercent, employees }) => {
      res
        .status(200)
        .json({ companyName, week52high, week52low, avg30Volume, day30ChangePercent, employees } as ISummaryStats)
    })
    .catch(() => {
      res.status(404).json({})
    })
}
