var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var membershipsSchema=new Schema({
   number: String,
   name: String,
   points: { type: Number, default: 0 },
   allTimePoints: { type: Number, default: 0 },
   ytdPoints: { type: Number, default: 0 },
   balance: { type: Number, default: 0 },
    activateTime: Date,
    expireTime: Date,
    disabled: { type: Boolean, default: false },
    membershipLevel: String
   
});
module.exports = mongoose.model('memberships', membershipsSchema);