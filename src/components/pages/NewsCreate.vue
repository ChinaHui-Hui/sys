<template>
  <div class="wrapper">
    <el-form label-width="80px" :model="user" style="width:80%">
      <el-form-item label="题目">
        <el-input v-model="user.tit"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="user.con" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker type="date" placeholder="选择日期" v-model="user.time"></el-date-picker>
      </el-form-item>
      <el-form-item style="text-align:center">
        <el-button type="primary" @click="add()" v-if="!isupdate">添加</el-button>
        <el-button type="primary" @click="update()" v-if="isupdate">修改</el-button>
        <el-button type="primary" @click="back()">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script type='text/ecmascript-6'>
import API from "../../common/API";
export default {
  components: {},
  props: {},
  data() {
    return {
      user: {
        tit: "",
        con: "",
        time: ""
      },
      id: "",
      isupdate: false // 用来判断是添加还是修改的，如果是假的就显示修改，如果是真的就显示添加
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 添加通知
    add() {
      this.$http({
        url: API.addNews,
        params: this.user
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
          // 添加成功
          this.$message({
            message: d.data.info,
            type: "success"
          });
          this.$router.replace("/home/news");
          return;
        }
        // 添加不成功
        this.$message({
          message: d.data.info,
          type: "warning"
        });
      });
    },
    update() {
      delete this.user._id;
      this.$http({
        url: API.updateNews,
        params: this.user
      }).then(d => {
        console.log(d);
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
          // 修改成功
          this.$message({
            message: d.data.info,
            type: "success"
          });
          this.$router.replace("/home/news");
          return;
        }
        // 修改失败
        this.$message({
          message: d.data.info,
          type: "warning"
        });
      });
    },
    back() {
      this.$router.push("/home/news/newslist");
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    if (this.id == "xinjian") {
      // 如果穿的id='xinjian',那么就是添加页面
      this.isupdate = false;
    } else {
      // 如果传的id等于的是这条通知的id,name就是修改页面
      this.isupdate = true;
      this.$http({
        url: API.findNews,
        parmas: {
          id: this.id
        }
      }).then(d => {
        // console.log(d);
        this.user = d.data.data[0]
      });
    }
  }
};
</script>
<style lang='stylus' scoped>
.wrapper {
}
</style>