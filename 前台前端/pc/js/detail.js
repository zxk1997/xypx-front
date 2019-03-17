//var url = "http://www.xypuxing.com"
var url=global_url;
var dvm = new Vue({
	el: "#detailBox",
	data: {
		result: {},
		joinPeo: {},
		isBM: false,
		bm_info:{
			email: "",
			phone: ""
		},
		$id:"",
		$type:"",
		$cls: ""
	},
	watch: {
		bm_info:{
			handler(newV,oldV){},
			deep: true,
		}
	},
	computed: {},
	mounted: function(){
		this.$nextTick(function(){
			this.getActInfo()
		})
	},
	methods: {
		getActInfo: function(){
			this.$id = getSession("pxid")
			this.$type = getSession("pxtype")
			this.$cls = this.$type=="0"?"活动":"讲座"
			this.result = getInfo(this.$id,this.$type,"");
			// this.getJoinPeo(this.$id,this.$type);
			var that = this
			if(daohang.isLogin){
				$.ajax({
					url: url+"/op/partake/"+that.$id,
					type: "get",
					dataType: "json",
					async: false,
					xhrFields:{withCredentials:true},
					success: function(res){
						if(res.status=="1")						
							that.isBM = res.info
					},
					error: function(){
						that.isBM = false;
					}
				})
			}
		},

		takePartIn:function(){
			var phone = this.bm_info.phone
			var email = this.bm_info.email
			var that = this
			if(phone.length!=11 || !(/^1[3|4|5|8][0-9]\d{4,8}$/.test(phone))){
				autoCloseSwal("报名失败","请填写正确的手机号码！","error");
				return;
			}
			var partten =  /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
			if(!partten.test(email)){
				autoCloseSwal("报名失败","请填写正确的邮箱！","error");
				return;
			}
			$.ajax({
				url: url+"/op/partake",
				type: "post",
				data: {
					id: that.$id,
					type: parseInt(that.$type),
					phone: phone,
					email: email
				},
				xhrFields:{withCredentials:true},
				dataType: "json",
				success: function(res){
					if(res.status == "1"){
						$("#px_BM").modal("hide");
						oSwal(that.$cls+"报名成功！",0);
						if(res.info!=null&&res.info.length>4){							
							swal({
									title: that.$cls+"报名成功！",
									html:'<img src='+res.info+' style="width:100%;">',
									type: "success",
									showConfirmButton: true,
									confirmButtonText: "确认"
								})
							window.location.reload();
						}
						else
							oSwal(that.$cls+"报名成功！",0)
						for(var i in that.bm_info){
							that.bm_info[i] = ""
						}
					}else{
						oSwal(res.msg,1);
					}
					
				},
				error: function(res){
					$("#px_BM").modal("hide");
					oSwal("报名失败，正在查明原因修复中！",1);
				}
			})

		},
		pleaseLogin: function() {
			oSwal("报名失败，请先登录",2);
		}
	}
})
window.onload = function(){
	var docImg = document.getElementById('detail_body').getElementsByTagName('img');
	for (var i = 0; i < docImg.length; i++) {
		var img = new Image();
		img.src = docImg[i].src;
		var docImgW = img.width;
		if(docImgW>738)
		docImg[i].width = 738;
		docImg[i].style.height = 'auto'
	}

}