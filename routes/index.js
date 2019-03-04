const router = require('koa-router')()
const translate = require('google-translate-api');
const request = require('superagent');

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/t', async (ctx, next) => {
  let res = await translate('english', {from: 'en', to: 'nl'})
  ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/test', async (ctx, next) => {
  const res = await request
  .get('https://yun.dreamreality.cn/test')

  ctx.body = {
    title: res.text
  }
})

router.get('/test-long', async (ctx, next) => {
  const res = await request
  .get('https://yun.dreamreality.cn/medium')

  ctx.body = {
    title: res.text
  }
})

module.exports = router
