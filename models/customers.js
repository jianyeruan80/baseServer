var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var lauguagesSchema = new Schema({
    "second":String,
    "third":String
})

var addressSchema = new Schema({
      address: String,
      country:String,
      city: String,
      state: String,
      zipcode: String,
      description:String
});

var customersSchema = new mongoose.Schema({ 
    merchantId:{type:String,uppercase: true, trim: true},
    picture:String,
    account:String,
    contact:String,
	  birthDay:Date,
	  addressInfo:addressSchema,
	  phoneNum1:String,
	  phoneNum2:String,
	  email:{type:String,lowercase:true},
    password:String,
    token:String,
	  facebook:String,
  	wechat:String,
	  twitter:String,
	  password:String,
    fax:String,
  	createdAt: {type:Date,default:Date.now},
    updatedAt: Date,
    description:String,
    status:{ type: Boolean, default: true },
    operator:{
    id:{type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    user:String
    },
    memberships:[{type: mongoose.Schema.Types.ObjectId, ref: 'memberships'}],
     language:{
         description:lauguagesSchema
    },
});
customersSchema.index({ email: 1 }, { unique: true,sparse:true });

module.exports = mongoose.model('customers', customersSchema);

