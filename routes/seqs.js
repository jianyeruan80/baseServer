

var express = require('express'),
    router = express.Router(),
    log = require('../modules/logs'),
    seqs = require('../models/seqs'),
    security = require('../modules/security'),
    jwt = require('jsonwebtoken');
router.get('/merchantId', security.ensureAuthorized,function(req, res, next) {
       
       var info=req.body;
       var query={
                  "merchantId":req.token.merchantId,
                  "name":info.name,
                 };
       seqs.aggregate(
    [ 
   {
    $match:query
   },
     {
       $project: {
           uniqueColumn:"$name",
           seq:"$seq",
           seqBegin:"$seqBegin",
           seqEnd:"$seqEnd",
           daySign:"$daySign",
           pre:"$pre",
           date: { $dateToString: { format: "%Y-%m-%d", date: "$updatedAt" }},
           
       }
     }
   ]
).exec(function (err, data) {
            if (err) return next(err);
          var options = {new: false};   
              data.seq++
              if(data.seqEnd>0 && data.seq>data.seqEnd){
                    data.seq=data.seqStart;
              }
 stores.findOneAndUpdate(query,data,options,function (err, data) {
          if (err) return next(err);
            console.log(data);
          res.json(data);
         });
              data.save(function (err, data2) {
              if (err) return next(err);
               res.json(data);
              });
                
               
  })

});




module.exports = router;
