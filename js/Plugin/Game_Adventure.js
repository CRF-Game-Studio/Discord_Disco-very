function Game_Adventure() {
	this._userList = {};
	this._mapSize = 25;
}

Game_Adventure.prototype.onCall = function(param) {
	var msg = "", atNew = 0;
	var ch = param[2];
	if (this._userList[ch] == undefined) {
		this.newMap(ch); atNew = 1;
		msg += "小依踏上了冒險的旅程！\n";
	}
	
	var dir = param[3].substr(param[3].indexOf(" ") + 1, 1);

	if (this.getStep(dir) != undefined) {
		var step = this.getStep(dir);
		var x = this._userList[ch]._mPosition[0] += step[0];
		var y = this._userList[ch]._mPosition[1] += step[1];
		if (this._userList[ch]._map[x][y] == 1) {
			this.gameOver(ch);
			msg += "小依遇到Steam冬季大特賣，窮死了！\n" + "戰犯：" + param[0];
		} else {
			this.detectDamage(ch);
			if (!atNew) msg += "小依向" + this.getStepWord(dir) + "走，感受到大草原上美好的氣味\n";
		}
	}
	return msg;
}

Game_Adventure.prototype.newMap = function(ch) {
	this._userList[ch] = {};
	this._userList[ch]._map = [];
	for (i = 0; i < this._mapSize; i++) {
		this._userList[ch]._map[i] = [];
		for (j = 0; j < this._mapSize; j++) {
			var tmp = Math.floor(Math.random() * 10);
			if (tmp) this._userList[ch]._map[i][j] = 0;
			else this._userList[ch]._map[i][j] = 1;
		}
	}
	var x = this.getRandPosition(), y = this.getRandPosition();
	this._userList[ch]._mPosition = [x, y];
	this._userList[ch]._map[x][y] = 0;
	console.log(this._userList[ch]._map);
	console.log(this._userList[ch]._mPosition);
}

Game_Adventure.prototype.detectDamage = function(ch) {
	var pos = this.getXY(ch);
	for (i = 0; i < 4; i++)
		if (this._userList[ch]._map[x + step[0]][y + step[1]] == 1)
			break;
	if (i != 4) msg += "小依聽到了淒厲的哀號聲跟鈔票聲，心中有一絲不祥的預感...";
}

Game_Adventure.prototype.getRandPosition = function() {
	return Math.floor(Math.random() * this._mapSize);
}

Game_Adventure.prototype.getStep = function(msg) {
	var _step = {"d": [1, 0], "a": [-1, 0], "s": [0, 1], "w": [0, -1]};
	return _step[msg];
}

Game_Adventure.prototype.getStepWord = function(step) {
	var _step = "dasw", _stepWord = "東西南北";
	return _stepWord[_step.indexOf(step)];
}

Game_Adventure.prototype.gameOver = function(ch) {
	this._userList[ch] = undefined;
}

Game_Adventure.prototype.getXY = function(ch) {
	return this._userList[ch]._mPosition;
}

module.exports = Game_Adventure;