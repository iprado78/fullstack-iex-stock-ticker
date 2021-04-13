import React, { useState } from "react"
import type { ReactNode } from "react"
import classNames from "classnames"

import styles from "./Tabs.module.scss"
/**
 *
 * @todo implement left-right arrow navigation of tabs:
 * https://dev.to/eevajonnapanula/keyboard-accessible-tabs-with-react-5ch4
 */

interface ITabsProps {
  tabLabels: string[]
  // is this the right way to type react children?
  children: ReactNode[]
}

interface ITabButtonProps {
  isOpen: boolean
  label: string
  id: string
  onTabClick: (label: string) => void
}

interface ITabPanel {
  content: ReactNode
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

const TabPanel = ({ content, isOpen, id }: ITabPanel) => {
  return (
    <div
      key={id}
      id={`tab-panel-${id}`}
      style={isOpen ? { display: "block" } : { display: "none" }}
      aria-labelledby={`tab-button-${id}`}
      hidden={isOpen}
      tabIndex={0}
    >
      {content}
    </div>
  )
}

export default function Tabs({ tabLabels, children }: ITabsProps) {
  const [openTab, setOpenTab] = useState(tabLabels[0])

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

      {children.map((child, index) => (
        <TabPanel
          id={`${tabLabels[index]}-${index}`}
          isOpen={openTab === tabLabels[index]}
          content={child}
          key={tabLabels[index]}
        />
      ))}
    </div>
  )
}
