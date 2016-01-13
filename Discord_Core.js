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
		username: true,
	}, client = {};
	var data = fs.readFileSync("setting.ini", "utf8");
	
	data = data.split('\r\n');
	for (var i in data) {
		var str = data[i].split(':');
		if (str[1] != undefined) {
			str[1] = str[1].trim();
			try {
				str[1] = !!eval(str[1]);
			} catch (err) {
				console.log("Load " + str[0]);
			};
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
	var data = fs.readFileSync("white_channel.ini", "utf8");
	data = data.split('\r\n');
	for (var i in data) {
		_whiteChannel[data[i]] = true;
	}
}

exports.Message = function (user, userID, channelID, message, rawEvent) {
	try {
		if (_whiteChannel[channelID] == undefined)
			throw("Error: Not in white channel.");
	} catch (err) {
		return;
	}
	console.log("[%s]%s: %s", channelID, user, message);
	MsgInterpreter.MessageInterpreter.call(this, user, userID, channelID, message, rawEvent);
}

//==================================
// End of File
//==================================