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
          showModal: false
        };
      }
    
      toggleModal = () => {
        this.setState({
          showModal: !this.state.showModal
        });
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
                        <button className='modal-opener'onClick={this.toggleModal}>I made this!</button>
                        <button className='remove-recipe'onClick={()=>this.deleteRecipe(recipe._id)}>Remove</button>
                        <Modal
                            changeRating={this.changeRating}
                            rating={this.state.rating}
                            show={this.state.showModal}
                            closeCallback={this.toggleModal}
                            customClass="custom_modal_class"
                        > 
                        <>
                            <h2>Told Ya!</h2>
                            <iframe title="giphy" src="https://giphy.com/embed/l52CGyJ4LZPa0" width="480" height="273" frameBorder="0" className="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/sandler-sentences-sounding-l52CGyJ4LZPa0">via GIPHY</a></p>
                        </>
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