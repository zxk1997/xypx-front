//var url = "http://www.xypuxing.com"
var url=global_url;
var uvm = new Vue({
	el:"#userManager",
	data: {
		ouser_lists: {
			result:["我的活动","账户设置","实名认证"],
			tipIndex: 0,
			event_tip_active: {
				borderBottom: '.2em solid #333',
				color: '#1b1b1b'
			}
		},
		om_filter_item: {
			filter_class:[
				{
					id: "type",
					tit:"类型",
					res: ["全部","活动","讲座"]
				},{
					id: "role",
					tit:"角色",
					res: ["全部","我发布的","我参与的"]
				},{
					id: "time",
					tit:"时间",
					res: ["全部","进行中","已结束"]
				}
			],
		},
		group1:[
			{
				type:"password",
				name: "oldpasswd",
				title: "旧密码",
				placeholder: "请输入您的旧密码"
			},{	
				type:"password",
				name: "newpasswd1",
				title: "新密码",
				placeholder: "请输入新密码,限6~20字符"
			},
			{	
				type:"password",
				name: "newpasswd2",
				title: "确认新密码",
				placeholder: "限6~20字符"
			}
		],
		group2:[
			{
				name: "stuNo",
				title: "学号",
				placeholder: "请输入您的学号"
			},{
				name: "pid",
				title: "身份证号码",
				placeholder: "请输入身份证号完成实名认证"
			}
		],
		filter_obj:{
			act_type: 0,
			type: 0,
			timefilter: 0,
			// p: 0,
			// l: "8",
		},
		peo_info: {
			school:'',
			name:'',
			stuNo:'',
			IDCard:'',
			college:'',
			specialty:'',
			tx:''
		},
		user_event_list:{
			total: 0,
			data: []
		},
		term: {},
		plcard: {},
		vaildateType1: {
			stuid: "",
			pid: "",
			v: ""
		},
		vaildateType2: {
			url: "",
			schoolkey: "21328fdda9f5439ab1ee10bd125bc9f6",
			v: ""
		},
		alterpasswd: {
			oldpwd:"",
			newpwd:"",
			v: ""
		},
		isShiming: false


	},
	watch: {
		group2: {
			handler(){},
			deep: true
		},
		vaildateType1: {
			handler(){},
			deep: true
		},
		vaildateType2: {
			handler(){},
			deep: true
		},
		alterpasswd: {
			handler(){},
			deep: true
		}
	},
	mounted: function(){
		this.$nextTick(function(){
			this.manageLoad();
		})
	},
	methods:{
		manageLoad: function(){
			// this.filter_obj.act_type = (getSession("atype")==null)?0:parseInt(getSession("atype"))
			// this.filter_obj.type = (getSession("otype")==null)?0:parseInt(getSession("otype"))
			// this.filter_obj.timefilter = (getSession("timefilter")==null)?0:parseInt(getSession("timefilter"))
			var now_url = window.location.href;
			var now_index = now_url.indexOf("tab");
			var now_tab = now_url.substring(now_index+4);
			if(now_tab == 0||now_tab == 1|| now_tab==2)
				this.ouser_lists.tipIndex = now_tab
			on_filter();
			this.judgeShiming()
			this.getEventList();
		},
		getEventList: function() {
			$.ajax({
				url: url+"/op/selfact",
				type: "post",
				dataType: "json",
				data: this.filter_obj,
				async: false,
				xhrFields:{withCredentials:true},
				success: function(res){
					if(res.status=="1")
					{
						uvm.user_event_list.data = res.info.data
						uvm.user_event_list.total = Math.floor(res.info.total/8)+1
					}else{
						oSwal(res.msg,1)
					}
				},
				error: function(){
					oSwal("查询失败,请先登录后再进行此操作！",1)
				}
			})
		},
		bcIcon: function(){
			var file = $("#upload_user_tx").get(0).files[0];
			 this.term = getImgTerm("icon");
			var urlss = qiniu_PostImg(file,this.term);
			$.ajax({
					url: url+"/user/icon",
					type: "post",
					data:{
						icon: urlss
					},
					xhrFields: {withCredentials:true},
					success: function(res){
						if(res.status=="1")
						{
							oSwal("修改头像成功！",0)
							var oldfile = document.getElementById('upload_user_tx')
							oldfile.value = "";
							oldfile.outerHTML = oldfile.outerHTML;
							daohang.px_userinfo.icon = urlss;
						}
					},
					error:function(){

					}
				})
			
		},
		eManage: function(item){
			setSession("pxid",item.id);
			setSession("pxtype",item.acttype);
			setSession("peo",item.type);
			window.location.href="event_manager.html"
		},
		submitVaildate(type){
			var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
			if(type == 0){
				var stuNo = $("input[name='stuNo']").val();
				var pid = $("input[name='pid']").val();
				var yzm = this.vaildateType1.v
				if(stuNo == "" || pid == ""){
					autoCloseSwal("提交失败","认证必填项不能为空！","error")
					return;
				}
				var parttenNum = /^[1-9]\d*$/
				if(!parttenNum.test(stuNo) || stuNo.length>8){
					autoCloseSwal("提交失败","学号格式错误或超出8位！","error")
					return;
				}
				if(pid.length == 18 && /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/.test(pid)){
					autoCloseSwal("提交失败","身份证格式错误！","error")
					return;
				}
				if(pid.length == 15 && /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/.test(pid)){
					autoCloseSwal("提交失败","身份证格式错误！","error")
					return;
				}
				if(yzm.length<4 || pattern.test(yzm)){
					autoCloseSwal("提交失败","验证码错误！","error")
					return;
				}
				this.vaildateType1.stuid = stuNo
				this.vaildateType1.pid = pid
				var that = this
				$.ajax({
					url: url+"/auth/szpt",
					type: "post",
					data: that.vaildateType1,
					xhrFields:{withCredentials: true},
					success: function(res){
						if(res.status == "1")
						{
							oSwal(res.msg,0)
							that.clearAllInfo(1)
						}else{
							oSwal(res.msg,1)
							that.clearAllInfo(1)
						}
					},
					error: function(){
						oSwal("验证失败！",1)
						that.clearAllInfo(1)
					}
				})

			}else if(type == 1){
				var yzm = this.vaildateType2.v
				if(yzm.length<4 || pattern.test(yzm)){
					autoCloseSwal("提交失败","验证码错误！","error")
					return;
				}
				var that = this
				var yzm = this.vaildateType2.v
				var files = $("#upload_user_xsz").get(0).files[0];
				if(!files){
					autoCloseSwal("提交失败","请选择学生证图片！","error")
					return;
				}
				var placard =  getImgTerm("placard");
				var imgurl = qiniu_PostImg(files,placard);
				if(imgurl != "") {
					that.vaildateType2.url = imgurl
					$.ajax({
						url: url+"/auth",
						type: "post",
						data: that.vaildateType2,
						xhrFields:{withCredentials:true},
						success: function(res){
							if(res.status == "1")
							{
								oSwal(res.msg,0)
								that.clearAllInfo(2)
							}else{
								oSwal(res.msg,1)
								that.clearAllInfo(2)
							}
						},
						error: function(){
							oSwal("验证失败！",1)
							that.clearAllInfo(2)
						}
					})
				}
			}
		},
		resetVaildate(type){
			if(type==0){
				this.clearAllInfo(1)
				
			}else if(type==1){
				this.clearAllInfo(2)
			}
		},
		clearAllInfo(t){
			if(t == 1){
				$("input[name='stuNo']").val("");
				$("input[name='pid']").val("");
				this.vaildateType1.stuid = ""
				this.vaildateType1.pid = ""
				this.vaildateType1.v = ""
				daohang.ref_yzm()
			}else if(t == 2){
				this.vaildateType2.file = ""
				this.vaildateType2.v = ""
				$("#al_user_xsz").attr("src","");
				daohang.ref_yzm()
			}
		},
		changePwd: function(){
			var oldpasswd = $("input[name='oldpasswd']").val()
			var newpasswd1 = $("input[name='newpasswd1']").val()
			var newpasswd2 = $("input[name='newpasswd2']").val()
			var v = this.alterpasswd.v;
			var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
			if(oldpasswd=="" || newpasswd1=="" || newpasswd2=="")
			{
				autoCloseSwal("修改密码失败","必选项不能为空！","error")
				return;
			}
			if(newpasswd1.length<6 || newpasswd1.length>20 || oldpasswd.length<6 || oldpasswd.length>20){
				autoCloseSwal("修改密码失败","请保证输入的密码长度保持在6~20个字符！","error")
				return;
			}
			if(newpasswd1 === oldpasswd){
				autoCloseSwal("修改密码失败","旧密码不能和新密码一致！","error")
				return;
			}
			if(newpasswd1 !== newpasswd2){
				autoCloseSwal("修改密码失败","两次密码输入不一致！","error")
				return;
			}
			if(v.length!=4 || pattern.test(v)){
				autoCloseSwal("修改密码失败","验证码错误！","error")
				return;
			}
			console.log(oldpasswd)
			this.alterpasswd.oldpwd = hex_md5(oldpasswd)
			this.alterpasswd.newpwd = hex_md5(newpasswd1)
			var that = this
			console.log(that.alterpasswd)
			$.ajax({
					url: url+"/user/pwd",
					type: "post",
					data: that.alterpasswd,
					xhrFields: {withCredentials:true},
					success: function(res){
						if(res.status=="1")
						{
							oSwal(res.msg,0)
							that.clearPwd()

						}else{
							oSwal(res.msg,1)
							that.clearPwd()
						}
					},
					error:function(){
						oSwal("修改密码失败！",1)
						that.clearPwd()
					}
				})
		},
		clearPwd: function(){
			$("input[name='oldpasswd']").val("")
			$("input[name='newpasswd1']").val("")
			$("input[name='newpasswd2']").val("")
			var obj = this.alterpasswd;
			for(var i in obj){
				obj[i] = "";
			}
			daohang.ref_yzm();
		},
		judgeShiming: function(){
			var that = this
			$.ajax({
					url: url+"/user/auth",
					type: "get",
					xhrFields: {withCredentials:true},
					success: function(res){
						if(res.status == "1"){
							that.isShiming = res.info
						}
					},
					error:function(){
						that.isShiming = false;
					}
				})
		}

	}
})
window.onload = function(){
	initPagination($("#paging"))
}

function on_filter(){
	var $req_c = $(".Muser-filter-ul>li");
	var arr = [""]
	for(var d in uvm.filter_obj){
		arr.push(uvm.filter_obj[d]);
	}
	for(var i = 1; i<$req_c.length-1; i++){
		var $that = $(this);
		var $ul = $req_c.eq(i).find("ul").eq(0);
		var $li = $ul.find("li");
		for(var c = 0; c<$li.length; c++)
		{
			$li.eq(c).attr("onclick","alterFilterObj(\'"+i+"\',\'"+c+"\')")
			if(c === arr[i])
			{
				$li.eq(c).addClass("filter-on")
			}else{
				$li.eq(c).removeClass("filter-on")
			}
		}
	}
}
function alterFilterObj(key,val){
	var val = parseInt(val)
	if(key=="1")
	{
		uvm.filter_obj.act_type = val
		uvm.getEventList();
		on_filter();
	}
	if(key=="2")
	{
		uvm.filter_obj.type = val
		uvm.getEventList();
		on_filter();
	}
	if(key=="3")
	{
		uvm.filter_obj.timefilter = val
		uvm.getEventList();
		on_filter();
	}

}
