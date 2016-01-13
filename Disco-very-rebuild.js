//==================================
// Discord Plugin - Disco-very
// Disco-very.js
// Rebuild: 2016/01/13
//==================================

//==================================
// Load Module
//==================================

var fs = require('fs');
var DiscordClient = require('discord.io');
var Cleverbot = require('cleverbot.io');
var DiscordCore = require("./Discord_Core.js");

//==================================
// Global_Variable
//==================================

var bot = new DiscordClient(DiscordCore.LoadClientInfo());

//==================================
// Discord_Event
//==================================

bot.on('ready', DiscordCore.Ready);
bot.on('message', DiscordCore.Message);

//==================================
// End of File
//==================================