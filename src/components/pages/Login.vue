<template>
  <div class="wrapper">
    <div class="bg">
      <div class="login">
        <div class="login-header">登录</div>
        <el-select v-model="str.type" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
        <div>
          <el-input v-model="str.name" placeholder="请输入账号"></el-input>
          <el-input v-model="str.pass" placeholder="请输入密码" show-password></el-input>
        </div>
        <el-button type="primary" :plain="true" @click="toHome()">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script type='text/ecmascript-6'>
import API from "../../common/API";
export default {
  components: {},
  props: {},
  data() {
    return {
      options: [
        {
          value: "0",
          label: "超级管理员"
        },
        {
          value: "1",
          label: "普通管理员"
        },
        {
          value: "2",
          label: "用户"
        }
      ],
      str: {
        type: "",
        name: "",
        pass: ""
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    toHome() {
      this.$http({
        url: API.login,
        method: "post",
        data: this.str
      }).then(d => {
        // console.log(d);
        if(d.data.isok){
            this.$message({
              message: d.data.info,
              type: 'success'
            });
            localStorage.setItem('username',this.str.name)
            localStorage.setItem('isAdmin',d.data.isAdmin)
            this.$router.replace('/home')
        }else{
          this.$message({
            message: d.data.info,
            type: 'warning'
          });
        }
        
      });
    }
  },
  mounted() {}
};
</script>
<style lang='stylus' scoped>
@import '../../stylus/index.styl';

.wrapper {
  .bg {
    background: skyblue;
    width: 100vw;
    height: 100vh;

    .login {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      width: 400px;
      height: 300px;
      margin: auto;
      background: rgba(255, 255, 255, 0.5);
      text-align: center;

      .login-header {
        width: 100%;
        padding: 15px 0;
        font-size: 26px;
        border-bottom: 1px solid #87ceeb;
        color: #1989fa;
        text-align: center;
      }

      .el-select {
        display: block !important;
        padding: 10px 20px;
      }

      .el-input {
        display: block !important;
        padding: 10px 20px !important;

        >>>.el-input__inner {
          display: block !important;
          width: 361px !important;
        }
      }
    }
  }
}
</style>