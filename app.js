const Koa = require('koa')
const app = new Koa()

app.use(async (ctx) => {})

app.listen(3000, () => {
	console.log('running...')
})
