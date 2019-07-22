<template>
  <div class="wrapper">
    <el-button type="primary" plain @click="toCreate('xinjian')">新建</el-button>
    <el-table :data="tableData" border style="width: 80%;margin-top:20px">
      <el-table-column label="序号" width="60">
        <template slot-scope="scope">{{scope.$index+1}}</template>
      </el-table-column>
      <el-table-column label="账号" width="100">
        <template slot-scope="scope">{{scope.row.name}}</template>
      </el-table-column>
      <el-table-column label="电话" width="120">
        <template slot-scope="scope">{{scope.row.tel}}</template>
      </el-table-column>
      <el-table-column label="邮箱" width="200">
        <template slot-scope="scope">{{scope.row.email}}</template>
      </el-table-column>
      <el-table-column label="性别" width="100">
        <template slot-scope="scope">{{scope.row.sex}}</template>
      </el-table-column>
      <el-table-column label="身份证号" width="250">
        <template slot-scope="scope">{{scope.row.idx}}</template>
      </el-table-column>
      <el-table-column label="备注" width="120">
        <template slot-scope="scope">{{scope.row.des}}</template>
      </el-table-column>
      <el-table-column label="时间" width="120">
        <template slot-scope="scope">{{scope.row.time.substr(0,10)}}</template>
      </el-table-column>
      <el-table-column label="操作" fixed='right' width="200">
        <template slot-scope="scope">
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
      tableData:[]
    };
  },
  watch: {},
  computed: {},
  methods: {
    toCreate(id){
      this.$router.push('/home/user/usercreate?id='+id)
    },
    init() {
      this.$http({
        url: API.findUser
      }).then(d => {
        console.log(d)
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
        url: API.delUser,
        params: {
          id: id
        }
      }).then(d => {
        if (d.data.code == -1) {
          //未登录
          this.$message({
            message: d.data.info,
            type: "warning"
          });
          this.$router.replace("/login");
          return;
        }
        if (d.data.isok) {
          this.$message({
            message: d.data.info,
            type: "success"
          });
          this.init();
        } else {
          this.$message({
            //失败
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
<style  scoped>
</style>