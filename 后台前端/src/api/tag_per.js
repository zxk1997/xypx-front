import Vue from 'vue'
import req from './BaseHandler.js'
let vue = new Vue()

export default{
    
    setType(t){
        this.type=t;
    },
    getlist(p,str,scb,ecb){
        req.handler(
            vue.$http.get('/tag/per/list',{
            params:{
              "p":p,
              "Searchstr":str
            }}),scb,ecb,ecb
        )  
    },
    getTotal(str,scb,ecb){
        req.handler(
            vue.$http.get('/tag/per/list/total',{
                params:{
                  "Searchstr":str
            }}),scb,ecb,ecb
        );    
    },
    deleteTag(id,scb,ecb){
        req.handler(
            vue.$http.delete('/tag/per/'+id),
            scb,ecb,ecb
        ); 
    },
    addTag(name,scb,ecb){
        req.handler(
            vue.$http(
                {
                  url:'/tag/per',
                  method:'POST',
                  params:{"name":name}
                }
              ),
            scb,ecb,ecb
        ); 
    },
    renameTag(id,name,scb,ecb){
        req.handler(
            vue.$http(
                {
                  url:'/tag/per/'+id,
                  method:'PUT',
                  params:{"name":name}
                }
              )
            ,scb,ecb,ecb
        );    
    }

}