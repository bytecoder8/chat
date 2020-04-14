const Websocket = require('ws')

const port = process.env.PORT || 9090

const server = new Websocket.Server({
  host: '0.0.0.0',
  port,
})

log('server started at ' + port)


const connections = new Map()
server.on('connection', ws => {
  log('user connected')

  createConnection(ws)

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
            setUsername(ws, username)
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
          author = connections.get(ws).username
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
  connections.forEach( (value, ws) => {
    try {
      send(ws, message)
    } catch (error) {
      log('Error sending message')
    }
  })
}


function createConnection(ws) {
  connections.set(ws, {
    username: ''
  })
}

function setUsername(ws, username) {
  const connection = connections.get(ws)
  if (connection) {
    connections.set(ws, {
      ...connection,
      username
    })
  }
}

function send(ws, obj) {
  ws.send(JSON.stringify({ ...obj, time: new Date()}))
}
