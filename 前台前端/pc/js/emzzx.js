//var url = "http://www.xypuxing.com"
var url=global_url;
var eevm = new Vue({
	el:"#eventManager",
	data: {
		em_lists: {
			result:["活动信息","活动内容","参与人员"],
			tipIndex: 0,
			event_tip_active: {
				borderBottom: '.2em solid #333',
				color: '#1b1b1b'
			}
		},
		$id: "",
		$type: "",
		$peo: "",
		$class: "",
		px_info: {},
		joinPeo: {}	
	},
	mounted: function(){
		this.$nextTick(function(){
			this.loadInfo();
		})
	},
	watch: {
		joinPeo: {
			handler(){},
			deep: true
		}
	},
	methods:{
		loadInfo: function(){
			this.$id = (getSession("pxid")==null)?"":getSession("pxid");
			this.$type = (getSession("pxtype")==null)?"":getSession("pxtype");
			this.$peo = (getSession("peo")==null)?"":getSession("peo");


			this.px_info = getInfo(this.$id,this.$type,this.$peo);
			this.px_info.s = getFormatTime(this.px_info.s)
			this.px_info.e = getFormatTime(this.px_info.e)
			this.px_info.ps = getFormatTime(this.px_info.ps)
			this.px_info.pe = getFormatTime(this.px_info.pe)


			this.$class = (this.$type=="0")?"活动":"讲座"
			this.joinPeo = this.getJoinPeo();
		},
		canelEvent: function(){
			var that = this
			swal({
				text: "您真的要取消"+that.$class+"吗?",
				type: "warning",
				showCancelButton: true,
				confirmButtonText: '确认',
				cancelButtonText: '取消'
			}).then(function(isConfirm){
				console.log(isConfirm)
				if(isConfirm){
					$.ajax({
						url: url+"/op/act/"+that.$id,
						type: "delete",
						xhrFields: {withCredentials:true},
						success: function(res){
							if(res.status=="1")
							{
								swal({
									text: "成功取消"+that.$class,
									type: "success",
									showConfirmButton: false, 
									timer: 1500
								})
								setTimeout(function(){
									window.location.href="user_manager.html"
								},2000)
							}
						},
						error:function(){

						}
					})
					
				}
			})
		},
		canelBM: function(){
			var that = this
			swal({
				text: "您真的要取消报名吗?",
				type: "warning",
				showCancelButton: true,
				showConfirmButton: true,
				confirmButtonText: '确认',
				cancelButtonText: '取消'
			}).then(function(isConfirm){
				if(isConfirm){

					$.ajax({
						url: url+"/op/partake/"+that.$id,
						type: "delete",
						xhrFields: {withCredentials:true},
						success: function(res){
							if(res.status=="1")
							{
								swal({
									text: "成功取消报名",
									type: "success",
									showConfirmButton: false, 
									timer: 1500
								})
								setTimeout(function(){
									window.location.href="user_manager.html"
								},2000)
							}
						},
						error:function(){

						}
				})



					
				}
			})
		},
		getJoinPeo: function(){
			var that = this
			var obj = {}
			$.ajax({
					url: url+"/op/partakelist",
					type: "post",
					xhrFields: {withCredentials:true},
					async: false,
					data:{
						id: that.$id,
						act_type: that.$type
					},
					success: function(res){
						if(res.status=="1")
						{
							obj = res.info;
						}
					},
					error:function(){

					}
			})
			return obj;
		}	
	}
})
