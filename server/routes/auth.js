const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const authController = require('../controllers/authController');

router.get('/insert', function(req, res){
        var user = new User({
            firstName: "Meg", 
                lastName: 123,
                email: "megen.s.mckinney@gmail.com",
                password: "abc123",
                active: true,
                created: Date.Now
        });
        
        user.save(function (err) {
          if (err) {
        		console.log(err);
          }
          else {
          	console.log("user saved");
          	res.send(true);
          }
        });
})

router.post('/login', passport.authenticate('local',  { successRedirect: '/auth/loggedin', failureRedirect: '/auth/login_error' }));
// router.post('/login', passport.authenticate('local'), function(req, res){
//     console.log(req.user);
//     res.send(true);
// });

router.get('/loggedin', authController.loggedIn)

router.get('/login_error', authController.loginError)

router.get('/isLoggedIn', authController.isLoggedIn)

router.post('/register', authController.register)

router.post('/logout', authController.logOut)

module.exports = router;