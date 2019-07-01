import React, {Component} from 'react'

class Saved extends Component {
    constructor(props) {
    super(props)
        this.state = {
            saved: {}
        }
    }

    render(){
        let allSaved = this.props.savedRecipes.map((i, recipe) => {
            return(
                <>
                <p>{recipe.name}</p>
                </>
            )
        })
        return(
            <>
             {allSaved} 
            </>
        )
    }
}

export default Saved