import React, {Component} from 'react'
import axios from 'axios'


class SignUp extends Component {
  constructor(props) {
      super(props)
      this.state = {
          name: '',
          email: '',
          password: '',
          message: '',
          city: '',
          state: ''
      }
      this.handleNameChange = this.handleNameChange.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.handleCityChange = this.handleCityChange.bind(this);
      this.handleStateChange = this.handleStateChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNameChange(e) {
        this.setState({
            name: e.target.value
        })
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
    
    handleCityChange(e) {
          this.setState({
              city: e.target.value
          })
    }

    handleStateChange(e) {
          this.setState({
              state: e.target.value
          })
    }

    handleSubmit(e)  {
      e.preventDefault();
      axios.post('/auth/signup', {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          city: this.state.city,
          state: this.state.state
      }).then( res => {
        if (res.data.type === 'error') {
        } else {
            localStorage.setItem('mernToken', res.data.token)
            this.props.liftToken(res.data);
            this.props.history.push('/')
        }
      }).catch( err => {
          // This block catches the rate limiters.
          this.setState({
              message: 'Maximum accounts exceeded. Please try again later.'
          })
      })
    }

    render() {
        return (
          <div className='main'>
            <h3>Create a new account: </h3>
            <form onSubmit={this.handleSubmit}>
              <input onChange={this.handleNameChange} value={this.state.name} type='text' name='name' placeholder='Name' /> <br />
              <input onChange={this.handleEmailChange} value={this.state.email} type='email' name='email' placeholder='Email' /> <br />
              <input onChange={this.handlePasswordChange} value={this.state.password} type='password' name='password' placeholder='Password' /> <br />
              <input onChange={this.handleCityChange} value={this.state.city} type='text' name='city' placeholder='City' /> <br />
              <input onChange={this.handleStateChange} value={this.state.state} type='text' name='state' placeholder='State' /> <br />
              <input type='submit' value='Sign Up' />
            </form>
          </div>
        )
    }
}



export default SignUp