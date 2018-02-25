var DiscordClient = require('discord.io');
var bot = new DiscordClient(getNewDcClient());
var whiteCh = "154514530284601344"; // 這是yee_ai的Channel ID

bot.on('ready', discordReady); // 當Bot就緒時呼叫
bot.on('message', discordMsg); // 當聊天室有訊息的時候呼叫

function getNewDcClient() {
	var client = {};
	client.email = "輸入你的Discord帳號(email)";
	client.password = "輸入你的Discord密碼";
	client.autorun = true;
	return client;
}

function discordReady() {
	console.log(bot.username + " - (" + bot.id + ")");
}

function discordMsg(user, userID, chID, msg, rawEvent) {
	if (!isProcessRequire(user, userID, chID)) return;
	say(chID, "嗨，" + user);
}

function say(ch, ms) {
    bot.sendMessage({
        to: ch,
        message: ms
    });
}

function isProcessRequire(user, userID, chID) {
	if (whiteCh != chID) return false;
	if (userID == bot.id) return false;
	return true;
}