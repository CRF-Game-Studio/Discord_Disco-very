//==================================
// Discord Plugin - Disco-very
// Disco-very.js
// Rebuild: 2016/01/13
//==================================

//==================================
// Load Module
//==================================

var fs = require('fs');
var DiscordClient = require('discord.io');
var Cleverbot = require('cleverbot.io');

//==================================
// Global_Variable
//==================================

var bot = new DiscordClient(System_Discord());

//==================================
// System_Discord
//==================================

function System_Discord() {
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
				console.log(str[1]);
			};
			if (prop[str[0]])
				client[str[0]] = str[1];
		}
	}
	return client;
}

function Discord() {
	this.Ready = function() {
		console.log(bot.username + " Login Successed.");
	}

	this.Message = function(user, userID, channelID, message, rawEvent) {
		console.log("[%s]%s: %s", channelID, user, message);
	}
}

//==================================
// Discord_Event
//==================================

bot.on('ready', Discord.Ready());
bot.on('message', Discord.Message(user, userID, channelID, message, rawEvent));

//==================================
// End of File
//==================================