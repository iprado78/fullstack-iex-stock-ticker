import React from 'react'
import styles from '../styles/Home.module.css'

export default function AppContainer ({ children }) {
  return <div className={styles.container}>{ children }</div>
}
