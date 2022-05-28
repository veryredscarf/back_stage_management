<template>
  <div class="conmmon-table">
    <el-table :data="tableData" stripe>
      <el-table-column
        show-overflow-tooltip
        v-for="item in tableLabel" 
        :key="item.prop"
        :label="item.label"
        :width="item.width ? item.width:125"
      >
      <template slot-scope="scope">
        <span style="margin-left:10px">{{scope.row[item.prop]}}</span>
      </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size='mini' type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>


      </el-table-column>



    </el-table>

      <el-pagination
      class="pager"
      layout="prev,pager,next"
      :total="config.total"
      :current-page="config.page" 
      @current-change="changePage"
      :page-size= "10"
      >
      </el-pagination>

  </div>
</template>

<script>
export default {
  name:"CommonTable",
  props:{
    tableData:Array,
    tableLabel:Array,
    config:Object,
  },
  data() {
    return{

    }
  },
  methods:{
    handleEdit(row){
      console.log(row)
      this.$emit('edit',row)
    },
    handleDelete(row){
      this.$emit('delete',row)
    },
    changePage(page){
      this.$emit('changePage',page)
    }
  }
}
</script>

<style lang="less" scoped>
.conmmon-table{
  // height:calc(50% - 62px);
  background-color:#fff;
  position: relative;
  .pager{
    position: absolute;
    bottom: -30px;
    right: 20px;
  }
  .el-table{
    height: 460px;
    overflow: hidden;
    overflow-y: scroll;
  }
}
</style>