const { Fun } = require("../functions");
const { MessageEmbed } = require("discord.js");
const { HBInit } = require("../haxball/hbinit");

const fun = new Fun();
const room = new HBInit();

const boolean = a => { return a ? "yes" : "no" };
const string = a => { return a ? ""+a : "\u3164" };
const objUn = a => { return a === (undefined || null) ? "\u3164" : a };

class Command {

	send (message) {
		if ( message.content.toLowerCase().substr(0, 6) === "!send " && message.member.permissions.has("ADMINISTRATOR") ) {
			room.sendAnnouncement(`DISCORD ${message.author.username}: ${message.content.substr(6)}`, null, 0x7289da);

			message.channel.send("Message sent.");
		}
	}

	clearBans (message) {
		if ( message.content.toLowerCase() === "!clearbans" && message.member.permissions.has("ADMINISTRATOR") ) {
			room.sendAnnouncement(`DISCORD ${message.author.username} reset bans.`, null, 0x7289da);

			message.channel.send(`${message.author.username} reset bans.`);
		}
	}

	close (message) {
		if ( message.content.toLowerCase() === "!close" && message.member.permissions.has("ADMINISTRATOR") ) {
			room.sendAnnouncement(`DISCORD ${message.author.username} the room will close in 5 seconds.`, null, 0x7289da);

			message.channel.send("The room will close in 5 seconds.");

			setTimeout(fun.clearConsole, 5000);
		}
	}

	players (message) {

		if ( message.content.toLowerCase() === "!players" ) {
			room.getPlayerList().then(players => {

				const team = id => { return id == 1 ? "Red" : id == 2 ? "Blue" : "Spectator" };
				const list = players.map(player => `**${team(player.team)}** ${player.name}#${player.id}` ).join("\n");

				const embed = new MessageEmbed();

				embed
				.setTitle(`Players in the room (${players.length})`)
				.setDescription(players.length ? list : "\u3164");

				message.channel.send({
					embeds: [embed]
				});

			});
		}

	}

	player (message) {

		if ( message.content.toLowerCase().substr(0, 8) === "!player " && message.member.permissions.has("ADMINISTRATOR") ) {

			const playerID = message.content.substr(8);

			room.getPlayerList().then(players => {

				const player = players.find(p => p.id == playerID);

				if ( player === undefined ) return message.channel.send("This player is not in the room.");

				const embed = new MessageEmbed();

				embed
				.addFields(
					{ name: "NAME", value: player.name, inline: true },
					{ name: "ID", value: ""+player.id, inline: true },
					{ name: "TEAM", value: (player.team == 1 ? "red" : player.team == 2 ? "blue" : "spectator"), inline: true },
					{ name: "PING", value: `${player.ping}ms`, inline: true },
					{ name: "AVATAR", value: player.avatar, inline: true },
					{ name: "FLAG", value: `:flag_${player.flag}:`, inline: true },
					{ name: "ADMIN", value: boolean(player.admin), inline: true },
					{ name: "CONN", value: player.conn, inline: true },
					{ name: "IPV4", value: player["ipv4"], inline: true },
					{ name: "AUTH", value: player.auth, inline: true },
					{ name: "JOINED IN", value: new Date(player.join).toString() }
					);

				message.channel.send({
					embeds: [embed]
				});

			});

		}

	}

	kick (message) {

		const messages = message.content.toLowerCase().split(" ");

		if ( messages[0] === "!kick" && message.member.permissions.has("ADMINISTRATOR") ) {

			const playerID = messages[1];
			let ban = messages[2];
			let reason;

			if ( !playerID ) return message.channel.send("Player ID not set. Ex.: yes(ban) | no(kick) _ !kick 3 yes trolled the game");
			if ( playerID.match(new RegExp(/[0-9]/g)) === null ) return message.channel.send("Player ID must contain integers");
			if ( !["yes", "no"].includes(ban) && ban !== undefined ) return message.channel.send("The ban type must contain yes or no. yes(ban) and no(kick)");

			ban = ban === "yes" ? true : false;
			reason = messages.slice(3) === undefined ? "" : messages.slice(3).join(" ");

			room.getPlayerList().then(players => {

				const player = players.find(p => p.id == playerID);

				if ( player === undefined ) return message.channel.send("This player is not in the room.");

				message.channel.send(`${player.name} was ${ban === true ? "banned" : "kicked"} by ${message.author.tag} ${reason.length ? `(${reason})` : ""}`);
				room.kickPlayer(player.id, reason, ban);

			});

		}

	}

	room (message) {

		if ( message.content.toLowerCase() === "!room" ) {

			room.configObject().then(param => {

				const embed = new MessageEmbed();

				embed
				.addFields(
					{ name: "Public", value: boolean(param.public), inline: true },
					{ name: "RoomName", value: param.roomName, inline: true },
					{ name: "PlayerName", value: param.playerName, inline: true },
					{ name: "NoPlayer", value: boolean(param.noPlayer), inline: true },
					{ name: "MaxPlayer", value: string(param.maxPlayers), inline: true },
					{ name: "Password", value: objUn(string(param.password)), inline: true },
					{ name: "Link", value: param.url }
					);

				message.channel.send({
					embeds: [embed]
				});

			});

		}

	}

	cmds (message) {

		if ( message.content.toLowerCase() === "!cmds" ) {

			const adminCommands = new MessageEmbed();

			adminCommands
			.setTitle("ADMINISTRATOR")
			.addFields(
				{ name: "!send message", value: "send a message to the haxball room" },
				{ name: "!clearbans", value: "reset room bans" },
				{ name: "!close", value: "close the room and disconnect the discord bot" },
				{ name: "!player ID", value: "shows the information of the player who is in the room" },
				{ name: "!kick playerID ban reason", value: "kick the player out of the room. ban(yes or no). Ex.: !kick 2 yes racismo na sala" }
				);

			message.channel.send({
				embeds: [adminCommands]
			});

			const publicCommands = new MessageEmbed();

			publicCommands
			.setTitle("PUBLIC")
			.addFields(
				{ name: "!players", value: "shows the players that are in the room" },
				{ name: "!room", value: "show room info" }
				);

			message.channel.send({
				embeds: [publicCommands]
			});

		}

	}

}

module.exports = { Command };