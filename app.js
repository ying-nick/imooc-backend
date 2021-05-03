const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const playlist = require('./controller/playlist')
//通过方法导入路由
router.use('/playlist',playlist.routes())

app.use(router.routes())
app.use(router.allowedMethods())

app.use(async (ctx) => {})

app.listen(3000, () => {
	console.log('running...')
})
