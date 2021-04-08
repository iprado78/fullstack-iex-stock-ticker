import React, { useContext, useEffect, useState } from "react"
import { SocketIOContext } from "@/components/SocketIOProvider"
import styles from "./Ticker.module.scss"

export default function Ticker({ symbol }: { symbol: string }) {
  const [price, setPrice] = useState(null)
  const socket = useContext(SocketIOContext)

  useEffect(() => {
    socket.on("message", ({ price }) => {
      setPrice(price)
    })
  }, [symbol])

  return <h3 className={styles.price}>{price}</h3>
}
