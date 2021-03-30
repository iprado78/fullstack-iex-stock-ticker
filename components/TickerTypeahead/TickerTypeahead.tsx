import React, { useEffect, useState } from "react"
import { catchError, debounceTime, filter, map, switchMap } from "rxjs/operators"
import { of } from "rxjs"
import styles from "./TickerTypeahead.module.css"
import { mockResults } from "./mockResults"
import { createSignal } from "@react-rxjs/utils"
import { bind } from "@react-rxjs/core"

const [searchInputs$, onNextSearchInput] = createSignal<string>()

const [useOptions, options$] = bind(
  searchInputs$.pipe(
    debounceTime(100),
    map((input) => input.toLowerCase()),
    switchMap((input: string) =>
      of(input.length ? mockResults.filter((result) => result.symbol.toLowerCase().startsWith(input)) : []),
    ),
  ),
  [],
)

export default function TickerTypeahead() {
  const options = useOptions()
  return (
    <>
      <div>
        <label className={styles.visuallyHide} htmlFor="ticker-select">
          Ticker Select
        </label>
        <input
          id="ticker-select"
          type="search"
          placeholder="Search for stock ticker"
          onChange={(e) => {
            onNextSearchInput(e.target.value)
          }}
        />
      </div>
      <div>
        {options.map((option) => (
          <div key={option.symbol}>
            {option.symbol} - {option.sector}
          </div>
        ))}
      </div>
    </>
  )
}
