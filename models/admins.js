var mongoose = require('mongoose'),Schema = mongoose.Schema;
var permissionsSchema = new Schema({ 
  permissionGroup: {type:String},
  subject: {type:String},
  action: {type:String},
  perm:Number,
  order:{type:Number,default:1},
  url:String,
  status:{type:Boolean ,default:true},
  merchantIds:[{type:String,lowercase:true, trim: true}],
  createdAt: {type:Date,default:Date.now},
  updatedAt: Date
});

var rolesSchema = new Schema({
   name: {type:String},
   description:String,
   permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'permissions' }],
   order:{type:Number,default:1},
   status:{type:Boolean ,default:true},
   merchantId:{type:String,lowercase: true,trim: true},
   createdAt: {type:Date,default:Date.now},
   updatedAt: Date,
  operator:{
  id:{type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  user:String
},
});

var addressSchema = new Schema({
      address: String,
      city: String,
      state: String,
      zipCode: String,
      description:String
});
var usersSchema = new Schema({
   userName:{type:String,lowercase:true,trim: true},
   password:String,
   description:String,
   merchantIds:[{type:String,lowercase:true,trim: true}],
   permissions:[{type: Schema.Types.ObjectId, ref: 'permissions' }],
   roles:[{ type:Schema.Types.ObjectId, ref: 'roles' }],
   defaultPerm:{type:Number,default:1},
   firstName:String,
   middleName:String,
   lastName:String,
   email:{type:String,lowercase:true,trim: true},
   phoneNum1:String,
   phoneNum2:String,
   birthday: String, 
   address:addressSchema,
   token:String,
   type:{type:String,default:""},
   admin:String,
   status:{type:Boolean,default:true},
   createdAt: {type:Date,default:Date.now},
   updatedAt: Date,
   storeName:String,
   operator:{
   id:{type: mongoose.Schema.Types.ObjectId, ref: 'users' },
   user:String
},
});
//连锁店
var chainStoresSchema = new Schema({
   name:String,
   merchantIds:[{type:String,lowercase:true,trim: true}],
   createdAt: {type:Date,default:Date.now},
   updatedAt: Date,

});


permissionsSchema.index({ permissionGroup: 1 ,subject:1,action:1,perm:1}, { unique: true,sparse:true });
rolesSchema.index({ name: 1 ,merchantId:1}, { unique: true,sparse:true });
usersSchema.index({ userName: 1,merchantIds:1}, { unique: true,sparse:true});

module.exports.permissions = mongoose.model('permissions', permissionsSchema);
module.exports.roles = mongoose.model('roles', rolesSchema);
module.exports.users = mongoose.model('users', usersSchema);
module.exports.chainStores = mongoose.model('chainStores', chainStoresSchema);

/*
 console.log(util.inspect({a:1, b:"b"}, false,2,true));
{$literal: 54}
============================
1,不用权限
2,read
=============================
4,new
8,update
16,print
32
64
128
256
512
1024,delete
=================
2047-3=2044  全权限
==================
all==2047

var BranchSchema = new Schema({
  location: {
    'type': {
      type: String,
      required: true,
      enum: ['Point', 'LineString', 'Polygon'],
      default: 'Point'
    },
    coordinates: [Number]
  },
  name: String
});
BranchSchema.index({location: '2dsphere'});

db.places.aggregate([
   {
     $geoNear: {
        near: { type: "Point", coordinates: [ -73.99279 , 40.719296 ] },
        distanceField: "dist.calculated",
        minDistance: 2,
        maxDistance : 5,
        query: { type: "public" },
        includeLocs: "dist.location",
        num: 5,
        spherical: true
     }
   }
])
perms & 3 >0
db.runCommand({
   geoSearch : "places",
   near: [ -73.9667, 40.78 ],
   maxDistance : 6,
   search : { type : "restaurant" },
   limit : 30
})

var getLocation =  function(address) {
  
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': address}, function(results, status) {

  if (status == google.maps.GeocoderStatus.OK) {
      var latitude = results[0].geometry.location.lat();
      var longitude = results[0].geometry.location.lng();
      console.log(latitude, longitude);
      } 
  }); 
}


getLocation('108-37 43ave 11368');
db.places.aggregate([
   {
     $geoNear: {
        near: { type: "Point", coordinates: [ -73.99279 , 40.719296 ] },
        distanceField: "dist.calculated",
        maxDistance: 2,
        query: { type: "public" },
        includeLocs: "dist.location",
        num: 5,
        spherical: true
     }
   }
])
*/
