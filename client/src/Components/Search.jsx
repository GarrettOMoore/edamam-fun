import React, {Component} from 'react'
import axios from 'axios'

class Search extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            hasData: false,
            name: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e){
        this.setState({
            name: e.target.value
        })
    }

    handleClick = (e) => {
        axios.get(`https://api.edamam.com/api/food-database/parser?ingr=${this.state.name}&app_id=08ac0881&app_key=809d26675d89b3440763df617e564ce0`).then((res)=>{
          this.setState({
            data: res.data,
            hasData: true
          })

        }).catch((err)=>{
          console.log(err)
        })
      }
    

    render() {
        let text;
        let imageLink;
        let nutrients = {};
        if (this.state.hasData === true) {
            imageLink = this.state.data.parsed[0].food.image
            text = this.state.name
            nutrients.fat = <p>Fat: {this.state.data.parsed[0].food.nutrients.FAT}</p>
            nutrients.fib = <p>Fiber: {this.state.data.parsed[0].food.nutrients.FIBTG}</p>
        } else {
            imageLink = 'http://placekitten.com/200/300'
        }
        return(
            <section className='search-box'>
            <h3>Search by ingredient: </h3>
            <input onChange={this.handleChange}name='name' type='text'/>
            <button onClick={this.handleClick}>Submit!</button> <br/>
            <img className='food-pic' width={'10%'} height={'5%'}src={imageLink}/>
            <p>{text}</p>
            <p>{nutrients.fat}</p>
            <p>{nutrients.fib}</p>
            </section>
        )
    }
}

export default Search