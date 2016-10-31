var mongoose = require('mongoose'),Schema = mongoose.Schema;
var seqsSchema = new Schema({
	    merchantId:{type:String,lowercase: true, trim: true},
      name:String,
      seq:Number,
      seqEnd:Number,
      seqStart:Number,
      pre:String,
      daySign:{type:Boolean,default:false},
      updatedAt:Date,
      len:Number,
    });
seqsSchema.index({ merchantId: 1,name:1},{unique: true,sparse:true });
module.exports = mongoose.model('seqs', seqsSchema);

/*
1
2
3
A01
A01A02
merchantID:xxxxxx
tableColumn:o
var UsuarioSchema = new Schema({
    email : { type : Email, index : { unique : true}, required : true },
    //some other fields, but not required, hopefully, for this sample code
    test_expira : { type : Date, default : Date.now, index : { expires : 120 }}
});
ThingSchema.index({ expireAt: 1 }, { expireAfterSeconds : 0 })
db.seq.findAndModify({query: { tables: "name","condition":"vv" },  update: { $inc: { seq: 1 } },  new: true,  upsert: true  });
db.whois.find({ "source": { "$exists": true } }).forEach(function(doc) {
    db.whois.update(
        { "_id": doc._id },
        { "$set": { "source": doc.source.toUpperCase() } }
    );
});

function getNextSequence(condition,c) {     
   var whereStr=JSON.parse(condition);
   if(!c)c=1;
   var ret = db.seqs.findAndModify(  
       {  
           query: whereStr,  
           update: { $inc: { seq: c } },  
           new: true,  
           upsert: true  
        }  
   );  
  
   return ret.seq;  
 };  

 this.state.toUpperCase();
*/