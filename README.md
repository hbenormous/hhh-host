<p align="center"><img src="https://raw.githubusercontent.com/hbenormous/hhh-host/main/docs/img/icon.png" width="100" style="text-align: center;">
</p>

<h1 align="center">Haxball Headless Help Host</h1>

[![versão da lib](https://img.shields.io/npm/v/hhh-host.svg)](https://www.npmjs.com/package/hhh-host)

## ⚠️ Warnings
- Don't use hhh-host to do evil
- The library is open source
- Support for this library is done on discord https://discord.com/invite/UWYuxwEKfn

## 🤔 How to use

### 📥 Library installation
- `npm i hhh-host`
- create two files one for hhh-host and one for your bot

#### my-bot-example.js
```js
const room = HBInit({});

room.onPlayerJoin = (player) => {
    room.sendAnnouncement(`Hi, ${player.name}[${player.ipv4}]`, player.id);
};
````

#### api.js
```js
const { Server } = require("hhh-host");

const server = new Server();

/**
 * @param {string} file - Your bot file.
 * @param {string} discordToken - Your discord bot token. https://discordjs.guide/preparations/setting-up-a-bot-application.html#your-bot-s-token
 */

server.run({
    file: "my-bot-example.js",
    discordToken: "YOUR_DISCORD_TOKEN"
});
```

<hr>

### 🏁 Start the script
- `node api.js`
- ![set token](https://raw.githubusercontent.com/hbenormous/hhh-host/main/docs/img/set-token.png)
- get the token here https://www.haxball.com/headlesstoken
- ![open room](https://raw.githubusercontent.com/hbenormous/hhh-host/main/docs/img/open-room.png)

<hr>

### 💻 Commands

- `!send message` - send a message to the haxball room
- `!clearbans` - reset room bans
- `!close` - close the room and disconnect the discord bot
- `!player ID` - shows the information of the player who is in the room
- `!kick playerID ban reason` - kick the player out of the room. ban(yes or no). Ex.: !kick 2 yes racismo na sala
- `!players` - shows the players that are in the room
- `!room` - show room info
- `!cmds` - show all commands

<hr>

# 🗺️ HaxBall Headless Host API

## PlayerObject

...

`flag : string`
returns player flag

`ping : int`
returns player ping

`conn : String` & `auth : String`
is now considered a global inside "PlayerObject"

`join : int`
returns a Date.now() of the time the player entered the room

`avatar : string`
returns player avatar

`ipv4 : string`
returns the player's public ip

## RoomObject

...

`configObject : RoomConfigObject`
return room settings