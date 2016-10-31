
var express = require('express'),
    router = express.Router(),
    log = require('../modules/logs'),
    security = require('../modules/security'),
    md5 = require('md5'),
    jwt = require('jsonwebtoken'),
    customers = require('../models/customers');
    
router.get('/', function(req, res, next) {
     log.debug(req.token);
       customers.find({}, function (err, data) {
        if (err) return next(err);
          res.json(data);
      });
     
});
router.get('/merchants/id', security.ensureAuthorized, function(req, res, next) {
     var query={"merchantId":req.token.merchantId};
       customers.find(query, function (err, data) {
        if (err) return next(err);
          res.json(data);
      });
     
});

router.get('/query',  security.ensureAuthorized,function(req, res, next) {
       
       var info=req.query;
       var search=info.search || "";

       var query={
           $and:[
            {"merchantId":req.token.merchantId},
            {
              $or:[
                      {"email":{$regex:search,$options: "i"}},//'email':new RegExp("^"+req.body.email+"$", 'i'),
                      {"phoneNum1":{$regex:search,$options: "i"}},
                      {"phoneNum2":{$regex:search,$options: "i"}},
                      {"firstName":{$regex:search,$options: "i"}},
                      {"lastName":{$regex:search,$options: "i"}},
                ]  
            }
           ]
       }       


       customers.find(query, function (err, data) {
        if (err) return next(err);
         res.json(data);
      });
})
router.get('/id', security.ensureAuthorized,function(req, res, next) {
     log.debug(req.token);
       customers.findById(req.token.id, function (err, data) {
        if (err) return next(err);
         res.json(data);
      });
     
});

router.post('/register',  function(req, res, next) {
    var info=req.body;
    var query={};
    query.email=info.email;
    query.password=security.encrypt(md5(info.password));
 
   var arvind = new customers(query);
   arvind.save(function (err, data) {
   if (err) return next(err);
          res.json(data);
      });
})
router.post('/login',  function(req, res, next) {

      var info=req.body;
     var query={"email":info.email,"password":security.encrypt(md5(info.password))};

       customers.findOne(query, function (err, data) {
        if (err) return next(err);
        if(!data){return next({"code":"90002"})}

          var accessToken = jwt.sign({"id":data._id,"email":data.email,"password":info.password},req.app.get("superSecret"), {
          expiresIn: '120m',
          algorithm: 'HS256'
          });
           var returnJson={"accessToken":accessToken,"info":data};

           res.json(returnJson);
        })
})
router.put('/id',  security.ensureAuthorized,function(req, res, next) {
var info=req.body;
var id=req.token.id;
info.updated_at=new Date();
var query = {"_id": id};


var options = {new: true};
 
 customers.findOneAndUpdate(query,info,options,function (err, data) {
          if (err) return next(err);
          res.json(data);
    });
})
router.delete('/:id', security.ensureAuthorized,function(req, res, next) {
     customers.remove({"_id":req.params.id}, function (err, data) {
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

