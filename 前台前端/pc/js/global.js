//var url = "http://www.xypuxing.com"
//var url = "http://127.0.0.1:8080/web2"
var url=global_url;
$(function(){
	$("[data-toggle='tooltip']").tooltip();
	var $a = 0;
	$("#search_type").on("click",function(){
		if($a>=2)
			$a = 0;
		else
			$a++;
		var $type = ["全部","活动","讲座"];
		$(this).text($type[$a])
	})
})

var datas = [
				{
					homePgaeData:{
						event_discover_module:[
							{
								type: 0,
								event_dt:"时间",
								icon_class:"glyphicon glyphicon-time",
								result:["全部","今天","明天","本周","本周末","本月"]
							},
							{
								type: 1,
								event_dt:"类型",
								icon_class:"glyphicon glyphicon-certificate",
								result:["全部","活动","讲座"
									// {
									// 	key: '0',
									// 	cont: '全部'
									// },{
									// 	key: '1',
									// 	cont: '活动'
									// },{
									// 	key: '2',
									// 	cont: '讲座'
									// }
								]
							},
							{
								type: 2,
								event_dt:"标签",
								icon_class:"glyphicon glyphicon-tags",
								result:{}
							}
						],
						search_cont: ''
					}
				}
				
	]
// function lg(){
// if(!$.isEdge()){
// 	if(window.sessionStorage){
// 		var storage = window.sessionStorage
// 		var name = storage.getItem("stuName")
// 		if(name)
// 			return name;
// 		else
// 			return 0;
// 	}
// 	else{
// 		var name = getCookie("stuName")
// 		if(name!="")
// 			return name;
// 		else
// 			return 0;
// 		}
// 	}

