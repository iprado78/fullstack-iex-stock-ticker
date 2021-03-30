import React from 'react'
import styles from '../styles/Home.module.css'

export default function Main({ children }) {
  return <main className={styles.mainContainer}>{ children }</main>
}