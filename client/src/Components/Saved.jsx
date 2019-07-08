import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Made from './Made'
import MakeSoon from './MakeSoon'
import Modal from './Modal'
import axios from 'axios'

class Saved extends Component {
    constructor(props) {
      super(props);
      this.changeRating = this.changeRating.bind(this);
      this.state = { 
          rating: 0,
          saved: {},
          showModal: {}
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

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
      }
      
      changeRating(rating) {
        this.setState({
          rating: rating
        })
      }
      
    componentDidMount() {
        this.props.getSavedRecipes();
        this.setState({
            saved: this.props.savedRecipes
        })
    }

    deleteRecipe = (id) => {
      axios.get(`/recipes/delete/${id}`)
      .then( this.props.getSavedRecipes() )
      .catch ((err) => console.log(err))
    }

    render(){
        let allSaved;
        if (this.props.savedRecipes.length > 0) {
            allSaved = this.props.savedRecipes.map((recipe, i) => {
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
                        > 
                        </Modal>
                    </div>
                   
                )
            })
        }
        return(
          <Router>
            <nav className='sub-nav'>
              <Link className='sub-nav-text'to='/made'>Made</Link> | {' '}
              <Link className='sub-nav-text'to='/makesoon'>Make Soon</Link> | {' '}
            </nav>
            <div className='saved-body'>
             {allSaved} 
            </div>
            <Route exact path ='/made' render={()=><Made />}/>
            <Route exact path ='/makesoon' render={()=><MakeSoon />}/>
          </Router>
        )
    }
}

export default Saved