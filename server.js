require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const expressJWT = require('express-jwt');
const RateLimit = require('express-rate-limit');
const helmet = require('helmet');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

const app = express();

app.use(express.static(__dirname + '/client/build'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(helmet());

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'Crema',
  allowedFormats: ['jpg', 'png'],
  transformation: [{ width: 200, height: 200, crop: 'limit' }]
});

const parser = multer({ storage: storage });


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

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
	console.log(`Connected to MONGO on ${db.host}: ${db.port}`)
})

db.on('error', (error) => {
	console.log(`Database Error:\n ${error}`)
})

app.get('/UpdateProfile', (req, res) => {
  db.user
    .findOne({
      where: { userId: req.user.id }
    })
    .then(function(photo) {
      if (photo) {
        res.json({ photo: photo.link });
      } else {
        res.json({ photo: null });
      }
    });
});

app.post('/UpdateProfile', parser.single('myFile'), (req, res) => {
  const image = {};
  image.url = req.file.url;
  image.id = req.file.public_id;

  // Update user model with image url
  User.findByIdAndUpdate(
    req.body.userId,
    {
      $set: { image: req.file.secure_url }
    },
    { new: true },
    (err, user) => {
      if (err) console.log('ERROR: =====> ', err);
      //Save to DB
      user.save((err, user) => {
       res.redirect('/dashboard')
      });
    }
  ).catch((err) => console.log(err));
});

app.post('/UpdateProfileInfo', (req, res) => {
  User.findByIdAndUpdate(
    req.body.userId,
    {
      $set: { 
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip
       }
    },
    { new: true },
    (err, user) => {
      if (err) console.log('ERROR: =====> ', err);
      //Save to DB
      user.save((err, user) => {
      if(err) console.log('ERROR: =====>' , err);
       res.redirect('/dashboard/profile')
      });
    }
  ).catch((err) => console.log(err));
});


app.use('/auth/login', loginLimiter);
app.use('/auth/signup', signupLimiter);

app.use('/auth', require('./routes/auth'));
app.use('/locked',
  expressJWT({secret: process.env.JWT_SECRET})
		.unless({method: 'POST'}), 
		  require('./routes/locked'));


app.get('*', function(req, res) 
{res.sendFile(__dirname + '/crema-fe/build/index.html')
});

app.listen(process.env.PORT, () => {
	console.log(` 💰🎃💰 You are spinning on Port ${process.env.PORT} 💰🎃💰`)
});

