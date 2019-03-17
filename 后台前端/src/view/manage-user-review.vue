<template>
<el-container direction="vertical" style="padding:15px">
  <el-row>
    <el-col :span="6">
        <el-input v-model="searchStr" placeholder="请输入搜索内容"></el-input>
    </el-col>
    <el-col :span="12" style="text-align: left;padding-left: 20px;">
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
    </el-col>
  </el-row>
  <el-table
    :data="tableData"

    border

    style="width: 100%;margin-top:10px;margin-bottom:10px;">


    <el-table-column label="用户昵称"  align="center">
      <template slot-scope="scope">
          {{ scope.row.nickname }}
      </template>
    </el-table-column>


    <el-table-column label="注册日期">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.time }}</span>
      </template>
    </el-table-column>


    <el-table-column label="操作" >
      <template slot-scope="scope">
        <el-button
          size="medium "
          type="primary "
          @click="handleOption(scope.$index, scope.row)">审核此用户</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-row>
    共{{dataTotal}}条数据
    <el-pagination 
        @current-change="handlePage"
        background
        layout="prev, pager, next"
        :current-page.sync="currPage"
        :total="dataTotal">
    </el-pagination>
  </el-row>

<el-dialog
  :title="nowRow.nickname + '的证件信息'"
  :visible.sync="dialogVisible"
  width="30%"
  >
  <img :src="authUrl" style="width:320px;height:320px;"/><br />
  <a :href="authUrl" target="_blank">点我查看大图</a>
  <span slot="footer" >
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="danger" @click="handleAuth(0)">无效</el-button>
    <el-button type="success" @click="handleAuth(1)">通过</el-button>
  </span>
</el-dialog>
</el-container>
</template>

<script>
  import _user from '../api/user.js'
  export default {
    data() {
      return {
        nowRow :{},
        nowIndex:0,
        authUrl:'',
        dialogVisible: false,
        currPage:1,
        dataTotal:120,
        searchStr:"",
        tableData: [],

      }
    },mounted:function(){
      this.getData();
      this.getDataTotal();
    },components:{
      
    },
    methods: {
      handleOption(index, row) {
        this.nowRow=row;
        this.nowIndex=index;
        _user.getUserAuthFile(row.id,this.currPage,this.searchStr,(data)=>{
            this.authUrl = data.info
            this.dialogVisible =true;
        });
      },
      handleSearch(){
        this.currPage=1;  
        this.getDataTotal();
        this.getData();          
      },
      handlePage(curr){
        this.getData();
      },
      handleAuth(result){
        _user.setUserAuthStatus(
          this.nowRow.id,result,(data)=>{
              this.tableData.splice(this.nowIndex,1);
              if(this.tableData.length==0){
                this.handleSearch();
              }
          }
        );
        this.dialogVisible =false;
      },
      getData(){
        _user.getUserAuthlist(
          this.currPage,this.searchStr,(data)=>{
            this.tableData = data.info
          }
        );
      },
      getDataTotal(){
        _user.getUserAuthTotal(
          this.searchStr,(data)=>{
            this.dataTotal = data.info
          }
        );       
      },

    }
  }
</script>
<style scoped>

</style>

