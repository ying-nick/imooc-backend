const Router = require('koa-router')
const router = new Router()
const getAccessToken = require('../utils/getAccessToken')
const axios = require('axios')
//小程序环境id
Env = 'cloud1-8g4btmo4df7e108b'
router.get('/list', async (ctx, next) => {
	const access_token = await getAccessToken()
	//查询歌单列表
	const url = `https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${access_token}&env=${Env}&name=music`
	const query = ctx.request.query
	const data = await axios
		.post(url, {
			$url: 'playlist',
			start: parseInt(query.start),
			count: parseInt(query.count),
		})
		.then((res) => {
			// console.log(res.data.resp_data)
			return JSON.parse(res.data.resp_data)
		})
	//模板要求返回code20000
	ctx.body = {
		data,
		code: 20000,
	}
})

module.exports = router
