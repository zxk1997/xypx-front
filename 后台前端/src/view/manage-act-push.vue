<template>
<el-container direction="vertical" style="padding:15px">

  <el-table
    :data="tableData"

    border
    
    style="width: 100%;margin-top:10px;margin-bottom:10px;">


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

    <el-table-column label="活动简述" >

      <template slot-scope="scope">
          {{ scope.row.summary }}
      </template>
    </el-table-column>

    <el-table-column label="操作" >
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
        dataTotal:0,
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
          _act.deleteActRec(row.id,(data)=>{
            _tool.showMsg(data.msg,1);
            this.tableData.splice(index,1);
            this.dataTotal-=1;
            if(this.tableData.length==0){
              this.currPage=1;
              this.getData();
              this.getDataTotal();
            }
          });
        })
        console.log(index, row);
      },
      handlePage(curr){
          this.getData();
      },
      getData(){
        _act.getActReclist(this.currPage,(data)=>{
          this.tableData = data.info
        });
      },
      getDataTotal(){
        _act.getActRecTotal((data)=>{
          this.dataTotal = data.info
        });     
      },
    }
  }
</script>
<style scoped>

</style>

