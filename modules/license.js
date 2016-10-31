var security = require('./security');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');
var key="xdfsfe4sfsdfdsfsfsfdfsfs";
var createLicense=function() {
     var licenseJson={};
         licenseJson.startDate="2016-01-01";
         licenseJson.endDate="2016-07-31";
         licenseJson.merchantId="M00012123";
     
     console.log("licenseKey:");
     console.log(jwt.sign(licenseJson,key, {algorithm: 'HS256'}));


 }

 var encrypt = function(str) {
  var iv = new Buffer('zeg7wyvbkxtg9zfr');
  var key = new Buffer('c95ad227894374034994e16262a1102b', 'hex');
  var cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
  var encryptedStr = cipher.update(new Buffer(str, 'utf8'),'buffer', 'base64');
  encryptedStr += cipher.final('base64');
  return encryptedStr;

};



var decrypt = function(str) {
  var iv = new Buffer('zeg7wyvbkxtg9zfr');
                        
  var key = new Buffer('c95ad227894374034994e16262a1102b', 'hex');
  var decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
  var chunks = [];
  var decryptedStr = decipher.update(new Buffer(str, 'base64'), 'binary', 'utf8');
  decryptedStr += decipher.final('utf8');
  return decryptedStr;
};
var getTrueData=function(str){
  //var bearerToken=decrypt(str);
 // console.log(bearerToken);
   jwt.verify(str, key, function(err, decoded) {
        if(err){return next(err);}
        console.log(decoded);
        
        })

}
var licenseJson={};
         licenseJson.startDate="2016-01-01";
         licenseJson.endDate="2016-07-31";
         licenseJson.merchantId="M00012123";
//26=24+8
//15=13
console.log(Math.random().toString(36).substr(10));

console.log(Math.random().toString(16).substr(2)+Math.random().toString(16).substr(2)+Math.random().toString(16).substr(8));
var licenseStr=encrypt(JSON.stringify(licenseJson));
console.log(licenseStr);
console.log(decrypt(licenseStr));




/*
docker run -it --volumes-from=data  --link mongo:mongo -e APPPATH="jaynode" --rm jianyeruan/node /run.sh node modules/createSuper.js
*/7