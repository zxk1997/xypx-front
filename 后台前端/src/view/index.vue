<template>
    <component :is="cn" v-on:go='handle'></component>
</template>

<script>
import _main from './manage-main.vue'
import login from './login.vue'
export default {
    data(){
        return{
            cn:login,
        }
    },methods:{
        handle(){
            this.cn=_main;
        }
    }
}
</script>
