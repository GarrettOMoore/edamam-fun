import React, {Component} from 'react'
import axios from 'axios'

class Pantry extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.pantryData,
            didDelete: false,
            queue: [],
            // queryString: ''
        }
        this.deleteItem = this.deleteItem.bind(this)
        this.resetQueue = this.resetQueue.bind(this)
    }

    componentWillReceiveProps(nextProps) {
      // this.setState({ data: nextProps.data });  
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
        this.state.queue.splice(index, 1)
        this.setState({
          queue: this.state.queue
        })
        this.handleRecipeSubmit();
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

    let allItems = Array.from(this.state.data)
    let pantryItems = allItems.map((item, index) => {
        return (
            <div key={index} className='pantry-item'>
              <img className='pantry-pic' width={'40%'} height={'30%'}src={item.image} alt={item.name}/> 
              <h3 className='pantry-item-name'>{item.name}</h3>
              <button onClick={()=>{this.deleteItem(item._id)}}>Delete</button>
              <button onClick={()=>{this.addToQueue(item.name)}}>Add to Recipe Queue</button>
            </div>
        )
    })

        return(
            <>
              <p className='username'>Hello, {this.props.user.name}! </p>
              <p className='logout'>Not you?  <a className='logout'href='/login'onClick={this.props.logout}>Log out!</a></p>
              <h1>My Pantry</h1>
              <div className='recipe-box'>
                <h3 className='queue-header'>Recipe Queue: {this.state.queue.length}</h3>
                {queueItems}
                <section className='queue-btn-box'>
                  <button onClick={()=>{this.resetQueue()}}>Empty Queue</button>
                  <button onClick={()=>{this.props.submitRecipe(this.state.queue)}}>Find Recipes</button>
                </section>
              </div>
              {pantryItems}
            </>
        )
    }
}

export default Pantry