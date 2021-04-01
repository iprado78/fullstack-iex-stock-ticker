import React from 'react'
import { summaryStats } from './mockData' // todo: replace dummy data with api data
import { toUSD, toUsNum } from '../../utils/numbers'
import styles from './SummaryStats.module.scss'
import { tickerSelections$ } from '../TickerTypeahead'
import { bind } from '@react-rxjs/core'
import { switchMap } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'

/**
 * 
 */
 const [useSummaryStats, summaryStats$] = bind(
  tickerSelections$.pipe(
    switchMap(
      (ticker) => ajax.getJSON(`http://localhost:3000/summary-stats/${ticker}`)
      // Todo -> add catchError
    )
  ),
  {} // as SummaryStats -> our interface type
)


export default function SummaryStats() {
  // uncomment when  backend is hooked up :) 
  // const summaryStats = useSummaryStats();

  if(!summaryStats) {
    return (<h2>Search a stock ticker</h2>)
  }

  const config = {
    week52high: {
      label: 'Highest Price (52 weeks)',
      data: toUSD(summaryStats.week52high)
    },
    week52low: {
      label: 'Lowest Price (52 weeks)',
      data: toUSD(summaryStats.week52low)
    },
    avg30Volume: {
      label: 'Average Volume (30 days)',
      data: toUsNum(summaryStats.avg30Volume)
    },
    day30ChangePercent: {
      label: 'Change Percentage (30 days)',
      data: `${(summaryStats.day30ChangePercent * 100).toFixed(2)}%`
    },
    employees: {
      label: 'Employees',
      data: toUsNum(summaryStats.employees)
    }
  }

  const rows = () => {
    return Object.entries(config).map(([key, entry]) => {
      return (
        <tr key={key}>
          <th>{entry.label}</th>
          <td>{entry.data}</td>
        </tr>
      )
    })
  }

  return (
    <div className={styles.wrapper}>
      <h2>{summaryStats.companyName}</h2>
      <table className={styles.summaryStats}>
        <caption>Summary</caption>
        <tbody>
        {rows()}
        </tbody>
      </table>
    </div>
  )
}