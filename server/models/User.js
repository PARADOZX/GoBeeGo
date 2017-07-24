var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BusinessSchema = require('./Business.js');

var userSchema = new Schema({ 
    firstName: String, 
    lastName: String,
    email: String,
    password: String,
    active: Boolean,
    created: Date,
    destinations: [{ type: Schema.Types.ObjectId, ref: 'business' }]
});

module.exports = mongoose.model('user', userSchema);