// }
Vue.component('px-home-nav',{
	props: ['detailpage'],
	template: ['<div id="px_navigation" class="navbar navbar-default navbar-fixed-top px-index-nav" role="navigation">',
					'<div class="box-mid">',
						'<div class="navbar-header">',
							'<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="px_navigation">',
								'<span class="sr-only"></span>',
								'<span class="icon-bar"></span>',
								'<span class="icon-bar"></span>',
								'<span class="icon-bar"></span>',
							'</button>',
							'<a href="javascript:void(0)" @click="daohang.retHome" class="navbar-brand">校园蒲行</a>',
						'</div>',
						'<form class="navbar-form navbar-left">',
							'<div class="input-group">',
								'<div class="tooltip-box">',
									'<a href="javascript:void(0)" id="search_type" class="search-type" data-trigger="hover" data-toggle="tooltip" data-placement="bottom" title="点击替换搜索类型">全部</a>',
								'</div>',
								'<input class="search-query-box" type="text" v-model="search_cont" placeholder="请输入搜索关键字">',
								'<a href="javascript:void(0)" onclick="on_search()" class="px-search-btn">',
									'<span class="glyphicon glyphicon-search"></span>',
								'</a>',
							'</div>',
						'</form>',
						'<div class="collapse navbar-collapse">',
							'<ul class="nav navbar-right navbar-nav">',
								'<li id="px_user_lr" v-if="daohang.isLogin==false">',
									'<a href="javascript:void(0)" data-toggle="modal" data-target="#px_login" tabindex="-1">登录</a>',
									'<a>|</a>',
									'<a href="javascript:void(0)" data-toggle="modal" data-target="#px_register">注册</a>',
								'</li>',
								'<li class="dropdown" v-else-if="daohang.isLogin==true">',
									'<a href="#" class="dropdown-toggle" style="padding: 30px 24px">',
										'<img :src="daohang.px_userinfo.icon" class="loUimg">{{ daohang.px_userinfo.nickname }}<b class="caret"></b>',
									'</a>',
									'<ul class="dropdown-menu" style="margin-right: -1px">',
										'<li>',
											'<a href="user_manager.html?tab=0">',
												'<span class="glyphicon glyphicon-leaf"></span>我的活动',
											'</a>',
										'</li>',
										'<li>',
											'<a href="user_manager.html?tab=1">',
												'<span class="glyphicon glyphicon glyphicon-cog"></span>账户设置',
											'</a>',
										'</li>',
										'<li>',
											'<a id="lo_out" href="javascript:void(0)">',
												'<span class="glyphicon glyphicon glyphicon-log-out"></span>注销',
											'</a>',
										'</li>',
									'</ul>',
								'</li>',
								'<li>',
									'<a href="javascript:void(0)" @click="daohang.enterIss(1)" class="dropdown-toggle">发布活动</a>',
								'</li>',
								'<li>',
									'<a href="javascript:void(0)" @click="daohang.enterIss(0)" class="dropdown-toggle">发布讲座</a>',
								'</li>',
								'<li class="dropdown">',
									'<a href="#" class="dropdown-toggle">发现活动 <b class="caret"></b></a>',
									'<ul class="dropdown-menu dropdown-menu-right">',
										'<li class="discover-hd">',
											'<div v-for="(item,index) in event_discover_module">',
												'<dl v-if="index==2">',
													'<dt>',
														'<span :class="item.icon_class"></span>{{item.event_dt}}：',
													'</dt>',
													'<dd v-for="(i,key) in item.result"><a href="javascript:void(0)" @click="daohang.oFindSearch(index,key)">{{ i }}</a></dd>',
												'</dl>',
												'<dl v-if="index==1">',
													'<dt>',
														'<span :class="item.icon_class"></span>{{item.event_dt}}：',
													'</dt>',
													'<dd v-for="(i,key) in item.result"><a href="javascript:void(0)" @click="daohang.oFindSearch(index,key)">{{ i }}</a></dd>',
												'</dl>',
												'<dl v-if="index==0">',
													'<dt>',
														'<span :class="item.icon_class"></span>{{item.event_dt}}：',
													'</dt>',
													'<dd v-for="(i,index) in item.result"><a href="javascript:void(0)" @click="timeSearch(index)">{{ i }}</a></dd>',
												'</dl>',
												'<br>',
												'<hr v-if="index!=2">',
											'</div>',
										'</li>',
									'</ul>',
								'</li>',
							'</ul>',
						'</div>',
					'</div>',
					'<div id="homePage_modal">',


						'<div class="modal fade" id="px_login" aria-hidden="true" aria-labelledby="login_title">',
							'<div class="modal-dialog">',
								'<div class="modal-content">',
									'<div class="modal-header">',
										'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>',
										'<h4 class="modal-title" id="login_title">校园蒲行账号登录</h4>',
									'</div>',
									'<div class="modal-body">',
										'<form class="form-horizontal login-form" role="form">',
											'<div class="form-group">',
												'<span class="glyphicon glyphicon-user"></span>',
												'<input type="text" placeholder="请输入帐号" v-model="daohang.px_lo.px_username">',
											'</div>',
											'<div class="form-group">',
												'<span class="glyphicon glyphicon-lock"></span>',
												'<input type="password" v-model="daohang.px_lo.px_passwd" placeholder="请输入密码">',
											'</div>',
											'<div class="form-group">',
												'<div class="col-xs-4">',
													'<input type="text" v-model="daohang.px_lo.px_yzm" placeholder="验证码">',
												'</div>',
												'<div class="col-xs-3">',
													'<img :src="daohang.val_yzm">',
												'</div>',
												'<a href="javascript:void(0)" class="yzm-qh" v-on:click="daohang.ref_yzm">看不清？</a>',
											'</div>',
										'</form>',
										'<button type="button" class="btn-login" v-on:click="daohang.px_login">登录</button>',
									'</div>',
								'</div>',
							'</div>',
						'</div>',


						'<div class="modal fade" id="px_register" aria-hidden="true" aria-labelledby="register_title">',
							'<div class="modal-dialog">',
								'<div class="modal-content">',
									'<div class="modal-header">',
										'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>',
										'<h4 class="modal-title" id="register_title">校园蒲行账号注册</h4>',
									'</div>',
									'<div class="modal-body">',
										'<form class="form-horizontal login-form" role="form">',
											'<div class="form-group">',
												'<span class="glyphicon glyphicon-edit"></span>',
												'<input type="text" v-model="daohang.px_re.px_nickname"  placeholder="昵称的长度必须在4-8个字符之间">',
											'</div>',
											'<div class="form-group">',
												'<span class="glyphicon glyphicon-user"></span>',
												'<input type="text" v-model="daohang.px_re.px_username"  placeholder="登录账号必须是6-12位的数字+字母组合">',
											'</div>',
											'<div class="form-group">',
												'<span class="glyphicon glyphicon-lock"></span>',
												'<input type="password" v-model="daohang.px_re.px_passwd" placeholder="请输入密码">',
											'</div>',
											'<div class="form-group">',
												'<span class="glyphicon glyphicon-lock"></span>',
												'<input type="password" v-model="daohang.px_re.px_passwd2" placeholder="请重复输入密码">',
											'</div>',
											'<div class="form-group">',
												'<div class="col-xs-4">',
													'<input type="text" v-model="daohang.px_re.px_yzm"  placeholder="验证码">',
												'</div>',
												'<div class="col-xs-3">',
													'<img :src="daohang.val_yzm">',
												'</div>',
												'<a href="javascript:void(0)" class="yzm-qh" v-on:click="daohang.ref_yzm">看不清？</a>',
											'</div>',
										'</form>',
										'<button type="button" class="btn-login" v-on:click="daohang.px_register">确认注册</button>',
									'</div>',
								'</div>',
							'</div>',
						'</div>',


						'<div v-if="detailpage==true" class="modal fade" id="px_BM" aria-hidden="true" aria-labelledby="register_title">',
							'<div class="modal-dialog">',
								'<div class="modal-content">',
									'<div class="modal-header">',
										'<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>',
										'<h4 class="modal-title" id="register_title">校园蒲行报名表单</h4>',
									'</div>',
									'<div class="modal-body">',
										'<form class="form-horizontal login-form" role="form">',
											'<div class="form-group">',
												'<span class="glyphicon glyphicon-phone"></span>',
												'<input type="text" v-model="dvm.bm_info.phone"  placeholder="请输入本人手机号方便主办方联系">',
											'</div>',
											'<div class="form-group">',
												'<span class="glyphicon glyphicon-envelope"></span>',
												'<input type="text" v-model="dvm.bm_info.email"  placeholder="请输入报名邮箱">',
											'</div>',
										'</form>',
									'</div>',
									'<div class="modal-footer">',
										'<button type="button" class="btn btn-info" v-on:click="dvm.takePartIn">确认报名</button>',
										'<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>',
									'</div>',
								'</div>',
							'</div>',
						'</div>',	


				'</div>',
			'</div>'].join(''),
	data: function(){
		return datas[0].homePgaeData;
	}
})
var daohang = new Vue({
		el: "#px_navigation",
		data: {
			val_yzm: url+"/verify/getVerifyCode",
			isLogin: false,		
			px_lo:{
				px_username: '',
				px_passwd: '',
				px_yzm1: '',
			},
			px_re: {
				px_username: '',
				px_passwd: '',
				px_passwd2: '',
				px_yzm: '',
				px_nickname:''
			},
			etag:{},
			px_userinfo: {}
		},
		watch: {
			etag: {
				handler(){

				},
				deep: true
			},
			px_userinfo:{
				handler(){},
				deep: true
			},
			px_lo:{
				handler(){},
				deep: true
			}
		},
		mounted: function(){
			this.$nextTick(function(){
				getLoginStatus();
				this.tag_req();
			})
		},
		methods: {
			ref_yzm: function(){
				this.val_yzm = url+"/verify/getVerifyCode?"+new Date()
			},
			px_login: function(){
				var $user = this.px_lo.px_username;
				var $passwd = this.px_lo.px_passwd;
				var newPwd = hex_md5(hex_md5($user+hex_md5($passwd))+this.px_lo.px_yzm)
				// var instance = axios.create();
				// instance.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
				// 
				for(var i in this.px_re){
					if(this.px_lo[i]==""){
						autoCloseSwal("登录失败！","请确认登录信息是否填写完整！","error")
						return;
					}
				}
				if(this.px_lo.px_yzm.length<4){
					autoCloseSwal("登录失败！","验证码错误！","error")
					return;
				}
				var a = retLogin($user,newPwd,this.px_lo.px_yzm);
				
				if(a){
					getLoginStatus();
				}
			},
			px_register:function(){
				var $user = this.px_re.px_username
				var $pwd = this.px_re.px_passwd
				var $pwd2 = this.px_re.px_passwd2
				var $nickname = this.px_re.px_nickname
				var v = this.px_re.px_yzm
				var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
				for(var i in this.px_re){
					if(this.px_re[i]===""){
						autoCloseSwal("注册失败！","请确认注册信息是否填写完整！","error")
						return;
					}
				}
				if($nickname.length>8 || $nickname.length<4 || pattern.test($nickname)){
					autoCloseSwal("注册失败！","请确保昵称长度保持在4-8个字之间,且不包含非法字符！","error")
					return;
				}
				if($pwd !== $pwd2){
					autoCloseSwal("注册失败！","两次输入的密码不一致！","error")
					return;
				}
				if(v.length<4){
					autoCloseSwal("注册失败！","验证码错误！","error")
					return;
				}
				$pwd = hex_md5($pwd)
				var a = retRegister($user,$pwd,v,$nickname);
				if(a){
					window.location.reload();

				}
			},
			tag_req: function(){
				axios.get(url+"/tag/0").then(function(res){
					if(res.data.status=="1"){
						daohang.etag[0] = "全部"

						for(var a in res.data.info)
						{
							daohang.etag[a] = res.data.info[a]
						}
						datas[0].homePgaeData.event_discover_module[2].result = daohang.etag
						// for(var i in daohang.etag){
						// 	datas[0].homePgaeData.event_discover_module[2].result[i] = daohang.etag[i]
						// }

						 
					}
				})
			},
			oFindSearch: function(type,key){
				key = String(key);
				if(type == "1"){
					setSession("act_type",key);
					window.location.href = "px_search.html";
				}
				if(type == "2"){
					setSession("tag1",key);
					window.location.href = "px_search.html";
				}
			},
			retHome(){
				window.location.href = "index.html"
			},
			enterIss(t){
				if(!this.isLogin){
					oSwal("登录超时或未登录,请先登录后再进行此操作！",1)
					return;
				}
				if(t == 1){
					window.location.href = "issueEvent.html"
				}
				else if(t == 0){
					window.location.href = "issCourse.html"
				}
			}
			// px_register: function(){
			// 	axios.post(url+"/user/register",{
			// 		user:,
			// 		pwd:,,
			// 		nickname:,
			// 		v:,
			// 	}).then(function(res){
			// 		console.log(res);
			// 	})
			// }
		}
		
	})
