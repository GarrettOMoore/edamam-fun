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
        axios.get(`https://api.edamam.com/api/food-database/parser?ingr=${this.state.name}&app_id=08ac0881&app_key=809d26675d89b3440763df617e564ce0`).then((res)=>{
          this.setState({
            data: res.data,
            hasData: true,
            image: res.data.parsed[0].food.image
          })

        }).catch((err)=>{
          console.log(err)
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
          } else {
            this.props.history.push('/mypantry')
          }
        }).catch( err => {
            console.log(err)
        })
      }

    render() {
        let img;
        let text;
        let imageLink;
        let nutrients = {};
        if (this.state.hasData === true) {
            imageLink = this.state.data.parsed[0].food.image
            img = (
                <>
                <img className='food-pic' width={'10%'} height={'5%'}src={imageLink} alt='Searched for Food Item'/> <br/>
                <section className='add-box'>
                <select onChange={this.handleQuantityChange}>Quantity: 
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                </select>
                <button onClick={this.handleSubmit}>Add to Pantry</button>
                </section>
                </>
            )
            text = this.state.name
            nutrients.fat = `Fat: ${this.state.data.parsed[0].food.nutrients.FAT}`
            nutrients.fib = `Fiber: ${this.state.data.parsed[0].food.nutrients.FIBTG}`
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
            <p>{text}</p>
            <p>{nutrients.fat}</p>
            <p>{nutrients.fib}</p>
            </section>
        )
    }
}

export default Search