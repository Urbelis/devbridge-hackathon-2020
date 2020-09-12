const Page = require('./page');

/**
 * sub page containing specific selectors and methods for a specific page
 */
class GamePage extends Page {
    /**
     * define selectors using getter methods
     */
    get btnStart () { return $('button[class="startGameBtn"]') }

    get snakeHead () { return $('div[class="areaField snakeHead"]')}

    // get snakeHeadId () { return $(document.getElementsByClassName("areaField snakeHead")[0].id)}
    /**
     * a method to encapsule automation code to interact with the page
     * e.g. to login using username and password
     */
    startGame () {
        this.btnStart.click();
    }

    /**
     * overwrite specifc options to adapt it to page object
     */
    open () {
        return super.open('login');
    }
}

module.exports = new GamePage();
