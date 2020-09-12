import { Element } from "test-juggler";

export default class SnakePage {
    constructor() {
        this.baseUrl = "https://seokky.github.io/vue-snake-game/";
        this.startGameButton = new Element('.startGameBtn');

        this.snakeHead = new Element('.snakeHead');
        this.meat = new Element('.meatField');
    }

    async visit() {
        await page.goto(`${this.baseUrl}`, { waitUntil: 'networkidle0' });
    }

    async startGame() {
        await this.startGameButton.click();
    }

    async startStopSnake() {
        await page.keyboard.press('Space');
    }

    async getCoordinates() {
        const snakeID = await this.snakeHead.getAttributeValue('id');
        const snakeX = parseInt(snakeID.split(':')[0]);
        const snakeY = parseInt(snakeID.split(':')[1]);
        const meatID = await this.meat.getAttributeValue('id');
        const meatX = parseInt(meatID.split(':')[0]);
        const meatY = parseInt(meatID.split(':')[1]);
        console.log(`Snake: ${snakeID} Meat: ${meatID}`);
        return {'snake': {'x': snakeX, 'y': snakeY}, 'meat': {'x': meatX, 'y': meatY}};
    };

    async desitionX(coo) {
        switch(coo['snake']['x'] > coo['meat']['x']) {
            case true:
                await page.keyboard.press('ArrowLeft');
                console.log(`KAIRE`);
              break;
            case false:
                await page.keyboard.press('ArrowRight');
                console.log(`DESINE`);
              break;
            default:
                console.log(`NIEKO NIEKO NIEKO`);
          } 
    };

    async desitionY(coo) {
        switch(coo['snake']['y'] > coo['meat']['y']) {
            case true:
                await page.keyboard.press('ArrowUp');
                console.log(`ZEMYN`);
              break;
            case false:
                await page.keyboard.press('ArrowDown');
                console.log(`VIRSUN`);
              break;
            default:
                console.log(`NIEKO NIEKO NIEKO`);
          } 
    };
}