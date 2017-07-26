import createTryToConnect from './try-to-connect'

let socket: WebSocket
let tryCount = 0
const createWebSocket = (url: string, _credential: string) => {
  socket = {} as any
  setTimeout(() => {
    if (url === 'BAD_URL') {
      socket.onerror({} as any)
    }
    if (url === 'WORK_AFTER_3_TRIES') {
      if (tryCount < 3) {
        tryCount++
        socket.onclose({} as any)
      }
      else {
        socket.onopen({} as any)
      }
    }
  }, 1)
  return socket
}

const tryToConnect = createTryToConnect(createWebSocket)

beforeEach(() => {
  tryCount = 0
})

test('throw an error if the socket throws an error', async () => {
  let threw = false
  try {
    await tryToConnect('BAD_URL')
  } catch (e) {
    threw = true
  }
  expect(threw).toBe(true)
})

test('if the connection fails, try again with an incremental backoff', async () => {
  const backoffMs = 25
  const startMs = new Date().getTime()
  const resultSocket = await tryToConnect('WORK_AFTER_3_TRIES', '', backoffMs)  // should fail 3 times before connecting
  const endMs = new Date().getTime()
  const elapsedMs = endMs - startMs
  expect(elapsedMs).toBeGreaterThan(150)                                        // 25 + 50 + 75 = 150 ms
  expect(elapsedMs).toBeLessThan(300)                                           // hopefuly plenty of headroom
  expect(tryCount).toBe(3)
  expect(resultSocket).toBeTruthy()
})