Vue.component('px-tab-module',{
	props: ['tab'],
	template: ['<div class="box-mid" style="text-align: center;">',
					'<ul class="event-tip-nav">',
						'<li v-for="(item,index) in tab.result">',
							'<a href="javascript:void(0)" :style="index==tab.tipIndex?tab.event_tip_active:\'\'" v-on:click="tab.tipIndex=index">',
								'{{ item }}',
							'</a>',
						'</li>',
					'</ul>',
				'</div>'].join('')
})
Vue.component('px-footer',{
	template: '<div class="px-footer"><p>校园蒲行</p><p>校园蒲行v1.0.0.1 © www.xypuxing.com All Rights Reserved. </p></div>'
})
Vue.component('muser-filter-item',{
	props:['items','cc'],
	template: ['<div class="box-mid filter-box-mid">',
				'<ul class="Muser-filter-ul">',
					'<li style="margin-right: 0">筛选：</li>',
					'<li class="dropdown" v-for="(item,index) in items.filter_class">',
						'<a href="javascript:void(0)" class="dropdown-toggle">',
							'{{item.tit}}',
							'<span class="glyphicon glyphicon-chevron-down"></span>',
						'</a>',
						'<ul class="dropdown-menu">',
							'<li v-for="(res,i) in item.res">',
								'<a href="javascript:void(0)">{{res}}</a>',
							'</li>',
						'</ul>',
					'</li>',
					'<li style="clear:both;"></li>',
				'</ul>',
			'</div>'].join('')
})
Vue.component('close-btn',{
	template: '<div class="close-btn"><span class="glyphicon glyphicon-remove"></span></div>'
})
Vue.component('upload-img',{
	props:['pro_name','pro_type'],
	template: '<div class="form-group" v-show="pro_name.show"><label class="control-label col-xs-2">{{pro_name.title}}<em :class="pro_name.type!=1?\'imp\':\'\'">*</em></label><div class="col-xs-4"><img :src="pro_name.poster" :id="pro_name.imgname" class="poster"></div><div class="col-xs-3" style="margin-left: 60px"><div class="btn-upload"><div class="btn btn-block btn-primary"><input type="file" :id="pro_name.filename" v-on:change="uploadImg_change(pro_name.filename,pro_name.imgname)" accept="image/png,image/gif,image/jpg,image/jpeg"><span class="glyphicon glyphicon-cloud-upload"></span>上传</div></div><p>温馨提示：</p><p>可以点击上传选择图片,如有发现上传图片涉嫌违规将做封号处理。</p><br><p v-if="pro_name.type==1"><input type="checkbox" id="che_on" v-on:click="dis(pro_type)">报名后添加提示图片?</p></div></div>',
})
Vue.component('stext-input',{
	props:['inp_item'],
	template: '<div class="form-group"><label class="control-label col-xs-2">{{inp_item.title}}<em>*</em></label><div class="col-xs-9"><input  :name="inp_item.name" type="text" type="text" :placeholder="inp_item.placeholder"></div></div>',
})
Vue.component('spasswd-input',{
	props:['inp_item'],
	template: '<div class="form-group"><label class="control-label col-xs-2">{{inp_item.title}}<em>*</em></label><div class="col-xs-9"><input  :name="inp_item.name" type="password" :type="inp_item.type" :placeholder="inp_item.placeholder"></div></div>',
})

