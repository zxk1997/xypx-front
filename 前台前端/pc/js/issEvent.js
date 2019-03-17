//var url = "http://www.xypuxing.com"
var url=global_url;
var evm = new Vue({
	el:"#iss_event",
	data:{
		i_click: false,
		poster: '',
		issEventObj: {
			title: '',
			address: '',
			phone: '',
			s: '',
			e: '',
			ps: '',
			pe: '',
			plimit: '',
			describe: '',
			content: '',
			tags1: [],
			tags2: []
		},
		input_group: {
			group1:[
				{
					name: "title",
					title: "活动标题",
					placeholder: "活动标题(不少于5个字,不超过50字)",
				},{
					name: "address",
					title: "活动地点",
					placeholder: "广东省深圳市南山区沙河西路深圳职业技术学院（东校区）,不超过200字",

				},{
					name: "phone",
					title: "主办方手机号",
					placeholder: "请输入活动负责人的手机号码",

				}],
				group2:[
				{
					name: "title",
					title: "讲座标题",
					placeholder: "讲座标题(不少于5个字,不超过50字)"
				},{
					name: "address",
					title: "讲座地点",
					placeholder: "广东省深圳市南山区沙河西路深圳职业技术学院（东校区）,不超过200字"

				},{
					name: "phone",
					title: "主办方手机号",
					placeholder: "请输入讲座负责人的手机号码"

				}],
			timeStart: {name:"s",id: "timeStart",placeholder: "请选择开始时间"},
			timeEnd: {name:"e",id: "timeEnd",placeholder: "请选择结束时间"},
			bmtimeStart: {name:"ps",id: "bmtimeStart",placeholder: "请选择开始时间"},
			bmtimeEnd: {name:"pe",id: "bmtimeEnd",placeholder: "请选择结束时间"},
			},
		upload_img_comp: {
			isJZ: 0,
			data:[{

				title: "活动海报",
				filename: "posterFile",
				imgname: "poster_imgSrc",
				poster: 'img/poster-holder.png',
				type: 1,
				show: true
			},{	
				title: "提示图片",
				filename: "hint_posterFile",
				imgname: "hint_imgSrc",
				poster: 'img/poster-holder.png',
				show: false
			}]
		},
		jz_upload_img_comp: {
			isJZ: 1,
			data:[{
					
					title: "讲座海报",
					filename: "posterFile",
					imgname: "poster_imgSrc",
					poster: 'img/poster-holder.png',
					type: 1,
					show: true
				},{	
					title: "提示图片",
					filename: "hint_posterFile",
					imgname: "hint_imgSrc",
					poster: 'img/poster-holder.png',
					show: false
				}]
		},
		req_img_obj_icon: {},
		req_img_obj_pos: {},
		zishu: 0,
		swalOpt: {},		
		
	},
	mounted:function(){
		this.$nextTick(function(){
			if(!daohang.isLogin){
				swal({
					text: "抱歉,您未登录或登录超时,请登录后再进行操作！",
					type: "error",
					confirmButtonText: "确认"
				}).then(function(isConfirm){
					if(isConfirm == true){
						window.location.href="index.html"
					}
				})
			}
			this.Load_issEvent();
		})		
	},
	methods:{
		Load_issEvent:function(){
			new datetimeopt("#timeStart")
			new datetimeopt("#timeEnd")
			new datetimeopt("#bmtimeStart")
			new datetimeopt("#bmtimeEnd")
			
			this.req_img_obj_icon = getImgTerm("icon")
			this.req_img_obj_pos = getImgTerm("placard")

			editorLoad();
			hd_tag(0);
			hd_tag(1);
				
			
			// getTrem();
			
			
			
		},
		iss_event: function(type){
			var iss = (type == 1)?"讲座":"活动"
			var $title = $("input[name='title']").val();
			var $address = $("input[name='address']").val();
			var $phone = $("input[name='phone']").val();
			if(type == 1){
				var lb = $("input[name='lb']:checked").val()
				Vue.set(this.issEventObj,"lb",lb);
			}
			var $es = $("#timeStart").val();
			var $ee = $("#timeEnd").val();
			var $bs = $("#bmtimeStart").val();
			var $be = $("#bmtimeEnd").val();
			var $posterFile = $("#posterFile").get(0).files[0];
			var hd_tag = tags_add(0);
			var xg_tag = tags_add(1);
			var describe = $("#iss_describe").val();
			var iss_summary = $("#huodongdetail").val();
			this.issEventObj.title = $title;
			this.issEventObj.address = $address;
			this.issEventObj.phone = $phone;
			this.issEventObj.s = $es;
			this.issEventObj.e = $ee;
			this.issEventObj.ps = $bs
			this.issEventObj.pe = $be;
			this.issEventObj.tags1 = hd_tag;
			this.issEventObj.tags2 = xg_tag;
			this.issEventObj.content = iss_summary;
			var that = this;
			if(this.judge_issInfo(this.issEventObj,type)) {
				if(typeof($posterFile) === 'undefined')
				{
					oSwal("请选择"+iss+"海报",1)
					return;
				}	
				if($("#che_on").is(":checked")){
					var $hint_posterFile = $("#hint_posterFile").get(0).files[0];
					if(typeof($hint_posterFile) === 'undefined')
					{
						oSwal("请选择"+iss+"提示图片",1)
						return;
					}
					var rm = qiniu_PostImg($hint_posterFile,this.req_img_obj_pos)
					Vue.set(that.issEventObj,"rm",rm)
				}
				var placard = qiniu_PostImg($posterFile,this.req_img_obj_pos);
				Vue.set(that.issEventObj,'placard',placard)
				var isIssue = PostEvent(this.issEventObj,type)
				if(isIssue){
					oSwal(iss+"发布成功,请耐心等待审核！",0);
					window.location.href="user_manager.html?tab=0"
				}
			}

			

		},
		judge_issInfo: function(obj,t) {
			cont = t=="1"?"讲座":"活动"
			for(var i in obj){
				if(obj[i] == ""){			
					oSwal(cont+"必填项不能为空！",1)
					return false;
				}
			}
			if(obj.title.length>50 || obj.title.length<5){
				oSwal(cont+"标题小于5个字或者超出50字！",1)
				return false;
			}
			if(obj.address.length>200 || obj.address.length<5){
				oSwal(cont+"地址小于5个字或者超出200字！",1)
				return false;
			}
			if(obj.phone.length!=11 || !(/^1[3|4|5|8][0-9]\d{4,8}$/.test(obj.phone))){
				oSwal("请填写正确的"+cont+"主办方手机号！",1)
				return false;
			}
			if(obj.describe.length>100){
				oSwal(cont+"描述不能超过100字！")
				return false;
			}
			return true;

		}

			
	},
	components:{
		// 'close-btn':{
		// 	template: '<div class="close-btn"><span class="glyphicon glyphicon-remove"></span></div>'
		// },
		// 'tag-li':{
		// 	props: ['i','list'],
		// 	template:'<li v-for="item in list" class="tag-li" data-tagk={{item.key}}>{{item.val}}<close-btn v-if="i==1"></close-btn></li>'
		// }

	},
	computed: {
		iss_describe(){
			return this.issEventObj.describe;
		},
		iss_title(){
			return this.issEventObj.title;
		},
		iss_address(){
			return this.issEventObj.address;
		},
		iss_phone(){
			return this.issEventObj.phone;
		},
		iss_plimit(){
			return this.issEventObj.plimit;
		}

	},
	watch:{
		issEventObj: {
			handler(){

			},
			deep:true
		},
		swalOpt: {
			handler(){

			},
			deep:true
		},
		iss_describe(newVal,oldVal){
			this.zishu = newVal.length;
			if(newVal.length>100)
				oSwal(this.iss+"摘要不能超过100个字！",2)
		},
		// iss_title(newVal,oldVal){

		// 	if(newVal.length>100)
		// 		this.oSwal(this.iss+"摘要不能超过100个字！",2)
		// },
		// iss_address(newVal,oldVal){

		// 	if(newVal.length>100)
		// 		this.oSwal(this.iss+"摘要不能超过100个字！",2)
		// },
		// iss_phone(newVal,oldVal){
		// 	var isTrue = true;
		// 	if(newVal.length>11)
		// 		this.oSwal(this.iss+"主办方手机号错误！",2)
		// },
		iss_plimit(newVal,oldVal){
			if(!/^-?\d+$/.test(newVal)){

				this.issEventObj.plimit = "";
			}
		},
		req_img_obj_icon: {
			handler(){

			},
			deep:true
		},
		req_img_obj_pos: {
			handler(){

			},
			deep:true
		},
		req_img_obj_cont: {
			handler(){

			},
			deep:true
		},
		upload_img_comp: {
			handler(){

			},
			deep:true
		},
		jz_upload_img_comp: {
			handler(){

			},
			deep:true
		}

	},
	directives: {
		npt: function(el){
			el.style.color = "#fff"
		}
	}
})

