import SnakePage from "../dar/snakePage"

describe("snake", ()=> {

    let snakePage = new SnakePage();
    

    beforeEach(async () => {
        console.log("Running snake game");
        await snakePage.visit();
        await snakePage.startGame();
        await snakePage.startStopSnake();
    });

    it("should score", async () => {
        let coo = await snakePage.getCoordinates();
        console.log('DARIUS');
        console.log(coo);

        while(1) {
            coo = await snakePage.getCoordinates();
            await snakePage.desitionX(coo);
            await snakePage.desitionY(coo);
            //await page.waitFor(100);
        }
        // var i;
        // for (i = 0; i < 4; i++) {
        //     await roomPage.dial1.click();
        // }
    });

    
});