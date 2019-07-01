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
                        <a href={recipe.recipe.url}>
                            <p className='recipe-name'>{recipe.recipe.label}</p>
                        </a>
                        <img className='recipe-pic'width={'15%'} height={'15%'}src={recipe.recipe.image} alt={recipe.recipe.label}/><br/>
                        <button onClick={()=>this.props.saveRecipe(recipe.recipe)}className='add-to-fav'>Add to Favorites</button>
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
                <h1 className='page-header'>Recipes</h1>
                <div className='filter-box'>
                    <h2>Filter:</h2><br/>
                    <section className='left-filter-box'>
                        <input onClick={(e)=>this.props.updateRecipes(e.target.value)}id='vegetarian'type='checkbox'value='vegetarian'/>Vegetarian<br/>
                        <input onClick={(e)=>this.props.updateRecipes(e.target.value)}id='vegan'type='checkbox'value='vegan'/>Vegan<br/>
                        {/* <input onClick={(e)=>this.props.updateRecipes(e.target.value)}id='pescatarian'type='checkbox'value='pescatarian'/>Pescatarian<br/> */}
                        {/* <input onClick={(e)=>this.props.updateRecipes(e.target.value)}id='keto'type='checkbox'value='keto'/>Keto<br/> */}
                    </section>
                    <section className='right-filter-box'>
                        <input onClick={(e)=>this.props.updateRecipes(e.target.value)}id='low-fat'type='checkbox'value='lowfat'/>Low Fat<br/>
                        {/* <input onClick={(e)=>this.props.updateRecipes(e.target.value)}id='gluten-free'type='checkbox'value='glutenfree'/>Gluten Free<br/> */}
                        {/* <input onClick={(e)=>this.props.updateRecipes(e.target.value)}id='nut-free'type='checkbox'value='nutfree'/>Nut Free<br/> */}
                        {/* <input onClick={(e)=>this.props.updateRecipes(e.target.value)}id='dairy-free'type='checkbox'value='dairyfree'/>Dairy Free<br/> */}
                        <input onClick={(e)=>this.props.updateRecipes(e.target.value)}id='low-carb'type='checkbox'value='lowcarb'/>Low Carb<br/>
                        {/* <input onClick={(e)=>this.props.updateRecipes(e.target.value)}id='paleo'type='checkbox'value='paleo'/>Paleo<br/> */}
                    </section>
                </div>
            {recipes}
            </div>
        )
    }
}



export default Recipes