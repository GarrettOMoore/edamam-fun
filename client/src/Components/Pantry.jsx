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
            <>
            <img className='food-pic' width={'10%'} height={'5%'}src={item.image} alt={item.name}/> 
            <p>{item.name} x{item.quantity}</p>
            </>
        )
    })

        return(
            <>
            <p className='username'>Hello, {this.props.user.name}! </p>
            <p className='logout'>Not you?  <a href='/login'onClick={this.props.logout}>Log out!</a></p>
            <p>{this.state.data.name}</p>
            {pantryItems}
            </>
        )
    }
}

export default Pantry