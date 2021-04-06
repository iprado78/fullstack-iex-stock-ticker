import React, { ReactNode } from "react"
import styles from "@/styles/Home.module.css"

interface AppContainerProps {
  children: ReactNode
}
export default function AppContainer({ children }: AppContainerProps) {
  return <div className={styles.container}>{children}</div>
}
