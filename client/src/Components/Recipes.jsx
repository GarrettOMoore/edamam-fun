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
                data: res.data.data.hits
            })
        })
        .catch((err) => console.log(err))
    }

    render() {
        let allRecipes = Array.from(this.state.data);
        let recipes = allRecipes.map((recipe, index) => {
            return(
                <>
                <p>{recipe.recipe.label}</p>
                <img className='pantry-pic'width={'20%'} height={'10%'}src={recipe.recipe.image} alt={recipe.recipe.label}/><br/>
                <a href={recipe.recipe.url}>Link</a>
                </>
            )
        })
        return(
            <div className='diet-box'>
            <p>RECIPE PAGE...</p>
            {/* <form>
                <input type="radio" name="vegetarian" value="vegetarian"/><p>Vegetarian</p>
            </form> */}
            {recipes}
            </div>
        )
    }
}

export default Recipes