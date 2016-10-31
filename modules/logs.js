

var winston = require('winston'),
    path = require('path'),
    fs = require('fs'),
    level='debug';
var logDirectory =  path.join(__dirname, '../logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
var logName=logDirectory+"/log";
var log = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({ level: level ,colorize: true, timestamp: false,json: true}),
    new(require('winston-daily-rotate-file'))({
            level: 'debug',
            datePattern: '.yyyy-MM-dd',
            timestamp: true,
            filename: logName,
            maxsize:2*1024*1024,maxFiles:5,
            
        })

  ]
});
module.exports = log;