import axios from "axios"
import type { NextApiRequest, NextApiResponse } from "next"
import { ICompanyOverview } from "@/models/CompanyOverview"

const { IEX_API_TOKEN: TOKEN } = process.env

const fetcher = async (symbol: string) => {
  try {
    const [r1, r2] = await Promise.all([
      axios.get(
        `https://cloud.iexapis.com/stable/stock/${symbol}/company?token=${TOKEN}`,
      ),
      axios.get(
        `https://cloud.iexapis.com/stable/stock/${symbol}/logo?token=${TOKEN}`,
      ),
    ])
    return { ...r1.data, ...r2.data }
  } catch (error) {
    console.error(error)
    return {}
  }
}

const companyOverview = (req: NextApiRequest, res: NextApiResponse) => {
  const { symbol } = req.query

  fetcher(symbol as string)
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
