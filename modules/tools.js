var seqs = require('../models/seqs');

module.exports.getNextSequence = function(params) {
  return new Promise(function(resolve, reject) {
            var options = {new: false,upsert: true};
            var rightNow=new Date();
            var dateFormat= rightNow.toISOString().slice(0,10).replace(/-/g,"");
      var query={
        "merchantId":params.merchantId,"name":params.name
      }
      seqs.aggregate(
    [ 
   {
    $match:query
   },
     {
       $project: {
           name:"$name",
           seq:"$seq",
           seqStart:"$seqStart",
           seqEnd:"$seqEnd",
           daySign:"$daySign",
           pre:"$pre",
           len:"$len",
           date: { $dateToString: { format: "%Y%m%d", date: "$updatedAt" }},
           dateFormat:{$literal:dateFormat}
       }
     }
   ]
).exec(function (err, data) {
            if (err){reject(err);return false};
            var currentData=data[0];
            if(!currentData){reject("");return false};
            var seqNo=currentData.pre || "";
           
           
              currentData.seq++

              if(!!currentData.seqEnd && currentData.seqStart && currentData.seqEnd>0 && currentData.seq>currentData.seqEnd){
                    currentData.seq=currentData.seqStart;
              }
              if(currentData.daySign && currentData.date != currentData.dateFormat){
                  currentData.seq=currentData.seqStart;
              }
              if(currentData.len > 1){
                  seqNo+=((Math.pow(10,currentData.len+1)+currentData.seq)+"").substring(1);
              }else{
                seqNo+=currentData.seq;
              }
              var update={
                   "seq":currentData.seq,"updatedAt":new Date()
              }
              resolve({"seqNo":seqNo,"updateData":update});
          /*seqs.findOneAndUpdate(query,currentData,options,function (err, data2) {
          if (err){reject(err);return false};
             
         });*/
              
})
               
  
          
        /*  seqs.findOneAndUpdate(tableColumn,query,options,function(err, data) {
                          if (err) resolve(value);
                          
                          if(!!maxvalue && data.seq>maxvalue){
                                      seqs.findOneAndUpdate(tableColumn,{"seq":value},options,function(err, data) {
                                         if (err) resolve(value);
                                         resolve(data.seq); 
                                      })
                          }else{
                            resolve(data.seq);  
                          }
          });*/
  })
};

module.exports.upload = function(req, res, next) {
  
    var fold=req.token.merchantId;
    var photoPath=path.join(__dirname, 'public')+'/'+fold;
    mkdirp(photoPath, function (err) {
        if (err) console.error(err)
        else console.log('pow!')
    });
    var form = new multiparty.Form({uploadDir:  photoPath});
    var  store={};
         store.success=true;
       form.parse(req, function(err, fields, files) {
        store.message=files;
        res.json(store);
     })

}
module.exports.unique = function(arr) {
    var result = [], json = {};
    for (var i = 0, len = arr.length; i < len; i++){
    
        if (!json[i]) {
            json[i] = 1;
            result.push(arr[i]); 
        }
    }
    return result;
};


/*   
  PersonModel.update({_id:_id},{$set:{name:'MDragon'}},function(err){});
Person.findByIdAndUpdate(_id,{$set:{name:'MDragon'}},function(err,person){
      console.log(person.name); //MDragon
    });

PersonSchema.virtual('name.full').set(function(name){
      var split = name.split(' ');
      this.name.first = split[0];
      this.name.last = split[1];
    });
    var PersonModel = mongoose.model('Person',PersonSchema);
    var krouky = new PersonModel({});
    krouky.name.full = 'krouky han';//会被自动分解
    console.log(krouky.name.first);//krouky
db.blog.update(
　　{"comments.author":"jun"},
　　{"$set":{"comments.$.author":"harry"}}    若数组有多个值，我们只想对其中一部分进行操作，就需要用位置或者定位操作符"$"  定位符职匹配第一个，会将jun的第一个评论的名字修改为harry。
)
db.user.update({"name":"jun12"},{"$set":{"email":"jun@126.com"}})
Thing.findOneAndUpdate({_id: key}, {$set: {flag: false}}, {upsert: true, "new": false}).exec(function(err, thing) {
    console.dir(thing);
});
   log.info(info);
       log.info(req.params.id);{ upsert: true }
       var id=req.params.id;
       
        users.findOneAndUpdate({"_id":id},{"permissions":info.permissions,"roles":info.roles},options,function (err, data) {
                          if (err) return next(err);
                            returnData.message=data;
                            res.json(returnData);
                      });
        */