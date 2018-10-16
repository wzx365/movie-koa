

const base = 'https://movie.douban.com/subject/'
const doubanId = '26985127'
const baseUrl = 'https://movie.douban.com/trailer/234740/#content'

const puppeteer = require('puppeteer')

const sleep = time => new Promise(resolve => {
    setTimeout(resolve, time);
})


;(async () => {
    console.log('start visit the target page!')
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        dumpio: false
    })
    const page = await browser.newPage()
    await page.goto(base + doubanId, {
        waitUntil: 'networkidle2'
    })
    await sleep(3000)

    const result = await page.evaluate(() => {
        let $ = window.$ 
        let it = $('#related-pic .related-pic-video')

        if (it && it.length) {
            let link = it.attr('href')
            let cover = it.css('backgroundImage').replace('url("', '').replace('")', '')

            return {
                link,
                cover
            }
        }

        return {}
    })

    let video 

    if (result.link) {
        await page.goto(result.link, {
            waitUntil: 'networkidle2'
        })
        await sleep(2000)

        video = await page.evaluate(() => {
            let $ = window.$ 
            var it = $('video source')
            if (it && it.length) {
                return it.attr('src')
            }
            return ''
        })
    }

    const data = {
        doubanId,
        video,
        cover: result.cover
    }

    browser.close()
    
    console.log('---data---')
    console.log(data)

    process.send({data, code: 200})
    process.exit(0)

})()