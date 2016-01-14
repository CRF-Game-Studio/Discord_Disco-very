//==================================
// Discord_PluginCommand
//==================================

var Game_Bla = require("./Plugin/Game_Bla");
var Game_Adventure = require("./Plugin/Game_Adventure");
var Game_Fap = require("./Plugin/Game_Fap");
var gameBla = new Game_Bla();
var gameAdventure = new Game_Adventure();
var gameFap = new Game_Fap();

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
	var gameType = param[3].substr(1, param.length).toLowerCase();
	//	console.log(param[3]);
	console.log(param[0] + " play " + gameType);
	// return _Game[gameType](param);
	
	if (gameType == "bla") {
		return gameBla.onCall(param);
	} else if (gameType.indexOf("adv") == 0) {
		return gameAdventure.onCall(param);
	} else if (gameType.indexOf("fap") == 0) {
		return gameFap.onCall(param);
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

