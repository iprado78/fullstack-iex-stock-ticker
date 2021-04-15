import React from "react"
import styles from "./StatsTable.module.scss"
interface IRow {
  label: string
  value: any
}
export type { IRow }

interface IStatsTableProps {
  stats: IRow[]
  caption: string
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
  if (!stats.length) return null
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <caption className="visually-hidden">{caption}</caption>
        <tbody>
          {stats?.map(({ label, value }) => (
            <Row key={label} label={label} value={value} />
          ))}
        </tbody>
      </table>
    </div>
  )
}
