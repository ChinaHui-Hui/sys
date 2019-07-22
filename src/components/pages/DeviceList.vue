<template>
  <div class="wrapper">
    <el-button type="primary" plain @click="toCreate('xinjian')" v-if='isAdmin<=1'>新建</el-button>
    <el-table :data="tableData" style="width: 100%;margin-top:20px">
      <el-table-column prop="xuhao" label="序号" width="80">
        <template slot-scope="scope">{{scope.$index+1}}</template>
      </el-table-column>
      <el-table-column prop="ip" label="ip" width="150">
        <template slot-scope="scope">{{scope.row.ip}}</template>
      </el-table-column>
      <el-table-column prop="door" label="机房" width="150">
        <template slot-scope="scope">{{scope.row.door}}</template>
      </el-table-column>
      <el-table-column prop="num" label="编号" width="150">
        <template slot-scope="scope">{{scope.row.num}}</template>
      </el-table-column>
      <el-table-column prop="width" label="宽带" width="150">
        <template slot-scope="scope">{{scope.row.width}}</template>
      </el-table-column>
      <el-table-column prop="status" label="使用" width="150">
        <template slot-scope="scope">{{scope.row.status==0?'已出售':'空闲'}}</template>
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button size="mini" @click="toCreate(scope.row.id,scope.row)" v-if="isAdmin<=1">查看</el-button>
          <!-- <el-button size="mini" @click="handleDelete(scope.$index, scope.row)">编辑</el-button> -->
          <v-del :id="scope.row.id" @del="del($event)" v-if="isAdmin<=1"></v-del>
          <el-button type="primary" v-if='isAdmin>1' @click='buy(scope.row.id,0)'  :disabled="scope.row.status=='0'">购买</el-button>
        </template>
      </el-table-column>>
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
      isAdmin:'',
    };
  },
  watch: {},
  computed: {},
  methods: {
    // handleDelete(idx,row){
    //     console.log(row)
    // },
    toCreate(id) {
      this.$router.push("/home/device/devicecreate?id=" + id);
    },
    init() {
      this.$http({
        url: API.findDevice
      }).then(d => {
        // console.log(d)
        if (d.data.code == -1) {
          // 未登录或者掉线
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
          return;
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
        url: API.delDevice,
        params: {
          id: id
        }
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
          // 删除成功
          this.$message({
            message: d.data.info,
            type: "success"
          });
          this.init();
        }
        // 删除失败
        this.$message({
          message: d.data.info,
          type: "warning"
        });
      });
    },
    // 购买
    buy(id,status){
      this.$http({
        url:API.updateDevice,
        params:{
          id:id,
          status:status
        }
      }).then(d=>{
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
          // 购买成功
          this.$message({
            message: '购买成功',
            type: "success"
          });
          this.init();
        }
        // 购买失败
        this.$message({
          message: d.data.info,
          type: "warning"
        });
      })
    }
  },
  mounted() {
    this.init();
    this.isAdmin = localStorage.getItem("isAdmin");
  }
};
</script>
<style lang='stylus' scoped>
.wrapper {
}
</style>