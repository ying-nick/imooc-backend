const Router = require('koa-router')
const router = new Router()
const callCloudFn = require('../utils/callCloudFn')

router.get('/list', async (ctx, next) => {
	const query = ctx.request.query
	// console.log(query.start)
	let start = parseInt(query.start)
	let count = parseInt(query.count)
	// console.log(start, count)
	const res = await callCloudFn(ctx, 'music', {
		$url: 'playlist',
		start,
		count,
	})
	let data = []
	// console.log(res)
	//?数据类型
	if (res) {
		data = res
		console.log(data)
	}

	//模板要求返回code20000
	ctx.body = {
		data,
		code: 20000,
	}
})

module.exports = router
