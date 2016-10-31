
var express = require('express'),
    router = express.Router(),
    log = require('../modules/logs'),
    security = require('../modules/security'),
    groups = require('../models/groups');
    
router.get('/', function(req, res, next) {
     log.debug(req.token);
       groups.find({}, function (err, data) {
        if (err) return next(err);
          res.json(data);
      });
     
});
router.put('/sort',security.ensureAuthorized, function(req, res, next) {

 var query={"merchantId":req.token.merchantId};
      
      var sortJson =req.body;

        groups.find(query, function(err, data) {
        if (err) return next(err);
        data.forEach(function(value, key) {
            if (sortJson[value._id]) {
                value.order = sortJson[value._id];
                value.save();
            }

        })
        res.json(data);
    });
     
});
router.get('/merchants/id', security.ensureAuthorized,function(req, res, next) {

     var query={"merchantId":req.token.merchantId};
     console.log("---------------------");
     console.log(query);
     console.log("---------------------");
      groups.find(query).sort({order:1}).exec(function (err, data) {
        if (err) return next(err);
         res.json(data);
      });
     
});


router.get('/:id', security.ensureAuthorized,function(req, res, next) {
     log.debug(req.token);
       groups.findById(req.params.id, function (err, data) {
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

   var arvind = new groups(info);
   arvind.save(function (err, data) {
   if (err) return next(err);
          res.json(data);
      });
})
router.put('/:id',  security.ensureAuthorized,function(req, res, next) {
var info=req.body;

info.operator={};
info.operator.id=req.token.id;
info.operator.user=req.token.user;
info.updatedAt=new Date();
var query = {"_id": req.params.id};
var options = {new: true};

 groups.findOneAndUpdate(query,info,options,function (err, data) {
          if (err) return next(err);
          res.json(data);
    });
})


router.delete('/:id', security.ensureAuthorized,function(req, res, next) {
     groups.remove({"_id":req.params.id}, function (err, data) {
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

