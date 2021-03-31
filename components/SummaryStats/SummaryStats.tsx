import React from 'react'
import { summaryStats } from './mockData' // todo: replace dummy data with api data
import { toUSD, toUsNum } from '../../utils/numbers'
import styles from './SummaryStats.module.scss'

export default function SummaryStats() {

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
        <tr>
          <th>{entry.label}</th>
          <td>{entry.data}</td>
        </tr>
      )
    })
  }

  return (
    <div>
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