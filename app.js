var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var admins = require('./routes/admins');
var superAdmin = require('./routes/superadmin');
/*var background = require('./routes/background');*/
/*var menuitem = require('./routes/menuitem');*/
var stores = require('./routes/stores');
var customers = require('./routes/customers');
var storeHours = require('./routes/storeHours');

var seqs = require('./routes/seqs');

var ejs = require('ejs');
var multiparty = require('multiparty');
var log=require('./modules/logs');
var mongoose = require('./modules/mongoose');
var util  =   require('util');
var security = require('./modules/security');
var tools = require('./modules/tools');
var mkdirp = require('mkdirp');
var compress = require('compression');
var rest = require('restler');

var apiToken={};
var returnData={};
returnData.success=true;
var app = express();
app.use(compress());

app.engine('html',ejs.__express) ;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.set('superSecret',"ruanjy520");
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.static(path.join(__dirname, 'public')));


app.use(logger('dev'));
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({ limit: '10mb',extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.header("Access-Control-Max-Age", "3600");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    next();
});

app.get('/', function (req, res) {
    res.send("index", "Start");
});
app.use('/superadmin', superAdmin);
app.use('/api/seqs', seqs);
app.use('/api/admin', admins);
app.use('/api/customers', customers);
app.use('/api/storehours', storeHours);
app.use('/api/stores', stores);



/*app.use('/api/background', background);*/
/*app.use('/api/menuitem', menuitem);*/



app.post('/api/upload',security.ensureAuthorized,function(req, res, next) {
console.log(req.token.merchantId);
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
 })

app.post('/api/uploadPic',security.ensureAuthorized,function(req, res, next) {

var fold=req.token.merchantId || "server";
var photoPath=path.join(__dirname, 'public')+'/'+fold;
mkdirp(photoPath, function (err) {
    if (err) console.error(err)
    else console.log('pow!')
});
var form = new multiparty.Form({uploadDir:  photoPath});
    var pic="";
    
    form.parse(req, function(err, fields, files) {
      
       if(!!files &&  !!files.picture && files.picture[0].size>0){
          console.log(files);
          var path=files.picture[0].path.split("/");
          pic=path[path.length-1];
       }

      res.json(pic);
 })
 })

 var customerError={
         "11000":"Email already exists",
         "90001":"token not match",
         "90002":"user password is not match",
         "90003":"User Type not match",
         "90004":"Your account is disable,please contant admin!",
         "90005":"Your Link is false!",
         "90006":"Save order is fail",
         "90007":"licenses key is exits!",
         "90008":"licenses key is used!",
         "90009":"licenses key is usssed!",
         "99999":"Transfer parameters Is Error"
 }


if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.error("Error:" + err.message);
    res.status(err.status || 500).json({
      success:false,
      message: customerError[err.code]?customerError[err.code]:err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  
  console.error("Error: " + err);
  res.status(err.status || 500).json({
    message: err.message,
    error: {}
  });
});


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Server is running at http://%s:%s', host, port)
});

/*console.log(util.inspect(result, false, 5));*/