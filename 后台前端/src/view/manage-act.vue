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

    <el-table-column label="活动封面" width="150">
      <template slot-scope="scope">
           <img :src="scope.row.placard" style="width:128px;height:128px;"/>
      </template>
    </el-table-column>

    <el-table-column label="活动类型" width="120" align="center">
      <template slot-scope="scope">
        <el-tag type="success" v-if="scope.row.type == 0">活动</el-tag>
        <el-tag  v-else>讲座</el-tag>
      </template>
    </el-table-column>

    <el-table-column label="活动名称"  align="center">
      <template slot-scope="scope">
          {{ scope.row.name }}
      </template>
    </el-table-column>

    <el-table-column label="活动发起人" >
      <template slot-scope="scope">
           {{ scope.row.host }}
      </template>
    </el-table-column>
    

    <el-table-column label="活动描述" >
      <template slot-scope="scope">
           {{ scope.row.summary }}
      </template>
    </el-table-column>

    <el-table-column label="活动时间">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.startTime }}</span>
      </template>
    </el-table-column>


    <el-table-column label="操作" width=320 >
      <template slot-scope="scope">
        <el-button
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除活动</el-button>
        <el-button
          type="primary"
          @click="handlePush(scope.row)" class="el-icon-circle-plus-outline">推送到首页</el-button>
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
  import _act from '../api/act.js'
  import _tool from '../api/common.js'
  export default {
    data() {
      return {
        currPage:1,
        dataTotal:120,
        searchStr:"",
        tableData: []
      }
    },mounted:function(){
      this.getData();
      this.getDataTotal();
    },
    methods: {
      handleDelete(index, row) {
        this.$confirm('确定要删除'+row.name+'这个活动吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {

          _act.deleteAct(row.id,row.type,(data)=>{
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
        _act.getActlist(this.currPage,this.searchStr,(data)=>{
          this.tableData = data.info
        });
      },
      getDataTotal(){
        _act.getActTotal(this.searchStr,(data)=>{
          this.dataTotal = data.info
        });     
      },
      handlePush(row){
        this.$confirm('确定要推荐'+row.name+'这个活动吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info'
        }).then(() => {
          _act.pushAct(row.id,row.type,(data)=>{
            _tool.showMsg(data.msg,1);
          });         
         
        });
      }
    }
  }
</script>
<style scoped>

</style>

