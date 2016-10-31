var express =   require("express");
//var formidable = require('formidable');
var path  =   require('path');
var util  =   require('util');
var fs  =   require('fs');
/**********************/
var multer = require ('multer');  
var multiparty = require ('multiparty');  
var app         =   express();

app.get('/',function(req,res){
      
       res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<form id="uploadForm" enctype= "multipart/form-data"  ' 
                +'action= "http://192.168.1.100:3002/upload"  method= "post"><input type=text name="xx" value="xx" />'
                +'<input type="file" name="userPhoto" />'
                +'<input type="file" name="userPhoto1" multiple/>'
                +'<input type="submit" value="Upload Image" name="submit"></form>'
                +'<script>function test(){("OK");}</script>');

      res.end("");

});


/*var upload = multer({ 
  dest:  path.join(__dirname, '../public')+'/uploads' , 
  rename: function (fieldname, filename) {
    return filename.replace(/\W+/g, '-').toLowerCase() + Date.now()
  },
  limits: { fileSize: 1024*1024}

});  

*/
app.post('/upload', function(req, res, next){
 var photoPath=path.join(__dirname, '../public')+'/uploads';
 var form = new multiparty.Form({uploadDir:  photoPath});
 form.parse(req, function(err, fields, files) {
      console.log("---------------------------");
      console.log(files);
      console.log(fields);
      console.log("---------------------------");
     var filesTmp = JSON.stringify(files,null,2);
 
     if(err){
       console.log('parse error: ' + err);
     } else {
       //console.log('parse files: ' + files.inputFile);


      // var inputFile = files.userPhoto1[0];
     //  var uploadedPath = inputFile.path;
      // var dstPath = photoPath + inputFile.originalFilename;
       //重命名为真实文件名
      /* fs.rename(uploadedPath, dstPath, function(err) {
         if(err){
           console.log('rename error: ' + err);
         } else {
           console.log('rename ok');
         }
       });*/
     }
 
     res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
     res.write('received upload:\n\n');
     res.end(util.inspect({fields: fields, files: filesTmp}));
  });


 });
/**
 angular.element(document.querySelector('#fileInput')).click();
angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);

<input type="file" id="fileInput" />
                       <h1 ng-click="logo()">LOGO</h1>
                       <img  ng-src="{{setting.logoUrl}}"  style="padding:2px;max-width:200px;max-height:150px;" />

   var handleFileSelect=function(evt) {

      var file=evt.currentTarget.files[0];
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){

          $scope.setting.logoUrl=evt.target.result;
        });
      };
      reader.readAsDataURL(file);
    };

preview.src = results.base64;
*/
/*app.post('/file/uploading', function(req, res, next){
 var photoPath=path.join(__dirname, '../public')+'/uploads';
 var form = new multiparty.Form({uploadDir:  photoPath});
 form.parse(req, function(err, fields, files) {
  console.log("---------------------------");
      console.log(files);
      console.log("---------------------------");
     var filesTmp = JSON.stringify(files,null,2);
 
     if(err){
       console.log('parse error: ' + err);
     } else {
       //console.log('parse files: ' + files.inputFile);


       var inputFile = files.userPhoto[0];
       var uploadedPath = inputFile.path;
       var dstPath = photoPath + inputFile.originalFilename;
       //重命名为真实文件名
       fs.rename(uploadedPath, dstPath, function(err) {
         if(err){
           console.log('rename error: ' + err);
         } else {
           console.log('rename ok');
         }
       });
     }
 
     res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
     res.write('received upload:\n\n');
     res.end(util.inspect({fields: fields, files: filesTmp}));
  });*/


 // });

/*app.post('/api/photo',function(req,res){
          var form = new formidable.IncomingForm();
        
        form.encoding = 'utf-8';
        
        form.uploadDir = path.join(__dirname, 'public')+'/uploads';
        
        form.keepExtensions = true;
        
        form.maxFieldsSize = 2 * 1024 * 1024;
        //form.maxFields = 1000;  设置所以文件的大小总和

        form.parse(req, function(err, fields, files) {
          res.writeHead(200, {'content-type': 'text/plain'});
          res.write('received upload:\n\n');
        
          res.end(util.inspect({fields: fields, files: files}));
        });
       form.onPart(part);
        return;
    
});
*/
app.listen(3002,function(){
    console.log("Working on port 3002");
});

