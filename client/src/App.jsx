import React, {Component} from 'react';
import axios from 'axios'
import About from './Components/About'
import Search from './Components/Search'
import Login from './Components/Login'
import SignUp from './Components/SignUp'
import Pantry from './Components/Pantry'
import Recipes from './Components/Recipes'
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Logo from './Images/mixte_free.jpeg'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: '',
      user: null,
      errorMessage: '',
      lockedResult: '',
      pantryData: {},
      recipes: {},
      filterElems: []
    }
    this.liftTokenToState = this.liftTokenToState.bind(this)
    this.checkForLocalToken = this.checkForLocalToken.bind(this)
    this.logout = this.logout.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.getPantryItems = this.getPantryItems.bind(this)
    this.handleRecipeSubmit = this.handleRecipeSubmit.bind(this)
    // this.fetchRecipes = this.fetchRecipes.bind(this);
    this.addFilterElem = this.addFilterElem.bind(this);
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
            this.getPantryItems();
          }
        })
    }
  }

  componentDidMount() {
    this.checkForLocalToken();
  }

  getPantryItems() {
    let user = Object.assign({},this.state.user)
    axios.get(`/pantry/${user._id}`).then( res => {
      this.setState({
        pantryData: res.data,
      })
    })
}

  liftTokenToState ({token, user}) {
    console.log("INSIDE LIFT TOKEN");
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

  fetchRecipes(qryStr){
      axios.post('/recipes', {
        query: qryStr
    }).then((res) => {
        this.setState({
            recipes: res.data.data.hits
        })
    })
    .catch((err) => console.log(err))
    }

  handleRecipeSubmit(queue){
    console.log("In Recipe Submit", queue)
    if (queue.length > 0) {
      let queryStr = queue.join('&').replace(/\s/g, '');
      this.fetchRecipes(queryStr)
    }
  }

  addFilterElem(elem){
    this.setState({
      filterElems: [...this.state.filterElems, elem]
    })
  }

  render(){
    let user = Object.assign({}, this.state.user)
    let contents;
    if (user.name) {
      contents = (
      <>
      <Route exact path='/search' render={()=><Search user={user}logout={this.logout}/>}/>
      <Route path='/mypantry' render={(props)=><Pantry user={user}pantryData={this.state.pantryData}getPantryItems={this.getPantryItems}submitRecipe={this.handleRecipeSubmit}{...props}logout={this.logout}/>}/>
      </>
      )
    } else {
      contents = (
        <>
      <Route exact path ='/' render={()=><Login />}/>
      <Route exact path ='/mypantry' render={()=><Login />}/>
      <Route exaxt path ='/search' render={()=><Login/>}/>
        </>
      )
    }
  return (
    <Router>
    <div className="App">
    <img className='logo'src={Logo} alt="logo"/>
      <div className='nav-box'>
        <nav>
          <Link className='nav-text'to='/'>About</Link> | {' '}
          <Link className='nav-text'to='/search'>Search</Link> | {' '}
          <Link className='nav-text'to='/mypantry'>My Pantry</Link> | {' '}
          <Link className='nav-text'to='/recipes'>Recipes</Link> | {' '}
          <Link className='nav-text'to='/login'>Log In</Link> | {' '}
          <Link className='nav-text'to='/signup'>Sign Up</Link>
        </nav>
      </div>
      {contents}
        <Route exact path='/' render={()=><About/>} />
        <Route exact path='/recipes' render={()=><Recipes addFilterElem={this.addFilterElem}recipes={this.state.recipes}/>} />
        <Route exact path='/login' render={(props)=><Login liftToken={this.liftTokenToState}{...props}/>} />
        <Route exact path='/signup' render={(props)=><SignUp liftToken={this.liftTokenToState}{...props}/>} />
      </div>
  </Router>
  );
  }
}

export default App;
