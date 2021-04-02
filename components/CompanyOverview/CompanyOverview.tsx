import React from "react"
import { ajax } from "rxjs/ajax"
import { tickerSelections$ } from "../TickerSearch"
import { catchError, switchMap } from "rxjs/operators"
import { ICompanyOverview } from "../../models/CompanyOverview"
import { bind } from "@react-rxjs/core"
import { of } from "rxjs"
import styles from "./CompanyOverview.module.scss"

const [useCompanyOverview] = bind(
  tickerSelections$.pipe(
    switchMap(ticker => ajax.getJSON<ICompanyOverview>(`/api/company-overview/${ticker}`)),
    catchError(error => {
      console.log('error', error);
      return of(error);
    })

  ),
  {} as ICompanyOverview
)

export default function CompanyOverview() {

  const companyOverview = useCompanyOverview()
  
  if(companyOverview.description || companyOverview.imgUrl) {
    return (
      <article className={styles.wrapper}>
        <h3>{companyOverview.ceo}</h3>
        <img src={companyOverview.imgUrl}/>
        <p>{companyOverview.description}</p>
      </article>
    )
  }

  return ''

} 