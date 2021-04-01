import axios from "axios"
import { ITickerSearchResult } from "../../../models/TickerSearchResult"

const BASE_URL = "https://cloud.iexapis.com"
const TOKEN = "pk_63509e5b43384ab08845be28759fb5ea"

const fetcher = async (fragment) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/stable/search/${fragment}?token=${TOKEN}`)
    return data
  } catch (error) {
    console.error(error)
    return {}
  }
}

export default (req, res) => {
  const { fragment } = req.query
  fetcher(fragment)
    .then((data) => {
      res.status(200).json(data.map(({ symbol, sector }) => ({ symbol, sector} as ITickerSearchResult)))
    })
    .catch(() => {
      res.status(404).json({})
    })
}
