import axios from "axios"
import { BehaviorSubject, defer, from, iif, timer } from "rxjs"
import { map, switchMapTo } from "rxjs/operators"
import { Server } from "socket.io"

const { IEX_API_TOKEN: TOKEN } = process.env

const sub = new BehaviorSubject<string>("")

const ioHandler = (_req: any, res: any) => {
  if (!res.socket.server.io) {
    console.log("*First use, starting websocket")
    const io = new Server(res.socket.server)

    io.on("connection", (socket) => {
      console.log("Client has connected")

      socket.on("message", (symbol) => {
        sub.next(symbol)
      })

      sub.subscribe((symbol) => {
        iif(
          () => (symbol !== null || symbol !== undefined) && symbol.length != 0,
          timer(0, 5000),
        )
          .pipe(
            switchMapTo(
              defer(() =>
                from(
                  axios.get(
                    `https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=${TOKEN}`,
                  ),
                ),
              ).pipe(map(({ data }) => data)),
            ),
          )
          .subscribe(({ latestPrice }) => {
            socket.send({ price: latestPrice })
          })
      })
    })

    res.socket.server.io = io
  } else {
    console.log("socket.io already running")
  }

  res.end()
}

export const config = {
  api: {
    bodyParser: false,
  },
}

export default ioHandler
