//var url = "http://www.xypuxing.com"
var url=global_url;
var v_index = new Vue({
	el:"#px_homePage",
	data:{
		isShow_banner_a: false,
		tip_lists: {
			result:["首页推荐"], //,,"标签推荐","课表推荐"
			tipIndex: 0,
			event_tip_active: {
				borderBottom: '.2em solid #333',
				color: '#1b1b1b'
			}
			
		},
		rec_act: {}
		
	},
	watch:{
		rec_act: {
			handler(){},
			deep: true
		}
	},
	mounted: function(){
		this.$nextTick(function(){
			this.getgood_event()
		})
		
	},
	methods:{
		showBanner_a: function(){
			this.isShow_banner_a = true;
		},
		hideBanner_a: function(){
			this.isShow_banner_a = false;
		},
		getgood_event:function(){
			var that = this
			$.ajax({
				url: url+"/rec/act",
				type: "get",
				xhrFields: {withCredentials:true},
				success: function(res){
					if(res.status=="1")
						that.rec_act = res.info
				},
				error:function(){

				}

			})
		},
		locatoinDetail: function(obj){
			setSession("pxid",obj.id)
			setSession("pxtype",String(obj.act_type))
			window.location.href="DetailedContent.html"
		}
	}
})