function datetimeopt(name){
	$(name).datetimepicker({
		language: 'zh-CN',
		autoclose: true,
		todayBtn: 1,
		startDate: new Date()
	})
}
function tag_change(){
	var $check_list = $(".event-check-list");
	var $checked_list = $(".event-checked-list");
	$check_list.each(function(index,ele){
		$check_list.eq(index).find('li').each(function(){
			$(this).on('click',function(){		
				$checked_list.eq(index).find('li').eq($(this).index()).addClass("show");
			})
		})
	});
	var $close = $(".close-btn");
	$close.each(function(){
		$(this).on('click',function(){
			$(this).parent().removeClass("show")
		})
	})
}
function hd_tag(type){
	axios.get(url+'/tag/'+type)
		.then(function(res){
		if(res.data.status=="1"){
			// var arr = tags_group(res.data.info);
				var obj = tags_group(res.data.info)
				for(var i=0; i<obj.length; i++){
					$(".event-checked-list").eq(parseInt(type)).append('<li class="tag-li tag-li-acitve" data-tagk="'+obj[i].key+'" >'+obj[i].val+'<div class="close-btn"><span class="glyphicon glyphicon-remove"></span></div></li>')
					$(".event-check-list").eq(parseInt(type)).append('<li class="tag-li" data-tagk="'+obj[i].key+'" >'+obj[i].val+'</li>')					
				}
				tag_change();
			}
		})
		.catch(function(error){
				daohang.retHome()
			})
}
// function nature_tag(type){
// 	axios.get(url+'/tag/'+type)
// 		.then(function(res){
// 		if(res.data.status=="1"){
// 			// var arr = tags_group(res.data.info);
// 				var obj = tags_group(res.data.info)
// 				for(var i=0; i<obj.length; i++){
// 					$(".event-checked-list").eq(type).append('<li class="tag-li tag-li-acitve" data-tagk="'+obj[i].key+'" >'+obj[i].val+'<div class="close-btn"><span class="glyphicon glyphicon-remove"></span></div></li>')
// 					$(".event-check-list").eq(type).append('<li class="tag-li" data-tagk="'+obj[i].key+'" >'+obj[i].val+'</li>')					
// 				}
// 				tag_change();
// 			}
// 		})
// 		.catch(function(error){
// 				console.log(error);
// 			})
// }
function dis(type){
	$("#che_on").attr("disabled",true);
	setTimeout(function(){
		$("#che_on").attr("disabled",false);
	},500);
	console.log(type)
	if(type == 0)
		evm.upload_img_comp.data[1].show = !evm.upload_img_comp.data[1].show;
	else if(type == 1)
		evm.jz_upload_img_comp.data[1].show = !evm.jz_upload_img_comp.data[1].show;
}



