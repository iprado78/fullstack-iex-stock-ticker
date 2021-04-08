import React, { useEffect, useState } from "react"
import { io, Socket } from "socket.io-client"

export const SocketIOContext = React.createContext(null)

export default function SocketIOProvider({ children }) {
  const [socket, setSocket] = useState<Socket>(null)

  useEffect(() => {
    fetch("/api/socketio-init").finally(() => {
      setSocket((socket) => {
        socket = io()
        return socket
      })
    })
  }, [])

  return (
    <SocketIOContext.Provider value={socket}>
      {children}
    </SocketIOContext.Provider>
  )
}
