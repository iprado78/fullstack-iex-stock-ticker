import React, { useEffect, useState } from "react"
import DatePicker from "react-datepicker"
import dayjs from "dayjs"

import "react-datepicker/dist/react-datepicker.css"
import styles from "./HistoricalByDay.module.scss"
import { createSignal } from "@react-rxjs/utils"
import { combineLatest, of } from "rxjs"
import { tickerSelections$ } from "../TickerSearch"
import { catchError, filter, map, switchMap, tap } from "rxjs/operators"
import { ajax } from "rxjs/ajax"
import { bind } from "@react-rxjs/core"
import StatsTable, { IStats } from "../StatsTable"

/**
 * 
 * - fix z-index issue
 * - prevent user from selecting a future date
 * - use date they selected to make an api request
 * 
 * user searches something. the act of searching creates an observable of their search term.
 * the data displayed should update if the search term or the date updates. 
 * 1. when the component mounts, get yesterday's data
 * 2. when the user clicks a button, get the data of the date entered
 */


const [dateSelections$, onDateSelection] = createSignal<string>()


const [useHistoricalByDay] = bind(combineLatest([tickerSelections$, dateSelections$])
  .pipe(
    tap((arr) => {
      console.log("In stream", arr)
    }),
    filter(([ticker, date]) => {
      return ticker.length && date.length
    }),
    switchMap(([ticker, date]) => {
        return ajax.getJSON(`/api/historical-by-day/${ticker}/${date}`).pipe(
          map(([result]: any) => {
            debugger
            return [
              {
                label: "Open",
                value: result.open
              },
              {
                label: "Close",
                value: result.close
              },
              {
                label: "High",
                value: result.high
              },
              {
                label: "Low",
                value: result.low
              },
              {
                label: "Change Percent",
                value: result.changePercent
              },
            ]
          })
        )
    }),
    catchError((error) => {
      console.log('theres an eror')
      return of(error)
    })
), [])

export default function HistoricalByDay() {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const [date, setDate] = useState(yesterday)

  const isPastWeekday = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6 && dayjs(date).isBefore(dayjs(), 'day');
  };

  const historicalByDay = useHistoricalByDay();

  console.log(historicalByDay);
  
  useEffect(() => {
    let formatted = dayjs(date).format("YYYYMMDD")
    onDateSelection(formatted)
  }, [date])

  return (
    <div>
        <DatePicker 
          selected={date} 
          onChange={(date) => setDate(date as Date)} 
          filterDate={isPastWeekday}
          />
      <div>
        <StatsTable caption="Historical Data By Day" stats={{ stats: historicalByDay}} /> 
      </div>
    </div>
  )
}
