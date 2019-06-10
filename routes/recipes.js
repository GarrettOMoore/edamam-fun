const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', (req,res) => {
	axios.get(`https://api.edamam.com/search?q=shallot?salmon?avocado&app_id=${process.env.RECIPE_ID}&app_key=${process.env.RECIPE_KEY}`, {
  }).then((result)=> {
		console.log(result.data)
      res.json({data: result.data})
}).catch((err)=> {
	console.log(err)
  res.json({err})
 })
})


module.exports = router;