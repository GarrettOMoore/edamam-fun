import React, {Component} from 'react'
import axios from 'axios'

const Recipes = (props) => {
        let allRecipes = Array.from(props.recipes);
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
            <p>Recipes</p>
            {recipes}
            </div>
        )
    }



export default Recipes