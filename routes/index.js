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
  .get('http://140.143.202.92:9500/test')

  ctx.body = {
    title: res
  }
})

module.exports = router
