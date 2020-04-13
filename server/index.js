const Websocket = require('ws')

const server = new Websocket.Server({
  port: process.env.PORT || 8080,
})

log('server started')

server.on('connection', (ws) => {
  log('user connected')

  ws.on('message', message => {
    log('received message: ', message)
    try {
      const mObject = JSON.parse(message)
      ws.send(JSON.stringify({
        author: mObject.author,
        text: mObject.text
      }))
    } catch(error) {
      log(error)
    }
  })

  ws.send(JSON.stringify({
    author: 'server',
    text: 'Welcome, User!'
  }))
})

server.on('close', () => {
  log('user disconnected')
})


function log(text) {
  console.log(new Date() + ' ' + text)
}