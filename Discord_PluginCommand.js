//==================================
// Discord_PluginCommand
//==================================

var _Game = {
	"測智商": IQ_Test
};

module.exports = function() {
	return {
		"!": exports.Game,
		"%": exports.Chat,
		"^": exports.Admin,
		"[": exports.Meme
	}
}

// 0	1		2	3	4
// user	userID	ch	msg	rawEvent

exports.Game = function(param) {
	// var gameType = param[3].substr(1, param.length);
	// console.log(gameType);
	// return _Game[gameType](param);
	return "Game!";
}

exports.Chat = function(param) {
	return "Chat!";
}

exports.Meme = function(param) {
	return "Meme!";
}

exports.Admin = function(cmd, param) {
	console.log("Command: Admin");
}

function IQ_Test(param) {
	return param[0] + "的智商是" + param[1] % 180 + "！"
}