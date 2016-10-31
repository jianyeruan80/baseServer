var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var lauguagesSchema = new Schema({
	"second":String,
	"third":String
})
var optionsSchema = new mongoose.Schema({ 
    name:String,
    description:String,
    price:Number,
    picture:String,
    order:{type:Number,default:1},
    language:{
         name:lauguagesSchema,
         description:lauguagesSchema
    }
   
});

var optionsGroupsSchema = new mongoose.Schema({ 
    merchantId:{type:String,lowercase: true, trim: true},
    group:{type: "String",default:"Default"},
    description:String,
    minimun:{type:Number,default:0},
    maximun:{type:Number,default:0},
    order:{type:Number,default:1},
    options:[optionsSchema],
    language:{
         group:lauguagesSchema,
         name:lauguagesSchema,
         description:lauguagesSchema
    }
   
});
var categorysSchema = new mongoose.Schema({
    merchantId:{type:String,lowercase: true, trim: true},
    name:{type:String},
    group:{ type: mongoose.Schema.Types.ObjectId, ref: 'groups',null: true },
    globalOptions:[{type: mongoose.Schema.Types.ObjectId,ref: 'globalOptionGroups'}],
    customerOptions:[optionsGroupsSchema],
    description:String,
    status:{type:Boolean,default:true},
    order:{type:Number,default:1},
    picture:{type:String},
    items:[{type: mongoose.Schema.Types.ObjectId, ref: 'items'}],
    operator:{
    id:{type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    user:String
},
    language:{
         name:lauguagesSchema,
         description:lauguagesSchema
    }
});

categorysSchema.index({ name: 1, merchantId: 1 }, { unique: true,sparse:true});
module.exports = mongoose.model('categorys', categorysSchema);
/*{ createdAt: { type: Date, expires: 3600, default: Date.now }}
OrderList.$.UserName","大叔2015-09-21
*/