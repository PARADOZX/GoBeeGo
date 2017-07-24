const Business = require('../models/Business');
const User = require('../models/User');
const ObjectId = require('mongodb').ObjectID;

exports.saveDestination = function(req, res){
    const payload = req.body;
    
    //check if business exists in database
    Business.findOne({ id : payload.details.data.id }, function(err, business_result){
            if(err) throw err;
            
            if(business_result !== null){
                //if business already exists    
                Business.update({ _id: ObjectId(business_result._id) }, { $push: { users: ObjectId(req.user._id) }}, function(err, result){
                    if(err) throw err;
                    User.update({_id: ObjectId(req.user._id)}, { $push: { destinations: ObjectId(business_result._id) }}, function(err, result){
                        if(err) throw err;
                        res.send(true);
                    });
                });
                    
            } else {
                //if business doesn't already exist
                //save new business in db with current user as the only user (so far)   
                const newBusiness = new Business({
                    id: payload.details.data.id,
                    name: payload.details.data.name,
                    rating: payload.details.data.rating,
                    users: [ObjectId(req.user._id)]
                }); 
                        
                newBusiness.save(function (err, newRecord) {
                    if (err) throw err;
                    
                    User.update({_id: ObjectId(req.user._id)}, { $push: { destinations: ObjectId(newRecord._id) }}, function(err, result){
                        if(err) throw err;
                        res.send(true);
                    });
                });
            }
        });
}

exports.getDestinations = function(req, res){
    var business_ids = [];
    
    User.findById(req.user._id, "destinations", function(err, result){
        var i;
        for(i = 0; i<result.destinations.length; i++)
        {
            business_ids.push(ObjectId(result.destinations[i]));
        }
        
        Business.find({
            '_id': { $in: business_ids}
        }, function(err, docs){
             res.send(docs);
        });
    })
    
    
}