//==================================
// Discord_MsgInterpreter
//==================================

exports.MessageInterpreter = function(user, userID, channelID, message, rawEvent) {
	var msgBegin = message.substr(0, 1),
		msgEnd = message.substr(message.length - 2, 1);
	console.log(msgBegin + " " + msgEnd);
	if (this.username != user) {
		say.call(this, channelID, msgBegin);
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