Vue.component('t-input',{
	props: ['x'],
	template: '<input type="text" :name="x.name" :id="x.id" :placeholder="x.placeholder">'
})



Vue.component('event-box',{
	props:['item'],
	template: ['<div class="event-tip-box" @click="isLocation">',
					'<div class="event-tip-box-header">',
						'<div class="ebox-tag">',
							'<label v-if="item.act_type==0" class="c1">活动</label>',
							'<label v-if="item.act_type==1" class="c2">讲座</label>',
						'</div>',
						'<a href="javascript:void(0)"><img :src="item.placard"></a>',
					'</div>',
				'<div class="event-tip-box-body">',
					'<a href="">{{ item.title }}</a>',
					'<p class="event-tip-tag">开始时间：{{ item.st|timeFilter }}</p>',
				'</div>',
				'<div class="event-tip-box-footer">',
					'<div class="event-publisher">',
						'<a href="javascript:void(0)">',
							'<img :src="item.icon">{{ item.nickname }}',
						'</a>',
					'</div>',
					'<span class="time" title="发布时间">{{item.time|releaseTime}}</span>',
				'</div>',
			'</div>'].join(""),
	methods: {
		isLocation: function(){
			this.$emit('locations')
		}
	}
	
})
function on_search(){
	var $t_arr = ["全部","活动","讲座"]
	var $type = $("#search_type").text();
	for(var i=0 ; i<$t_arr.length ; i++)
	{
		if($t_arr[i] != $type)
			$type = $t_arr[0]
	}
	switch ($type) {
		case "全部":
			$type = "0"
			break;
		case "活动":
			$type = "1"
			break;
		case "讲座":
			$type = "2"
			break;
		default:
			$type = "0"
			break;
	}
	setSession("act_type",$type)
	setSession("str",datas[0].homePgaeData.search_cont)
	window.location.href = "px_search.html"
}
function uploadImg_change(filename,imgname){
	var obj = document.getElementById(filename)
	if(judge_img(filename))
		document.getElementById(imgname).src = window.URL.createObjectURL(obj.files[0])
	
}
function judge_img(filename){
	var maxsize = 2*1024*1024; //2M
	var filesize = 0;
	var obj = document.getElementById(filename);
	var filetype = ['.jpg','.png','.gif','.bmp','.jpeg'];
	var filepath = obj.value;
	if(filepath){		
		// if($.isChrome() || $.isFirefox())
		var $isImg = false;
		var $fileend = filepath.substring(filepath.lastIndexOf('.'));
		$fileend = $fileend.toLowerCase();
		for(var i = 0; i<filetype.length; i++){
			if(filetype[i]==$fileend)
			{
				$isImg = true;
				break;
			}
			
		}
		if(!$isImg){
			alert("图片格式错误,请确认后重新上传！");
			return false;
		}
		filesize = obj.files[0].size;
		// else if($.isIE() || $.isEdge()){
		// 	var poster_img = document.getElementById('poster_imgSrc');
		// 	poster_img.dynsrc = obj.value;
		// 	filesize = poster_img.fileSize;
		// }
		if(filesize>maxsize){
			alert("图片大小不能超过"+maxsize/1024/1024+"M");
			return false;
		}
		
	}else{
		alert("获取图片路径失败，请更换浏览器！")
		return false;
	}
	return true;
	
}


