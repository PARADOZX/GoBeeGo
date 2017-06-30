const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectID;

const url = require('../../config/config.js').mongoURL;

module.exports.serializeUser = function(user, cb)
{   
    cb(null, user._id);
}

module.exports.deserializeUser = function(id, cb) {
   
    MongoClient.connect(url, function(err, db) {
        if(err){
            console.log(err);
        }
        
        const usersColl = db.collection('users');
    
        usersColl.findOne({"_id": ObjectId(id)}, function(err, user) {
            if (err) { return cb(err); }
            cb(null, user);
        });
    });
}


