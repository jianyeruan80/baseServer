var mongoose = require('mongoose'),Schema = mongoose.Schema;
var lauguagesSchema = new Schema({
  "second":String,
  "third":String
})
var settingsSchema = new mongoose.Schema({ 
 createdAt:{type:Date,default:Date.now},
 updatedAt:Date,
 merchantId:String,
 settingInfo:Schema.Types.Mixed,
 operator:{
  id:{type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  user:String
},
 });
settingsSchema.index({merchantId:1},{unique: true,sparse:true});
module.exports = mongoose.model('settings', settingsSchema);

/*
{"ip":"192.168.1.41","englihs":true}
groupName      name      active   options       value   type
  AGroup       test       true                            A
  AGroup       XXXx       true                     
  AGroup       vvvvc      true     [a,b,c]            B
  AGroup       vvvvc      true     [a,b,c]    1
  AGroup       vvvvc                        1       CgroupName      name      active   options       value   type
  AGroup       test       true                            A
  AGroup       XXXx       true                     
  AGroup       vvvvc      true     [a,b,c]            B
  AGroup       vvvvc      true     [a,b,c]    1
  AGroup       vvvvc                        1       C
1）创建单个索引
db.collection.ensureIndex({a:1})
在a字段上创建一个升序的索引(对于单个字段的索引，升序或是降序都一样)。
2)创建复合索引
db.collection.ensureIndex({a:1,b:-1})
3）创建稀疏索引
db.collection.ensureIndex({a:1},{sparse:true})
索引中将不包含没有a字段的文档。
4)创建唯一索引
db.collection.ensureIndex({a:1},{unique:true,,sparse:true})

2.查看索引
1)查看某个库上的所有索引
db.system.index.find()
2)查看某个表上的所有索引
db.collection.getIndexes()
 
3.删除索引
1)删除表上的某个索引
db.collection.dropIndex({a:1})
2)删除表上的所有索引
db.collection.dropIndexes()
查看索引 db.keywords.getIndexes() 系统默认的索引是以_id为key的

增加索引 db.keywords.ensureIndex({"keyword_id":1}) 可以有多个索引的

删除索引 db.keywords.dropIndex({"keyword_id":1})
 project: { type: String, index: { unique: true, dropDups: true }},
db.permissions.insert([{permission_group:'G001', subject: 'Post', action: 'read',perm:'1',order:1000}
, {permission_group:'G001', subject: 'Post', action: 'create',perm:'2',order:Number}
, {permission_group:'G001', subject: 'Post', action: 'update' ,perm:'4',order:Number}
, {permission_group:'G001', subject: 'Post', action: 'delete' ,perm:'1024',order:Number}
, {permission_group:'G001', subject: 'Comment', action: 'read',perm:'1',order:Number}
, {permission_group:'G001', subject: 'Comment', action: 'create' ,perm:'2',order:Number}
, {permission_group:'G001', subject: 'Comment', action: 'update' ,perm:'4',order:Number}
, {permission_group:'G001', subject: 'Comment', action: 'delete' ,perm:'1024',order:Number}
, {permission_group:'G002', subject: 'Preference', action: 'read',perm:'1' ,order:Number}
, {permission_group:'G002', subject: 'Preference', action: 'create' ,perm:'2',order:Number}
, {permission_group:'G002', subject: 'Preference', action: 'update',perm:'4' ,order:Number}
, {permission_group:'G002', subject: 'Preference', action: 'delete' ,perm:'1024',order:Number}
, {permission_group:'G003', subject: 'XX', action: 'Pickup',perm:'7' ,order:Number}
]);


 return this.find({ name: new RegExp(name, 'i') }, cb);
DemoSchema.methods.create = function(d) {
      var demoList=[];
   var json={};
   json.name="testName";
   demoList.push(json);
   demo.create(demoList, function (err, data) {
       if (err) {
          next(err)
        }else{
          res.json({success:true,message:data});
        }
   });
};
*/
/*
'use strict';

var mongoose = require('mongoose');

var Message = new mongoose.Schema({
  channel: String,
  timestamp: {type: Date, default: Date.now},
  message: {}
}, {
  capped: {
    size: 1024 * 16 * 25, // in bytes
    autoIndexId: true
  }
});

module.exports = Message = mongoose.model('Message', Message);*/

/*db.permissions.insert([{permission_group:'G001', subject: 'Post', action: 'read',perm:'1',order:Number}
, {permission_group:'G001', subject: 'Post', action: 'create',perm:'2',order:Number}
, {permission_group:'G001', subject: 'Post', action: 'update' ,perm:'4',order:Number}
, {permission_group:'G001', subject: 'Post', action: 'delete' ,perm:'1024',order:Number}
, {permission_group:'G001', subject: 'Comment', action: 'read',perm:'1',order:Number}
, {permission_group:'G001', subject: 'Comment', action: 'create' ,perm:'2',order:Number}
, {permission_group:'G001', subject: 'Comment', action: 'update' ,perm:'4',order:Number}
, {permission_group:'G001', subject: 'Comment', action: 'delete' ,perm:'1024',order:Number}
, {permission_group:'G002', subject: 'Preference', action: 'read',perm:'1' ,order:Number}
, {permission_group:'G002', subject: 'Preference', action: 'create' ,perm:'2',order:Number}
, {permission_group:'G002', subject: 'Preference', action: 'update',perm:'4' ,order:Number}
, {permission_group:'G002', subject: 'Preference', action: 'delete' ,perm:'1024',order:Number}
, {permission_group:'G003', subject: 'XX', action: 'Pickup',perm:'7' ,order:Number}
]);



db.perma.insert([

{permission_group:'G001', url:'',subject: 'Post1', action: 'read', perm:1,order:Number},
{permission_group:'G001', url:'',subject: 'Post1', action: 'read', perm:1,order:Number}]



);

http://192.168.1.52:22080/




db.a03.insert(
[
{permission_group:'Gdemo', url:'',subject: 'demo1', action: 'read',perm:1},
{permission_group:'Gdemo', url:'',subject: 'demo2', action: 'create',perm:2},
{permission_group:'Gdemo', url:'',subject: 'demo3', action: 'update',perm:4},
{permission_group:'Gdemo', url:'',subject: 'demo4', action: 'delete',perm:1024},

{permission_group:'G001', url:'',subject: 'Post1', action: 'read',perm:1},
{permission_group:'G001', url:'',subject: 'Post2', action: 'create',perm:2},

{permission_group:'G002', url:'',subject: 'Post3', action: 'TOGO',perm:7}

]);*/