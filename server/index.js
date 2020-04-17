const Websocket = require('ws')
const ConnectionPool = require('./ConnectionPool')

const port = process.env.PORT || 9090

const server = new Websocket.Server({
  host: '0.0.0.0',
  port,
})

log('server started at ' + port)

const connections = new ConnectionPool()

server.on('connection', ws => {
  log('user connected')

  connections.create(ws)

  ws.on('message', message => {
    log('received message: ', message)

    let author

    try {
      const mObject = JSON.parse(message)

      switch(mObject.type) {
        case 'set_username':
          let { username } = mObject
          username = username.trim()
          if (username) {
            connections.setUsername(ws, username)
            send(ws, {
              type: 'set_username',
              username
            })
            broadcast(connections, {
              author: 'server',
              text: `Welcome, ${username}`
            })
          } else {
            send(ws, {
              type: 'set_username',
              error: 'Empty username'
            })
          }
          break
        case 'online_users':
          send(ws, {
            type: 'online_users',
            users: connections.getOnlineUsers(),
          })
          break
        case 'disconnect':
          connections.remove(ws)
          break
        case 'message':
        default:
          author = connections.getUsername(ws)
          if (author) {
            broadcast(connections,
              {
                author,
                text: mObject.text
              }
            )
          } else {
            console.error('Author not found')
          }
      }
    } catch(error) {
      log(error)
    }
  })

})

server.on('close', ws => {
  log('user disconnected')
  connections.remove(ws)
})

function log(...objs) {
  console.log(new Date() + ' ' + objs.join(' '))
}

function send(ws, obj) {
  ws.send(JSON.stringify({ ...obj, time: new Date()}))
}

function broadcast(connections, message) {
  connections.batch(send, message)
}
