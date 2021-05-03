const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const cors=require('koa2-cors')
const router = new Router()
app.use(cors({
  origin: ['http://localhost:9528'],
  credentials:true
}))
const playlist = require('./controller/playlist')
//通过方法导入路由
router.use('/playlist',playlist.routes())

app.use(router.routes())
app.use(router.allowedMethods())



app.listen(3000, () => {
	console.log('running...')
})
