import React from 'react';
import About from './Components/About'
import Search from './Components/Search'
import Pantry from './Components/Pantry'
import './App.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Logo from './Images/truss_test.jpeg'

function App() {
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
        {/* <Route exact path='/login' render={(props)=><Login liftToken={this.liftTokenToState}{...props}/>} /> */}
        {/* <Route exact path='/signup' render={(props)=><SignUp liftToken={this.liftTokenToState}{...props}/>} /> */}
      </div>
  </Router>
  );
}

export default App;
