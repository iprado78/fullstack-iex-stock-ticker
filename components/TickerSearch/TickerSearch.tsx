import React from "react"
import { of } from "rxjs"
import { ajax } from "rxjs/ajax"
import { debounceTime, map, switchMap } from "rxjs/operators"
import { createSignal, mergeWithKey } from "@react-rxjs/utils"
import { bind } from "@react-rxjs/core"
import { ITickerSearchResult } from "@/models/TickerSearchResult"
import styles from "./TickerSearch.module.scss"

const [searchInputs$, onNextSearchInput] = createSignal<string>()

const [tickerSelections$, onTickerSelection] = createSignal<string>()

interface TickerOption {
  value: string
  label: string
}

const searchResults$ = searchInputs$.pipe(
  debounceTime(300),
  switchMap(
    (searchInput) =>
      searchInput.length
        ? ajax
            .getJSON<ITickerSearchResult[]>(`/api/ticker-search/${searchInput}`)
            .pipe(
              map((searchResults) => {
                return searchResults.map(
                  ({ symbol, sector }) =>
                    ({
                      label: `${symbol} - ${sector}`,
                      value: symbol,
                    } as TickerOption),
                )
              }),
            )
        : of([] as TickerOption[]),
    // ToDo -> add catchError => propagate to ErrorBoundary
  ),
)

const [useOptions] = bind(
  mergeWithKey({
    searchResults: searchResults$,
    tickerSelections: tickerSelections$,
  }).pipe(
    map((event) =>
      event.type === "searchResults" ? event.payload : ([] as TickerOption[]),
    ),
  ),
  [] as TickerOption[],
)

export { tickerSelections$ }

function OptionsList({ options }: { options: TickerOption[] }) {
  return (
    <ul className={styles.dropdown} role="listbox">
      {options.map((option) => (
        <li key={option.value}>
          <button
            type="button"
            className={styles.dropdown__option}
            onClick={() => {
              onTickerSelection(option.value)
            }}
          >
            {option.label}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default function TickerSearch() {
  const options = useOptions()

  const onFormSubmit = (e) => {
    e.preventDefault()
    if (options.length) {
      e.target.querySelector("button").focus()
    } else {
      alert(
        "No stock ticker found with that symbol. Please search something else.",
      )
    }
  }

  return (
    <form className={styles.search} onSubmit={onFormSubmit}>
      <div>
        <label className={styles.visuallyHide} htmlFor="ticker-select">
          Ticker Select
        </label>
        <input
          className={styles.search}
          id="ticker-select"
          type="search"
          placeholder="Search a stock ticker..."
          onChange={(e) => {
            onNextSearchInput(e.target.value)
          }}
        />
      </div>
      {options.length ? <OptionsList options={options} /> : null}
    </form>
  )
}
