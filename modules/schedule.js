var schedule = require('node-schedule');
var userRequest = require('../models/userRequest.js');

module.exports.init = function() {
	var MINUTES = 60;
	var job = schedule.scheduleJob('*/5 * * * *', function(){
		var now = new Date();		
		console.log('Start cleaning up expired user requests at ' + now + '...');
		var beforeDate = new Date(now - MINUTES * 60 * 1000);
		userRequest.find({'createdAt':{'$lt': beforeDate}}).remove(function (err, result) {
			if (err) {
				console.log('Error: Unable to clean user requests.');
				return;
			}
			console.log('Clean up result: ' + result);
		});
	});
}
