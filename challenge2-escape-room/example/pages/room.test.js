import RoomPage from "../pages/roomPage"

describe("escape room", ()=> {

    let roomPage = new RoomPage();

    beforeEach(async () => {
        console.log("Running escape room test suite");
        await roomPage.visit();
        await roomPage.intro.click();
    });

    it("should escape the room", async () => {
        // 1. Drag starts into holes
        await roomPage.star1.waitUntilVisible();
        await roomPage.star1.dragAndDrop(await roomPage.starHoles);
        await roomPage.star2.dragAndDrop(await roomPage.starHoles);
        await roomPage.star3.dragAndDrop(await roomPage.starHoles);

        // 2. Click postcard right bottom corner (id="postcard2") to unclock TV-dial
        await roomPage.postcard2.click();

        // 3. Drag TV-dial (id="tvdial") onto TV (id="tv")
        await roomPage.tvDial.dragAndDrop(await roomPage.tv);

        // 4. Click flower postcard to open letters (id="postcard4")
        await roomPage.postcard4.click();

        // 5. Click capital letters
        await roomPage.C.click();
        await roomPage.A.click();
        await roomPage.P.click();
        await roomPage.I.click();
        await roomPage.T.click();
        await roomPage.A.click();
        await roomPage.L.click();

        // 6. Click "Cantaloupes" post-card (id = "postcard3") to open The--State sign
        await roomPage.postcard3.click();

        // 7. Drag number 31 (id="starhint") to The--State sign (id="numCard")
        await roomPage.number31.dragAndDrop(await roomPage.stageSign);

        // 8. Click on Capital postcard (id="postcard1") to open safe with code
        await roomPage.postcard1.click();

        // 9. 1850 - 1400 = 450 (from hint). Enter 450 into safe code:
        //     - dial 1 (class="dial dial1") x4 times
        // let i = 0;
        // for(i=1; i>=4; i=++){
        //     await roomPage.dial1.click();
        // }
        var i;
        for (i = 0; i < 4; i++) {
            await roomPage.dial1.click();
        }
        
        //     - dial 2 (class="dial dial2") x5 times
        for (i = 0; i < 5; i++) {
            await roomPage.dial2.click();
        }

        // 10. Drag key (id="last_key") into lock (class="capital_secret").
        await roomPage.key.dragAndDrop(await roomPage.lock);

        // 11. Escaped! Take screenshot
        const escaped = await page.screenshot();
        expect(escaped).toBeTruthy();
    });
})