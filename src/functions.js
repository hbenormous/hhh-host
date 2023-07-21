const colors = require("colors");

class Fun {

	constructor () {}

	sleep (ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	clearConsole () {
		console.log("\n".repeat(process.stdout.rows));
		process.stdout.write("\u001b[3J\u001b[2J\u001b[1J");
		process.exit(true);
	}

	terminalConfig ({type, callType = "response", prefix = ":", message = ""}) {
		let types = { discord: "blue", haxball: "green", terminal: "white", config: "white" };
		let callTypes = { sucess: "green", error: "red", warn: "yellow", response: "white" };

		let a = Object.keys(types).find(element => element == type);
		let aG = a.toUpperCase();
		let aC = types[a];

		let b = Object.keys(callTypes).find(element => element == callType);
		let bC = callTypes[b];

		return colors[aC](`${aG}${prefix} `).bold + colors[bC](message);
	}

}

module.exports = { Fun };