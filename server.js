require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const expressJWT = require('express-jwt');
const RateLimit = require('express-rate-limit');
const helmet = require('helmet');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(helmet());
app.use('/pantry', require('./routes/pantry'));
app.use('/recipes', require('./routes/recipes'));

//Rate Limiting
const loginLimiter = new RateLimit ({
	windowMs: 5*60*1000, // Five minutes.
	max: 3,
	delayMs: 0, // Disables
	message: 'Maximum Login Attempts Exceeded.'
})

const signupLimiter = new RateLimit ({
	windowMs: 60*60*1000, // One hour.
	max: 3,
	delayMs: 0, // Disables
	message: 'Maximum accounts created. Please try again later.'
})

mongoose.connect('mongodb://localhost/edamam-fun', {useNewUrlParser: true});
const db = mongoose.connection;

db.once('open', () => {
	console.log(`Connected to MONGO on ${db.host}: ${db.port}`)
})

db.on('error', (error) => {
	console.log(`Database Error:\n ${error}`)
})

app.use('/auth/login', loginLimiter);
app.use('/auth/signup', signupLimiter);

app.use('/auth', require('./routes/auth'));
app.use('/locked',
  expressJWT({secret: process.env.JWT_SECRET})
		.unless({method: 'POST'}), 
		  require('./routes/locked'));

app.listen(process.env.PORT, () => {
	console.log(` 💰🎃💰 You are spinning on Port ${process.env.PORT} 💰🎃💰`)
});
