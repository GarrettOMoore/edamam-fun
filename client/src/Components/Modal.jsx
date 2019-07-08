import React from 'react'
import StarRatings from 'react-star-ratings';

const Modal = ({ children, customClass, show, closeCallback, thisId, ...props }) => {
    return(
        <div className='modal' style={{display: show ? 'block' : 'none'}}>
            <div className='overlay' onClick={closeCallback}></div>
            <div className='modal-content'>
                <p>How was it?</p>
                <StarRatings
                    rating={props.rating}
                    starRatedColor="red"
                    changeRating={props.changeRating}
                    numberOfStars={5}
                    name='rating'
                    starDimension="40px"
                    starSpacing="15px"
                /> <br />
                <p>Tell us about it:</p>
                <textarea name="message" rows="6" cols="40"/>
                <section className='modal-btn-box'>
                  <button>Submit</button>
                  <button title='Close' className='close-modal' onClick={closeCallback}>Close</button>
                </section>
            </div>
        </div>
    )
}

Modal.defaultProps = {
    children: <div>Empty Modal</div>,
    customClass: '',
    show: false,
    closeCallback: () => (false)
  };

export default Modal