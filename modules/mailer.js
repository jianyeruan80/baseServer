var util = require('util');
var nodemailer = require('nodemailer');
/*var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // module.exports.
    auth: {
        user: 'jianyeruan@gmail.com',
        pass: 'ruanjy520'
    }
};
 var transporter = nodemailer.createTransport(smtpConfig);
var passwordResetEmailTemplate = '<a href="http://192.168.1.100:90/#/active?e=%s&key=%s">tst</a>';

var sendPasswordResetEmail = function(emailAddress, authKey) {
   var emailContent = util.format(passwordResetEmailTemplate,emailAddress, authKey);
	transporter.sendMail({
		from: 'jianyeruan@gmail.com',
		to: emailAddress,
		subject: 'Reset Your Password',
		html: emailContent
	},function(err,res){
		if (err) console.log(err);
		
        	console.log(res);
	 });
   
};
sendPasswordResetEmail("jianyeruan@gmail.com","test");*/



//https://www.youtube.com/watch?v=Ps0vpgMyJm4
var transporter = nodemailer.createTransport({
	host: 'email-smtp.us-west-2.amazonaws.com',
    	port: 587,
        auth: {
		user: 'AKIAIFVX6T6KGXZK6BYA',
    		pass: 'ArNKmMJOc7GS4FlSNIalJdJCdVZejnIVRhbRC9sj7XXP'
	}
});

var passwordResetEmailTemplate = '<font face="Verdana, Arial, Helvetica, sans-serif" style="font-size:12px;line-height:15px;display:block" size="2" color="#696868">Hi %s, we hear that you forgot your <span class="il">password</span>. No problem. To <span class="il">reset</span> your <span class="il">password</span> and access your account, click on the link below. Your <span class="il">password</span> will be <span class="il">reset</span> and you can create a new one. For security purposes, this link will remain active only for the next 24 hours.</font><td style="padding:28px 36px 36px 36px;border-radius:2px;background-color:#1e4ca1;color:#ffffff;font-size:16px;font-family:Helvetica,Arial,Sans Serif;width:100%;text-align:center" align="center"><img width="75" height="75" src="https://ci5.googleusercontent.com/proxy/ytfbyLBKshMAfoTVZYdS7r4rSdSQfoiIpW18paiuUTChrC0sBaOYaSsgy2u0ULSQwKnXCIZA2Sic8LXU0GoWabPmN2qB6SwlBjdR8TizeqRvfC3QEVoZVSZFFIo=s0-d-e1-ft#https://na2.docusign.net/member/Images/email/accountPassword-white.png" style="width:75px;min-height:75px" class="CToWUd"><table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%"><tbody><tr><td style="padding-top:24px;font-size:16px;font-family:Helvetica,Arial,Sans Serif;border:none;text-align:center;color:#ffffff" align="center"> <span class="il">Password</span> Request </td></tr></tbody></table><table role="presentation" border="0" cellspacing="0" cellpadding="0" width="100%"><tbody><tr><td align="center" style="padding-top:30px"><div><table cellspacing="0" cellpadding="0"><tbody><tr><td align="center" height="44" style="font-size:15px;color:#333333;background-color:#ffc423;font-family:Helvetica,Arial,Sans Serif;font-weight:bold;text-align:center;text-decoration:none;border-radius:2px;background-color:#ffc423;display:block"><a href="http://vip.menusifu.com/99favortaste#/resetPassword?u=%s&k=%s" style="font-size:15px;color:#333333;background-color:#ffc423;font-family:Helvetica,Arial,Sans Serif;font-weight:bold;text-align:center;text-decoration:none;border-radius:2px;background-color:#ffc423;display:inline-block" target="_blank"><span style="padding:0px 24px;line-height:44px"> RESET <span class="il">PASSWORD</span> </span></a></td></tr></tbody></table></div></td></tr></tbody></table></td>';

var sendPasswordResetEmail = function(emailAddress, authKey) {
	var emailContent = util.format(passwordResetEmailTemplate, emailAddress, emailAddress, authKey);
	transporter.sendMail({
		from: 'jianyeruan@gmail.com',
		to: emailAddress,
		subject: 'Reset Your Password',
		html: emailContent
	},function(err,res){
		if (err) {
        		console.log(err);
		}
        	console.log(res);
	 });
};
//sendPasswordResetEmail("jianyeruan@gmail.com","test");