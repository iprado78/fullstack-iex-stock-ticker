import React, { useState } from "react"
import type { ReactNode } from "react"

import styles from "./Tabs.module.scss"
/**
 * enum Tabs {
  SUMMARY = 'Summary',
  HISTORICAL = 'Historical'
}

 * pass in an array of button labels in the same order
 * as the children
 * and they will map to eachother 
 * 
 * @todo implement left-right arrow navigation of tabs: 
 * https://dev.to/eevajonnapanula/keyboard-accessible-tabs-with-react-5ch4
 */

interface ITabsProps {
  tabLabels: string[]
  children: ReactNode[]
}

export default function Tabs({ tabLabels, children }: ITabsProps) {
  // is this the right way to type react children?

  const [openTab, setOpenTab] = useState(tabLabels[0])

  const generateButtons = () => {
    return tabLabels.map((label, i) => {
      let id = `${label}-${i}`
      return (
        <button
          key={id}
          role="tab"
          onClick={() => setOpenTab(label)}
          aria-selected={openTab === label}
          aria-controls={`panel-${id}`}
          id={`tab-${id}`}
        >
          {label}
        </button>
      )
    })
  }

  const generateTabs = () => {
    return children.map((child, i) => {
      let label = tabLabels[i]
      let id = `${label}-${i}`

      return (
        <div
          key={id}
          id={`panel-${id}`}
          style={
            openTab === tabLabels[i]
              ? { display: "block" }
              : { display: "none" }
          }
          aria-labelledby={`tab-${id}`}
          hidden={openTab !== label}
          tabIndex={0}
        >
          {child}
        </div>
      )
    })
  }

  return (
    <div className={styles.wrapper}>
      <div role="tablist" aria-label="Tabbable content">
        {generateButtons()}
      </div>
      {generateTabs()}
    </div>
  )
}
