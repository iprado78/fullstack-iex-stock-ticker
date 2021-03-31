import React from 'react'
import { summaryStats } from './mockData' // todo: replace dummy data with api data
import { toUSD, toUsNum } from '../../utils/numbers'
import styles from './SummaryStats.module.scss'

export default function SummaryStats() {

  if(!summaryStats) {
    return (<h1>Search a stock ticker</h1>)
  }

  return (
    <div>
      <h2>{summaryStats.companyName}</h2>
     <table className={styles.summaryStats}>
       <caption>Summary</caption>
       <tbody>
        <tr>
          <th>Highest Price (52 weeks)</th>
          <td>{toUSD(summaryStats.week52high)}</td>
        </tr>
        <tr>
          <th>Lowest Price (52 weeks)</th>
          <td>{toUSD(summaryStats.week52low)}</td>
        </tr>
        <tr>
          <th>Average Volume (30 days)</th>
          <td>{toUsNum(summaryStats.avg30Volume)}</td>
        </tr>
        <tr>
          <th>Change Percentage (30 days)</th>
          <td>{`${(summaryStats.day30ChangePercent * 100).toFixed(2)}%`}</td>
        </tr>
        <tr>
          <th>Employees</th>
          <td>{toUsNum(summaryStats.employees)}</td>
        </tr>
       </tbody>
     </table>
    </div>
  )
}