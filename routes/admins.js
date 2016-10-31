var express = require('express'),
    router = express.Router(),
    log = require('../modules/logs'),
    admins = require('../models/admins'),
    security = require('../modules/security'),
    
    mailer = require('../modules/mailer'),
     tools = require('../modules/tools'),
    md5 = require('md5'),
    util = require('util'),
    jwt = require('jsonwebtoken'),
    returnData={};
    

var permissions=admins.permissions; 
var roles=admins.roles; 
var users=admins.users; 
/**
 * @api {post} /api/admin/login
 * @apiVersion 0.0.1
 * @apiName LOGIN
 * @apiGroup admin
 * 
 * @apiParam {String} loginType   1
 * @apiParam {String} password    123456
 * @apiParam {String} merchantId  U001001

 * @apiSuccess {object} success:true,message:{}
 */
router.post('/login', function(req, res, next) {
     var info=req.body;
     
   
   var query={
      "userName":new RegExp(info.userName, 'i'), //new RegExp("^"+info.userName+"$", 'i'),
      "password":security.encrypt(md5(info.password)),
      "merchantIds": {$regex:new RegExp("^"+info.merchantId+"$", 'i')}
   };

    users.aggregate([
      { $match: query},
      { $lookup: {from: 'permissions', localField: 'defaultPerm', foreignField: 'perm', as: 'perms'} },
      { $lookup: {from: 'stores', localField: 'merchantId', foreignField: 'merchantId', as: 'stores'} },
      {
        $project:{
         userName:1,status: 1,defaultPerm: 1,roles:1,admin:1,perms:1,storeName:1,
         permissions:1,
         stores_docs :{ $cond : [ { $eq : [ "$stores", [] ] }, [0], '$stores' ] }
      }
    },
      { 
        $unwind:"$stores_docs"
      }]
      
       ).exec( function (err, result) {
        if (err) return next(err);





          if (!result || result.length<1) return next({"code":"90002"});
          if(result[0].status==false) return next({"code":"90004"});
          users.populate(result,[
         { path:'roles',populate:{ path: 'permissions'}},
         { path:'permissions'}],
          function (err, datas) {
          if (err) return next(err);



           var accessToken = jwt.sign({"merchantId":info.merchantId,"id":datas[0]._id,"user":datas[0].userName},req.app.get("superSecret"), {
          expiresIn: '120m',
          algorithm: 'HS256'
          });
          var data=datas[0];
          var perms=data.permissions?data.permissions:[];
                     
            if(!!data.roles){
                for(var j=0;j<data.roles.length;j++) {
                  perms = perms.concat(data.roles[j].permissions);
                }
            }
            if(!!data.perms){
              for(var j=0;j<data.perms.length;j++) {
                  perms = perms.concat(data.perms[j]);
              }
            }
       
/*
        console.log("=========11111111111111111111111111============");
console.log(util.inspect(result, false, 4));
            console.log("===========33333333333333333333==========");
       */
                console.log("=========11111111111111111111111111============");
console.log(util.inspect(returnData, false, 4));
            console.log("===========333344444444444444444444444444444==========");

          var cloneOfA = JSON.parse(JSON.stringify(perms));
perms=security.unique5(cloneOfA,"_id");

var jobsSortObject = {}; 
  for(var i =0; i< perms.length; i++){
   var job = perms[i],
   mark = job.permissionGroup+job.subject,
   jobItem = jobsSortObject[mark];
  if(jobItem){
   jobsSortObject[mark].perm=jobsSortObject[mark].perm+jobItem.perm;
  }else{
   jobsSortObject[mark] = job.perm;
  }
}

var jobsSortObjectList = {}; 
for(var i =0; i< perms.length; i++){
   var job = perms[i],
   mark = job.permissionGroup,
   jobItem = jobsSortObjectList[mark];
  if(jobItem){
   jobsSortObjectList[mark].push(job);
  }else{
   jobsSortObjectList[mark] = [job];
  }
}
         var returnData={};

          returnData.perms=jobsSortObject;
          returnData.permsList=jobsSortObjectList;
          returnData.username=data.userName;
          returnData.storeName=data.storeName;
          returnData.merchantId=info.merchantId;
          returnData.accessToken=accessToken;
                console.log("=========88888888888888888888============");
console.log(util.inspect(returnData, false, 4));
            console.log("===========33333333333333333333==========");
          res.json(returnData);
  }); 
        
   });
});

/**
 * @api {get} /api/admin/perms
 * @apiVersion 0.0.1
 * @apiName permsList 
 * @apiGroup admin
 * 
 * @apiSuccess {object} success:true,message:{}
 */
