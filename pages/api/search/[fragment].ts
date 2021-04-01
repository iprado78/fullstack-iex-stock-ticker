import axios from "axios"
import { SearchResult } from "../../../types/searchResult"

const BASE_URL = "https://cloud.iexapis.com"
const TOKEN = process.env["IEX_API_TOKEN"];

const fetcher = async (fragment: string): Promise<SearchResult[]> => {
  try {
    const { data } = await axios.get<SearchResult[]>(`${BASE_URL}/stable/search/${fragment}?token=${TOKEN}`)
    return data
  } catch (error) {
    console.error(error)
    return [] as SearchResult[]
  }
}

export default (req, res) => {
  const { fragment } = req.query
  fetcher(fragment)
    .then((data) => {
      res.status(200).json(data)
    })
    .catch(() => {
      res.status(404).json({})
    })
}
