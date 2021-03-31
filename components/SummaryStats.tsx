import React from 'react'
import keyStats from '../data/keyStats.json' // todo: replace dummy data with api data
import styles from '../styles/Summary.module.scss'

export default function SummaryStats() {
  const toUSD = (num: number):string => {
    return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(num)
  }

  const toUsNum = (num: number):string => {
    return num.toLocaleString('en-US')
  }

  if(!keyStats) {
    return (<h1>Search a stock ticker</h1>)
  }

  return (
    <div>
      <h2>{keyStats.companyName}</h2>
     <table className={styles.summary}>
       <caption>Summary</caption>
       <tbody>
        <tr>
          <th>Highest Price (52 weeks)</th>
          <td>{toUSD(keyStats.week52high)}</td>
        </tr>
        <tr>
          <th>Lowest Price (52 weeks)</th>
          <td>{toUSD(keyStats.week52low)}</td>
        </tr>
        <tr>
          <th>Average Volume (30 days)</th>
          <td>{toUsNum(keyStats.avg30Volume)}</td>
        </tr>
        <tr>
          <th>Change Percentage (30 days)</th>
          <td>{`${(keyStats.day30ChangePercent * 100).toFixed(2)}%`}</td>
        </tr>
        <tr>
          <th>Employees</th>
          <td>{toUsNum(keyStats.employees)}</td>
        </tr>
       </tbody>
     </table>
    </div>
  )
}