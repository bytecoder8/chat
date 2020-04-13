const Websocket = require('ws')

const server = new Websocket.Server({
  port: process.env.PORT || 8080,
})

log('server started')

const connections = []
const usernames = []

server.on('connection', ws => {
  log('user connected')

  connections.push(ws)

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
            usernames.push({
              connection: ws,
              username
            })
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
        case 'message':
        default:
          author = findUsername(ws)
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
  connections = connections.filter( connection !== ws)
  usernames = usernames.filter( username.connection !== ws )
})

function log(...objs) {
  console.log(new Date() + ' ' + objs.join(' '))
}

function broadcast(connections, message) {
  connections.forEach(ws => {
    try {
      send(ws, message)
    } catch (error) {
      log('Error sending message')
    }
  })
}

function send(ws, obj) {
  ws.send(JSON.stringify(obj))
}

function findUsername(ws) {
  const obj = usernames.find(username => username.connection == ws)
  return obj ? obj.username : undefined
}
