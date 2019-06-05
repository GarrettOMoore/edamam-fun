import React, {Component} from 'react'
import axios from 'axios'

class Pantry extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {}
        }
    }

     componentDidMount() {
        let user = Object.assign({},this.props.user)
        axios.get(`/pantry/${user._id}`).then( res => {
          this.setState({
            data: res.data,
          })
        })
      }

    render() {
    let allItems = Array.from(this.state.data)
    let pantryItems = allItems.map((item) => {
        return (
            <div className='pantry-item'>
            <img className='pantry-pic' width={'40%'} height={'30%'}src={item.image} alt={item.name}/> 
            <h3 className='pantry-item-name'>{item.name}</h3>
            <p>Quantity: {item.quantity}</p>
            <button>Edit</button> 
            <button>Delete</button>
            </div>
        )
    })

        return(
            <>
            <p className='username'>Hello, {this.props.user.name}! </p>
            <p className='logout'>Not you?  <a className='logout'href='/login'onClick={this.props.logout}>Log out!</a></p>
            <h1>My Pantry</h1>
            {pantryItems}
            </>
        )
    }
}

export default Pantry