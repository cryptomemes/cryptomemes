import React from 'react'
import { Redirect } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import { Input, Button } from 'antd';

class SignupForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleTextChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  async handleSubmit(e) {
    e.preventDefault()
    const { username, password } = this.state
    const {
      authStore: {
        signup
      }
    } = this.props

    await signup(username, password)
  }

  render() {
    const { username, password } = this.state
    const {
      userStore: {
        loggedInUser
      }
    } = this.props

    if (loggedInUser) {
      return <Redirect to="/" />
    }

    return (
      <form className="upload-form" onSubmit={this.handleSubmit}>
        <Input
          required
          className="input"
          name="username"
          placeholder="Enter username"
          value={username}
          onChange={this.handleTextChange}
        />
        <Input
          required
          className="input"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={this.handleTextChange}
        />
        <Button className="input" type="primary" htmlType="submit">
          Sign up
        </Button>
      </form>
    )
  }
}

export default inject('authStore', 'userStore')(observer(SignupForm))
