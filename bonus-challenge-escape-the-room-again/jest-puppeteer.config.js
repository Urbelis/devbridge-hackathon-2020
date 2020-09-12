// jest-puppeteer.config.js
module.exports = {
    launch: {
        dumpio: true,
        headless: false,
        // args: ['--disable-dev-shm-usage']
    },
    browser: 'chromium',
    browserContext: 'default'
};