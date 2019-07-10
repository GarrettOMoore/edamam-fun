import React, {Component} from 'react'
import axios from 'axios'
import {BrowserRouter as Route, Link} from 'react-router-dom'
import Recipes from './Recipes'

class Pantry extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            didDelete: false,
            queue: [],
            // queryString: ''
        }
        this.deleteItem = this.deleteItem.bind(this)
        this.resetQueue = this.resetQueue.bind(this)
    }

    componentDidUpdate(prevProps) {
      if (this.props.pantryData !== prevProps.pantryData) {
        this.setState({
          data: this.props.pantryData
        })
      }
    }

    componentDidMount(){
      this.props.getPantryItems()
      this.setState({
        data: this.props.pantryData
      })
    }

    deleteItem = (id) => {
      axios.get(`/pantry/delete/${id}`)
      .then( this.props.getPantryItems() )
      .catch ((err) => console.log(err))
    }

    addToQueue(name){
      if (this.state.queue.length < 3 && this.state.queue.indexOf(name) === -1) {
        let newQueue = this.state.queue;
        newQueue.push(name);
        this.setState({
          queue: newQueue
        })
      }
    }

    resetQueue(){
      this.setState({
        queue: []
      })
    }

    removeItemFromQueue(name){
      let index = this.state.queue.indexOf(name);
      this.state.queue.splice(index, 1);
      this.setState({
        queue: this.state.queue
      })
    }


    render() {
    let queueItems;
    if (this.state.queue.length > 0) {
     queueItems = this.state.queue.map((name, i) => {
      return(
        <div key={i} className='queue-box'>
          <ol>
            <li className='queue-item'>{name}</li>
            <button onClick={()=>{this.removeItemFromQueue(name)}}className='remove-frm-queue'>Remove</button>
          </ol>
        </div>
      )
    })
  } else {
    queueItems = (
      <p>Add up to three ingredients.</p>
    )
  }
  let pantryItems;
  
  if (this.state.data.length > 0) {
    let allItems = Array.from(this.state.data)
    pantryItems = allItems.map((item, index) => {
        return (
            <div key={index} className='pantry-item'>
              <img className='pantry-pic' width={'40%'} height={'30%'}src={item.image} alt={item.name}/> 
              <h3 className='pantry-item-name'>{item.name}</h3>
              <button className='pantry-btns'onClick={()=>{this.deleteItem(item._id)}}>Delete</button>
              <button className='pantry-btns'onClick={()=>{this.addToQueue(item.name)}}>Add to Recipe Queue</button>
            </div>
        )
    })
  } else {
    pantryItems = (
      <p>Your Pantry is empty! </p>
    )
  }

        return(
            <>
              <p className='username'>Hello, {this.props.user.name}! </p>
              <p className='logout'>Not you?  <a className='logout'href='/login'onClick={this.props.logout}>Log out!</a></p>
              <h1 className='page-header'>My Pantry</h1>
              <div className='recipe-box'>
                <h3 className='queue-header'>Recipe Queue: {this.state.queue.length}</h3>
                {queueItems}
                <div className='queue-btn-box'>
                  <button className='queue-btn-box-btn'onClick={()=>{this.resetQueue()}}>Empty Queue</button>
                  <Link className='queue-btn-box-btn'to='/recipes'onClick={()=>{this.props.submitRecipe(this.state.queue)}}>Find Recipes</Link>
                </div>
              </div>
              {pantryItems}
              <Route path='/recipes'render={()=><Recipes/>}/>
            </>
        )
    }
}

export default Pantry