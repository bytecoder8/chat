import React, { Component } from 'react'
import { connect } from 'react-redux'
import { changeUsername } from '../../redux/actions'
import './UsernameForm.css'


class UsernameForm extends Component {

  state = {
    username: ''
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSetUsername = event => {
    event.preventDefault()
    let { username } = this.state
    username = username ? username.trim() : ''
    if (username) {
      this.setState({ username: '' })
      this.props.changeUsername(username.trim())
    }
  }

  render() {
    const { username } = this.state

    return (
      <form className="username-form" onSubmit={ this.handleSetUsername }>
        <input
          type="text"
          name="username"
          className="form-control username-form__input"
          placeholder="Enter your name"
          value={ username }
          autoComplete="off"
          onChange={ this.onChange }
        />
        <button 
          type="submit" 
          className="btn btn--success username-form__button"
        >
          Set
        </button>
      </form>
    )
  }
}

const mapDispatchToProps = {
  changeUsername
}


export default connect(null, mapDispatchToProps)(UsernameForm)
