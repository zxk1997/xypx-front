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
<el-button type="primary" @click="login">登录</el-button><br />
<div>登录账户：admin<br />密码：123</div>
<el-tag class="inputStyle">后台前端实现：Vue+element-ui+Vue CLI</el-tag>
</el-card>
</div>
</template>

<script>
import _tools from '../api/common.js'
export default {
    data(){
        return {
            u:'admin',
            p:'123',
        }
    },methods:{
        login(){
            //_tools.showMsgBox("哈哈哈",1);
            this.$emit('go');
        },
    }
}
</script>
<style scoped>
.main{
    width: 50%;
    height: 50%;
    position: absolute;
    top: 25%;
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
    width: 800px;
    margin: 0 auto;
}
</style>

