import React, {Component} from 'react'

class Pantry extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: ''
        }
    }

    render() {
        return(
            <>
            <p>PANTRY STUFF HERE....</p>
            <p className='username'>Hello, {this.props.user.name}! </p>
            <p className='logout'>Not you?  <a href='/login'onClick={this.props.logout}>Log out!</a></p>
            </>
        )
    }
}

export default Pantry