import axios from "axios"
import { ICompanyOverview } from "@/models/CompanyOverview"

const BASE_URL = "https://cloud.iexapis.com"
const TOKEN = process.env["IEX_API_TOKEN"]

const fetcher = async (symbol: string) => {
  try {
    const [r1, r2] = await Promise.all([
      axios.get(`${BASE_URL}/stable/stock/${symbol}/company?token=${TOKEN}`),
      axios.get(`${BASE_URL}/stable/stock/${symbol}/logo?token=${TOKEN}`),
    ])
    return { ...r1.data, ...r2.data }
  } catch (error) {
    console.error(error)
    return {}
  }
}

const companyOverview = (req, res) => {
  const { symbol } = req.query

  fetcher(symbol)
    .then(({ CEO: ceo, description, url: imgUrl, companyName }) => {
      res
        .status(200)
        .json({ ceo, description, imgUrl, companyName } as ICompanyOverview)
    })
    .catch(() => {
      res.status(404).json({})
    })
}

export default companyOverview
