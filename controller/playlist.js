const Router = require('koa-router')
const router = new Router()
const callCloudFn = require('../utils/callCloudFn')
const callCloudDB = require('../utils/callCloudDB')

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
		// console.log(data)
	}

	//模板要求返回code20000
	ctx.body = {
		data,
		code: 20000,
	}
})
router.get('/getById', async (ctx, next) => {
	const query = `db.collection('playlist').doc('${ctx.request.query.id}').get()`
	// console.log(ctx.request.query.id)
	const res = await callCloudDB(ctx, 'databasequery', query)
	// console.log(res)
	// console.log(JSON.parse(res.data))
	ctx.body = {
		code: 20000,
		data: JSON.parse(res.data),
	}
})

router.post('/updatePlaylist', async (ctx, next) => {
	const params = ctx.request.body
	const query = `db.collection('playlist').doc('${params._id}').update({
    data:{
      name:'${params.name}',
      copywriter:'${params.copywriter}'
    }
  })`
  //?异步
	const res =await callCloudDB(ctx, 'databaseupdate', query)
	// console.log(res)
	ctx.body = {
		code: 20000,
		data: res,
	}
})

router.get('/del', async (ctx, next) => {
  const params = ctx.request.query
  const query = `db.collection('playlist').doc('${params.id}').remove()`
  const res = await callCloudDB(ctx, 'databasedelete', query)
  ctx.body = {
    code: 20000,
		data: res,
  }
})
module.exports = router
