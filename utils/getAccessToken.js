const axios = require('axios')
const appId = 'wx9d9dfad9a375e0d1'
const secret = '9e12688833e6e6adcd0e26f00bbfeda4'
const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${secret}`
const fs = require('fs')
const path = require('path')
const fileName = path.resolve(__dirname, './access_token.json')

//?获取token
const updateAccessToken = async () => {
	const { data } = await axios.get(url)
	// console.log(data)
	if (data.access_token) {
		//TOKEN写入文件
		fs.writeFileSync(
			fileName,
			JSON.stringify({
				access_token: data.access_token,
				createTime: new Date(),
			})
		)
	} else {
		await updateAccessToken()
	}
}
//?读取json文件中的token
const getAccessToken = async () => {
	try {
		const readRes = JSON.parse(fs.readFileSync(fileName, 'utf-8'))
		// console.log(readRes)
		//服务器宕机重启时，判断token是否过期
		const createTime = new Date(readRes.createTime).getTime()
		const nowTime = new Date().getTime()
		if ((nowTime - createTime) / 1000 / 60 / 60 >= 2) {
			await updateAccessToken()
			await getAccessToken()
		}
		return readRes.access_token
	} catch (error) {
		await updateAccessToken()
		await getAccessToken()
	}
}
//?每两小时更新token
setInterval(async () => {
	await updateAccessToken()
}, (7200 - 300) * 1000)
module.exports=getAccessToken