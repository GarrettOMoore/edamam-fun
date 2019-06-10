import React, {Component} from 'react'
import axios from 'axios'

class Pantry extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            didDelete: false,
            queue: []
        }
        this.getItems = this.getItems.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
    }

    getItems = () => {
        let user = Object.assign({},this.props.user)
        axios.get(`/pantry/${user._id}`).then( res => {
          this.setState({
            data: res.data,
          })
        })
    }

     componentDidMount() {
        this.getItems()
      }

      deleteItem = (id) => {
        axios.get(`/pantry/delete/${id}`)
        .then( this.getItems() )
        .catch ((err) => console.log(err))
      }

      addToQueue(name){
        // let noSpace = name.replace(/\s/g, '');
        let newQueue = this.state.queue;
        newQueue.push(name);
        this.setState({
          queue: newQueue
        })
      }

    render() {
    let queueItems = this.state.queue.map((name) => {
      return(
        <div className='queue-box'>
          <ol>
            <li className='queue-item'>{name}</li>
            <button className='remove-frm-queue'>Remove</button>
          </ol>
        </div>
      )
    })

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
                <h3>Recipe Queue:</h3>
                {queueItems}
                <button>Find Recipes</button>
              </div>
              {pantryItems}
            </>
        )
    }
}

export default Pantry