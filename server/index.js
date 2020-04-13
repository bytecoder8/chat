const Websocket = require('ws')

const server = new Websocket.Server({
  port: process.env.PORT || 8080,
})

server.on('connection', (ws) => {
  console.log('user connected')

  ws.on('message', message => {
    console.log('received message: ', message)
    try {
      const mObject = JSON.parse(message)
      ws.send(JSON.stringify({
        author: mObject.author,
        text: mObject.text
      }))
    } catch(error) {
      console.log(error)
    }
  })

  ws.send(JSON.stringify({
    author: 'server',
    text: 'Welcome, User!'
  }))
})

server.on('close', () => {
  console.log('user disconnected')
})
