const Router = require('koa-router')
const router = new Router()
const getAccessToken = require('../utils/getAccessToken')
const axios=require('axios')
//小程序环境id
Env='cloud1-8g4btmo4df7e108b'
router.get('/list', async (ctx, next) => {
  const access_token=await getAccessToken()
  //查询歌单列表
  const url=`https://api.weixin.qq.com/tcb/invokecloudfunction?access_token=${access_token}&env=${Env}&name=music`
  ctx.body = await axios.post(url, {
    $url: 'playlist',
    start: 0,
    count:50
  }).then(res => {
    // console.log(res.data.resp_data)
    return JSON.parse(res.data.resp_data)
  }).catch(err => {
    console.log(err)
  })
})

module.exports=router