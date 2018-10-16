const puppeteer = require('puppeteer')

(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://jd.com')
    await page.screenshot({path:'jd.png'})

    await browser.close()
})()