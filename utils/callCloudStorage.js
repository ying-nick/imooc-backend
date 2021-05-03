const getAccessToken = require('../utils/getAccessToken')
const axios = require('axios')

const cloudStorage = {
	async download(ctx, fileList) {
		const access_token = await getAccessToken()
		const url = `https://api.weixin.qq.com/tcb/batchdownloadfile?access_token=${access_token}`
		return await axios
			.post(url, {
				env: ctx.state.env,
				file_list: fileList,
			})
			.then((res) => {
				// console.log(JSON.parse(res.data.data))
				// console.log(res.data)
				//?数据类型
				return res.data
			})
	},
}
module.exports=cloudStorage