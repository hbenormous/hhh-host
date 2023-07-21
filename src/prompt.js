const readline = require("readline").createInterface({ input: process.stdin, output: process.stdout });
const { HBInit } = require("./haxball/hbinit");
const { Fun } = require("./functions");

class Prompt {

	async question (question) {
		return await new Promise(resolve => readline.question(question, response => resolve(response)));
	}

	terminal () {
		let commands = () => {
			const room = new HBInit();
			const fun = new Fun();

			readline.question(fun.terminalConfig({
				type: "terminal",
				prefix: ">"
			}), response => {

				if ( response.substr(0, 6) === "!send " ) {
					room.sendAnnouncement(`TERMINAL: ${response.substr(6)}`, null, 0xFFFF00);

					console.log(fun.terminalConfig({
						type: "terminal",
						callType: "sucess",
						message: "Message sent."
					}));
				}

				else if ( response === "!clearbans" ) {
					room.clearBans();
					
					console.log(fun.terminalConfig({
						type: "terminal",
						callType: "sucess",
						message: "Bans reset."
					}));
				}

				else if ( response === "!close" ) fun.clearConsole();

				else if ( response === "!cmds" ) console.log(fun.terminalConfig({
					type: "terminal",
					callType: "sucess",
					message: "!send [message], !clearbans, !close, !cmds"
				}));

					else if ( response || response.length == 0 ) console.log(fun.terminalConfig({
						type: "terminal",
						callType: "error",
						message: "Command not found. type !cmds to see the commands."
					}));
						
				});
		}

		commands();

		process.stdin.on("keypress", (teclaString, teclaObject) => {
			if ( teclaObject.name === "return" ) commands();
		});
	}

}

module.exports = { Prompt };