const GamePage = require('../pageobjects/game.page');

describe('Play snake', () => {
    it('It should play snake', () => {
        const grid = {};
        browser.setWindowSize(500, 388)
        GamePage.open();

        GamePage.startGame();

        browser.keys(" ");

        browser.keys("ArrowDown");

        // setInterval(() => getId(), 1)
        setInterval(() => moveRight(), 5)
        setInterval(() => moveDown(), 5)

        function moveRight() {
            browser.keys("ArrowRight")
        }

        function moveDown() {
            browser.keys("ArrowDown");
        }

        function getId(){
            grid.id = GamePage.snakeHead.getAttribute("id");
            console.log(grid.id)
        }

        browser.pause(180000);

        browser.saveScreenshot('screenshots/result.png')
    });
});


