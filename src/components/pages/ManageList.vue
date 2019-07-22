<template>
  <div class="wrapper">
    <el-button type="primary" plain @click="toCreate('xinjian')">新建</el-button>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column label="序号" width="60">
        <template slot-scope="scope">{{scope.$index+1}}</template>
      </el-table-column>
      <el-table-column prop="name" label="账号" width="180"></el-table-column>
      <el-table-column prop="prop" label="属性" width="180"></el-table-column>
      <el-table-column label="时间" width="300">
        <template slot-scope="scope">{{scope.row.time.substr(0,10)}}</template>
      </el-table-column>
      <el-table-column label="操作" width="400">
        <template slot-scope="scope">
          <!-- <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
          <el-button size="mini" @click="toCreate(scope.row.id)">编辑</el-button>
          <v-del :id="scope.row.id" @del="del($event)"></v-del>
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
      
    };
  },
  watch: {},
  computed: {},
  methods: {
    // handleDelete(idx,row){
    //   console.log(idx,row)
    // },
    toCreate(id) {
      this.$router.push("/home/manage/managecreate?id=" + id);
    },
    init() {
      this.$http({
        url: API.findManage
      }).then(d => {
        // console.log(d)
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
    del(id) {
      this.$http({
        url: API.delManage,
        params: {
          id: id
        }
      }).then(d => {
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
          // 成功
          this.$message({
            message: d.data.info,
            type: "success"
          });
          this.init();
        } else {
          // 失败
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
  }
};
</script>
<style lang='stylus' scoped>
.wrapper {
}
</style>