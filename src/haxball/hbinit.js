const puppeteer = require("puppeteer");
const fs = require("fs");
const {
    Fun
} = require("../functions");

const fun = new Fun();

var page;
var frame;

class HBInit {

    async getRoomLink() {
        await frame.waitForSelector("#recaptcha");
        const recaptcha = await frame.evaluate(() => {
            return this?.grecaptcha;
        });

        if (recaptcha !== undefined || recaptcha?.getResponse()) {
            console.log(fun.terminalConfig({
                type: "haxball",
                callType: "error",
                message: "The token is invalid or expired."
            }));
            process.exit(true);
        }

        await frame.waitForSelector("#roomlink a");
        return await frame.$eval("#roomlink a", el => {
            return el.getAttribute("href");
        });
    }

    async connect(file, haxballToken) {

        const browser = await puppeteer.launch({
            headless: true,
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox"
            ]
        });

        page = await browser.newPage();

        await page.goto("https://www.haxball.com/headless", {
            waitUntil: "networkidle2"
        });
        await page.waitForTimeout(5000);

        const iframeEl = await page.waitForSelector("iframe");
        frame = await iframeEl.contentFrame();

        const headlessMinJs = await fs.readFileSync(__dirname + "/api/edited-headless-min.js", {
            encoding: "utf-8"
        });
        await frame.evaluate(headlessMinJs, { timeout: 10000 });
        await frame.waitForTimeout(3000);

        await frame.evaluate((haxballToken) => {
            this._fjdora_HHHEdited.token = haxballToken;
        }, haxballToken);

        const userCode = await fs.readFileSync(file, {
            encoding: "utf-8"
        });
        await page.evaluate(userCode, { timeout: 10000 });
        await frame.waitForTimeout(3000);

        /**
         * retorna o link da sala. Uma string
         */
        return await this.getRoomLink();

    }

    async room(method, args = []) {
        return await frame.evaluate((method, args) => {
            if (["CollisionFlags", "configObject"].includes(method)) {
                return this._fjdora_HHHEdited.room[method];
            }
            return this._fjdora_HHHEdited.room[method](...args);
        }, method, args);
    }

    async sendAnnouncement(message = null, targetId = null, color = 0xffffff, style = null, sound = null) {
        await this.room("sendAnnouncement", [message, targetId, color, style, sound]);
    }

    async clearBans() {
        await this.room("clearBans");
    }

    async kickPlayer(playerId, reason = "", ban = false) {
        await this.room("kickPlayer", [playerId, reason, ban]);
    }

    async getPlayerList() {
        return await this.room("getPlayerList");
    }

    async configObject() {
        return await this.room("configObject");
    }

}

module.exports = {
    HBInit
};