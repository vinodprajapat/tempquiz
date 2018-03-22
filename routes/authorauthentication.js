
var express = require('express');
var router = express.Router();
const authors = require('../models/author');
const jwt = require('jsonwebtoken');
const config = require('../config/database');


router.post('/login', function(req, res, next) {
 
  authors.findOne({username:req.body.username},function(err, author){
      if(err)
      {
        res.json({ success: false, message: err }); 
      }
      if( !author){
          res.json({sucess: false , message: " Username is not found " });
      }

      else if (req.body.password != author.password){
      
        res.json({sucess: false , message: " Password is Incorrect" });
      }
    else {

        const token = jwt.sign({ userId:author._id }, config.secret, { expiresIn: '24h' }); // Create a token for client
          res.json({
          success: true,
          message: 'Success Login !',
          token: token,
        user: {
        username: author.username
        }
    });
    }
     
  
  });
})

router.use((req, res, next) => {
  const token = req.headers['authorization']; // Create token found in headers
  // Check if token was found in headers
  if (!token) {
    res.json({ success: false, message: 'No token provided' }); // Return error
  } else {
    // Verify the token is valid
    jwt.verify(token, config.secret, (err, decoded) => {
      // Check if error is expired or invalid
      if (err) {
        res.json({ success: false, message: 'Token invalid: ' + err }); // Return error for token validation
      } else {
        req.decoded = decoded; // Create global variable to use in any request beyond
        next(); // Exit middleware
      }
    });
  }
});


router.get('/profile', (req, res) => {

  console.log("control in get profilr ");
  // Search for user in database
  authors.findOne({ _id: req.decoded.userId }).select('username email').exec((err, user) => {
    // Check if error connecting
    if (err) {
      res.json({ success: false, message: err }); // Return error
    } else {
      // Check if user was found in database
      if (!user) {
        res.json({ success: false, message: 'User not found' }); // Return error, user was not found in db
      } else {
        // console.log(author.username +"sdjdhvdgviugisd scgs"+ author.email);
        res.json({ success: true, user: user }); // Return success, send user object to frontend for profile
      }
    }
  });
});



module.exports=router;