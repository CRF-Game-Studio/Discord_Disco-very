//==================================
// Discord_Event
//==================================

exports.LoadClientInfo = function() {
	var prop = {
		autorun: true,
		email: true,
		password: true,
		username: true,
	}, client = {};
	var fs = require('fs');
	var data = fs.readFileSync("setting.ini", "utf8");
	
	data = data.split('\r\n');
	for (var i in data) {
		var str = data[i].split(':');
		if (str[1] != undefined) {
			str[1] = str[1].trim();
			try {
				str[1] = !!eval(str[1]);
			} catch (err) {
				console.log(str[1]);
			};
			if (prop[str[0]])
				client[str[0]] = str[1];
		}
	}
	return client;
}

exports.Ready = function() {
	console.log(this.username + " Login Successed.");
}

exports.Message = function (user, userID, channelID, message, rawEvent) {
	console.log("[%s]%s: %s", channelID, user, message);
}

//==================================
// End of File
//==================================