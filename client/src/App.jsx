import React, {Component} from 'react';
import axios from 'axios'
import About from './Components/About'
import Search from './Components/Search'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import Pantry from './Components/Pantry'
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Logo from './Images/truss_test.jpeg'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      user: null,
      errorMessage: '',
      lockedResult: '',
      data: []
    }
    this.liftTokenToState = this.liftTokenToState.bind(this)
    this.checkForLocalToken = this.checkForLocalToken.bind(this)
    this.logout = this.logout.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  checkForLocalToken () {
    // Look in localStorage for the token
    let token = localStorage.getItem('mernToken')
    if (!token || token === 'undefined') {
      // No token.
      localStorage.removeItem('mernToken')
      this.setState({
        token: '',
        user: null
      })
    } else {
      // Found token - Send it to be verified.
      axios.post('/auth/me/from/token', {token} )
        .then( res => {
          if (res.data.type === 'error') {
            localStorage.removeItem('mernToken')
            this.setState({
              errorMessage: res.data.message
            })
          } else {
            // Put token in localStorage
            localStorage.setItem('mernToken', res.data.token)
            // Put token in State
            this.setState({
              token: res.data.token,
              user: res.data.user
            })
          }
        })
    }
  }

  componentDidMount() {
    this.checkForLocalToken();
    axios.get('/explore').then( res => {
      this.setState({
        data: res.data
      })
    })
  }

  liftTokenToState ({token, user}) {
 
    this.setState({
      token: token,
      user: user
    })
  }



  logout () {
    // Remove the token from localStorage
    localStorage.removeItem('mernToken')
    // Remove user & token from state
    this.setState({
      token: '',
      user: null
    })
  }

  handleClick(e) {
    e.preventDefault()
    // axios.defaults.headers.common['Authorization'] = `Bearer ${this.state.token}`
    let config = {
      headers: {
        Authorization: `Bearer ${this.state.token}`
      }
    }
    axios.get('./locked/test', config).then( res => {
      this.setState({
        lockedResult: res.data
      })
    })
  }
  render(){
  return (
    <Router>
    <div className="App">
    <img className='logo'src={Logo} alt="logo"/>
      <div className='nav-box'>
        <nav>
          <Link className='nav-text'to='/'>About</Link> | {' '}
          <Link className='nav-text'to='/search'>Search</Link> | {' '}
          <Link className='nav-text'to='/mypantry'>My Pantry</Link> | {' '}
          <Link className='nav-text'to='/login'>Log In</Link> | {' '}
          <Link className='nav-text'to='/signup'>Sign Up</Link>
        </nav>
      </div>
        <Route exact path='/' render={()=><About/>} />
        <Route exact path='/search' render={()=><Search />} />
        <Route exact path='/mypantry' render={()=><Pantry/>} />
        <Route exact path='/login' render={(props)=><Login liftToken={this.liftTokenToState}{...props}/>} />
        <Route exact path='/signup' render={(props)=><SignUp liftToken={this.liftTokenToState}{...props}/>} />
      </div>
  </Router>
  );
  }
}

export default App;
