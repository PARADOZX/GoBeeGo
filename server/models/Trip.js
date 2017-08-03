var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tripSchema = new Schema({ 
    name: String,
    destinations: [{ type: Schema.Types.ObjectId, ref: 'business' }],
    user: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    datecreated: Date,
    dateupdated: Date
});

module.exports = mongoose.model('trip', tripSchema);