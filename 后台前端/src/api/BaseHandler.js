import Vue from 'vue'
import tools from './common.js'
let vue = new Vue();
let loading ;
export default{
    load(){
        this.loading = vue.$loading({
            lock: true,
            text: '数据正在拼命加载中...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
    },
    closeLoad(){
        this.loading.close();
    },
    showMsg(str,status){
        tools.showMsg(str,status);        
    },
    handler(promise,successCall,errorCall,reqfailCall){
        //后端传来的数据格式固定，所以由一个基本类来处理连接错误，操作失败错误的显示，并回调自定的逻辑函数
        this.load();//全屏显示加载页面
        promise.then((response) => {
            this.closeLoad();//请求成功关闭加载页面
            if(response.data.status==1){
                successCall(response.data);
            }else{
                if(response.data.msg!=null && response.data.msg!=''){
                    this.showMsg(response.data.msg,0);
                }
                
                if(reqfailCall!=null){
                    reqfailCall(response);
                }

                if(response.data.errorCode==-1){
                    //未登录
                    console.log("没登录啊")
                    vue.$alert('登录状态丢失，将返回登录页面', '提示', {
                        confirmButtonText: '确定',
                        type:'error',
                        callback: action => {
                            location=location;
                        }
                      });
                    
                }
                 
            }
            
              
          }, (response) => {
              this.closeLoad();//请求失败也要关闭加载页面
              this.showMsg("连接服务器失败!",0);
              if(errorCall!=null){
                errorCall(response);
              }
              
          });
    }
}