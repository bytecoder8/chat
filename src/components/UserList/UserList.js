import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getOnlineUsers } from '../../redux/actions'
import './UserList.css'


class UserList extends Component {
  componentDidMount() {
    this.props.getOnlineUsers()
  }

  render() {
    const { users: { users } } = this.props

    if (!users) {
      return 'Loading...'
    }

    return (
      <div className="user-list">
        <div className="user-list__header">
          User List
        </div>
        <div className="user-list__users">
          { users.map( (username, index) => 
            <div className="user-list__user" key={index}>{username}</div> 
          )}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  getOnlineUsers
}

const mapStateToProps = state => {
  return state.users
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
