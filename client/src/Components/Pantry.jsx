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
            <h3>{item.name} x{item.quantity}</h3>
            </div>
        )
    })

        return(
            <>
            <p className='username'>Hello, {this.props.user.name}! </p>
            <p className='logout'>Not you?  <a href='/login'onClick={this.props.logout}>Log out!</a></p>
            <h2>My Pantry</h2>
            {pantryItems}
            </>
        )
    }
}

export default Pantry