const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", (req, res) => {
  axios
    .get(
      `https://api.edamam.com/api/food-database/parser?ingr=${req.body.name}&app_id=${process.env.FOOD_ID}&app_key=${process.env.FOOD_KEY}`,
      {}
    )
    .then(result => {
      console.log(result.data);
      res.json({ data: result.data });
    })
    .catch(err => {
      console.log(err);
      res.json({ err });
    });
});

module.exports = router;
