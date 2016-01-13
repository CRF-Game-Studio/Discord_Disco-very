//==================================
// Discord_MsgInterpreter
//==================================

var Command = require("./Discord_PluginCommand");
var DiscordCommand = new Command();

exports.MessageInterpreter = function(user, userID, channelID, message, rawEvent) {
	var msgBegin = message.substr(0, 1),
		msgEnd = message.substr(message.length - 2, 1);
	// console.log(msgBegin + " " + msgEnd);
	if (this.username != user && DiscordCommand[msgBegin] != undefined) {
		say.call(this, channelID, DiscordCommand[msgBegin]([user, userID, channelID, message, rawEvent]));
	} else if (msgBegin == "^") {
		var split_m = message.substr(1, message.length - 1);
		split_m = split_m.split(" ");
		var cmd = split_m[0]? split_m[0]: split_m;
		var param = split_m[1]? message.substr(cmd.length + 1, message.length - cmd.length - 2): "";
		console.log("Cmd: " + cmd + ", Param: ", param);
		say.call(this, channelID, DiscordCommand["^"](cmd, param));
	}
}

function say(ch, msg) {
	if (this.sendMessage == undefined) {
		console.log("Error: Need to use .call(this) with Discord.io");
		return;
	}
	this.sendMessage({
		to: ch,
		message: msg
	})
}

