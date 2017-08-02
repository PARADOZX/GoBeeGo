const Business = require('../models/Business');
const User = require('../models/User');
const Trip = require('../models/Trip');
const ObjectId = require('mongodb').ObjectID;

exports.saveDestination = function(req, res){
    const payload = req.body;
    console.log(payload.tripID);
    //check if business exists in database
    Business.findOne({ id : payload.details.data.id }, function(err, business_result){
            if(err) throw err;
            
            if(business_result !== null){
                //if business already exists    
                
                //v.1
                // Business.update({ _id: ObjectId(business_result._id) }, { $push: { users: ObjectId(req.user._id) }}, function(err, result){
                //     if(err) throw err;
                //     User.update({_id: ObjectId(req.user._id)}, { $push: { destinations: ObjectId(business_result._id) }}, function(err, result){
                //         if(err) throw err;
                //         res.send(true);
                //     });
                // });
                
                //v.2
                Business.update({ _id: ObjectId(business_result._id) }, { $push: { trips: ObjectId(payload.tripID) }}, function(err, result){
                    if(err) throw err;
                    Trip.update({_id: ObjectId(payload.tripID)}, { $push: { destinations: ObjectId(business_result._id) }}, function(err, result){
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
                    //v.1
                    // users: [ObjectId(req.user._id)]
                    //v.2
                    trips: [ObjectId(payload.tripID)]
                }); 
                        
                newBusiness.save(function (err, newRecord) {
                    if (err) throw err;
                    //v.1
                    // User.update({_id: ObjectId(req.user._id)}, { $push: { destinations: ObjectId(newRecord._id) }}, function(err, result){
                    //     if(err) throw err;
                    //     res.send(true);
                    // });
                    
                    //v.2
                    Trip.update({_id: ObjectId(payload.tripID)}, { $push: { destinations: ObjectId(newRecord._id) }}, function(err, result){
                        if(err) throw err;
                        res.send(true);
                    });
                });
            }
        });
}

exports.getDestinations = function(req, res){
    var business_ids = [];
    const tripID = req.query.tripID;
    
    //v.1
    // User.findById(req.user._id, "destinations", function(err, result){
    //     var i;
    //     for(i = 0; i<result.destinations.length; i++)
    //     {
    //         business_ids.push(ObjectId(result.destinations[i]));
    //     }
        
    //     Business.find({
    //         '_id': { $in: business_ids}
    //     }, function(err, docs){
    //          res.send(docs);
    //     });
    // })
    
    //v.2
    Trip.findById(tripID, "destinations", function(err, result){
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

exports.createTrip = function(req, res){
    const tripname = req.body.name.trim();
    
    //check if trip already exists for user
    Trip.find({name: tripname, user: req.user._id}, function(err, tripRecord){
        if(err) throw err;
        
        if(tripRecord.length > 0){
            //record exists
            res.send(false);    
        } else {
            User.findById(req.user._id, function(err, userRecord){
                if(err) throw err;
               
                if(userRecord){
                    //create new trip
                    const newTrip = new Trip({
                        name: tripname, 
                        user: userRecord
                    }); 
                    
                    newTrip.save(function(err, newRecord){
                        if(err) throw err;
                            
                        User.update({_id: ObjectId(req.user._id)}, { $push: { trips: newRecord }}, function(err, result){
                            if(err) throw err;
                            
                            res.send(newRecord); 
                        });
                    });
                }
            });
        }
    });
};

exports.getTrips = function(req, res){
    Trip.find({user : ObjectId(req.user._id)}, function(err, tripRecords){
        if(err) throw err;
        
        res.send(tripRecords);
    });;
};