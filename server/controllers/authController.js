const User = require('../models/User');

exports.loggedIn = function(req, res){
    res.send(true);
};

exports.loginError = function(req, res){
    res.send('false');
};

exports.isLoggedIn = function(req, res){
    if(req.user){
        res.send(true);
    } else {
        res.send(false);
    }
}

exports.register = function(req, res){
    const user = req.body;
    if(user.email){
        User.findOne({ email : user.email }, function(err, result){
            if(err) throw err;
            if(result === null){
                //create new user
                const newUser = new User({
                    firstName : user.firstname,
                    lastName : user.lastname,
                    email : user.email,
                    password : user.password1
                });
                newUser.save(function (err) {
                  if (err) return handleError(err);
                  res.send(true);
                })
            } else {
                //user already exists
                res.send(false);
            }
        });
    } else {
        //throw error if email does not exist
    }
};

exports.logOut = function(req, res){
    req.session.destroy();
    req.logout()
    if(req.user === null) 
        res.send(true);
    else
        res.status(500).end();
};