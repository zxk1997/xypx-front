//var url = "http://www.xypuxing.com"
var url=global_url;
var psvm = new Vue({
	el:"#px_search",
	data: {
		ops_filter_item: {
			filter_class:[
				{
					type: 1,
					tit:"类型",
					res: {}
				},{
					type: 2,
					tit:"标签",
					res: {}
				},{
					type: 0,
					tit:"时间",
					res: []
				}
				
			],
		},
		searchObj: {
			act_type: "",
			starttime:"",
			endtime:"",
			str: "",
			tags1: "",
			tags2:"",
			p: "1",
			l: "10"
		},
		cont: {},
		totalPage: "",
		clarr:{}
		
	},
	watch:{
		searchObj: {
			handler(){

			},
			deep: true
		},
		ops_filter_item: {
			handler(){

			},
			deep: true
		},
		clarr: {
			handler(){

			},
			deep: true
		}
	},
	mounted: function(){
		this.$nextTick(function(){
			this.clarr.a = (getSession("pa")==null)?0:parseInt(getSession("pa"))
			this.clarr.b = (getSession("pa")==null)?0:parseInt(getSession("pb"))
			this.clarr.c = (getSession("pa")==null)?0:parseInt(getSession("pc"))
			var res1 = datas[0].homePgaeData.event_discover_module;
			var that = this
			for(var i=0; i<res1.length; i++){
				var $type = res1[i].type
				for(var c=0; c<res1.length; c++){
					if(that.ops_filter_item.filter_class[c].type == $type)
						that.ops_filter_item.filter_class[c].res = res1[i].result
				}
			}
			this.onSearch();
			

		})
	},
	methods:{
		onSearch: function(){
			this.searchObj.act_type = (getSession("act_type")==null)?"0":getSession("act_type");
			this.searchObj.str = (getSession("str")==null)?"":getSession("str");
			this.searchObj.starttime = (getSession("starttime")==null)?"":getSession("starttime");
			this.searchObj.endtime = (getSession("endtime")==null)?"":getSession("endtime");
			this.searchObj.tags1 = (getSession("tags1")==null)?"":getSession("tags1");
			this.searchObj.p = (getSession("p")==null)?"0":getSession("p");
			this.cont = this.getEventBySearch()		

		},
		getEventBySearch: function(){
			var that = this;
			var result = {};
			var st = this.searchObj.starttime
			var et = this.searchObj.endtime
			var tags1 = this.searchObj.tags1
			var tags2 = this.searchObj.tags2
			var str = this.searchObj.str
			if(st === "" && et === ""){
				Vue.delete(that.searchObj,'starttime')
				Vue.delete(that.searchObj,'endtime')
			}
			if(tags1 === ""){
				Vue.delete(that.searchObj,'tags1')
			}
			if(tags2 === ""){
				Vue.delete(that.searchObj,'tags2')
			}
			if(str == "")
			{
				Vue.delete(that.searchObj,'str')
			}
				$.ajax({
					url: url+"/search",
					type: "post",
					data: that.searchObj,
					dataType: "json",
					async: false,
					xhrFields:{withCredentials:true}, 
					success: function(res){
						if(res.status=="1"){
							result = res.info
							var total = parseInt(res.msg)
							var item = that.searchObj.l
							if(total%item>0)
							 	that.totalPage = res.msg/that.searchObj.l+1
							 if(total%item === 0)
							 	that.totalPage = res.msg/that.searchObj.l
						}

					},
					error: function(){
						oSwal("查询出错！正在紧急修复中...",1);
					}
				})
			
			return result;
		},
		locatoinDetail: function(obj){
			setSession("pxid",obj.id)
			setSession("pxtype",String(obj.act_type))
			window.location.href="DetailedContent.html"
		}
	},
})
window.onload = function(){
	psvm.ops_filter_item.filter_class[1].res = daohang.etag;
	setTimeout(function(){on_filter()}, 1000);
	initPagination($("#paging"))
}
// function on_filter(){
// 	var $req_c = $(".Muser-filter-ul>li");
// 	for(var i = 1; i<$req_c.length-1; i++){
// 		var $that = $(this);
// 		var $ul = $req_c.eq(i).find("ul").eq(0);
// 		var $li = $ul.find("li");
// 		for(var c = 0; c<$li.length; c++)
// 		{
			
// 		}
// 	}
// }
function on_filter(){
	var $req_c = $(".Muser-filter-ul>li");
	var arr = [""]
	for(var d in psvm.clarr){
		arr.push(psvm.clarr[d]);
	}
	for(var i = 1; i<$req_c.length-1; i++){
		var $that = $(this);
		var $ul = $req_c.eq(i).find("ul").eq(0);
		var $li = $ul.find("li");
		for(var c = 0; c<$li.length; c++)
		{
			$li.eq(c).attr("onclick","search_filter(\'"+i+"\',\'"+c+"\')")
			if(c === arr[i])
			{
				$li.eq(c).addClass("filter-on")
			}else{
				$li.eq(c).removeClass("filter-on")
			}
		}
	}
}
function search_filter(key,val){
	if(key=="1")
	{
		setSession("pa",parseInt(val))
		setSession("act_type",val);
		window.location.reload();

	}
	if(key=="2")
	{
		setSession("pb",parseInt(val))
		if(val !== "0")
			setSession("tags1",val);
		window.location.reload();
	}
	if(key=="3")
	{

		var $val = parseInt(val)
		setSession("pc",val)
		setSession("p","1");
		timeSearch($val);
	}

}