import axios from "axios"
import { ICompanyOverview } from "../../../models/CompanyOverview"

// should these be extracted out since they repeat in all of these places?
const BASE_URL = "https://cloud.iexapis.com"
const TOKEN = "pk_63509e5b43384ab08845be28759fb5ea"


const fetcher = async (symbol: string) => {
  try {
    const [r1, r2] = await Promise.all([
      axios.get(`${BASE_URL}/stable/stock/${symbol}/company?token=${TOKEN}`), 
      axios.get(`${BASE_URL}/stable/stock/${symbol}/logo?token=${TOKEN}`)
    ])
    return {...r1.data, ...r2.data}
  } catch (error) {
    console.error(error)
    return {}
  }
}

export default (req, res) => {
  const { symbol } = req.query

  fetcher(symbol)
    .then(({ CEO: ceo, description, url: imgUrl}) => {
      res
        .status(200)
        .json({ ceo, description, imgUrl} as ICompanyOverview)
    })
    .catch(() => {
      res.status(404).json({})
    })
}