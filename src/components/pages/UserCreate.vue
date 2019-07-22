<template>
  <div class="wrapper">
    <el-form :model="user" :rules="rules" ref="user" label-width="80px">
      <el-form-item label="账号" prop="name" required>
        <el-input v-model="user.name" :disabled="isupdate"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass" required>
        <el-input v-model="user.pass" :disabled="isupdate"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="tel">
        <el-input v-model="user.tel"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="user.email"></el-input>
      </el-form-item>

      <el-form-item label="性别">
        <el-radio v-model="user.sex" label="男" :disabled="isupdate">男</el-radio>
        <el-radio v-model="user.sex" label="女" :disabled="isupdate">女</el-radio>
      </el-form-item>
      <el-form-item label="身份证" prop="idx">
        <el-input v-model="user.idx" :disabled="isupdate"></el-input>
      </el-form-item>

      <el-form-item label="备注">
        <el-input v-model="user.des"></el-input>
      </el-form-item>
      <el-form-item label="时间">
        <el-date-picker v-model="user.time" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
    </el-form>
    <div style="text-align:center">
      <el-button type="primary" @click="add()" v-if="!isupdate">添加</el-button>
      <el-button type="primary" @click="update()" v-if="isupdate">修改</el-button>
      <el-button @click="back()">返回</el-button>
    </div>
    <div class="box"></div>
  </div>
</template>

<script type="text/ecmascript-6">
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
    // 验证手机号
    var validatePass3 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("电话不能为空"));
      }
      callback();
    };
    // 验证邮箱
    var validatePass4 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("邮箱不能为空"));
      }
      callback();
    };
    // 验证身份证
    var validatePass5 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("身份证不能为空"));
      }
      callback();
    };
    return {
      id: "",
      isupdate: false,  // 用来判断是添加还是修改的，如果是假的就显示修改，如果是真的就显示添加
      user: {
        name: "",
        pass: "",
        tel: "",
        email: "",
        sex: "",
        idx: "",
        time: "",
        des: ""
      },
      confirm: "",
      rules: {
        name: [{ validator: validatePass1, trigger: "blur" }],
        pass: [{ validator: validatePass2, trigger: "blur" }],
        tel: [
          { validator: validatePass3, trigger: "blur" },
          {
            pattern: /^1[356789]\d{9}$/g,
            message: "请输入中国大陆正确的手机号码",
            trigger: "blur"
          }
        ],
        email: [
          { validator: validatePass4, trigger: "blur" },
          {
            pattern: /^\w+@[a-z0-9]+(\.[a-z]+){1,3}$/,
            message: "请输入正确的邮箱,如qq邮箱、163邮箱等",
            trigger: "blur"
          }
        ],
        idx: [
          { validator: validatePass5, trigger: "blur" },
          {
            pattern: /^[1-9]\d{14}|[1-9]\d{17}|[1-9]\d{16}x$/,
            message: "请输入中国公民正确的身份证号",
            trigger: "blur"
          }
        ]
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    add() {
      this.$http({
        url: API.addUser,
        method: "get",
        params: this.user
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
        if (d.data.isok) { // 成功
          this.$message({
            message: d.data.info,
            type: "success"
          });
          this.$router.replace("/home/user");
          return;
        }
        this.$message({ // 失败
          message: d.data.info,
          type: "warning"
        });
      });
    },
    update() {
      delete this.user._id;
      this.$http({
        url: API.updateUser,
        method: "get",
        params: this.user
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
          this.$router.replace("/home/user");
          return;
        }
        this.$message({
          message: d.data.info,
          type: "warning"
        });
      });
    },
    back(){
      this.$router.push('/home/user/userlist')
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    if (this.id == "xinjian") {
      //新建
      this.isupdate = false;
    } else {
      //修改
      this.isupdate = true;
      this.$http({
        url: API.findUser,
        method: "get",
        params: {
          id: this.id
        }
      }).then(d => {
        this.user = d.data.data[0];
        console.log(d)
      });
    }
  }
};
</script>
<style lang='stylus'  scoped>
.box {
  text-align: center;
  line-height: 100px;
  font-size: 80px;
  padding: 100px;
}
</style>
