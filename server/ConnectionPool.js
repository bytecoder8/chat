class ConnectionPool {

  connections = new Map()

  create(ws) {
    this.connections.set(ws, {
      username: ''
    })
  }

  setUsername(ws, username) {
    const connection = this.connections.get(ws)
    if (connection) {
      this.connections.set(ws, {
        ...connection,
        username
      })
    }
  }

  getUsername(ws) {
    return this.connections.get(ws).username
  }

  getOnlineUsers() {
    const users = []
    for (const user of this.connections.values()) {
      if (user.username) {
        users.push(user.username)
      }
    }
    return users
  }

  remove(ws) {
    this.connections.delete(ws)
  }

  batch(func, ...args) {
    this.connections.forEach( (value, ws) => {
      try {
        func(ws, ...args)
      } catch (error) {
        log('Error sending message')
      }
    })
  }
}

module.exports = ConnectionPool
