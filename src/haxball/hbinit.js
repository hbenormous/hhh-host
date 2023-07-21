const puppeteer = require("puppeteer");
const fs = require("fs");
const {
    Fun
} = require("../functions");

const fun = new Fun();

var page;
var frame;

class HBInit {

    async getRecaptchaResponse() {
        await frame.waitForSelector("#recaptcha");
        const res = await frame.evaluate(() => {
            return grecaptcha?.getResponse();
        });

        // string
        return res;
    }

    async getRoomLink() {
        const recaptchaRes = await this.getRecaptchaResponse();

        if (recaptchaRes === undefined || recaptchaRes?.length === 0) {
            console.log(fun.terminalConfig({
                type: "haxball",
                callType: "error",
                message: "The token is invalid or expired."
            }));
            process.exit(true);
        }

        await page.waitForSelector("#roomlink a");
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

        await page.goto("https://html5.haxball.com/hhyLXo3K/__cache_static__/g/headless.html", {
            waitUntil: "networkidle2"
        });
        await page.waitForTimeout(5000);

        const iframeEl = await page.waitForSelector("iframe");
        frame = await iframeEl.contentFrame();

        /**
         * inserir o script da API editado
         */
        await frame.evaluate(fs.readFileSync(__dirname + "/api/edited-headless-min.js", {
            encoding: "utf-8"
        }));
        await page.waitForTimeout(3000);

        /**
         * criar uma variavel global chamada {token} que recebe uma string com o token
         */
        await frame.addScriptTag({
            content: `this._fjdora_HHHEdited.token = "${haxballToken}";`
        });

        /**
         * inserir o script do usuário na página
         */
        await page.evaluate(fs.readFileSync(file, {
            encoding: "utf-8"
        }));
        await page.waitForTimeout(5000); // tempo minimo pra evitar qualquer erro

        /**
         * retorna o link da sala. Uma string
         */
        return await this.getRoomLink();

    }

    async sendAnnouncement(message = null, targetId = null, color = 0xffffff, style = null, sound = null) {

        await frame.addScriptTag({
            content: `_fjdora_HHHEdited.room.sendAnnouncement("${message}", ${targetId}, "${color}", "${style}", "${sound}");`
        });

    }

    async clearBans() {

        await frame.addScriptTag({
            content: `_fjdora_HHHEdited.room.clearBans();`
        });

    }

    async kickPlayer(playerID, reason = "", ban) {

        await frame.addScriptTag({
            content: `_fjdora_HHHEdited.room.kickPlayer(${playerID}, "${reason}", ${ban});`
        });

    }

    async getPlayerList() {

        const players = await frame.evaluate(() => {

            return _fjdora_HHHEdited.room.getPlayerList();

        });

        return players;

    }

    async configObject() {

        return await frame.evaluate(() => {

            return _fjdora_HHHEdited.room.configObject;

        });

    }

}

module.exports = {
    HBInit
};