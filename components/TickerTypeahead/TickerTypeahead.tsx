import React from "react"
import { catchError, debounceTime, map, switchMap } from "rxjs/operators"
import { of } from "rxjs"
import styles from "./TickerTypeahead.module.scss"
// import { mockResults } from "./mockResults"
import { createSignal } from "@react-rxjs/utils"
import { bind } from "@react-rxjs/core"
import { ajax } from "rxjs/ajax"

const [searchInputs$, onNextSearchInput] = createSignal<string>()

interface TickerOption {
  value: string;
  label: string;
}

  // dummy data - delete when backend apis are set up
  let options = [
    {
      value: 'nyse:a',
      label: 'NYSE:A',
    },
    {
      value: 'nyse:f',
      label: 'NYSE:F',
    },
    {
      value: 'nyse:v',
      label: 'NYSE:V',
    },
    {
      value: 'nyse:b',
      label: 'NYSE:B',
    }
  ]

const [useOptions, options$] = bind(
  searchInputs$.pipe(
    debounceTime(300),
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

const [tickerSelections$, onTickerSelection] = createSignal<string>()

/**
 * We export out tickerSelections to the rest of the app
 * 
 * Other parts of the app react to the ticker selections and act as they 
 * need to
 */
export { tickerSelections$ } 


export default function TickerTypeahead() {
  // uncomment when background is hooked up
  // const options = useOptions()
  
  const optionsList = () => {
    return (
      <ul className={styles.dropdown}>
        {options.map((option) => (
          <li key={option.value}>
            <button className={styles.dropdown__option} onClick={() => onTickerSelection(option.value)}>
              { option.label }
            </button>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <form className={styles.search}>
      <div>
        <label className={styles.visuallyHide} htmlFor="ticker-select">
          Ticker Select
        </label>
        <input
          className={styles.search}
          id="ticker-select"
          type="search"
          placeholder="Search a stock ticker..."
          // uncomment when backend is hooked up
          // onChange={(e) => {
          //   onNextSearchInput(e.target.value)
          // }}
        />
      </div>
      {options.length ? optionsList() : ''}
    </form>
  )
}
