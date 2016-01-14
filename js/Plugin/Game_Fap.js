function Game_Fap() {
	this.user = {};
}

Game_Fap.prototype.onCall = function(param) {
	var uID = param[1];
	if (this.user[uID] == undefined)
		this.user[uID] = 0;
	var t = ++this.user[uID];
	if (t <= 2)
		return param[0] + "怒尻一發，覺得舒爽";
	else if (t <= 4)
		return param[0] + "怒尻一發，覺得右手有點酸";
	else if (t <= 6)
		return param[0] + "尻了第" + t + "發，這個快感讓他停不下無止盡的尻尻人生";
	else if (t == 7)
		return param[0] + "尻到一半，突然胸口一緊，攝護腺爆裂，精盡人亡";
	else
		return param[0] + "躺在地上露出奈米屌，整個人一動也不動\n全世界的男人都替他默哀"
}

module.exports = Game_Fap;