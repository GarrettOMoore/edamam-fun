import React, {Component} from 'react'
import axios from 'axios'

class Recipes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            vegetarian: false,
            vegan: false
        }
    }

    componentDidMount(){
        axios.get('/recipes').then((res) => {
            this.setState({
                data: res.data
            })
        })
        .catch((err) => console.log(err))
    }

    render() {
        return(
            <div className='diet-box'>
            <p>RECIPE PAGE...</p>
            {/* <form>
                <input type="radio" name="vegetarian" value="vegetarian"/><p>Vegetarian</p>
            </form> */}
            </div>
        )
    }
}

export default Recipes