import React from 'react'

const Recipes = (props) => {
        let allRecipes = Array.from(props.recipes);
        console.log(allRecipes)
        let recipes = allRecipes.map((recipe, i) => {
            return(
                <div key ={i} className='recipe-display-box'>
                  <p>{recipe.recipe.label}</p>
                  <img className='pantry-pic'width={'20%'} height={'10%'}src={recipe.recipe.image} alt={recipe.recipe.label}/><br/>
                  <a href={recipe.recipe.url}>Link to Recipe</a>
                </div>
            )
        })
        return(
            <div className='diet-box'>
            <h1>Recipes</h1>
            {recipes}
            </div>
        )
    }



export default Recipes