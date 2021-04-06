import React, { useRef } from "react"
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

function OptionsList({
  options,
  buttonRef,
}: {
  options: TickerOption[]
  buttonRef: React.RefObject<HTMLButtonElement>
}) {
  return (
    <ul className={styles.dropdown} role="listbox">
      {options.map((option, index) => (
        <li key={option.value}>
          <button
            ref={index === 0 ? buttonRef : undefined}
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
  const buttonRef = useRef<HTMLButtonElement>(null)

  return (
    <form
      className={styles.search}
      onSubmit={(e) => {
        e.preventDefault()
        if (buttonRef.current) {
          buttonRef.current.focus()
        }
        /**
         * ToDo add red highlight to input and inline message when empty
         * search
         */
      }}
    >
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
      {options.length ? (
        <OptionsList options={options} buttonRef={buttonRef} />
      ) : null}
    </form>
  )
}
