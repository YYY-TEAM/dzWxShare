
var Wechat =  require('node-wechat-sign')

var express = require('express');
require('babel-polyfill');

//var sign = require('../sign.js');
var wechatConfig = require('../wechat.conf.js');
//var axios = require('axios')

var router = express.Router();


/* GET home page. */
router.get('/one.do', function(req, res, next) {
  res.render('one', { });
});


// function getConfig(url, response) {
//   let accessTokenUrl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${wechatConfig.appId}&secret=${wechatConfig.secret}`
//   axios.get(accessTokenUrl).then(res=>{
//       let accessToken = res.data.access_token;
//       console.log('accessToken:',accessToken)

//       let jsapiTicketUrl = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${accessToken}&type=jsapi`
//       axios.get(jsapiTicketUrl).then(res=>{
//           let jsapi_ticket = res.data.ticket;
//           let wxconf = sign(jsapi_ticket, url)
//           console.log('wxconfig:',wxconf)

//           response.render('sign', { wxconf: wxconf});
//       }).catch(error=>{
//           console.log(error)
   
//           response.render('sign', { wxconf});
//       })
//   }).catch(error=>{
//       console.log(error)
    
//       response.render('sign', { wxconf: {}});
//   })
// }

/* GET home page. */
router.get('/sign.do', function(req, res, next) {
  // res.render('sign', { });
  var url = req.query.url
  //getConfig(url, res) 
  let config = {
    appid: wechatConfig.appId,
    secret: wechatConfig.secret
  }
 
  const wechat = new Wechat(config) 
  const signature = await wechat.sign(url)
  console.log('signature:', signature)
  response.render('sign', { wxconf: signature});
});


module.exports = router;
