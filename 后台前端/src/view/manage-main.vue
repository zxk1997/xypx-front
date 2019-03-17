<template>
    <el-container><!--子元素包含el-header，所以这是垂直布局-->

        <el-header height="100">
            <img src="http://120.78.83.14:8090/img/logo.png" style="height:64px ; position: relative;top: 20px;">
            <span style="font-size:40px; color: #409EFF;">校园蒲行后台管理</span>

            <el-dropdown class="info-nav" @command="logout"> 
                <span class="el-dropdown-link">
                    {{info.user}}
                    <span v-if="info.role=='admin'">(所有权限)</span>
                    <span v-if="info.role=='normal'">(只读权限)</span>
                    <i class="el-icon-arrow-down el-icon--right"></i><br/>
                </span>
                
                <el-dropdown-menu slot="dropdown"  >
                    <el-dropdown-item >退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

        </el-header> 
        
        <el-container><!--子元素包含el-aside，所以这是水平布局-->
            <!--侧边导航栏-->
            <el-aside>
                <el-menu  class="el-menu-vertical-demo" @select="handleSelect">
                    <el-submenu v-for="menu in menuList" :key="menu.menuname" :index="menu.menuname">
                        <template slot="title">
                            <i :class="menu.menuicon"></i>
                            <span class="parentMenu">{{menu.menuname}}</span>
                        </template>
                        <el-menu-item-group v-for="submenu in menu.submenus" :key="submenu.submenuname" >
                            <el-menu-item :index="submenu.submenuname">
                            {{submenu.submenuname}}  
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <!--内容主体-->
            <el-container class="main_content">
                <el-main>
                    <component :is="main_content"></component>              
                </el-main>
            </el-container>  
        </el-container>

    </el-container>
</template>


<script>
import user from './manage-user.vue'
import user_review from './manage-user-review.vue'
import tag_act from './manage-tag-act.vue'
import tag_per from './manage-tag-per.vue'
import act_push from './manage-act-push.vue'
import act from './manage-act.vue'
import act_review from './manage-act-review.vue'
import _user from '../api/manage.js'
export default {
    props:['info'],
    data() {
        return {
            //放一些变量
            main_content : user,
            menuList:
                [
                    {
                        "menuname":"用户管理",
                        "menuicon":"el-icon-share",
                        "submenus":[
                            {
                                "submenuname":"用户管理",
                            },{
                                "submenuname":"用户审核",
                            }
                        ]
                    },{
                        "menuname":"活动管理",
                        "menuicon":"el-icon-bell",
                        "submenus":[
                            {
                                "submenuname":"活动管理",
                            },{
                                "submenuname":"活动审核",
                            }
                        ]	
                    },{
                        "menuname":"首页推送管理",
                        "menuicon":"el-icon-rank",
                        "submenus":[
                            {
                                "submenuname":"推送管理",
                            }
                        ]	
                    },{
                        "menuname":"标签管理",
                        "menuicon":"el-icon-star-off",
                        "submenus":[
                            {
                                "submenuname":"管理活动标签",
                            },{
                                "submenuname":"管理性格标签",
                            }
                        ]	
                    }
                ]
                    
        }
    },mounted:function(){
      console.log(this.info)
    },
    methods:{
        //响应一些方法
        handleSelect(key, keyPath) {
            console.log(key,keyPath)
            if(key=="用户管理"){
                this.main_content=user;
            }else  if(key=="用户审核"){
                this.main_content=user_review;
            }else  if(key=="管理活动标签"){
                this.main_content=tag_act;
            }else  if(key=="管理性格标签"){
                this.main_content=tag_per;
            }else  if(key=="推送管理"){
                this.main_content=act_push;
            }else  if(key=="活动管理"){
                this.main_content=act;
            }else  if(key=="活动审核"){
                this.main_content=act_review;
            }
      },logout(){
          _user.logout((data)=>{
              location=location;
          });
      }    
    },
    components:{
        //声明一些组件
        user,user_review,tag_act,tag_per,act_push,act,act_review
    }
}
</script>


<style scoped>
  .info-nav{
      position: fixed;
    right: 5%;
    color: #409EFF;
    font-size: 20px;
  }
  .el-header {
    background-color:rgb(255, 255, 255);
    color: #333;
    text-align: center;
    line-height: 100px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    
    position: fixed;
    width: 100%;
    /*left: 300px;*/
    top: 0;
    z-index: 888;
  
  }
  .el-menu{
	  height: 100%;
  }
  .el-aside {
    background-color: #ffffff;
    color: #333;
    line-height: 200px;
    border-radius: 4px;

	position: fixed;
    font-size: 0;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
  }

  .main_content{
	  margin-left: 291px;
      margin-top: 100px;
  }
  
  .el-main {
    background-color: #ffffff;
    color: #333;
    text-align: center;
    border-radius: 4px;
    padding: 10px;
    /*line-height: 50px;*/
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
</style>

