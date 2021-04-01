import React from "react"
import styles from "../styles/Home.module.css"

export default function Header({ title }: { title: string }) {
  return (
    <header className={styles.title}>
      <div className={styles.imgWrapper}>
        <img src="USBankLogo.jpeg" alt="US Bank Logo" width="200"/>
      </div>
      <h1>{title}</h1>
    </header>
  )
}
