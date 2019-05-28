const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
	res.send("💰🎃💰YOU HAVE ACCESSED THE PROTECTED ROUTE💰🎃💰")
})

module.exports = router;
