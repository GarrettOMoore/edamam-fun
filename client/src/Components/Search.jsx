import React, {Component} from 'react'
import axios from 'axios'

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            hasData: false,
            name: '',
            quantity: null,
            image: ''
        }
        this.handleQuantityChange = this.handleQuantityChange.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleNameChange(e){
        this.setState({
            name: e.target.value
        })
    }

    handleQuantityChange(e){
        this.setState({
            quantity: e.target.value
        })
    }

    handleClick = (e) => {
        axios.post('/ingredients', {
            name: this.state.name
        }).then((res) => {
            this.setState({
                data: res.data.data,
                name: res.data.text,
                hasData: true,
                image: res.data.data.parsed[0].food.image
              })
        }).catch((err)=>{
          console.log("ERROR: ", err)
        })
      }
    
      handleSubmit(e)  {
          console.log("IN SUBMIT")
        e.preventDefault();
        axios.post('/pantry', {
            id: this.props.user,
            name: this.state.name,
            quantity: this.state.quantity,
            image: this.state.image
        }).then( res => {
          if (res.data.type === 'error') {
              console.log("ERROR")
          } 
        }).catch( err => {
            console.log(err)
        })
      }

    render() {
        let img;
        let text;
        let imageLink;
        if (this.state.hasData === true) {
            imageLink = this.state.data.parsed[0].food.image
            img = (
                <>
                  <img className='food-pic' width={'10%'} height={'5%'}src={imageLink} alt='Searched for Food Item'/> <br/>
                  <section className='add-box'>
                    <button onClick={this.handleSubmit}>Add to Pantry</button>
                  </section>
                </>
            )
            text = (
                <p>{this.state.data.parsed[0].food.text}</p>
            )
        } else {
            img = (
                <p>Not Found</p>
            )
        }
        return(
            <section className='search-box'>
            <h3>Search by ingredient: </h3>
            <input onChange={this.handleNameChange}name='name' type='text'/>
            <button onClick={this.handleClick}>Submit!</button> <br/>
            {img}
            {text}
            </section>
        )
    }
}

export default Search