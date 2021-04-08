import React, { ReactNode } from "react"
import SocketIOProvider from "@/components/SocketIOProvider"
import styles from "@/styles/Home.module.css"

interface AppContainerProps {
  children: ReactNode
}

export default function AppContainer({ children }: AppContainerProps) {
  return (
    <SocketIOProvider>
      <div className={styles.container}>{children}</div>
    </SocketIOProvider>
  )
}
