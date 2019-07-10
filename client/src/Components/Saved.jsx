import React, {Component} from 'react'
import Modal from './Modal'
import axios from 'axios'
import StarRatings from 'react-star-ratings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faCheckCircle)

class Saved extends Component {
    constructor(props) {
      super(props);
      this.changeRating = this.changeRating.bind(this);
      this.state = { 
          rating: 0,
          savedRecipes: {},
          showModal: {},
          hasMade: [],
          makeSoon: [],
          filter: 'all',
          buttonStyleA: {border: '2px solid transparent'},
          buttonStyleB: {border: '2px solid transparent'}
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
      }
      

    componentDidMount() {
        this.getSavedRecipes();
    }

    getSavedRecipes() {
      let userId = this.props.user._id;
      axios.get(`/recipes/save/${userId}`).then( res => {
        this.setState({
          savedRecipes: res.data,
        })
      })
    }

    openModal = (recipe) => {
        let divToUpdate = {};
        divToUpdate[recipe] = true;
        this.setState({
          showModal: Object.assign( {}, this.state.showModal, divToUpdate)
        });
      }
      
    closeModal = (recipe) => {
      let divToUpdate = {};
      divToUpdate[recipe] = false;
      this.setState({
        showModal: Object.assign({}, this.state.showModal, divToUpdate)
      })
      this.props.getSavedRecipes()
    }

    updateRecipeInfo = (recipe) => {
      console.log("in update recipe funccccccc for ", recipe, "with ", this.state.rating, " stars")
      axios.post(`/recipes/updatedetails/${recipe}`, {
        rating: this.state.rating
        // note: userNote
      })
      .then( this.closeModal(recipe) )
      .catch ((err) => console.log(err))
    }
    changeRating(rating) {
      this.setState({
        rating: rating
      })
    }

    deleteRecipe = (id) => {
      axios.get(`/recipes/delete/${id}`)
      .then( this.props.getSavedRecipes() )
      .catch ((err) => console.log(err))
    }

    showMadeClick = () => {
      console.log("MADE")
      this.setState({
        filter: 'made-recipes',
        buttonStyleA: {border: '2px solid white'},
        buttonStyleB: {border: '2px solid transparent'}
      })
      this.loadRecipes();
    }

    showMakeSoonClick = () => {
      console.log("MAKE SOON")
      this.setState({
        filter: 'make-soon',
        buttonStyleB: {border: '2px solid white'},
        buttonStyleA: {border: '2px solid transparent'}
      })
      this.loadRecipes();
    }

    loadRecipes = () => {
      this.state.savedRecipes.map((recipe)=>{
        if (recipe.hasMade && this.state.hasMade.indexOf(recipe) === -1) {
          this.state.hasMade.push(recipe)
        } else if (recipe.hasMade === false && this.state.makeSoon.indexOf(recipe) === -1) {
          this.state.makeSoon.push(recipe)
        }
      })
    }

    render(){
        let recipeDisplay;
        if (this.state.savedRecipes.length > 0) {
          if (this.state.filter === 'made-recipes') {
            recipeDisplay = this.state.hasMade.map((recipe, i) => {
              return(
                    
                <div key={i} className='saved-recipe-display-box'>
                  <img className='saved-recipe-pic'src={recipe.image}alt={recipe.name}></img>
                  <a href={recipe.link}>
                    <p className='saved-recipe-name'>{recipe.name}</p>
                  </a>
                  <StarRatings
                  rating={recipe.rating}
                  starRatedColor="red"
                  numberOfStars={5}
                  name='rating'
                  starDimension="40px"
                  starSpacing="15px"
                  />
                  <p className='recipe-note'><span className='quote'>"</span>It was good! A little salty - but a nice well rounded meal. Easy to make, would make again!<span className='quote'>"</span></p>
                  <button className='remove-recipe'onClick={()=>this.deleteRecipe(recipe._id)}>Remove</button>
                </div>
               
            )
            })
          } else if (this.state.filter === 'make-soon') {
            recipeDisplay = this.state.makeSoon.map((recipe, i) => {
                return(
                    
                  <div key={i} className='saved-recipe-display-box'>
                    <img className='saved-recipe-pic'src={recipe.image}alt={recipe.name}></img>
                    <a href={recipe.link}>
                        <p className='saved-recipe-name'>{recipe.name}</p>
                    </a>
                    <button className='modal-opener'onClick={()=> this.openModal(recipe._id)}>I made this!</button>
                    <button className='remove-recipe'onClick={()=>this.deleteRecipe(recipe._id)}>Remove</button>
                    <Modal
                        changeRating={this.changeRating}
                        rating={this.state.rating}
                        show={this.state.showModal[recipe._id]}
                        closeCallback={()=> this.closeModal(recipe._id)}
                        thisId={recipe._id}
                        customClass="custom_modal_class"
                        updateRecipeInfo={this.updateRecipeInfo}
                    > 
                    </Modal>
                  </div>
              )
            })
          } else {
            recipeDisplay = this.state.savedRecipes.map((recipe, i) => {
              if (recipe.hasMade) {
                return(
                  <div key={i} className='saved-recipe-display-box'>
                    <img className='saved-recipe-pic'src={recipe.image}alt={recipe.name}></img>
                    <a href={recipe.link}>
                        <p className='saved-recipe-name'>{recipe.name}</p>
                    </a>
                    <button style={this.state.buttonStyleA}className='modal-opener'onClick={()=> this.openModal(recipe._id)}><FontAwesomeIcon icon={faCheckCircle} />{' '}Made!</button>
                    <button className='remove-recipe'onClick={()=>this.deleteRecipe(recipe._id)}>Remove</button>
                    <Modal
                        changeRating={this.changeRating}
                        rating={this.state.rating}
                        show={this.state.showModal[recipe._id]}
                        closeCallback={()=> this.closeModal(recipe._id)}
                        thisId={recipe._id}
                        customClass="custom_modal_class"
                        updateRecipeInfo={this.updateRecipeInfo}
                    > 
                    </Modal>
                  </div>
                 
              )
              } else {
                return(
                  <div key={i} className='saved-recipe-display-box'>
                    <img className='saved-recipe-pic'src={recipe.image}alt={recipe.name}></img>
                    <a href={recipe.link}>
                        <p className='saved-recipe-name'>{recipe.name}</p>
                    </a>
                    <button className='modal-opener'onClick={()=> this.openModal(recipe._id)}>I made this!</button>
                    <button className='remove-recipe'onClick={()=>this.deleteRecipe(recipe._id)}>Remove</button>
                    <Modal
                        changeRating={this.changeRating}
                        rating={this.state.rating}
                        show={this.state.showModal[recipe._id]}
                        closeCallback={()=> this.closeModal(recipe._id)}
                        thisId={recipe._id}
                        customClass="custom_modal_class"
                        updateRecipeInfo={this.updateRecipeInfo}
                    > 
                    </Modal>
                  </div>
              )}
            })
          }
        }
        return(
          <div className='main'>
            <nav className='sub-nav'>
              <button style={this.state.buttonStyleA}onClick={this.showMadeClick}>Made</button>
              <button style={this.state.buttonStyleB}onClick={this.showMakeSoonClick}>Make Soon</button>
            </nav>
            <div className='saved-body'>
             {recipeDisplay} 
            </div>
         </div>
        )
    }
}

export default Saved