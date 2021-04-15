import React, { ReactNode } from "react"
import styles from "./Header.module.scss"

export default function Header({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <header className={styles.container}>
      <div className={styles.left}>
        <img src="USBankLogo.jpeg" alt="US Bank Logo" width="200" />
        <h1>{title}</h1>
      </div>
      <div className={styles.right}>{children}</div>
    </header>
  )
}
