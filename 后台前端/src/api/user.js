import Vue from 'vue'
import req from './BaseHandler.js'
let vue = new Vue()

//用户管理相关请求
export default{
    data(){
        return {}
    },
    deleteUser(id,scb,ecb){
        req.handler(
            vue.$http.delete('/user/'+id),
            scb,ecb,ecb
        ); 
    },
    getUserlist(p,str,scb,ecb){
        req.handler(
            vue.$http.get('/user/list',{
            params:{
              "p":p,
              "Searchstr":str
            }}),scb,ecb,ecb
        )  
    },
    getUserTotal(str,scb,ecb){
        req.handler(
            vue.$http.get('/user/list/total',{
                params:{
                  "Searchstr":str
            }}),scb,ecb,ecb
        );    
    },
    getUserAuthFile(id,p,str,scb,ecb){
        req.handler(
            vue.$http.get('/user/auth/'+id,{
                params:{
                  "p":p,
                  "Searchstr":str
            }}),scb,ecb,ecb
        );
    },
    setUserAuthStatus(id,status,scb,ecb){
        req.handler(
            vue.$http(
                {
                  url:'/user/auth/'+id,
                  method:status==1?'PUT':'DELETE'
                }
              ),scb,ecb,ecb
        );
    },
    getUserAuthlist(p,str,scb,ecb){
        req.handler(
            vue.$http.get('/user/auth/list',{
            params:{
              "p":p,
              "Searchstr":str
            }}),scb,ecb,ecb
        )  
    },
    getUserAuthTotal(str,scb,ecb){
        req.handler(
            vue.$http.get('/user/auth/list/total',{
                params:{
                  "Searchstr":str
            }}),scb,ecb,ecb
        );    
    },
}