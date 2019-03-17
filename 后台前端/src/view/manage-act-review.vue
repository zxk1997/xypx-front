<template>
  <el-container direction="vertical" style="padding:15px">
    <el-row    :class="{hideCard:isShowCard}">
      <el-col :span="6">
          <el-input v-model="searchStr" placeholder="请输入搜索内容"></el-input>
      </el-col>
      <el-col :span="12" style="text-align: left;padding-left: 20px;">
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
      </el-col>
    </el-row>

    <el-container>

      <!--内容表格-->
      <el-table
      :class="{hideCard:isShowCard}"
        :data="tableData"
        border
        style="margin-top:10px;margin-bottom:10px;">

        <el-table-column label="类型" width="80">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.type == 0">活动</el-tag>
            <el-tag  v-else>讲座</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="活动名称"  align="center" >
          <template slot-scope="scope">
              {{ scope.row.name }}
          </template>
        </el-table-column>

        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleOp(scope.$index, scope.row)">审核活动</el-button>
          </template>
        </el-table-column>
        
      </el-table>
      <!--审核内容卡片-->
      <el-card class ="box-card"  :class="{hideCard:!isShowCard}" style="margin-top:10px;width: 1280px;margin: 0 auto;" >

        <div style="float:right;font-weight: bold;text-align: left;font-size: 18px;">
          <div>活动标题：{{reviewInfo.name}}</div>
          <div>活动时间：{{reviewInfo.startTime}} - {{reviewInfo.endTime}}</div>
          <div>活动地点：{{reviewInfo.address}}</div>
          <div v-if="reviewInfo.plimit != 0">最多人数：{{reviewInfo.plimit}}</div>
          <div v-if="reviewInfo.plimit == 0">最多人数：无限制</div>
          <div>主办者：{{reviewInfo.host}}</div>
        </div>

        <div style="width:480px;height:240px">
          <img :src="reviewInfo.placard" style="width:100%;height:100%">
        </div>
        <hr/>

        <div style="text-align: left;font-weight: bold;">活动描述：{{reviewInfo.summary}}</div>
        <div style="text-align: left;font-weight: bold;">活动内容：</div>
        <div v-html="reviewInfo.content" style="text-align: left;"></div>

        <hr/>

        <el-button type="success" @click="reviewOp(1)">审核通过</el-button>
        <el-button type="danger" @click="reviewOp(0)">不通过</el-button>
        <el-button  @click="reviewOp(-1)">返回</el-button>

      </el-card>

    </el-container>

    <!--分页-->
    <el-row :class="{hideCard:isShowCard}">
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
        nowRow:{},
        isShowCard:false,
        reviewInfo:{},
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
      handleOp(index, row) {
        this.nowRow=row;
        this.nowRow.index=index;
        _act.getActDetail(row.id,(data)=>{
          this.reviewInfo=data.info;
          this.isShowCard=true;
        });
      },
      reviewOp(op) {
        if(op!=-1){
          _act.setActStatus(this.nowRow.id,op,this.nowRow.type,(data)=>{
            this.tableData.splice(this.nowRow.index,1);
            this.dataTotal-=1;
            _tool.showMsg("操作成功",1);
            this.isShowCard=false;
            if(this.tableData.length==0){
              handleSearch
            }
          },(resp)=>{
            this.isShowCard=false;
        });
        }else{
          this.isShowCard=false;
        }
        
        
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
        _act.getActReviewlist(this.currPage,this.searchStr,(data)=>{
          this.tableData = data.info
        });
      },
      getDataTotal(){
        _act.getActReviewTotal(this.searchStr,(data)=>{
          this.dataTotal = data.info
        });     
      },
    }
  }
</script>
<style scoped>

.hideCard{
  display: none;
}

</style>

