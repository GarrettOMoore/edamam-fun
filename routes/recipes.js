const express = require('express');
const router = express.Router();
const axios = require('axios');

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


module.exports = router;