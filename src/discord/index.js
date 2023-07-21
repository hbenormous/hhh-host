const { HBInit } = require("../haxball/hbinit");
const { Client, Intents } = require("discord.js");
const { Command } = require("./commands");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const command = new Command();

client.on("messageCreate", message => {
	
	command.send(message);
	command.clearBans(message);
	command.close(message);
	command.players(message);
	command.player(message);
	command.kick(message);
	command.room(message);
	command.cmds(message);

});

module.exports = client;