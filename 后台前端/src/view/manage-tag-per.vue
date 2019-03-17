<template>
<el-container direction="vertical" style="padding:15px">
  <el-row>
    <el-col :span="6">
        <el-input v-model="searchStr" placeholder="请输入搜索内容"></el-input>
    </el-col>
    <el-col :span="12" style="text-align: left;padding-left: 20px;">
        <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="handleAdd">添加性格标签</el-button>
    </el-col>
  </el-row>
  <el-table
    :data="tableData"
    border
    style="width: 100%;margin-top:10px;margin-bottom:10px;">


    <el-table-column label="id"  align="center">
      <template slot-scope="scope">
          {{ scope.row.id }}
      </template>
    </el-table-column>


    <el-table-column label="标签名">
      <template slot-scope="scope">
        <el-tag type="success">{{ scope.row.name }}</el-tag>
      </template>
    </el-table-column>


    <el-table-column label="操作" >
      <template slot-scope="scope">
        <el-button
          size="medium "
          type="primary "
          @click="handleOption(scope.$index, scope.row)">重命名</el-button>

        <el-button
          size="medium "
          type="danger "
          @click="handleDelete(scope.$index, scope.row)">删除标签</el-button>

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
  import _tag from '../api/tag_per.js'
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
      handleOption(index, row) {
        this.$prompt('请输入标签 '+row.name+" 的新名字", '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          //value 输入的名字
          _tag.renameTag(row.id,value,(data)=>{
            _tool.showMsg(data.msg,1);
            handleSearch();
          })
        });
      },
      handleDelete(index, row) {
          this.$confirm('确定要删除标签 '+row.name +" ？", '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error'
        }).then(() => {
          _tag.deleteTag(row.id,(data)=>{
            _tool.showMsg(data.msg,1);
            this.tableData.splice(index,1);
            this.dataTotal-=1;
            if(this.tableData.length==0){
              handleSearch();
            }
          });
        });
      },
      handleAdd(){
        this.$prompt('请输入要添加的标签名字', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          //value 输入的名字
          _tag.addTag(value,(data)=>{
            _tool.showMsg(data.msg,1);
            handleSearch();
          })
        });
      },
      handleSearch(){
        this.currPage=1;
        this.getData();
        this.getDataTotal();     
      },
      handlePage(curr){
          this.getData();
      },
      getData(){
        _tag.getlist(this.currPage,this.searchStr,(data)=>{
          this.tableData = data.info
        });
      },
      getDataTotal(){
        _tag.getTotal(this.searchStr,(data)=>{
          this.dataTotal = data.info
        });     
      },

    }
  }
</script>
<style scoped>

</style>
