const Websocket = require('ws')

const wss = new Websocket.Server({
  port: process.env.PORT || 8080,
})

wss.on('connection', () => {
  console.log('user connected')

  wss.on('message', message => {
    console.log('received message: ', message)
  })

  wss.send('Welcome, user!')
})
