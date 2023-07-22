const { HBInit } = require("./haxball/hbinit");
const { Prompt } = require("./prompt");
const { Fun } = require("./functions");
const client = require("./discord/index");

const prompt = new Prompt();
const fun = new Fun();

class Server {

	constructor () {}

	haxball (file, haxballToken) {
		const room = new HBInit();

		room
		.connect(file, haxballToken)
		.then(roomLink => {
			(async () => {
				await console.log(fun.terminalConfig({
					type: "haxball",
					callType: "sucess",
					message: roomLink
				}));

				await fun.sleep(500);

				console.log(fun.terminalConfig({
					type: "terminal",
					callType: "sucess",
					message: "!send [message], !clearbans, !close"
				}));

				await fun.sleep(500);

				await prompt.terminal();
			})();
		})
		.catch(error => {
			if (error.code === "ENOENT") console.log(fun.terminalConfig({
				type: "haxball",
				callType: "error",
				message: "File not found."
			}));
			else throw error;

			process.exit(true);
		});
	}

	discord (discordToken) {
		client
		.login(discordToken)
		.then(() => {
			console.log(fun.terminalConfig({
				type: "discord",
				callType: "sucess",
				message: "Successfully logged in."
			}));
		})
		.catch(() => {
			console.log(fun.terminalConfig({
				type: "discord",
				callType: "error",
				message: "The token is invalid."
			}));
			process.exit(true);
		});

		client.on("ready", () => {
			console.log(fun.terminalConfig({
				type: "discord",
				callType: "sucess",
				message: "Online bot."
			}));
		});
	}

	async run ({file, discordToken}) {
		if ( (file && discordToken) != undefined ) {
			console.log(fun.terminalConfig({
				type: "haxball",
				callType: "warn",
				message: "Get your token: https://www.haxball.com/headlesstoken"
			}));
			await fun.sleep(500);
			let haxballToken = await prompt.question(fun.terminalConfig({
				type: "haxball",
				callType: "warn",
				message: "Enter the token: "
			}));

			await this.haxball(file, haxballToken);

			await this.discord(discordToken);
		}
		else {
			console.log(fun.terminalConfig({
				type: "config",
				callType: "error",
				message: "Some parameter was not filled."
			}));
			process.exit(true);
		}
	}

}

module.exports = { Server };