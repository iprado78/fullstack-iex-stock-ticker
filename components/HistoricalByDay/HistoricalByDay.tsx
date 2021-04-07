import React, { useEffect, useState } from "react"
import DatePicker from "react-datepicker"
import dayjs from "dayjs"

import "react-datepicker/dist/react-datepicker.css"
import styles from "./HistoricalByDay.module.scss"

export default function HistoricalByDay() {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  const [date, setDate] = useState(yesterday)
  const [formattedDate, setFormattedDate] = useState("")

  useEffect(() => {
    let formatted = dayjs(date).format("YYYYMMDD")
    setFormattedDate(formatted)
  }, [date])

  return (
    <div>
      <DatePicker selected={date} onChange={(date) => setDate(date as Date)} />
    </div>
  )
}
