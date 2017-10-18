var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var wechatConfig = require('./wechat.conf.js')
var axios = require('axios')
var sign = require('./sign.js');
var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', index);


app.get('/sign', function(req, res) {
  var url = req.query.url

  getConfig(url, res)

  function getConfig(url, response) {
  let accessTokenUrl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${wechatConfig.appId}&secret=${wechatConfig.secret}`
  axios.get(accessTokenUrl).then(res=>{
      let accessToken = res.data.access_token;
      console.log('accessToken:',accessToken)

      let jsapiTicketUrl = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${accessToken}&type=jsapi`
      axios.get(jsapiTicketUrl).then(res=>{
          let jsapi_ticket = res.data.ticket;
          let wxconf = sign(jsapi_ticket, url)
          console.log('wxconfig:',wxconf)

          //response.render('index', { wxconf: wxconf});
          response.json({wx: wxconf})
      }).catch(error=>{
          console.log(error)

          //response.render('index', { wxconf});
          response.json({wx:{}})
      })
  }).catch(error=>{
      console.log(error)

     // response.render('index', { wxconf: {}});
	response.json({wx:{}})
  })
}

})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
