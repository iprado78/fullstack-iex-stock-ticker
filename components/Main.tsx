import React, { ReactNode } from "react"
import styles from "@/styles/Home.module.scss"

interface MainProps {
  children: ReactNode
}

export default function Main({ children }: MainProps) {
  return <main className={styles.mainContainer}>{children}</main>
}