router.get('/perms', security.ensureAuthorized,function(req, res, next) {
     var merchantId=req.token.merchantId;
      var merchant=new RegExp(merchantId,"i");
       var query= {"$and":
                  [    {"status":true},
                       { "$or" : [
                                    {"merchantIds": {$size: 0}},

                                    {"merchantIds":{$regex:merchant}}
                                 ]
                      }
                   ]
                 };

   console.log(query);
      permissions.aggregate(
           [ {$match:query},{ $group : {_id : "$permissionGroup",  order: { $min: "$order" },
             perms:{$push:{"subject":"$subject","action":"$action","perm":"$perm","status":"$status","value":"$_id","key":"$perm","order":"$order","merchantIds":"$merchantIds"} } 

            }}
        ]
        ).sort({"order" : 1}).exec(function(err,data){
            if (err) return next(err);
             console.log("-----------------");
             console.log(data);
             console.log("-----------------");
             res.json(data);
        })

});
/**
 * @api {post} /api/admin/perms/:id
 * @apiVersion 0.0.1
 * @apiName get current perms
 * @apiGroup admin
 * 
 * @apiSuccess {object} success:true,message:{}
 */
router.get('/perms/:id', security.ensureAuthorized, function(req, res, next) {
log.debug(req.body);
  var id=req.params.id;
  var query={"_id":id};
         permissions.findOne(query, function (err, data) {
        if (err) return next(err);
         res.json(data);
      });
   
})

/**
 * @api {get} /api/admin/roles
 * @apiVersion 0.0.1
 * @apiName rolesList
 * @apiGroup admin
 * 
 * @apiSuccess {object} success:true,message:{}
 */
router.get('/roles',security.ensureAuthorized, function(req, res, next) {
   var info=req.body;
   log.debug(info);

     var merchantId=req.token.merchantId;

     var select={"name":1,"description":1,"permissions":1,"order":1,"status":1,"key":"$status"};
    roles.aggregate(  
                     [  
                      
                       { $match: {"merchantId":merchantId} },
                         { $project : select }

                     ]
                   ).exec(function(err, data){
                      if (err) return next(err);
                    res.json(data);
                   })
});

router.get('/roles/:id', security.ensureAuthorized, function(req, res, next) {
  var id=req.params.id;
  var query={"_id":id};
         roles.findOne(query, function (err, data) {
        if (err) return next(err);
         res.json(data);
      });
   
})
/**
 * @api {post} /api/admin/role
 * @apiVersion 0.0.1
 * @apiName new role
 * @apiGroup admin
 * 
 * @apiParam {object} roleJson
 * 
 * @apiSuccess {object} success:true,message:{}
 */
router.post('/roles',  security.ensureAuthorized,function(req, res, next) {
var info=req.body;

log.debug(info);
info.operator={};
info.operator.id=req.token.id;
info.operator.user=req.token.user;
    info.merchantId=req.token.merchantId;
    var arvind = new roles(info);
      arvind.save(function (err, data) {
      if (err) return next(err);
            res.json(data);
                    });
                        
  
})
/**
 * @api {post} /api/roles/:id
 * @apiVersion 0.0.1
 * @apiName update roles
 * @apiGroup admin
 * 
 * @apiParam {object} rolesJson
 * 
 * @apiSuccess {object} success:true,message:{}
 */
router.put('/roles/:id',  security.ensureAuthorized,function(req, res, next) {
var info=req.body;
log.debug(info);
var id=req.params.id;
info.updatedAt=new Date();
var query = {"_id": id};

var options = {new: true};
info.operator={};
info.operator.id=req.token.id;
info.operator.user=req.token.user;
roles.findOneAndUpdate(query,info,options,function (err, data) {
                       if (err) return next(err);
                      
                        res.json(data);
                      });
                        
  
})


router.delete('/roles/:id',  security.ensureAuthorized,function(req, res, next) {
var query={};
query._id=req.params.id;

 roles.remove(query,function (err, data) {
          if (err) return next(err);
          res.json(data);
    });
})
/**
 * @api {get} /api/admin/users 
 * @apiVersion 0.0.1
 * @apiName usersList
 * @apiGroup admin
 * 
 * @apiSuccess {object} success:true,message:{}
 */
router.get('/users', security.ensureAuthorized,function(req, res, next) {
      
     var query={
             "merchantIds":new RegExp("^"+req.token.merchantId+"$","i"),
              "type":""
            }
            console.log("---AsssssssssssssssssssssssssssssAA----");
            console.log(query);
            console.log("---AsssssssssssssssssAA----");
     users.find(query,function (err, data) {
        if (err) return next(err);
          console.log("---AAA----");
          console.log(data);
          console.log("---bbb----");
          res.json(data);
      });
 });

/**
 * @api {post} /api/admin/user
 * @apiVersion 0.0.1
 * @apiName  new user
 * @apiGroup admin
 * 
 * @apiParam {Object} user json
 *
 * @apiSuccess {object} success:true,message:{}
 */
