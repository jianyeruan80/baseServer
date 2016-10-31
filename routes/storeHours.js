
var express = require('express'),
    router = express.Router(),
    log = require('../modules/logs'),
    security = require('../modules/security'),
    storehours = require('../models/storehours');
    
router.get('/merchants/id', security.ensureAuthorized, function(req, res, next) {
     
var query={};
       query.merchantId=req.token.merchantId;
       /*
       storehours.aggregate[]({}, function (err, data) {
        if (err) return next(err);
          res.json(data);
      });
*/
       storehours.aggregate(
           [ {$match:query},
             {
              $project:{name:"$name",fromTime:"$fromTime",toTime:"$toTime", 
              fromHour: { $hour: "$fromTime" }, fromMinutes: { $minute: "$fromTime" },
              toHour: { $hour: "$toTime" }, toMinutes: { $minute: "$toTime" },
              date:"$date"

             }
             }
        ]
        ).sort({"order" : 1}).exec(function(err,data){
            if (err) return next(err);
            console.log("xxxxxxxxxxxxxxxxxx");
             console.log(data);
            res.json(data);
        })
     
});

/* year: { $year: "$date" },
           month: { $month: "$date" },
           day: { $dayOfMonth: "$date" },
           hour: { $hour: "$date" },
           minutes: { $minute: "$date" },
           seconds: { $second: "$date" },
           milliseconds: { $millisecond: "$date" },
           dayOfYear: { $dayOfYear: "$date" },
           dayOfWeek: { $dayOfWeek: "$date" },
           week: { $week: "$date" }
*/
router.get('/:id', security.ensureAuthorized,function(req, res, next) {
     log.debug(req.token);
       storehours.findById(req.params.id, function (err, data) {
        if (err) return next(err);
         res.json(data);
      });
     
});

router.post('/',  security.ensureAuthorized,function(req, res, next) {
   var info=req.body;

   info.merchantId=req.token.merchantId; 
   info.operator={};
info.operator.id=req.token.id;
info.operator.user=req.token.user;
 
   var arvind = new storehours(info);
   arvind.save(function (err, data) {
   if (err) return next(err);
          res.json(data);
      });
})
router.put('/:id',  security.ensureAuthorized,function(req, res, next) {
var info=req.body;

var id=req.params.id;
info.updatedAt=new Date();
info.operator={};
info.operator.id=req.token.id;
info.operator.user=req.token.user;
 
var query = {"_id": id};
var options = {new: true};
 storehours.findOneAndUpdate(query,info,options,function (err, data) {
          if (err) return next(err);
          res.json(data);
    });
})

router.delete('/:id', security.ensureAuthorized,function(req, res, next) {
     storehours.remove({"_id":req.params.id}, function (err, data) {
        if (err) return next(err);
          res.json(data);
      });
});

module.exports = router;

/*
var PersonSchema = new Schema({
      name:{
        first:String,
        last:String
      }
    });
  PersonSchema.virtual('name.full').get(function(){
      return this.name.first + ' ' + this.name.last;
    });

Post.find({}).sort('test').exec(function(err, docs) { ... });
Post.find({}).sort({test: 1}).exec(function(err, docs) { ... });
Post.find({}, null, {sort: {date: 1}}, function(err, docs) { ... });
Post.find({}, null, {sort: [['date', -1]]}, function(err, docs) { ... });

db.inventory.aggregate( [ { $unwind: "$sizes" } ] )
db.inventory.aggregate( [ { $unwind: { path: "$sizes", includeArrayIndex: "arrayIndex" } } ] )
https://docs.mongodb.com/manual/reference/operator/aggregation/group/
[
   /*{ $project : { title : 1 , author : 1 } } addToSet*/
/*    { $match: { status: "A" } },*
 { $group : {_id : "$permission_group", perms:{$push:{"subject":"$subject","action":"$action","perm":"$perm","status":"$status","value":"$_id","key":"$perm"} } } }
  // _id : { month: "$permission_group", day: { $dayOfMonth: "$date" }, year: { $year: "$date" } }

  /*    {
        $group : {
          _id:{permissionGroup:"$permission_group",subjects:{$push:"$subject"}}
         
    sort({"order" : 1})
        }
      }*/
/*users.update({"_id":key},{"$addToSet":{"permissions":{"$each":info.value}}},function(err,data){*/

