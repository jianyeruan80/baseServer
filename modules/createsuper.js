var security = require('./security');
var md5 = require('md5');
var mongoose = require('../modules/mongoose');
admins = require('../models/admins');
var users=admins.users; 

var superJson={};
    superJson.admin="admin";
    superJson.password="admin";
    superJson.password=security.encrypt(md5(superJson.password));
    superJson.type="SUPER";
 
  var query={"admin":superJson.admin,"type":superJson.type};
  var options={"upsert":true,"multi":false};
  users.update(query,superJson,options ,function (err, data) {
     if (err)  console.log(err);
        console.log(data);
        process.exit();
     });
/*
docker run -it --volumes-from=data  --link mongo:mongo -e APPPATH="jaynode" --rm jianyeruan/node /run.sh node modules/createSuper.js
*/