const MongoClient = require('mongodb').MongoClient;

const url = require('../../config/config.js').mongoURL;

module.exports.localStrategy = function(email, password, cb) {
    MongoClient.connect(url, function(err, db) {
        if(err){
          console.log(err);
        }
        const usersColl = db.collection('users');
        
        usersColl.findOne({"email": email}, function(err, user) {
          if (err) { return cb(err); }
          if (!user) { return cb(null, false); }
          if (password != user.password) { return cb(null, false); }
          return cb(null, user);
        });
    });
}