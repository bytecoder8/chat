const Websocket = require('ws')

const server = new Websocket.Server({
  port: process.env.PORT || 8080,
})

log('server started')

const connections = []

server.on('connection', ws => {
  log('user connected')

  connections.push(ws)

  ws.on('message', message => {
    log('received message: ', message)
    try {
      const mObject = JSON.parse(message)

      broadcast(connections, 
        JSON.stringify({
          author: mObject.author,
          text: mObject.text
        })
      )
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

function log(...objs) {
  console.log(new Date() + ' ' + objs.join(' '))
}

function broadcast(connections, message) {
  connections.forEach(ws => {
    try {
      ws.send(message)
    } catch (error) {
      log('Error sending message')
    }
  })
}