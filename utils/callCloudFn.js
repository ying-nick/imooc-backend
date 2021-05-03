const getAccessToken = require('../utils/getAccessToken')
const axios = require('axios')

const callCloudFn = async (ctx, fnName, params) => {
  const access_token = await getAccessToken()
	//查询歌单列表
	const url = `https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${access_token}&env=${ctx.state.env}&name=${fnName}`
	return await axios
		.post(url, {
		...params
		})
		.then((res) => {
      // console.log(res.data.resp_data)
      //?数据类型
			return JSON.parse(res.data.resp_data).data
		})
}
module.exports=callCloudFn