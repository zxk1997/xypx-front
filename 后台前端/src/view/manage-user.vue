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

    <el-table-column label="头像" width="80">
      <template slot-scope="scope">
           <img :src="scope.row.icon" style="width:64px;height:64px;"/>
      </template>
    </el-table-column>

    <el-table-column label="认证状态" width="120">
      <template slot-scope="scope">
        <el-tag type="success" v-if="scope.row.status == 1">认证通过</el-tag>
        <el-tag type="warning" v-else>未认证</el-tag>
      </template>
    </el-table-column>

    <el-table-column label="用户昵称"  align="center">
      <template slot-scope="scope">
          {{ scope.row.nickname }}
      </template>
    </el-table-column>

    <el-table-column label="登录账号" >
      <template slot-scope="scope">
           <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.username }}</el-tag>
          </div>
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
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除用户</el-button>
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

</el-container>
</template>

<script>
  import _user from '../api/user.js'
  import _tool from '../api/common.js'
  export default {
    data() {
      return {
        currPage:1,
        dataTotal:0,
        searchStr:"",
        tableData: [],
        

      }
    },mounted:function(){
      this.getData();
      this.getDataTotal();
    },
    methods: {
      handleDelete(index, row) {
        this.$confirm('确定要删除'+row.nickname+'这个用户吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          _user.deleteUser(row.id,(data)=>{
            this.tableData.splice(index,1);
            _tool.showMsg(data.msg,1);
          });         
         
        });
        console.log(index, row);
      },
      handleSearch(){
        this.currPage=1;  
        this.getDataTotal();
        this.getData();    
      },
      handlePage(curr){
          this.getData();
      },
      getData(){
        _user.getUserlist(this.currPage,this.searchStr,(data)=>{
          this.tableData = data.info
        });
      },
      getDataTotal(){
        _user.getUserTotal(this.searchStr,(data)=>{
          this.dataTotal = data.info
        });     
      }
    
    }
  }
</script>
<style scoped>

</style>

