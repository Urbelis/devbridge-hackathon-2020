const URL = 'http://jis.robobeau.com/';


describe('Escape the room', () => {
    beforeEach(async () => {
        await page.goto(URL);
    });

    it('should escape a room', async () => {
        await page.waitForSelector('#stage');
        await page.keyboard.press('ArrowRight',{'delay': 1000});
        await page.keyboard.press('ArrowUp',{'delay': 400});
        // const playerCoords = await page.$$eval("#player", el => el.map(x => x.getAttribute("style")));
        // console.log(playerCoords[0].split(";"));
        await page.keyboard.press('ArrowRight',{'delay': 1000});
        await page.keyboard.press('ArrowDown',{'delay': 300});
        await page.keyboard.press('ArrowLeft',{'delay': 1700});
        await page.keyboard.press('ArrowDown',{'delay': 800});
        await page.keyboard.press('ArrowLeft',{'delay': 300});
        await page.keyboard.press('ArrowDown',{'delay': 100});
        await page.waitForSelector('#loading', {'visible': 'true'});
        await page.waitForSelector('#loading', {'hidden': 'true'});
        await page.keyboard.press('ArrowDown',{'delay': 700});
        await page.keyboard.press('ArrowRight',{'delay': 1500});
        await page.keyboard.press('ArrowUp',{'delay': 400});
        await page.waitForTimeout(500);
        let playerCoords = await getPlayerCoords();
        let neighborCoords = await getNeighborCoords();
        let leftCoord = await calculateLeftCoords(playerCoords, neighborCoords);
        let topCoord = await calculateTopCoords(playerCoords, neighborCoords);
        await navigate(leftCoord, topCoord);
        playerCoords = await getPlayerCoords();
        neighborCoords = await getNeighborCoords();
        leftCoord = await calculateLeftCoords(playerCoords, neighborCoords);
        topCoord = await calculateTopCoords(playerCoords, neighborCoords);
        await navigate(leftCoord, topCoord);
        await page.keyboard.press('Space', {'delay': 300});
        await page.waitForTimeout(500);
        await page.screenshot({'path':'screenshots/shot.png'});
    });
});


async function navigate(leftCoord, topCoord) {
    if (leftCoord < 0) {
        let numberOfSteps = Math.abs(Math.floor(leftCoord / 32));
        console.log(numberOfSteps);
        for (let i=0;i < numberOfSteps;i++) {
            await page.keyboard.press('ArrowRight',{'delay': 200});
        }
    } else if (leftCoord > 0) {
        let numberOfSteps = Math.abs(Math.floor(leftCoord / 32));
        console.log(numberOfSteps);
        for (let i=0;i < numberOfSteps;i++) {
            await page.keyboard.press('ArrowLeft',{'delay': 200});
        }
    }

    if (topCoord < 0) {
        let numberOfSteps = Math.abs(Math.floor(topCoord / 32));
        console.log(numberOfSteps);
        for (let i=0;i < numberOfSteps;i++) {
            await page.keyboard.press('ArrowDown',{'delay': 200});
        }
    } else if (topCoord > 0) {
        let numberOfSteps = Math.abs(Math.floor(topCoord / 32));
        console.log(numberOfSteps);
        for (let i=0;i < numberOfSteps;i++) {
            await page.keyboard.press('ArrowUp',{'delay': 200});
        }
    }
}

async function calculateLeftCoords(playerCoords, neighborCoords) {
    return parseInt(playerCoords.left.slice(0, -2)) - parseInt(neighborCoords.left.slice(0, -2));
}

async function calculateTopCoords(playerCoords, neighborCoords) {
    return parseInt(playerCoords.top.slice(0, -2)) - parseInt(neighborCoords.top.slice(0, -2));
}

async function getPlayerCoords() {
    return await page.evaluate(() => {
        const player = document.querySelector('#player');
        return JSON.parse(JSON.stringify(getComputedStyle(player)));
    });
}

async function getNeighborCoords() {
    return await page.evaluate(() => {
        const neighbor = document.querySelector('#n000');
        return JSON.parse(JSON.stringify(getComputedStyle(neighbor)));
    });
}