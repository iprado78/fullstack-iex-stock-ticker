import React, { useState } from "react"
import type { ReactNode } from "react"
import Image from 'next/image'
import classNames from "classnames"
import { map, take } from "rxjs/operators"
import { bind } from "@react-rxjs/core"
import { tickerSelections$ } from "../TickerSearch"
import styles from "./Tabs.module.scss"

/**
 *
 * @todo implement left-right arrow navigation of tabs:
 * https://dev.to/eevajonnapanula/keyboard-accessible-tabs-with-react-5ch4
 */
const [useHasTickerSelection] = bind(
  tickerSelections$.pipe(
    take(1),
    map((ticker) => !!ticker),
  ),
  false,
)

interface ITabsProps {
  tabLabels: string[]
  children: ReactNode[]
}

interface ITabButtonProps {
  isOpen: boolean
  label: string
  id: string
  onTabClick: (label: string) => void
}

interface ITabPanel {
  children: ReactNode
  isOpen: boolean
  id: string
}

const TabButton = ({ isOpen, label, id, onTabClick }: ITabButtonProps) => {
  const buttonClass = classNames(styles.button, isOpen && styles.isActive)
  return (
    <button
      role="tab"
      className={buttonClass}
      onClick={() => onTabClick(label)}
      aria-selected={isOpen}
      aria-controls={`tab-panel-${id}`}
      id={`tab-button-${id}`}
    >
      {label}
    </button>
  )
}

const TabPanel = ({ children, isOpen, id }: ITabPanel) => {
  return (
    <div
      key={id}
      id={`tab-panel-${id}`}
      style={isOpen ? { display: "block" } : { display: "none" }}
      aria-labelledby={`tab-button-${id}`}
      hidden={isOpen}
      tabIndex={0}
    >
      {children}
    </div>
  )
}

export default function Tabs({ tabLabels, children }: ITabsProps) {
  const [openTab, setOpenTab] = useState(tabLabels[0])
  const hasTickerSelection = useHasTickerSelection()

  if (!hasTickerSelection) {
    return (
      <div>
        <p>Nothing to see here...</p>
        <div>
          <Image 
            src="https://media.giphy.com/media/BEob5qwFkSJ7G/giphy.gif"
            alt="Spongebob looking very sad with teary eyes and a quivering mouth."
            width="450"
            height="333"
          
          />
        </div>
      </div>
    )
  }

  return (
    <div className={styles.wrapper}>
      <div
        role="tablist"
        aria-label="Tabbable content"
        className={styles.buttonWrapper}
      >
        {tabLabels?.map((label, index) => (
          <TabButton
            onTabClick={setOpenTab}
            isOpen={openTab === label}
            id={`${label}-${index}`}
            label={label}
            key={label}
          />
        ))}
      </div>
      <div className={styles.tabContentWrapper}>
        {children.map((child, index) => (
          <TabPanel
            id={`${tabLabels[index]}-${index}`}
            isOpen={openTab === tabLabels[index]}
            key={tabLabels[index]}
          >
            {child}
          </TabPanel>
        ))}
      </div>
    </div>
  )
}
