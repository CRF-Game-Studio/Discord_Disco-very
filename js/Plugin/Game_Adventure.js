function Game_Adventure() {
	this._userList = {};
	this._mapSize = 25;
}

Game_Adventure.prototype.onCall = function(param) {
	if (this._userList[param[2]] == undefined) {
		this.newMap(param[2]);
		return "小依踏上了冒險的旅程！";
	}
	var ch = param[2];
	console.log(param[3]);
	var dir = param[3].substr(4, 1);
	console.log(dir);
	if (dir != "") {
		var step = this.getStep(dir);
		var x = this._userList[ch]._mPosition[0] += step[0];
		var y = this._userList[ch]._mPosition[1] += step[1];
		if (this._userList[ch]._map[x][y] == 1) {
			return "小依遇到Steam冬季大特賣，窮死了！";
			this.gameOver(ch);
		} else {
			for (i = 0; i < 4; i++)
				if (this._userList[ch]._map[x + step[0]][y + step[1]] == 1)
					return "小依聽到了淒厲的哀號聲跟鈔票聲，心中有一絲不祥的預感...";
			return "小依向" + dir + "走，感受到大草原上美好的氣味";
		}
	}
	return dir;
}

Game_Adventure.prototype.newMap = function(ch) {
	this._userList[ch] = {};
	this._userList[ch]._map = [];
	for (i = 0; i < this._mapSize; i++) {
		this._userList[ch]._map[i] = [];
		for (j = 0; j < this._mapSize; j++) {
			var tmp = Math.floor(Math.random() * 5);
			if (tmp) this._userList[ch]._map[i][j] = 0;
			else this._userList[ch]._map[i][j] = 1;
		}
	}
	this._userList[ch]._mPosition = [this.getRandPosition(), this.getRandPosition()];
	console.log(this._userList[ch]._map);
}

Game_Adventure.prototype.getRandPosition = function() {
	return Math.floor(Math.random() * this._mapSize);
}

Game_Adventure.prototype.getStep = function(msg) {
	var _step = {"東": [1, 0], "西": [-1, 0], "南": [0, 1], "北": [0, -1]};
	return _step[msg];
}

Game_Adventure.prototype.gameOver = function(ch) {
	this._userList[ch] = undefined;
}

module.exports = Game_Adventure;