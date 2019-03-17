import Vue from 'vue';
let v = new Vue();
export default{
    showMsg(str,status){
        v.$notify({
            title: status==1?'成功':"失败",
            message: str,
            type: status==1?'success':'error',
          });
       
    },
    showMsgBox(str,status){
        v.$alert(str, '提示', {
            confirmButtonText: '确定',
            type: status==1?'success':'error'
          });
    }

}