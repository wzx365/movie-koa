const Koa = require('koa')
const app = new Koa()
const { resolve } = require('path')
const views = require('koa-views')
const { ejsTpl, pugTpl, htmlTpl } = require('./tpl')
const ejs = require('ejs')
const pug = require('pug')

app.use(views(resolve(__dirname, './views'), {
    extension: 'pug'
}))

app.use(async (ctx, next) => {
    await ctx.render('index', {
        you: 'tom hankesi 测试模板中间件',
        me: 'james yuehanxun'
    })
})

// app.use(async (ctx, next) => {
//     ctx.type = 'text/html; charset=utf-8'
//     // ctx.body = ejs.render(ejsTpl, {
//     //     you: 'tom',
//     //     me: 'james'
//     // }) 
//     ctx.body = pug.render(pugTpl, {
//         you: 'tom hankesi',
//         me: 'james yuehanxun'
//     })
// })

app.listen(80, () => console.log('server is listening at localhost:80'))