var mongoose = require('mongoose'),Schema = mongoose.Schema;
var lauguagesSchema = new Schema({
   "second":String,
	"third":String
})
var storeHoursSchema = new Schema({
	   merchantId:{type:String,uppercase: true, trim: true},
      name:String,
      fromTime:Date,
      toTime:Date,
      description:String,
      date:[],
      operator:{
   id:{type: mongoose.Schema.Types.ObjectId, ref: 'users' },
   user:String
},
      language:{
         name:lauguagesSchema,
         description:lauguagesSchema
         }


});
storeHoursSchema.index({ merchantId: 1,name:1},{unique: true,sparse:true});
module.exports = mongoose.model('storeHours', storeHoursSchema);

