const getAccessToken = require('../utils/getAccessToken')
const axios = require('axios')
const fs = require('fs')
const rp = require('request-promise')
const FormData = require('form-data')
const qs = require('qs')
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
	async upload(ctx) {
		const access_token = await getAccessToken()
		//请求地址
		const file = ctx.request.files.file
		const path = `swiper/${Date.now()}-${Math.random()}-${file.name}`
		const url = `https://api.weixin.qq.com/tcb/uploadfile?access_token=${access_token}`
		//请求上传参数
		const info = await axios
			.post(url, {
				env: ctx.state.env,
				path,
			})
			.then((res) => {
				// console.log(JSON.parse(res.data.data))
				// console.log(res.data)
				//?数据类型
				return res.data
			})
		// console.log(info)
		//?上传图片
		/* 	let formData = new FormData()
		formData.append('key', path)
		formData.append('Signature', info.authorization)
		formData.append('x-cos-security-token', info.token)
		formData.append('x-cos-meta-fileid', info.cos_file_id)
		formData.append('file', fs.createReadStream(file.path))
		const headers = {
			'content-type': 'multipart/form-data',
		}
		let i = 0
		// console.log(formData)
		for (var item in formData) {
			if (item) {
				i++
			}
		}
		console.log(i)
		headers['content-length'] = i
		await axios.post(info.url, formData, { headers }) */
		//create axios
		/* 	await axios({
			method: 'POST',
			headers: {
				'content-type': 'multipart/form-data',
			},
			url: info.url,
			data: qs.stringify({
				key: path,
				Signature: info.authorization,
				'x-cos-security-token': info.token,
				'x-cos-meta-fileid': info.cos_file_id,
				file: fs.createReadStream(file.path),
			}),
		}) */
		//request方法
		const params = {
			method: 'POST',
			headers: {
				'content-type': 'multipart/form-data',
			},
			uri: info.url,
			formData: {
				key: path,
				Signature: info.authorization,
				'x-cos-security-token': info.token,
				'x-cos-meta-fileid': info.cos_file_id,
				file: fs.createReadStream(file.path),
			},
			json: true,
		}
		await rp(params)
		return info.file_id
	},
}
module.exports = cloudStorage