router.post('/users',  security.ensureAuthorized,function(req, res, next) {
var info=req.body;
      info.password=security.encrypt(md5(info.password));
      info.operator={};
      info.operator.id=req.token.id;
      info.operator.user=req.token.user;
      info.merchantIds=[];
      info.merchantIds[0]=req.token.merchantId;
      
      var query={
           "merchantId":req.token.merchantId,
            "password":info.password
      }

      users.findOne(query).exec(function(err,data){
         if (err) return next(err);
         if(!!data) return next({"code":"90002"});

          var arvind = new users(info);
          arvind.save(function (err, data) {
          if (err) return next(err);
               res.json(data);
              });
      })


   /*   var arvind = new users(info);
      arvind.save(function (err, data) {
      if (err) return next(err);
           
            res.json(data);
          });*/
                        
  
})
/**
 * @api {post} /api/admin/user/:id
 * @apiVersion 0.0.1
 * @apiName  update user
 * @apiGroup admin
 * 
 * @apiParam {Object} user json
 *
 * @apiSuccess {object} success:true,message:{}
 */
router.put('/users/:id',  security.ensureAuthorized,function(req, res, next) {
var info=req.body;
log.debug(info);
var id=req.params.id;
info.updatedAt=new Date();
if(!info.password) delete info.password;
if(!!info.password) info.password=security.encrypt(md5(info.password));
var query = {"_id": id};
var options = {new: true};
 info.operator={};
 info.operator.id=req.token.id;
 info.operator.user=req.token.user;
try{info.merchantIds=!!info.merchantIds?info.merchantIds.split(","):[];}catch(ex){}

users.findOneAndUpdate(query,info,options,function (err, data) {
                       if (err) return next(err);
                        res.json(data);
                      });
                        
  
})
router.delete('/users/:id',  security.ensureAuthorized,function(req, res, next) {
var query={};
query._id=req.params.id;

 users.remove(query,function (err, data) {
          if (err) return next(err);
          
          res.json(data);
    });
})


/*router.get('/userstores',function(req, res, next) {
      var info=req.query;
      var query={};
       if(!!info.userName){
         query.userName=info.userName.toLowerCase(); 
       }
        users.find(query,function (err, data) {
        if (err) return next(err);
        returnData.message=data;
        res.json(returnData);
      });
 });
*/
/**
 * @api {post} /api/users/:id/perms
 * @apiVersion 0.0.1
 * @apiName  give user roles,perms
 * @apiGroup admin
 * 
 * @apiParam {object[]} permissions
 * @apiParam {object[]} roles
 * 
 * @apiSuccess {object} success:true,message:{}
 */
router.put('/users/:id/perms', security.ensureAuthorized, function(req, res, next) {
     var info=req.body;
     
       log.info(info);
       log.info(req.params.id);
       var id=req.params.id;
       
       var options = {new: true};
       info.operator={};
       info.operator.id=req.token.id;
       info.operator.user=req.token.user;
        users.findOneAndUpdate({"_id":id},{"permissions":info.permissions,"roles":info.roles},options,function (err, data) {
                          if (err) return next(err);
                            
                            res.json(data);
                      });
        
      
 

})

/**
 * @api {post} /api/admin/roles/:id/perms
 * @apiVersion 0.0.1
 * @apiName LOGIN
 * @apiGroup admin
 * 
 * @apiParam {object[]} permissions.
 * 
 * @apiSuccess {object} success:true,message:{}
 */
router.put('/roles/:id/perms', security.ensureAuthorized, function(req, res, next) {
     var info=req.body;
     var id=req.params.id;
       var options = {new: true};
        info.operator={};
        info.operator.id=req.token.id;
        info.operator.user=req.token.user;
        roles.findOneAndUpdate({"_id":id},{"permissions":info.permissions},options,function (err, data) {
                          if (err) return next(err);
                          
                             
                             res.json(data);
                      });
        
      
 

})




   
                    

module.exports = router;
/*function uniqueArr(array,key) {
    var r = [];
    for (var i = 0, l = array.length; i < l; i++) {
        for (var j = i + 1; j < l; j++)
          if(key){
            if (array[i][key] === array[j][key]) j = ++i;
          }else{
          if (array[i] === array[j]) j = ++i;  
          } 
      r.push(array[i]);
    }
    return r;
}*/

/* var sign=false; 
    if(!!e && e instanceof Array && e.length){
    sign=true;
    }
    User.find({'username': {$regex: new RegExp('^' + username.toLowerCase(), 'i')}}, function(err, res){
    if(err) throw err;
    next(null, res);
});       
    return sign;

 'new_field': { 
                '$add': [ 
                    '$addedPower', 
                    '$addedArmor', 
                    '$monster.power', 
                    '$monster.armor' 
                ]
    */