function editorLoad(){
	var editor;
	var kindeditor_uploadjson_url = global_upimg;
    KindEditor.ready(function(K) {
        editor = K.create('#huodongdetail', {
        	 uploadJson: kindeditor_uploadjson_url,
        	 allowImageRemote: false,
             items : ['source','preview','fullscreen','undo','redo','print','cut','copy','paste','plainpaste','wordpaste','justifyleft','justifycenter', 'justifyright','justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript','superscript','title', 'fontname', 'fontsize', 'textcolor', 'bgcolor', 'bold','italic', 'underline', 'strikethrough', 'removeformat', 'selectall', 'image','layer', 'table', 'hr', 'link', 'unlink'],
             allowFileManager:true,
             resizeType: 1,
             afterCreate:function(){
               this.sync();
               //editor.sync();     
             },
             afterBlur:function(){ 
                 this.sync(); 
             } 
        });
   });

}
function tags_group(obj){
	var arr = [];
	for(var i in obj){
		var tag_obj = {};
		tag_obj.key = i;
		tag_obj.val = obj[i];
		arr.push(tag_obj);
	}
	return arr;
}
function tags_add(type){
	var arr = new Array();
	$(".event-checked-list").eq(type).find("li").each(function(){
		var v = $(this).attr("class").indexOf("show");
		if(v!=-1)
		{
			arr.push($(this).attr("data-tagk"));

		}
	})
	return arr;
}


function PostEvent(obj,type){
	var isEvent = false;
	if(type == 0)
	{
		$.ajax({
			url: url+"/op/act",
			type: "post",
			traditional: true,
			data: obj,
			dataType: "json",
			async: false,
			xhrFields:{withCredentials:true},
			success: function(res){
				if(res.status=="1")
					isEvent = true;
			},
			error: function(){

			}
		})
			return isEvent;
	}
	if(type == 1)
	{
		$.ajax({
			url: url+"/op/lctr",
			type: "post",
			traditional: true,
			data: obj,
			dataType: "json",
			async: false,
			xhrFields:{withCredentials:true},
			success: function(res){
				isEvent = true;
			},
			error: function(){

			}
		})
			return isEvent;
	}
}

// 
// new comptime();
// function comptime() {
//     var beginTime = "2009-09-21 00:00:00";
//     var endTime = "2009-09-21 00:00:01";
//     var beginTimes = beginTime.substring(0, 10).split('-');
//     var endTimes = endTime.substring(0, 10).split('-');

//     beginTime = beginTimes[1] + '-' + beginTimes[2] + '-' + beginTimes[0] + ' ' + beginTime.substring(10, 19);
//     endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + endTime.substring(10, 19);

//     alert(beginTime + "aaa" + endTime);
//     alert(Date.parse(endTime));
//     alert(Date.parse(beginTime));
//     var a = (Date.parse(endTime) - Date.parse(beginTime)) / 3600 / 1000;
//     if (a < 0) {
//         alert("endTime小!");
//     } else if (a > 0) {
//         alert("endTime大!");
//     } else if (a == 0) {
//         alert("时间相等!");
//     } else {
//         return 'exception'
//     }
// }