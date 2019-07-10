const express = require('express');
const router = express.Router();
const axios = require('axios');
const Recipe = require('../models/recipes')

router.post('/', (req,res) => {
	axios.get(`https://api.edamam.com/search?q=${req.body.query}&app_id=${process.env.RECIPE_ID}&app_key=${process.env.RECIPE_KEY}&from=0&to=30`, {
  }).then((result)=> {
		console.log(result.data)
      res.json({data: result.data})
}).catch((err)=> {
	console.log(err)
  res.json({err})
 })
})

router.post('/update', (req,res) => {
	console.log(req.body.filter)
	axios.get(`https://api.edamam.com/search?q=${req.body.query}&app_id=${process.env.RECIPE_ID}&app_key=${process.env.RECIPE_KEY}&from=0&to=30&health=${req.body.filter}`, {
  }).then((result)=> {
		// console.log("FILTEREEEDDD: ", result.data)
      res.json({data: result.data})
}).catch((err)=> {
	console.log("ERRRRROOOORRRRR: ", err)
  res.json({err})
 })
})

router.post('/save', (req, res) => {
	Recipe.findOne({label: req.body.name}, (err, recipe) => {
		if (recipe) {
			res.json({type: 'error', message: 'Recipe already exists in database!'})
		} else {
			let recipe = new Recipe ({
				recipeId: req.body.recipeId,
				id: req.body.id,
				name: req.body.name,
				link: req.body.link,
				image: req.body.image,
				rating: 0,
				note: '',
				hasMade: false
			})
			 recipe.save( (err, recipe) => {
				if (err) {
					res.json({type: 'error', message: 'Database Error saving Recipe.'})
				} else {
					res.json(recipe)
				}
			})
		}
	}) 
})

router.get('/save/:id', (req, res) => {
	Recipe.find({user: req.params.userId}, (err, items) => {
			if (!err) {
				res.status(200).json(items)
			} else {
				res.status(500).json({err})
			}
		});
	});

router.get('/delete/:id', (req, res) => {
		Recipe.deleteOne({_id: req.params.id}, (err) => {})
})

router.post('/updatedetails/:id', (req, res) => {
	console.log("RATING: ", req.body.rating)
	const recipe = {
		rating: req.body.rating,
		note: req.body.note,
		hasMade: true
	}
	Recipe.findOneAndUpdate({_id: req.params.id}, recipe, (err) => { 
		if (err) {
			console.log(err)
		} else {
			console.log(res)
		}
	})
})


module.exports = router;