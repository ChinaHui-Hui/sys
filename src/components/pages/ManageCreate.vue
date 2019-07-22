<template>
  <div class="wrapper">
    <el-form :model="user" :rules="rules" ref="user" label-width="100px" style="width:80%" class="demo-ruleForm">
      <el-form-item label="账号" prop='name'>
        <el-input v-model="user.name" :disabled="isupdate"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop='pass'>
        <el-input v-model="user.pass" :disabled="isupdate"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" v-if="!isupdate" prop='checkPass'>
        <el-input v-model="checkPass"></el-input>
      </el-form-item>
      <el-form-item label="属性">
        <el-input v-model="user.prop"></el-input>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker v-model="user.time" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add()" v-if="!isupdate">注册</el-button>
        <el-button type="primary" @click="update()" v-if="isupdate">修改</el-button>
        <el-button @click="back()">返回</el-button>
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
    // 验证账号
    var validatePass1 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      }
      callback();
    };
    // 验证密码
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      callback();
    };
    // 确认密码
    var validatePass3 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.checkPass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      user: {
        name: "",
        pass: "",
        prop: "",
        time: ""
      },
      rules: {
        name:[
          { validator: validatePass1, trigger: "blur",required:true },
        ],
        pass:[
          { validator: validatePass2, trigger: "blur",required:true },
        ],
        checkPass:[
          { validator: validatePass3, trigger: "blur",required:true },
        ]
      },
      checkPass: "",
      isupdate: false  // 用来判断是注册还是修改的，如果是假的就显示修改，如果是真的就显示添加
    };
  },
  methods: {
    add() {
      // 添加
      if (this.checkPass != this.user.pass) {
        this.$message({
          message: "两次密码不一致",
          type: "warning"
        });
        return;
      }
      this.$http({
        url: API.addManage,
        params: this.user
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
          // 添加成功
          this.$message({
            message: d.data.info,
            type: "success"
          });
          this.$router.replace("/home/manage");
          return;
        } else {
          // 添加失败
          this.$message({
            message: d.data.info,
            type: "warning"
          });
        }
      });
    },
    update() {
      delete this.user._id;
      this.$http({
        url: API.updateManage,
        params: this.user
      }).then(d => {
        // console.log(d);
        if (d.data.code == -1) {  // 有可能掉线，清除数据
          this.$message({
            message: d.data.info,
            type: "warning"
          });
          this.$router.replace("/login");
          return;
        }
        if(d.data.isok){  //   修改成功
          this.$message({
            message: d.data.info,
            type: "success"
          });
          this.$router.replace("/home/manage");
          return;
        }
        this.$message({
            message: d.data.info,
            type: "warning"
          });
          
      });
    },
    back() {
      this.$router.push("/home/manage/managelist");
    }
  },
  watch: {},
  computed: {},
  mounted() {
    var id = this.$route.query.id;
    if (id == "xinjian") {
      this.isupdate = false;
      // 跳到新建管理员页面
    } else {
      // 跳到修改的页面
      this.isupdate = true;
      this.$http({
        url: API.findManage,
        params: {
          id: this.id
        }
      }).then(d => {
        console.log(d);
        this.user = d.data.data[0];
      });
    }
  }
};
</script>
<style lang='stylus' scoped>
.wrapper {
}
</style>