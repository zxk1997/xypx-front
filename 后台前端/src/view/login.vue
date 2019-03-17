<template>

<div class="main">
<el-card class="box-card cardStyle">
    <img src="http://120.78.83.14:8090/img/logo.png" style="height:128px ; position: relative;top: 20px;">
  <p style="font-size:40px; color: #409EFF;">校园蒲行后台管理</p>

<el-input
  placeholder="请输入账户"
  v-model="u"
  clearable
  class="inputStyle"
  >
</el-input>
<el-input placeholder="请输入密码" v-model="p" show-password class="inputStyle"></el-input><br />
<el-button type="primary" @click="login" class="inputStyle">登录</el-button><br />

<el-tag class="inputStyle">后台前端实现：Vue+element-ui+Vue CLI</el-tag>
</el-card>
</div>
</template>

<script>
import _tools from '../api/common.js'
import _user from '../api/manage.js'
export default {
    data(){
        return {
            u:'',
            p:'',
        }
    },methods:{
        login(){
            _user.login(this.u,this.p,((data)=>{
                this.$emit('go',data.info);
            }))
            
        },
    }
}
</script>
<style scoped>
.main{
    width: 50%;
    height: 50%;
    position: absolute;
    top: 15%;
    left: 25%;
    text-align: center;
    padding: 10px;
}

.inputStyle{
    width: 50%;
    margin-top: 10px;
    margin-bottom: 10px;
}
.cardStyle{
    width: 600px;
    margin: 0 auto;
}
</style>

