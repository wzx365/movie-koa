const url = 'https://movie.douban.com/explore#!type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=20&page_start=0'

const puppeteer = require('puppeteer')

const sleep = time => new Promise(resolve => {
    setTimeout(resolve, time);
})

console.log(url)

;(async () => {
    console.log('start visit the target page!')
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        dumpio: false
    })
    const page = await browser.newPage()
    await page.goto(url, {
        waitUntil: 'networkidle2'
    })
    await sleep(3000)

    await page.waitForSelector('.more')

    for (let i = 0; i < 1; i++) {
        await sleep(3000) 
        await page.click('.more')
        await sleep(3000) 
    }

    const result = await page.evaluate(() => {
        let $ = window.$ 
        let items = $('.list-wp .list .item')
        let links = []

        if (items && items.length) {
            items.each((index, item) => {
                let it = $(item)
                let doubanId = it.find('.cover-wp').data('id')
                let title = it.find('img').attr('alt')
                let rate = Number(it.find('strong').text())
                let poster = it.find('img').attr('src').replace('s_ratio', 'l_ratio')

                links.push({
                    doubanId,
                    title,
                    rate,
                    poster
                })
            })
        }
        return links
    })

    browser.close()
    
    console.log('---result---')
    console.log(result.length)
    console.log(result)

    process.send({result, code: 200})
    process.exit(0)

})()