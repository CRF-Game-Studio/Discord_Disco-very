//==================================
// Discord_PluginCommand
//==================================

var _Game = {
	"測智商": IQ_Test
};
var UserGame = {};
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
		if (UserGame[param[1]] == undefined)
			UserGame[param[1]] = new bla(param[0]);
		var tmp = UserGame[param[1]].play();
		console.log(tmp);
		return tmp;
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

function IQ_Test(param) {
	this.time = {};
	return param[0] + "的智商是" + param[1] % 180 + "！"
}

function bla(name) {
	this.time = 0;
	this.name = name;
}

bla.prototype.play = function() {
	this.time++;
	return this.name + " bla " + this.time + " times.";
}