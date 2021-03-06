const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const cors = require('koa2-cors')
const koaBody = require('koa-body')
const router = new Router()
//小程序环境id
const Env = 'cloud1-8g4btmo4df7e108b'
app.use(
	cors({
		origin: ['http://localhost:9528'],
		credentials: true,
	})
)
//接收post参数的解析
app.use(
	koaBody({
		multipart: true,
	})
)

//全局中间件
app.use(async (ctx, next) => {
	// console.log('quanju')
	ctx.state.env = Env
	await next()
})
const playlist = require('./controller/playlist')
const swiper = require('./controller/swiper')
const blog = require('./controller/blog')
//通过方法导入路由
router.use('/playlist', playlist.routes())
router.use('/swiper', swiper.routes())
router.use('/blog', blog.routes())

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000, () => {
	console.log('running...')
})
