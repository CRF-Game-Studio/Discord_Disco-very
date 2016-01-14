//==================================
// Discord_PluginCommand
//==================================

var Game_Bla = require("./Plugin/Game_Bla");
var Game_Adventure = require("./Plugin/Game_Adventure");
var gameBla = new Game_Bla();
var gameAdventure = new Game_Adventure();

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
	var gameType = param[3].substr(1, param.length);
	console.log(param[3]);
	// return _Game[gameType](param);
	
	if (gameType == "bla") {
		return gameBla.onCall(param);
	} else if (gameType.indexOf("冒險") == 0) {
		return gameAdventure.onCall(param);
	}
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

