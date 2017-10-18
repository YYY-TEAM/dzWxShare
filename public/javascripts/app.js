var dzwww_appid = '';
var dzwww_timestamp = '';
var dzwww_nonceStr = '';
var dzwww_signature = '';
var _path = window.location.href;
_path = "http://w.dzwww.com/zt/dqhy/share.jpg";

function initWx() {
    var jqxhr = $.ajax({
        url:"/sign?url="+encodeURIComponent(location.href.split('#')[0]),
        cache: false
    })
    
    jqxhr.done(function (res) {
    
        var wxConf = res.wx
        /**
         *配置config信息 
        */
        wx.config({
            debug: true,
            appId: wxConf.appId,
            timestamp: wxConf.timestamp,
            nonceStr: wxConf.nonceStr,
            signature: wxConf.signature,
            jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo', 
            'chooseImage',
            'previewImage',
            'uploadImage',
            'downloadImage' 
            ]
        });
    
        wx.ready(function () {

            wx_data.title = '不忘入党初心，重温入党誓词！';
            wx_data.desc = '我和党旗合个影';
            wx_data.imgUrl = _path;
            wx_data.link = "http://w.dzwww.com/zt/dqhy/index.php",
            // 分享到朋友圈
            shareTimeline(wx_data);
            // 分享给好友
            shareAppMessage(wx_data);
            shareQQ(wx_data);
        });
    })

    jqxhr.fail(function (err) {
        alert(JSON.stringify(err))
    })
    wx.error(function (res) {
        console.log(res);
    });
}

 var wx_data = {
    title : "分享标题",
    link : "",
    imgUrl : "http://www.dzwww.com/tpl/v2015/images/header-logo.gif",
    desc :"分享描述"
};
/**
 * 获取分享链接
 * @param url
 * @returns {String}
 */
 function getURL(url){
    return 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + dzwww_appid + '&redirect_uri='+url+'&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
}
/**
 * 分享到朋友圈
 * @param data
 */
 function shareTimeline(data){
    wx.onMenuShareTimeline({
        title : data.title,
        link : data.link,
        imgUrl : data.imgUrl,
        fail : function(res) {
            alert(JSON.stringify(res));
        }
    });
}
/**
 * 分享给朋友
 * @param data
 */
 function shareAppMessage(data){
    wx.onMenuShareAppMessage({
        title : data.title,
        link : data.link,
        imgUrl : data.imgUrl,
        desc : data.desc,
        fail : function(res) {
            alert(JSON.stringify(res));
        }
    });
}
/**
 * 分享到QQ
 * @param data
 */
 function shareQQ(data){
    wx.onMenuShareQQ({
        title : data.title,
        link : data.link,
        imgUrl : data.imgUrl,
        desc : data.desc,
        fail : function(res) {
            alert(JSON.stringify(res));
        }
    });
}
/**
 * 分享到微博
 */
 function shareWeibo(data){
    wx.onMenuShareWeibo({
        title : data.title,
        link : data.link,
        imgUrl : data.imgUrl,
        desc : data.desc,
        fail : function(res) {
            alert(JSON.stringify(res));
        }
    });
}
/*选择图片*/
function choseImage(data,callback,fail_callback){
    wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        callback(localIds);
    },
    fail :function(res){
        fail_callback(res);
    }
});
}
function uploadImage(data,callback){
    wx.uploadImage({
    localId: data.localId[0].toString(),  // 需要上传的图片的本地ID，由chooseImage接口获得
    isShowProgressTips: 1, // 默认为1，显示进度提示
    success: function (res) {
        var serverId = res.serverId; // 返回图片的服务器端ID
        callback(serverId);
    },
    fail : function(res) {
        alert(JSON.stringify(res));
    }
});
}
