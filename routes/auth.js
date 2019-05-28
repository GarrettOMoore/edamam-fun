const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Route for signup
router.post('/signup', (req, res) => {
	// See if the email is already in the database.
	User.findOne({email: req.body.email}, (err, user) => {
		// If yes - Return an error.
		if (user) {
			res.json({type: 'error', message: 'Email already exists!'})
		} else {
			// If no - Create the user in the database.
			let user = new User ({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
				city: req.body.city,
				state: req.body.state
			})
			 user.save( (err, user) => {
				if (err) {
					res.json({type: 'error', message: 'Database Error creating User.'})
				} else {
					// Sign a token. <-- Login step.
					var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
						expiresIn: "1d"
					});
					// Return the token.
					res.status(200).json({type: 'success', user: user.toObject(), token});
				}
			})
		}
	}) 
})

// Route for login
router.post('/login', (req, res) => {
	// Find user in database.
	User.findOne({
		email: req.body.email
	}, (err, user) => {
  	// If no user - Return error.
		if (!user) {
			res.json({type: 'error', message: 'Account not found'})
	} else {
			// If user - Check authentication.
			if ( user.authenticated(req.body.password) )	{
				// If authenticated - Sign in token. <-- Login step.
				var token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
					expiresIn: "1d"
				});
				// Return the token.
				res.json({type: 'success', user: user.toObject(), token})
			} else {
				res.status(401).json({type: 'error', message: 'Authentication failure' })
			}
	  }
  })
})

// Route for Token Validation
router.post('/me/from/token', (req, res) => {
	// Make sure they sent us a token to check.
	let token = req.body.token;
	// If no token - Return error.
	if (!token) {
		res.json({type: 'error', message: 'You must pass a valid token.'});
	} else {
  // If token - Verify it.
		jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
	// If invalid - Return error.
			if (err) {
				res.json({type: 'error', message: 'Invalid token. Please log in again.'})
			} else {
	// If token is valid 
		// Look up user in the database.
		User.findById(user._id, (err, user) => {
			if (err) {
		// If user doesn't exist - Return error.
				res.json({type: 'error', message: 'Error during authentication.'})
			} else {
		// If user exists - Send user and token back to React.
				res.json({type: 'success', user: user.toObject(), token})
			}
		})
			}
		})
	}



	// If user exists - Send user and token back to React.
})

module.exports = router;