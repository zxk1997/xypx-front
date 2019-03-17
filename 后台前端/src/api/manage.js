import Vue from 'vue'
import req from './BaseHandler.js'
let vue = new Vue()

export default{
    
    login(name,pwd,scb,ecb){
        req.handler(
            vue.$http.post("/manage/login",{"user":name,"pwd":pwd},{
                /*
                headers:{
                    'Access-Control-Allow-Credentials':'true'
                }*/
            })
              ,
            scb,ecb,ecb
        ); 
    },
    logout(scb,ecb){
        req.handler(vue.$http.get("/manage/logout"),scb,ecb);
    }
    

}