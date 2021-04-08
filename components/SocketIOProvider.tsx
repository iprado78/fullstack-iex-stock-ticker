import React, { ReactNode, useEffect, useState } from "react"
import { io, Socket } from "socket.io-client"

export const SocketIOContext = React.createContext<Socket>(null as any)

interface SocketIOProviderProps {
  children: ReactNode
}

export default function SocketIOProvider({ children }: SocketIOProviderProps) {
  const [socket, setSocket] = useState<Socket>(null as any)

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
