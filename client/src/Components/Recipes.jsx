import React, {Component} from 'react'

class Recipes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            recipes: {},
            didUpdate: false
        }
    }

    componentDidUpdate(prevProps){
        if (this.props.recipes !== prevProps.recipes) {
          this.setState({
            didUpdate: true
          })
        }
      }
      
    render() {
        let allRecipes = Array.from(this.props.recipes);
        let recipes;
        if (allRecipes.length > 0) {
            recipes = allRecipes.map((recipe, i) => {
                return(
                    <div key ={i} className='recipe-display-box'>
                      <p>{recipe.recipe.label}</p>
                      <img className='pantry-pic'width={'20%'} height={'10%'}src={recipe.recipe.image} alt={recipe.recipe.label}/><br/>
                      <a href={recipe.recipe.url}>Link to Recipe</a>
                    </div>
                )
            })
        } else {
            recipes = (
                <p>No Recipes Found.</p>
            )
        }
        return(
            <div className='diet-box'>
            <h1>Recipes</h1>
            {recipes}
            </div>
        )
    }
}



export default Recipes