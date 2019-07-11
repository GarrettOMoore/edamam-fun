import React from 'react'

const About = (props) => {
    return(
        <div className='main'>
        	<h1 className='page-header'>About</h1>
        	<div className='text-box'>
				<p className='about-text'>
					MERN stack App allowing users to create an account, and keep track of a digital pantry & recipe bank. You can add up to three ingredients to your recipe queue, and our API call will return multiple recipes with the given ingredients (with included dietary restriction filters). Keep track of your recipes by saving them to your account - where you can then rate and write about the ones you've made, while marking what you want to make soon. 
				</p>
        	</div>
        	<p className='footer-text'>Created by Garrett Moore 2019</p>
        </div>
    )
}

export default About