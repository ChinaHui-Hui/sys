<template>
  <div class="wrapper">
    <el-button type="primary" plain @click="toCreate('xinjian')" v-if="isAdmin<=1">新建</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" width="80">
        <template slot-scope="scope">{{scope.$index+1}}</template>
      </el-table-column>
      <el-table-column label="题目" width="200">
        <template slot-scope="scope">{{scope.row.tit}}</template>
      </el-table-column>
      <el-table-column label="内容" width="200">
        <template slot-scope="scope">{{scope.row.con}}</template>
      </el-table-column>
      <el-table-column label="注册时间" width="300">
        <template slot-scope="scope">{{scope.row.time.substr(0,10)}}</template>
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button size="mini" @click="toCreate(scope.row.id)" v-if="isAdmin>1">查看</el-button>
          <!-- <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">编辑</el-button> -->
          <v-del :id="scope.row.id" @del="del($event)" v-if="isAdmin<=1"></v-del>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script type='text/ecmascript-6'>
import API from "../../common/API";
export default {
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
      isAdmin:''
    };
  },
  watch: {},
  computed: {},
  methods: {
    // handleDelete(idx,row){
    //   console.log(idx)
    //   console.log(row)
    // },
    toCreate(id) {
      this.$router.push("/home/news/newscreate?id="+id);
    },
    init() {
      this.$http({
        url: API.findNews
      }).then(d => {
        // console.log(d);
        if (d.data.code == -1) {
          // 未登录
          this.$message({
            message: d.data.info,
            type: "warning"
          });
          this.$router.replace("/login");
          return;
        }
        if (d.data.isok) {
          // 查询成功
          this.tableData = d.data.data;
        } else {
          // 查询失败
          this.$message({
            message: d.data.info,
            type: "warning"
          });
        }
      });
    },

    // 删除
    del(id) {
      this.$http({
        url: API.delNews,
        params: {
          id: id
        }
      }).then(d => {
        console.log(d);
        if (d.data.code == -1) {
          // 未登录
          this.$message({
            message: d.data.info,
            type: "warning"
          });
          this.$router.replace("/login");
          return;
        }
        if (d.data.isok) {
          // 删除成功
          this.$message({
            message: d.data.info,
            type: "success"
          });
          this.init();
        }else{
          // 删除失败
          this.$message({
            message: d.data.info,
            type: "warning"
          });
        }
      });
    }
  },
  mounted() {
    this.init();
    this.isAdmin = localStorage.getItem('isAdmin')
  }
};
</script>
<style lang='stylus' scoped>
.wrapper {
}
</style>