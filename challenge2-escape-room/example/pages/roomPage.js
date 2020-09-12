import { Element } from "test-juggler";

export default class RoomPage {
    constructor() {
        this.baseUrl = "https://www.enchambered.com/puzzles/escape-sacramento-landmark-puzzle-capital/game/";

        this.progressBar = new Element('.progress-holder');
        this.intro = new Element('.intro');

        this.star1 = new Element('#star1');
        this.star2 = new Element('#star2');
        this.star3 = new Element('#star3');
        this.starHoles = new Element('#holes');

        this.postcard1 = new Element('#postcard1');
        this.postcard2 = new Element('#postcard2');
        this.postcard3 = new Element('#postcard3');
        this.postcard4 = new Element('#postcard4');

        this.tvDial = new Element('#tvdial');
        this.tv = new Element('#tv');

        this.C = new Element('.key3');
        this.A = new Element('.key1');
        this.P = new Element('.key9');
        this.I = new Element('.key6');
        this.T = new Element('.key2');
        this.L = new Element('.key8');

        this.number31 = new Element('#starhint');
        this.stageSign = new Element('#numCard');

        this.dial1 = new Element('.dial1');
        this.dial2 = new Element('.dial2');

        this.key = new Element('#last_key');
        this.lock = new Element('.capital_secret');
    }

    async visit() {
        await page.goto(`${this.baseUrl}`, { waitUntil: 'networkidle0' });
        await this.progressBar.waitUntilInvisible();
    }

}