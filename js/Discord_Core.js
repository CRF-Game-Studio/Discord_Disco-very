//==================================
// Discord_Event
//==================================

var fs = require('fs');
var MsgInterpreter = require('./Discord_MsgInterpreter');

var _whiteChannel = {};

exports.LoadClientInfo = function() {
	var prop = {
		autorun: true,
		email: true,
		password: true,
		white_channel: true,
	}, client = {};
	var data = fs.readFileSync("./setting/setting.cfg", "utf8");
	
	data = data.split('\n');
	for (var i in data) {
		var str = data[i].split(':');
		if (str[1] != undefined) {
			str[1] = str[1].trim();
			if (str[1].toLowerCase() == "true")
				str[1] = true;
			else if (str[1].toLowerCase() == "false")
				str[1] = false;
			
			if (prop[str[0]])
				client[str[0]] = str[1];
		}
	}
	return client;
}

exports.Ready = function() {
	LoadWhiteChannel();
	console.log(this.username + " Login Successed.");
}

var LoadWhiteChannel = function() {
	var data = fs.readFileSync("./setting/white_channel.cfg", "utf8");
	data = data.split('\r\n');
	for (var i in data) {
		_whiteChannel[data[i]] = true;
	}
}

exports.Message = function (user, uID, ch, msg, raw) {
	console.log(ch, user);
	try {
		if (_whiteChannel[ch] == undefined)
			throw("Error: Not in white channel.");
	} catch (err) {
		return;
	}
//	console.log("[%s]%s: %s", channelID, user, message);
	MsgInterpreter.MessageInterpreter.call(this, user, uID, ch, msg, raw);
}

//==================================
// End of File
//==================================