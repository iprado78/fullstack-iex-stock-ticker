import React from "react"
import Image from 'next/image'
import { of } from "rxjs"
import { ajax } from "rxjs/ajax"
import { catchError, switchMap } from "rxjs/operators"
import { bind } from "@react-rxjs/core"
import { ICompanyOverview } from "@/models/CompanyOverview"
import { tickerSelections$ } from "../TickerSearch"
import styles from "./CompanyOverview.module.scss"

const [useCompanyOverview] = bind(
  tickerSelections$.pipe(
    switchMap((ticker) =>
      ajax.getJSON<ICompanyOverview>(`/api/company-overview/${ticker}`),
    ),
    catchError((error) => {
      return of(error)
    }),
  ),
  {} as ICompanyOverview,
)

export default function CompanyOverview() {
  const companyOverview = useCompanyOverview()

  if (!companyOverview.description || !companyOverview.imgUrl) {
    return null
  }

  return (
    <article className={styles.wrapper}>
      <header>
        <div className={styles.left}>
          <h2>{companyOverview.companyName}</h2>
          <h3>CEO: {companyOverview.ceo} </h3>
        </div>
        <div className={styles.imageWrapper}>
          <Image
            src={companyOverview.imgUrl}
            alt={`Overview of ${companyOverview.companyName}`}
            height="100"
            width="100"
          />
        </div>
      </header>
      <p>{companyOverview.description}</p>
    </article>
  )
}
