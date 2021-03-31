import React from "react"
import { catchError, debounceTime, map, switchMap } from "rxjs/operators"
import { of } from "rxjs"
import styles from "./TickerTypeahead.module.css"
// import { mockResults } from "./mockResults"
import { createSignal } from "@react-rxjs/utils"
import { bind } from "@react-rxjs/core"
import { ajax } from "rxjs/ajax"

const [searchInputs$, onNextSearchInput] = createSignal<string>()

interface TickerOption {
  value: string;
  label: string;
}

const [useOptions, options$] = bind(
  searchInputs$.pipe(
    debounceTime(100),
    switchMap(
      // For mock results ->
      // of(input.length ? mockResults.filter((result) => result.symbol.toLowerCase().startsWith(input)) : [] 
      (searchInput) => ajax.getJSON(`http://localhost:3000/ticker-typeahed/${searchInput}`).pipe(        map((searchResults: any[]) => { // ToDo => define interface and use that type
      return searchResults.map((searchResult) =>  ({
        label: `${searchResult.symbol} - ${searchResult.sector}`,
        value: searchResult.symbol
      } as TickerOption))
    })),
      // ToDo -> add catchError
      ),
    ),
    [] as TickerOption[]
)

const [tickerSelections$, onCompanySelection] = createSignal<string>()

/**
 * We export out tickerSelections to the rest of the app
 * 
 * Other parts of the app react to the ticker selections and act as they 
 * need to
 */
export { tickerSelections$ } 

/**
 * This would be defined 
 */
const [useSummaryStats, summaryStats$] = bind(
  tickerSelections$.pipe(
    switchMap(
      (ticker) => ajax.getJSON(`http://localhost:3000/summary-stats/${ticker}`)
      // Todo -> add catchError
    )
  ),
  {} // as SummaryStats -> our interface type
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
          <div key={option.value} onClick={() => onCompanySelection(option.value)}>
            { option.label }
          </div>
        ))}
      </div>
    </>
  )
}
