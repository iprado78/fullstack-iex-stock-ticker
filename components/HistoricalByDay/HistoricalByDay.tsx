import React, { useEffect, useState } from "react"
import DatePicker from "react-datepicker"
import dayjs from "dayjs"

import "react-datepicker/dist/react-datepicker.css"
import styles from "./HistoricalByDay.module.scss"
import { createSignal } from "@react-rxjs/utils"
import { combineLatest, of } from "rxjs"
import { tickerSelections$ } from "../TickerSearch"
import { catchError, filter, map, switchMap } from "rxjs/operators"
import { ajax } from "rxjs/ajax"
import { bind } from "@react-rxjs/core"
import StatsTable from "../StatsTable"
import { historicalByDayConfig } from "./HistoricalByDay.config"
import { IHistoricalByDay } from "@/models/HistoricalByDay"

const [dateSelections$, onDateSelection] = createSignal<string>()

const [useHistoricalByDay] = bind(
  combineLatest([tickerSelections$, dateSelections$]).pipe(
    filter(([ticker, date]) => ticker !== undefined && date !== undefined),
    switchMap(([ticker, date]) =>
      ajax
        .getJSON<IHistoricalByDay>(`/api/historical-by-day/${ticker}/${date}`)
        .pipe(
          map((historicalByDay) => {
            return Object.entries(historicalByDay).map(
              ([histKey, histValue]) => {
                const { label, formatter } = historicalByDayConfig[
                  histKey as keyof IHistoricalByDay
                ]
                return {
                  label,
                  value: formatter?.(histValue) ?? histValue,
                }
              },
            )
          }),
        ),
    ),
    catchError((error) => {
      return of(error)
    }),
  ),
  [],
)

export default function HistoricalByDay() {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const [date, setDate] = useState(yesterday)

  const isPastWeekday = (date: Date) => {
    const day = date.getDay()
    return day !== 0 && day !== 6 && dayjs(date).isBefore(dayjs(), "day")
  }

  const historicalByDay = useHistoricalByDay()

  useEffect(() => {
    let formatted = dayjs(date).format("YYYYMMDD")
    onDateSelection(formatted)
  }, [date])

  return (
    <div>
      <DatePicker
        selected={date}
        onChange={(date: Date) => setDate(date as Date)}
        filterDate={isPastWeekday}
      />
      <div>
        <StatsTable stats={historicalByDay} caption={"Historical by day"} />
      </div>
    </div>
  )
}
