import React, { useEffect, useState } from "react"
import DatePicker from "react-datepicker"
import dayjs from "dayjs"
import { combineLatest, of } from "rxjs"
import { ajax } from "rxjs/ajax"
import {
  catchError,
  filter,
  map,
  startWith,
  switchMap,
  tap,
} from "rxjs/operators"
import { createSignal } from "@react-rxjs/utils"
import { bind } from "@react-rxjs/core"

import { tickerSelections$ } from "../TickerSearch"
import StatsTable from "../StatsTable"
import { historicalByDayConfig } from "./HistoricalByDay.config"
import { IHistoricalByDay } from "@/models/HistoricalByDay"

import "react-datepicker/dist/react-datepicker.css"
import styles from "./HistoricalByDay.module.scss"

/**
 * default date selected on load should be the previous weekday
 * because the api being used will only return data for weekdays
 * that have already happened
 */
const defaultDate = (): Date => {
  let date = new Date()
  let dayOfWeek = date.getDay()

  switch (dayOfWeek) {
    case 0: // sunday -> set to Friday
      date.setDate(date.getDate() - 2)
      break
    case 1: // monday -> set to Friday
      date.setDate(date.getDate() - 3)
      break
    default:
      date.setDate(date.getDate() - 1)
  }
  return date
}

const [dateSelections$, onDateSelection] = createSignal<Date>()

const [useHistoricalByDay] = bind(
  combineLatest([
    tickerSelections$,
    dateSelections$.pipe(startWith(defaultDate())),
  ]).pipe(
    filter(([ticker, date]) => ticker !== undefined && date !== undefined),
    switchMap(([ticker, date]) =>
      // const apiFormattedDate = dayjs(date).format("YYYYMMDD")
      // todo refactor so this works with a return statement & a variable can be used
      ajax
        .getJSON<IHistoricalByDay>(
          `/api/historical-by-day/${ticker}/${dayjs(date).format("YYYYMMDD")}`,
        )
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

const isPastWeekday = (date: Date) => {
  const day = date.getDay()
  return day !== 0 && day !== 6 && dayjs(date).isBefore(dayjs(), "day")
}

const [useSelectedDate] = bind(
  dateSelections$.pipe(
    map((date) => {
      return date ?? defaultDate()
    }),
  ),
  defaultDate(),
)

export default function HistoricalByDay() {
  const historicalByDay = useHistoricalByDay()
  const selectedDate = useSelectedDate()

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={(date: Date) => onDateSelection(date as Date)}
        filterDate={isPastWeekday}
      />
      <div>
        <StatsTable stats={historicalByDay} caption={"Historical by day"} />
      </div>
    </div>
  )
}
