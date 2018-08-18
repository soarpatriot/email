const router = require('koa-router')()
var nodemailer = require('nodemailer')
const smtp = require('../config/smtp.json')
const token = require('../config/token.json')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
router.prefix('/emails')

let smtpConfig = {
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: smtp.auth
}

router.post('/', async (ctx, next) => {
  let auth = ctx.request.headers['authorization']
  const to = ctx.request.body.to
  const subject = ctx.request.body.subject
  const text = ctx.request.body.text
  const html = ctx.request.body.html

  const oauth_val = `OAuth ${token.access_token}`
  console.log(auth)
  if(auth !== oauth_val) {
    ctx.throw(401, 'unauthrorized account');
  } else {
    let transporter = nodemailer.createTransport(smtpConfig);
    let mailOptions = {
        from: smtp.from, // sender address
        // from: '"drone" <drone_ci@126.com>', // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        text: text, // plaintext body
        html: html  // html body
    };
    let result = await transporter.sendMail(mailOptions)
    console.log(result)
    ctx.body = result
  }
})


module.exports = router
