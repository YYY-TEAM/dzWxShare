
function closeById(id){
	$(id).slideUp();
}

function s_ph(flag){
	//排行
	if(flag){
		$('#s_ph').fadeIn();
	}else{
		$('#s_ph').fadeOut();
	}
}
function s_bm(){
	//报名
	if(joined!=0){
		layer.alert('您已经报名了');
		//window.location.href="http://w.dzwww.com/zt/chaojp/detail.php?id="+joined;
	}else{
		$('#page5').slideDown().siblings('.wrapper').slideUp();
	}
}
function bm(flag){
	//报名
	if(flag){
		$('#page6').slideDown().siblings('.wrapper').slideUp();
	}else{
		$('#page1').slideDown().siblings('.wrapper').slideUp();
	}
}
function s_hd(){
	//活动详情
	$('#page3').slideDown().siblings('.wrapper').slideUp();
}

function s_gr(){
	//个人
	if(joined==0){
		layer.alert('您还没有报名');
		//window.location.href="http://w.dzwww.com/zt/chaojp/detail.php?id="+joined;
	}else{
		window.location.href="http://w.dzwww.com/zt/chaojp/detail.php?id="+joined;
	}
}

function s_gz(flag){
	//规则
	if(flag){
		$('#page3 #shadow').show();
	}else{
		$('#page3 #shadow').hide();
	}
}

function s_share(flag){
	if(flag){
		$('#page4 #share').show();
	}else{
		$('#page4 #share').hide();
	}
}

function s_home(){
	$('#page1').slideDown().siblings('.wrapper').slideUp();
}

function tDream(){
	//page2 传递梦想
	$('#page7 .shadow').slideDown();
	$('#page7 .share').slideDown();
}
function iKnow(){
	//page2 我知道了
	$('#page7 .shadow').slideUp();
	$('#page7 .share').slideUp();
}

/////////////
function isWeiXin(){
	var ua = window.navigator.userAgent.toLowerCase();
	if(ua.match(/MicroMessenger/i) == 'micromessenger'){
		return true;
	}else{
		return false;
	}
}
function isQQ(){
	var ua = window.navigator.userAgent.toLowerCase();
	if(ua.match(/ QQ/i) == ' qq'){
		return true;
	}else{
		return false;
	}
}
function is24(){
	var ua = window.navigator.userAgent.toLowerCase();
	if(ua.match(/ sd24/i) == 'sd24'){
		return true;
	}else{
		return false;
	}
}
var haibao={
	name:0,
	mobile:0,
	xuanyan:0,
	addr:0,
	qicai:0,
	chezhu:-1,
	localId:null,
	serverId:null,
	offx:0,
	offy:0,
	scale:0
}
var dx, dy;
var initialScale = 1;
var currentScale;
var TouchFlag=false;
function upload(){
	
	if(!isWeiXin()){
		if(isQQ()){
			qq();
		}else{
			alert('请在微信中打开');
		}
	}
	
	choseImage(null,function(id){
		$('.img_upload').attr('src',id);
		haibao.localId=id;
	},
	function(res){
		alert(JSON.stringify(res));
	});
}

function b_submit(){
	haibao.name=$('.b_name').val();
	haibao.mobile=$('.b_mobile').val();
	haibao.xuanyan=$('.b_xuanyan').val();
	haibao.addr=$('.b_addr').val();	
	haibao.qicai=$("input[name='qicai']:checked").val();
	haibao.chezhu=$("input[name='chezhu']:checked").val();
	
	if(haibao.name.length<2){
		layer.alert('请填写姓名');
		return false;
	}
	if(haibao.mobile.length<2){
		layer.alert('请填写手机');
		return false;
	}
	if(haibao.xuanyan.length<2){
		layer.alert('请填写青春誓言');
		return false;
	}

	if(haibao.addr.length<2){
		layer.alert('请填写拍摄地点');
		return false;
	}

	if(haibao.localId==null){
		layer.alert('请上传照片');
		return false;
	}
	
	$('#page7').slideDown().siblings('.wrapper').slideUp();

	$('#haibao').attr('src',haibao.localId);
	$('#page7_p1').html(haibao.xuanyan);
	$('#page7_p2').html(haibao.name);

	dx=dy=0;
	initialScale=1;
	$('#haibao').get(0).style.webkitTransform = "";

	if(!TouchFlag){
		initPic();
		TouchFlag=true;
	}
}
function initPic(){
	//缩放拖拽海报
	
	touch.on('#haibao', 'touchstart', function(ev){
		ev.preventDefault();
	});
	touch.on('#haibao', 'drag', function(ev){
		dx = dx || 0;
		dy = dy || 0;
		var offx = dx + ev.x + "px";
		var offy = dy + ev.y + "px";
		this.style.webkitTransform = "translate3d(" + offx + "," + offy + ",0)";
		haibao.offy=offy;
		haibao.offx=offx;
		//document.getElementsByTagName('title')[0].innerHTML=offx+'=='+offy
	});
	
	touch.on('#haibao', 'pinchend', function(ev){
		currentScale = ev.scale - 1;
		currentScale = initialScale + currentScale;
		currentScale = currentScale > 2 ? 2 : currentScale;
		currentScale = currentScale < 1 ? 1 : currentScale;
		this.style.webkitTransform = 'scale(' + currentScale + ')';
		haibao.scale=currentScale;
	});
	touch.on('#haibao', 'pinchend', function(ev){
		initialScale = currentScale;
	});
	touch.on('#haibao', 'dragend', function(ev){
		dx += ev.x;
		dy += ev.y;
	});
}


function submits(){
	//提交海报
	uploadImage(haibao,function(serverId){
		haibao.serverId=serverId;
		var index = layer.load(0, {shade: false});
		$.post("./index.php?c=submits",{info:haibao},function(data){
			if(data>0){
				setTimeout(function(){
					layer.close(index);
					layer.confirm('海报已经生成啦，快分享给小伙伴们吧！', {
						btn: ['好滴'] 
					}, function(){
						window.location.href="http://w.dzwww.com/zt/chaojp/detail.php?id="+data
					});

				},2000);
			}else{
				layer.alert('生成失败，请稍后再试。');
			}
		});
	});
	
}
$(function(){
	if(page!='detail'){
		if(!isWeiXin()){
qq();
			// if(isQQ()||is24()){
			// 	qq();
			// }else{
			// 	alert('请在微信中打开');
			// }
		}
	}
});

function qq(){
	$('.shadow2').slideDown();
	$('.inQQ').slideDown();
}
function iKnow2(){
	$('.shadow2').slideUp();
	$('.inQQ').slideUp();
}