function getSession(name){
	var expiredays = 1000*60*60;
	if($.isEdge()){
		return getCookie(name)
	}else {
		if(window.sessionStorage)
		{
			var storage = window.sessionStorage;
			if(storage){
				var data = storage.getItem(name)
				var dataobj = JSON.parse(data)
				if(!dataobj)
					return ""
				if(new Date().getTime()-dataobj.time>expiredays)
					storage.removeItem(name);
				else{				
					return dataobj.data;
				}
			}
			else
			{
				return getCookie(name)
			}
		}else{
			return getCookie(name)
		}
	}
}
function setSession(name,val){

	var expiredays = new Date().getTime()+1000*60*60;
	if($.isEdge()){
		delCookie(name)
		setCookie(name,val,expiredays)
	}else {
		if(window.sessionStorage)
		{
			var storage = window.sessionStorage;
			if(storage){
				var exp = new Date().getTime();
				storage.removeItem(name);
				storage.setItem(name,JSON.stringify({data: val,time: exp}))
			}
			else
			{	delCookie(name)
				setCookie(name,val,expiredays)
			}
		}else{
			delCookie(name)
			setCookie(name,val,expiredays)
		}
	}
}
function getStorage(name){
	var expiredays = 1000*60*60;
	if($.isEdge()){
		return getCookie(name)
	}else {
		if(window.localStorage)
		{
			var storage = window.localStorage;
			if(storage){
				var data = storage.getItem(name)
				var dataobj = JSON.parse(data)
				if(!dataobj)
					return ""
				if(new Date().getTime()-dataobj.time>expiredays)
					storage.removeItem(name);
				else{				
					return dataobj.data;
				}
			}
			else
			{
				return getCookie(name)
			}
		}else{
			return getCookie(name)
		}
	}
}
function setStorage(name,val){

	var expiredays = new Date().getTime()+1000*60*60;
	if($.isEdge()){
		delCookie(name)
		setCookie(name,val,expiredays)
	}else {
		if(window.localStorage)
		{
			var storage = window.localStorage;
			if(storage){
				var exp = new Date().getTime();
				storage.removeItem(name);
				storage.setItem(name,JSON.stringify({data: val,time: exp}))
			}
			else
			{	delCookie(name)
				setCookie(name,val,expiredays)
			}
		}else{
			delCookie(name)
			setCookie(name,val,expiredays)
		}
	}
}
function getCookie(c_name)
{
	if (document.cookie.length>0)
	  {
	  	  c_start=document.cookie.indexOf(c_name + "=")
		  if (c_start!=-1)
		    { 
			    c_start=c_start + c_name.length+1 
			    c_end=document.cookie.indexOf(";",c_start)
			    if (c_end==-1) c_end=document.cookie.length
			    return unescape(document.cookie.substring(c_start,c_end))
		    } 
	  }
	return ""
}

