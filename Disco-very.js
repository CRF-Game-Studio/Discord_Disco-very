var USERNAME = "MemesCaller"
var white_channel = [];

var psrUser = [], psrOrder = [], psrN  = [], psrLeft = 0, psrType = ["剪刀", "石頭", "布"], psrTotal = [];
var myStr = "野格炸彈我的最愛", myHash = [], cdNow = -1;

var fs = require('fs');
var DiscordClient = require('discord.io');
var cleverbot = require("cleverbot.io");
var clever = new cleverbot('t77jVhrskGDT6Dm1', 'XKmJ3XW1dQwVJVXpWfODAUQ5qKucD6tc');
var memes = putMemes();
var regexs = {};
var bot = new DiscordClient(getNewDiscordClient());

bot.on('ready', function () {
    console.log(bot.username + " - (" + bot.id + ")");
    Object.keys(memes).forEach(function (i) {
        regexs[i] = new RegExp(i)
    });
	initCatchDragon();
});

bot.on('message', function (user, userID, channelID, message, rawEvent) {
	console.log(channelID + " " + user);
	if (white_channel[channelID] == undefined) return;
	
	mStart = message[0]; mEnd = message[message.length - 1];

	// Admin Command
    // if (mStart == '^' && user == USERNAME) {
        // var command = message.slice(1, (message.indexOf(' ') != -1) ? message.indexOf(' '):message.length);
        // var parm = (message.indexOf(' ') != -1) ? message.slice(message.indexOf(' ') + 1, message.length) : "";
        // console.log("From:" + user + ", Com: " + command);
		// if (parm != "") console.log("Param: " + parm);
        // commands(command.toLowerCase(), parm, userID, channelID);
    // } 
	// Memes Caller
	if((mStart == '[' || mStart == ']') && (mEnd == '[' || mEnd == ']')) {
        var meme = message.slice(1,message.length-1);
        var found = false;
        Object.keys(memes).forEach(function (i) {
            if(regexs[i].test(meme))
                say(channelID, memes[i]), found = true;
        });
		if (found) console.log(user + "call out a memes: " + meme);
        if (!found) console.log("Memes not found.");
    }
	// Play Games
	else if (mStart == '!') {
		var game = message.substr(1, message.length - 1);
		console.log(game);
		playGame(user, game, channelID, userID);
	}
	else if (mStart == '%') {
		message = message.substr(1);
		clever.ask(message, function (err, response) {
			if (err) console.log(err);
			else say(channelID, ("%" + response));
		});
	}
	// Userdefine String
	else if (user != USERNAME && myStr.indexOf(message) >= 0) {
		textCatchDragon(channelID, message);
	}
});

//==================================
// CatchDargon
//==================================
function initCatchDragon() {
	for (i = 0; i < myStr.length; i++)
		myHash[myStr[i]] = myStr[i + 1];
}

function textCatchDragon(ch, msg) {
	if (cdNow < 0 && !myStr.indexOf(msg)) cdNow = 0;
	if (cdNow == myStr.indexOf(msg)) {
		if (Math.floor(Math.random() * 5)) {
			say(ch, myHash[msg]);
			cdNow += 2;
			if (cdNow >= myStr.length) {
				say(ch, "接龍成功！");
				cdNow = -1;
			}
		} else {
			say(ch, "斷");
			cdNow = -1;
		}
	} else if (cdNow > 0) {
		say(ch, "不要亂接！");
		// cdNow = -1;
	}
}

function say(ch, ms) {
    bot.sendMessage({
        to: ch,
        message: ms
    });
}

function playGame(user, game, ch, userID) {
	var msg, t;
	if (game == "測智商") {
		msg = user + "的智商是" + userID % 180 + "!";
	} else if (game == "匪諜") {
		if (userID % 3) msg = "抓到了！" + user + "是匪諜！";
		else msg = "小心！匪諜就在你身邊！";
	} else if (game == "猜拳") {
		if (!psrLeft) {
			for (i = 0; i < 3; i++)
				psrN[i] = 0;
			msg = user + "舉辦天下猜拳大賽，參賽者三人，先出先贏\n第1位參賽者是：" + user + "\n";
			psrLeft = 2;
		} else {
			psrLeft--;
			msg = "第" + (3 - psrLeft) + "位參賽者是：" + user + "\n";
		}
		psrUser[psrLeft] = user;
		t = Math.floor(Math.random() * 3);
		msg += user + "出" + psrType[t] + "！\n";
		psrN[t]++; psrOrder[psrLeft] = t;
		if (!psrLeft) {
			// psrOrder[0] = 0; psrOrder[1] = 2; psrOrder[2] = 0;
			// psrN[0] = 2; psrN[1] = 0; psrN[2] = 1;
			// console.log(psrUser);
			// console.log("User: " + psrUser + "\nN: " + psrN + "\nOrder: " + psrOrder);
			msg += "比賽結果：";
			for (i = 0; i < 3; i++)
				psrTotal[psrN[i]] = i;
			// console.log("Total: " + psrTotal);
			if (psrN[3] || ((psrN[0] == psrN[1]) && (psrN[1] == psrN[2]))) msg += "三人平手！";
			else if (psrN[2]) {
				if ((psrN[2] > psrN[1] && psrN[2] - psrN[1] == 1) || (psrN[2] == 0 && psrN[1] == 2)) {
					flag = 0;
					for (i = 0; i < 3; i++) {
						console.log(psrOrder[i] + " " + psrTotal[2] + " " + psrUser[i]);
						if (psrOrder[i] == psrTotal[2]) msg += psrUser[i];
						if (!flag) msg += "、", flag = 1;
					}
				} else {
					for (i = 0; i < 3; i++)
						if (psrOrder[i] == psrN[1]) msg += psrUser[i];
				} msg += "獲勝！";
			}
		}
	}
	if (msg != undefined) say(ch, msg);
}

function putMemes() {
    var array = {};
    fs.readFile("memes.txt", "utf8", function (err, data) {
        if (err) return console.log(err);
        
		var memesplit = data.split('\n');
		
        for(var m in memesplit) {
            var split_m = memesplit[m].split('\t');
            array[split_m[0]] = split_m[1].substr(0, split_m[1].length);
        }
    });
    return array;
}

function getNewDiscordClient() {
	var array = {};
	var data = fs.readFileSync("setting.ini", "utf8");
	
	data = data.split('\r\n');
	for (var i in data) {
		var s = data[i].split(": ");
		console.log(s);
		s[0] = s[0].toLowerCase();
		if (s[0] == "autorun") {
			array["autorun"] = !!eval(s[1]);
		} else if (s[0] == "email") {
			array["email"] = s[1];
		} else if (s[0] == "password") {
			array["password"] = s[1];
		} else if (s[0] == "white_channel") {
			white_channel[s[1]] = 1;
		} else if (s[0] == "username") {
			USERNAME = s[1];
		}
	}

	return array;
}

//==================================
// End of File
//==================================