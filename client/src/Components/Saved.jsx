import React, {Component} from 'react'

class Saved extends Component {
    constructor(props) {
    super(props)
        this.state = {
            saved: {}
        }
    }

    componentDidMount() {
        this.props.getSavedRecipes();
        this.setState({
            saved: this.props.savedRecipes
        })
    }

    render(){
        let allSaved;
        if (this.props.savedRecipes.length > 0) {
            allSaved = this.props.savedRecipes.map((recipe, i) => {
                return(
                    
                    <div key={i} className='recipe-display-box'>
                        <img className='recipe-pic'src={recipe.image}alt={recipe.name}></img>
                        <a href={recipe.link}>
                            <p className='recipe-name'>{recipe.name}</p>
                        </a>
                    </div>
                   
                )
            })
        }
        return(
            <div className='saved-body'>
             {allSaved} 
            </div>
        )
    }
}

export default Saved