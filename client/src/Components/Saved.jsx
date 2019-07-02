import React, {Component} from 'react'
import StarRatings from 'react-star-ratings';

class Saved extends Component {
    // constructor(props) {
    // super(props)
      changeRating(newRating, name) {
        this.state = {
            saved: {},
            rating: newRating
        }
      }
    // }

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
                            <StarRatings
                              rating={this.state.rating}
                              starRatedColor="blue"
                              changeRating={this.changeRating}
                              numberOfStars={5}
                              name='rating'
                            />
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