function setCookie(c_name,value,expiredays)
{
	var exdate=new Date()
	exdate.setDate(exdate.getDate()+expiredays)
	document.cookie=c_name+ "=" +escape(value)+
	((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}
function delCookie(name)
{
	var exp = new Date();
	exp.setTime (exp.getTime() - 1);
	var cval = getCookie (name);
	document.cookie = name + "=" + cval + "; expires="+ exp.toGMTString();
}
function clearAllInfo(obj){
	for(var i in obj){
		obj[i] = "";
		daohang.ref_yzm()
	}
}
function retLogin($user,pwd,v){
	var isLogin = false;
	$.ajax({
		url: url+"/user/login",
		type: "post",
		async: false,
		xhrFields:{withCredentials:true},
		data: {
			user: $user,
			pwd: pwd,
			v: v
		},
		success: function(res){
			if(res.status=="1"){
				if(res.errorCode=="0"){
					isLogin = true;
					oSwal("登录成功！",0)
					$("#px_login").modal("hide");
					clearAllInfo(daohang.px_lo)
				}else{
					oSwal(res.msg,1)
					clearAllInfo(daohang.px_lo)
				}
			}else{
					oSwal(res.msg,1)
					clearAllInfo(daohang.px_lo)
				}				
		},
		error:function(){
			isLogin = false;
		}
	})
	return isLogin;
}
function retRegister($user,pwd,v,$nickname){
	var isLogin = false;
	$.ajax({
		url: url+"/user/register",
		type: "post",
		async: false,
		xhrFields:{withCredentials:true},
		data: {
			user: $user,
			pwd: pwd,
			v: v,
			nickname: $nickname
		},
		success: function(res){
			if(res.status=="1"){
					autoCloseSwal("注册提示","注册成功！","success")
					setTimeout(function(){
						$("#px_register").modal("hide")
					},2000)
					clearAllInfo(daohang.px_re)
					isLogin = true;
			}else{
					oSwal(res.msg,1)
					clearAllInfo(daohang.px_re)
				}			
		},
		error:function(){
			isLogin = false;
		}
	})
	return isLogin;
}
function getLoginStatus(){
	$.ajax({
		url: url+"/user/login/status",
		type: "get",
		dataType: "json",
		async: false,
		xhrFields:{withCredentials:true},
		success: function(res){
			if(res.status=="1"&&res.info!=null)
			{
				daohang.px_userinfo = res.info;
				daohang.isLogin = true;
			} 
		},
		error: function(){

		}
	})
}
// function px_get(addr){
// 	var obj;
// 	axios.get(url+addr).then(function(res){
// 		if(res.data.status=="1"){
// 			obj = res.data;
// 			return obj;
// 		}
// 	})
// }
// function px_post(addr,a){
// 	var obj;
// 	axios.get(url+addr,a).then(function(res){
// 		if(res.data.status=="1"){
// 			obj = res.data;
// 			return obj;
// 		}
// 	})
// }
function qiniu_PostImg(files,obj){
	var urls = "";
	var formdata = new FormData();
	formdata.append("token",obj.token)
	formdata.append("key",obj.key)
	formdata.append("file",files)
	$.ajax({
		url: global_upimg_simple,
		type: "post",
		data:formdata,
		dataType: "json",
		async: false,
		xhrFields:{withCredentials:true},
		processData: false,
		contentType: false,
		success: function(res){
			if(res.url!="")
				urls = res.url;
		},
		error: function(){
			urls = "";
		}
	})
	return urls;
}
function getImgTerm(type){

		var obj = {};
		$.ajax({
			url: url+"/op/imgtoken/"+type,
			type: "get",
			dataType: "json",
			async: false,
			xhrFields:{withCredentials:true},
			success: function(res){
				obj = res;
			},
			error: function(){

			}
		})
		return obj;
}
function getInfo(id,type,peo){
	var obj = {};
	if(type == "0"){
		$.ajax({
			url: url+"/act/"+id,
			type: "get",
			dataType: "json",
			async: false,
			xhrFields:{withCredentials:true},
			success: function(res){
				if(res.status=="1")
				{
					obj = res.info;
					if(peo!="")
						obj.peo = peo;
				} 
			},
			error: function(){

			}
		})
	}else if(type == "1"){
		$.ajax({
			url: url+"/lctr/"+id,
			type: "get",
			dataType: "json",
			async: false,
			xhrFields:{withCredentials:true},
			success: function(res){
				if(res.status=="1")
				{
					obj = res.info
				} 
			},
			error: function(){

			}
		})
	}
	return obj;
}

function gettimeObj(date){
	var obj = {}
	obj.year = date.getFullYear()
	obj.month = date.getMonth()
	obj.day = date.getDate()
	obj.hour = date.getHours()
	obj.minutes = date.getMinutes()
	obj.daysOfWeek = date.getDay()
	return obj
}
function getFormatTime(nS){
	var date = new Date(parseInt(nS))
	var timeobj = gettimeObj(date)
	var year = timeobj.year+"年"
	var month = timeobj.month+"月"
	var day = timeobj.day+"日"
	var hour = timeobj.hour
	var minutes = timeobj.minutes
	return [year,month,day].join("")+" "+[hour,minutes].join(":")
}

Vue.filter("timeFilter",function(date){
	return getFormatTime(date)
})
Vue.filter("releaseTime",function(dates){
	dates/=1000
	
	var date = new Date(parseInt(dates)*1000)
	var obj = gettimeObj(date);
	var now_obj = gettimeObj(new Date());

	var year_gap = parseInt(now_obj.year) - parseInt(obj.year)//==0)?1:parseInt(now_obj.year) - parseInt(obj.year);
	var month_gap = parseInt(now_obj.month) - parseInt(obj.month)//==0)?1:parseInt(now_obj.month) - parseInt(obj.month);
	var day_gap = parseInt(now_obj.day) - parseInt(obj.day)//==0)?1:parseInt(now_obj.day) - parseInt(obj.day);
	var hour_gap = parseInt(now_obj.hour) - parseInt(obj.hour)//==0)?1:parseInt(now_obj.hour) - parseInt(obj.hour);
	var minutes_gap = parseInt(now_obj.minutes) - parseInt(obj.minutes)//==0)?1:parseInt(now_obj.minutes) - parseInt(obj.minutes);

	if(year_gap>0)
		return year_gap+"年前"
	if(month_gap>0)
		return month_gap+"月前"
	if(day_gap>0)
		return day_gap+"天前"
	if(hour_gap>0)
		return hour_gap+"小时前"
	if(minutes_gap>0)
		return minutes_gap+"分前"

})

function oSwal(cont,type){
	switch (type) {
		case 0:
			swal({text: cont,confirmButtonText:"确认",type:"success"})
			break;
		case 1:
			swal({text: cont,confirmButtonText:"确认",type:"error"})
			break;
		case 2:
			swal({text: cont,confirmButtonText:"确认",type:"warning"})
			break;
		case 3:
			swal({text: cont,confirmButtonText:"确认",type:"info"})
			break;
		case 4:
			swal({text: cont,confirmButtonText:"确认",type:"question"})
			break;
		default:
			swal({text: "未知错误！",confirmButtonText:"确认",type:"error"})
			break;
	}
}
function autoCloseSwal(title,text,type){
	swal({
			title: title,
			text: text,
			type: type,
			showConfirmButton: false,
			timer: 2000
		})
}


function timeSearch(idx){
	var starttime = null
	var endtime = null
	var nowDate = gettimeObj(new Date());
	var nowMonth = nowDate.month;
	var getMonthDays = function(nowMonth){
		var nowMonthStart = new Date(nowDate.year,nowMonth-1,1)
		var nowMonthEnd = new Date(nowDate.year,nowMonth,1)
		var days = (nowMonthEnd - nowMonthStart)/(1000*60*60*24)
		return days;
	}

	switch (idx) {
		case 0:
			window.location.href="px_search.html"
			break;
		case 1:
			var todayNum = Date.parse(new Date())/1000
			starttime = todayNum
			endtime = todayNum
			break;
		case 2:
			var todayNum = Date.parse(new Date(nowDate.year,nowMonth,nowDate.day+1))/1000
			starttime = todayNum
			endtime = todayNum
			break;
		case 3:
			starttime = Date.parse(new Date(nowDate.year,nowMonth,(nowDate.day-nowDate.daysOfWeek+1)))/1000
			endtime = Date.parse(new Date(nowDate.year,nowMonth,(nowDate.day+(7-nowDate.daysOfWeek))))/1000

			break;		
		case 4:
			starttime = Date.parse(new Date(nowDate.year,nowMonth,(nowDate.day+(6-nowDate.daysOfWeek))))/1000
			endtime = Date.parse(new Date(nowDate.year,nowMonth,(nowDate.day+(7-nowDate.daysOfWeek))))/1000

			break;		
		case 5:
			var MonthStart = new Date()
			MonthStart.setDate(1);
			MonthStart.setMonth(nowMonth)
			starttime = Date.parse(MonthStart)/1000 //本月开始时间戳
			var nowMonthDay = getMonthDays(nowMonth)
			var MonthEnd = new Date()
			MonthEnd.setDate(nowMonthDay)
			MonthEnd.setMonth(nowMonth);
			endtime = Date.parse(MonthEnd)/1000 //本月结束时间戳
			break;
	}
	setSession("starttime",starttime)			
	setSession("endtime",endtime)
	window.location.href="px_search.html"
	
	
}

































































/*------------------------------ MD5 ------------------------------*/
/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.1 Copyright (C) Paul Johnston 1999 - 2002.
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0;  /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad  = ""; /* base-64 pad character. "=" for strict RFC compliance   */
var chrsz   = 8;  /* bits per input character. 8 - ASCII; 16 - Unicode      */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
function b64_md5(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
function str_md5(s){ return binl2str(core_md5(str2binl(s), s.length * chrsz));}
function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
function str_hmac_md5(key, data) { return binl2str(core_hmac_md5(key, data)); }

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test()
{
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length
 */
function core_md5(x, len)
{
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;

  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);

    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);

}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Calculate the HMAC-MD5, of a key and some data
 */
function core_hmac_md5(key, data)
{
  var bkey = str2binl(key);
  if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++)
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
  return core_md5(opad.concat(hash), 512 + 128);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * Convert a string to an array of little-endian words
 * If chrsz is ASCII, characters >255 have their hi-byte silently ignored.
 */
function str2binl(str)
{
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
  return bin;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2str(bin)
{
  var str = "";
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < bin.length * 32; i += chrsz)
    str += String.fromCharCode((bin[i>>5] >>> (i % 32)) & mask);
  return str;
}

/*
 * Convert an array of little-endian words to a hex string.
 */
function binl2hex(binarray)
{
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++)
  {
    str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
           hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
  }
  return str;
}

/*
 * Convert an array of little-endian words to a base-64 string
 */
function binl2b64(binarray)
{
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i += 3)
  {
    var triplet = (((binarray[i   >> 2] >> 8 * ( i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
    }
  }
  return str;
}











var paginationMaxLength=10;//分页栏的最大显示条数  
var onlyOnePageIsShow = true;//只有一页的时候是否显示  
// function paginationInit(){  
//     $('[pagination =pagination_new ]').each(function(){  
//         initPagination($(this));  
//     });  
// }  

function isNeedPagination(totalpage,settingfromHTML){  
    var condition ;  
    if(settingfromHTML == "true"){  
        condition = true;  
    }else if(settingfromHTML == 'false'){  
        condition = false;  
    }else {  
        condition = onlyOnePageIsShow;  
    }  
    if(condition && totalpage<1){  
        return false;  
    }else if(!condition && totalpage<=1){  
        return false;  
    }  
    return true;  
}  
function setDisplayMaxLength(element,len){  
    var currentpage =  Number(element.attr('pagenumber'));  
    var totoalpage = Number(element.attr('totalpage'));  
    if(checkParamIsPositiveInteger(len)){  
        len = Number(len);  
    }else{  
        len =paginationMaxLength;  
    }  
    if(len<totoalpage){  
        var temp1 = parseInt((len-1)/2);  
        var temp2 = parseInt(len/2);  
        if(temp1<temp2){  
            var leftstart = currentpage - temp1;  
            var rightend = currentpage + temp1 + 1;  
        }else{  
            var leftstart = currentpage - temp1;  
            var rightend = currentpage + temp1;  
        }  
        if(leftstart<1){  
            rightend +=(1-leftstart);  
            leftstart = 1;  
        }  
        if(rightend>totoalpage){  
            if(leftstart>1){  
                leftstart -=(rightend-totoalpage);  
            }  
            rightend =totoalpage;  
        }  
        if(leftstart<1){  
            leftstart=1  
        }  
        while(leftstart >1){  
            element.children('ul').children('li[value = '+(--leftstart)+']').css('display','none');  
        }  
        while(rightend <totoalpage){  
            element.children('ul').children('li[value = '+(++rightend)+']').css('display','none');  
        }  
    }  
}  
//根据页面pagenumber、my_totoalpage更新分页，参数element传的是分页的容器  
function initPagination(element){  
    element.html('');  
    var pagenumber = element.attr('pagenumber');  
    var totalpage = element.attr('totalpage');  
    var pMaxLength = element.attr('paginationMaxLength');  
    var onePageIsShow = element.attr('onlyOnePageIsShow');  
    if(isNeedPagination(Number(totalpage),onePageIsShow)){  
        var content = '<ul class="pagination"><li value="0"><a href="javascript:void(0);">«</a></li>';  
        for(var i =1; i<=totalpage;i++){  
            content +='<li value="'+i+'"><a href="javascript:void(0);">'+i+'</a></li>'  
        }  
        content +='<li value="-1"><a href="javascript:void(0);">»</a></li></ul>';  
        element.append(content);  
        element.children('ul').children('li[value="'+pagenumber+'"]').attr('class','active');  
        setDisplayMaxLength(element,pMaxLength);  
        addClickListener(element);  
    }  
}  
function addClickListener(element){  
    element.children('ul').children('li').bind('click',function(){  
        var temp = Number($(this).attr('value'));  
        var pagenumber = Number($(this).parent().parent().attr('pagenumber'));  
        var totalpage = Number($(this).parent().parent().attr('totalpage'));  
        if(temp == 0){  
            temp = pagenumber-1;  
        }else if(temp == -1){  
            temp = pagenumber+1;  
        }  
        if(temp != pagenumber && temp !=0 && temp<=totalpage){  
            $(this).parent().parent().attr('pagenumber',temp);  
            paginationClick(element.attr("id"));  
            initPagination(element);  
        }  
        return false;  
    })  
}  
function checkParamIsPositiveInteger(param){  
    var reg = /^[1-9]+[0-9]*]*$/;  
    return reg.test(param);  
}  
  
//用户需要自己实现的点击事件，参数为分页容器的id  
function paginationClick(pagination_id){  
	var number = $("#"+pagination_id).attr("pagenumber")
	setSession("p",number);
	window.location.reload();
}  
// $(function(){  
//     paginationInit();  
// });  