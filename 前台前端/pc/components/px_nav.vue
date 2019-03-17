<template>
	<div class="navbar navbar-default navbar-fixed-top px-index-nav" role="navigation">
		<div class="box-mid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="px_navigation">
					<span class="sr-only"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a href="" class="navbar-brand"></a>
			</div>
			<form class="navbar-form navbar-left">
				<div class="form-group">
					<input class="form-control search-query" type="text" placeholder="请输入搜索关键字"></input>
				</div>
				<button type="button" class="btn btn-success px-search-btn">搜索</button>
			</form>	
			<div class="collapse navbar-collapse"  id="px_navigation">					
				<ul class="nav navbar-right navbar-nav">
					<li id="px_user_lr"><a  data-toggle="modal" data-target="#px_login" tabindex="-1">登录</a><a>|</a><a href="javascript:void(0)" data-toggle="modal" data-target="#px_register">注册</a></li>
					<li class="dropdown">
						<a href="#" class="dropdown-toggle">发布活动 <b class="caret"></b></a>
						<ul class="dropdown-menu dropdown-menu-left">
							<li><a href="">发布讲座</a></li>
						</ul>	
					</li>
					<li class="dropdown">
						<a href="#" class="dropdown-toggle">发现活动 <b class="caret"></b></a>
						<ul class="dropdown-menu dropdown-menu-right">
							<li class="discover-hd">
								<div v-for="(item,index) in event_discover_module">
									<dl>
										<dt><span :class="item.icon_class"></span>{{item.event_dt}}：</dt>
										<dd v-for="i in item.result"><a href="">{{ i }}</a></dd>		
									</dl><br><hr v-if="index!=2">
								</div>
							</li>
						</ul>	
					</li>
				</ul>
			</div>
		</div>	
	</div>
</template>

<style scoped>
	
</style>

<script>
	export default {
		data() {
			return {
				event_discover_module:[
					{
						event_dt:"时间",
						icon_class:"glyphicon glyphicon-time",
						result:["全部","今天","明天","本周","本周末","本月"]
					},
					{
						event_dt:"类型",
						icon_class:"glyphicon glyphicon-certificate",
						result:["全部","活动","讲座"]
					},
					{
						event_dt:"标签",
						icon_class:"glyphicon glyphicon-tags",
						result:["全部","创业","公益","亲子","科技","IT","电影","音乐","交友"]
					}
				]
			}
		}
	}
</script>