<template>
    <component :is="cn" v-on:go='handle' :info='info' ></component>
</template>

<script>
import _main from './manage-main.vue'
import login from './login.vue'
export default {
    data(){
        return{
            cn:login,
            info:{},
        }
    },
    mounted:function(){
      this.getLoginState();
    }
    ,methods:{
        handle(info){
            console.log(info);
            this.cn=_main;
            this.info=info;
        },
        getLoginState(){
            this.$http.get('/manage/login/state').then((resp)=>{
                if(resp.data.status==1){
                    this.cn=_main;
                }
            });
        }
    }
}
</script>
