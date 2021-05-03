const getAccessToken = require('../utils/getAccessToken')
const axios = require('axios')
const Env = 'cloud1-8g4btmo4df7e108b'
const callCloudFn = async (ctx, fnName, params) => {
	const access_token = await getAccessToken()
	//查询歌单列表
	const url = `https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${access_token}&env=${Env}&name=${fnName}`
	// console.log(ctx.state.env, params)
	return await axios
		.post(url, {
			...params,
		})
		.then((res) => {
			// console.log(res.data.resp_data)
			return res
		})
}
module.exports = callCloudFn
callCloudFn()
