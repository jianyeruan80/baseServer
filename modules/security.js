var crypto = require('crypto'),
	md5 = require('md5'),
	jwt = require('jsonwebtoken');
module.exports.encrypt = function(str) {
	var iv = new Buffer('');
	var key = new Buffer('9860d568b0c17f096b23f5a5ee572bee', 'hex');
	var cipher = crypto.createCipheriv('aes-128-ecb', key, iv);
	var encryptedStr = cipher.update(new Buffer(str, 'utf8'),'buffer', 'base64');
	encryptedStr += cipher.final('base64');
	return encryptedStr;

};

module.exports.decrypt = function(str) {
	var iv = new Buffer('');
	var key = new Buffer('9860d568b0c17f096b23f5a5ee572bee', 'hex');
	var decipher = crypto.createDecipheriv('aes-128-ecb', key, iv);
	var chunks = [];
	var decryptedStr = decipher.update(new Buffer(str, 'base64'), 'binary', 'utf8');
	decryptedStr += decipher.final('utf8');
	return decryptedStr;
};

module.exports.generateRequestToken = function() {
	var token = null;
	try {
		var buf = crypto.randomBytes(16);
		token = buf.toString('hex');
	} catch (ex) {
		console.log('Fail to generate random token, ex:' + ex);
	}
	return token;
}

module.exports.createApiToken = function() {
	  return crypto.randomBytes(16).toString('hex');
}

module.exports.ensureAuthorized=function(req, res, next) {

    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        jwt.verify(bearerToken, req.app.get("superSecret"), function(err, decoded) {
        if(err){return next(err);}
        console.log(decoded);
         req.token=decoded;
         next();
        })
     
        
    } else {
    	    //req.token={"merchant_id":"M01"};
         // next();
          return next({"code":"90001"}); 
    }
}
module.exports.unique5=function(array,key){
  var r = [];
  for(var i = 0, l = array.length; i < l; i++) {
    for(var j = i + 1; j < l; j++)
      if (array[i][key] === array[j][key])j = ++i;
      r.push(array[i]);
  }
  return r;
}



cipher_seed = 'some_random_characters';
var encrypt1 = function(text) {
    var cipher  = crypto.createCipher('aes-256-cbc', cipher_seed),
        crypted = cipher.update(text, 'utf8', 'hex');

    crypted += cipher.final('hex');

    return crypted;
};

var decrypt1 = function(text) {
    var decipher  = crypto.createDecipher('aes-256-cbc', cipher_seed),
        decrypted = decipher.update(text, 'hex', 'utf8');

    decrypted += decipher.final('utf8');

    return decrypted;
};

module.exports.encrypt1 = encrypt1;
module.exports.decrypt1 = decrypt1;
 //console.log("11");
 
 
 /*userJson.admin="rjy";
 userJson.password="rjy";
 var query={"admin":userJson.admin};
console.log(query);
  users.find(query ,function (err, data) {
    if (err)  console.log(err);
      console.log(data);
  });
console.log("11");*/
/* var superAdmin=function(){
 	 console.log("222");
 	return new Promise(function(resolve, reject) {
	   console.log("333");
	  users.create([{"user":"sfdf"}] ,function (err, data) {
	    // if(err) reject(err);
	        resolve("data");
	  });
 console.log("444");
  })
 	 console.log("555");
}
 var p1=superAdmin();
  p1.then(function(value) {
   console.log(value);
        console.log("C2")
  }, function(reason) {
   console.log(reason);
       console.log("C2")
});*/

//console.log(module.exports.encrypt(md5('message')));

/*var promiseTest=function(){
  return new Promise(function(resolve, reject) {
        reject("OK");
      //
  }); 
 }

console.log("Aa");
var p1 =promiseTest();
  p1.then(function(value) {
   console.log(value);
        console.log("C2")
  }, function(reason) {
   console.log(reason);
       console.log("C2")
});*/