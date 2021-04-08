import React from 'react'
import styles from "./StatsTable.module.scss"


interface IRow {
  label: string
  value: any
}

// must please typescript
// there's gotta be a cleaner way of doing this
interface IStatsTableProps {
  stats: IStats
  caption: string
}

interface IStat {
  label: string
  value: string
}

export interface IStats {
  stats: IStat[]
}

function Row({ label, value }: IRow) {
  return (
    <tr>
      <th>{label}</th>
      <td>{value}</td>
    </tr>
  )
}

export default function StatsTable({ stats, caption }: IStatsTableProps) {

  return (
    <div className={styles.wrapper}>
      {
        
        stats?.stats?.length ? null : <p className={styles.noContent}>Enter new search params to view data <img src="https://media.giphy.com/media/BEob5qwFkSJ7G/giphy.gif" /></p>
      }
      <table className={styles.table}>
        <caption className="visually-hidden">{caption}</caption>
        <tbody>
          {stats.stats?.map(({ label, value }) => (
            <Row key={label} label={label} value={value} />
          )) || null}
        </tbody>
      </table>
    </div>
  )
}