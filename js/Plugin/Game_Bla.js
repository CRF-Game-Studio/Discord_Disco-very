//==================================
// Game_Bla // Just for test, lol.
//==================================

function Game_Bla() {
	this._userList = {};
}

Game_Bla.prototype.onCall = function(param) {
	var ch = param[2], id = param[1], name = param[0];
	if (this._userList[ch + id] == undefined)
		this._userList[ch + id] = 0;
	console.log(this._userList);
	return this.play(name, id, ch);
}

Game_Bla.prototype.play = function(name, id, ch) {
	this._userList[ch + id]++;
	return name + " bla " + this._userList[ch + id] + " times.";
}

module.exports = Game_Bla;