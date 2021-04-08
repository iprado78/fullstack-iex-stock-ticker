import React, { useContext, useEffect, useState } from "react"
import { SocketIOContext } from "@/components/SocketIOProvider"

export default function Ticker({ symbol }: { symbol: string }) {
  const [price, setPrice] = useState(null)
  const socket = useContext(SocketIOContext)

  useEffect(() => {
    socket.on("message", ({ price }) => {
      setPrice(price)
    })
  }, [symbol])

  return <div>{price}</div>
}
