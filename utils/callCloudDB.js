const getAccessToken = require('../utils/getAccessToken')
const axios = require('axios')
//?调取云数据库
const callCloudDB = async (ctx, fnName, query = {}) => {
	const access_token = await getAccessToken()
	const url = `https://api.weixin.qq.com/tcb/${fnName}?access_token=${access_token}`
	return await axios
		.post(url, {
			query,
			env: ctx.state.env,
		})
		.then((res) => {
			// console.log(JSON.parse(res.data.data))
			//?数据类型
			return res.data
		})
}
module.exports = callCloudDB
