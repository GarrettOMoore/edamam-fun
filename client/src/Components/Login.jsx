import React, {Component} from 'react'
import axios from 'axios'

class Login extends Component {
  constructor(props) {
    super(props)
      this.state = {
        email: '',
        password: '',
        message: ''
    }
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleEmailChange(e) {
    this.setState({
        email: e.target.value
    })
  }

  handlePasswordChange(e) {
    this.setState({
        password: e.target.value
    })
  }

  handleSubmit(e) {
      e.preventDefault();
      axios.post('/auth/login', {
          email: this.state.email,
          password: this.state.password
      }).then( res => {
          if (res.data.type === 'error') {
            this.setState({
                message: res.data.message
            })
          } else {
              localStorage.setItem('mernToken', res.data.token)
              this.props.liftToken(res.data)
              this.props.history.push('/')
          }
      }).catch( err => {
          this.setState({
              message: err
          })
      })
  }

    render() {
        return (
            <div className='main'>
            <h3>Log into your account:</h3>
              <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleEmailChange} value={this.state.email} type='email' name='email' placeholder='Email' /> <br />
                <input onChange={this.handlePasswordChange} value={this.state.password} type='password' name='password' placeholder='Password' /> <br />
                <input type='submit' value='Submit' />
              </form>
            </div>
        )
    }
}



export default Login