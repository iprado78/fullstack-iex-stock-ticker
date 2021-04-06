import React from "react"
import "@/styles/globals.css"

/**
 * ToDo: narrow types from Next.js
 */
interface MyApp {
  Component: any
  pageProps: any
}

function MyApp({ Component, pageProps }: MyApp) {
  return <Component {...pageProps} />
}

export default MyApp
