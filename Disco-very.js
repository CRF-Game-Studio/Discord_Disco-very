//==================================
// Discord Plugin - Disco-very
// Disco-very.js
// Rebuild: 2016/01/13
//==================================

//==================================
// Load Module
//==================================

var DiscordClient = require('discord.io');
var DiscordCore = require("./js/Discord_Core");

//==================================
// Global_Variable
//==================================

var Disco_very = new DiscordClient(DiscordCore.LoadClientInfo());

//==================================
// Discord_Event
//==================================

Disco_very.on('ready', DiscordCore.Ready);
Disco_very.on('message', DiscordCore.Message);

//==================================
// End of File
//==================================