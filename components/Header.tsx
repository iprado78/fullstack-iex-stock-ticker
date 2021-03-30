import React from 'react'
import styles from '../styles/Home.module.css'

export default function Header ({ title }: { title: string}) {
  return <header className={styles.title} ><h1>{ title }</h1></header>
}