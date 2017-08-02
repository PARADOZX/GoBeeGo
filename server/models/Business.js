var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = require('./User.js');

var businessSchema = new Schema({ 
    id: String,
    name: String,
    rating: Number,
    users: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    trips: [{ type: Schema.Types.ObjectId, ref: 'trip' }]
});

module.exports = mongoose.model('business', businessSchema);

