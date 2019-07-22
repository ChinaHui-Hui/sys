<template>
  <div class="wrapper">
    <el-form label-width="80px" :model="user" :rules="rules">
      <el-form-item label="ip" prop='ip'>
        <el-input v-model="user.ip"></el-input>
      </el-form-item>
      <el-form-item label="机房" prop='door'>
        <el-input v-model="user.door"></el-input>
      </el-form-item>
      <el-form-item label="编号" prop='num'>
        <el-input v-model="user.num"></el-input>
      </el-form-item>
      <el-form-item label="宽带" prop='width'>
        <el-input v-model="user.width"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio v-model="user.status" label="1">空闲</el-radio>
        <el-radio v-model="user.status" label="0">已出售</el-radio>
      </el-form-item>
      <el-form-item style="text-align:center">
        <el-button type="primary" @click="add()" v-if="!isupdate">添加设备</el-button>
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
    // 验证ip
    var validatePass1 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      }
      callback();
    };
    // 验证机房
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入机房"));
      }
      callback();
    };
    // 验证编号
    var validatePass3= (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入编号"));
      }
      callback();
    };
    // 验证宽带
    var validatePass4= (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入宽带"));
      }
      callback();
    };
    return {
      id: "",
      isupdate: false, // 用来判断是添加还是修改的，如果是假的就显示修改，如果是真的就显示添加
      user: {
        ip: "",
        door: "",
        num: "",
        width: "",
        status: ""
      },
      rules:{
        ip:[
            { validator: validatePass1, trigger: "blur",required:true },
            {
              pattern:/(?=(\b|\D))(((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))(?=(\b|\D))/,
              message:'请输入正确的IP地址',
              trigger: "blur",
            },
        ],
        door:[
          { validator: validatePass2, trigger: "blur",required:true },
        ],
        num:[
          { validator: validatePass3, trigger: "blur",required:true },
        ],
        width:[
          { validator: validatePass4, trigger: "blur",required:true },
        ]
      }
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 添加设备
    add() {
      this.$http({
        url: API.addDevice,
        params: this.user
      }).then(d => {
        // console.log(d)
        if (d.data.code == -1) {
          // 未登录或者下线
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
          this.$router.replace("/home/device");
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
    // 编辑设备
    update() {
      delete this.user._id;
      this.$http({
        url: API.updateDevice,
        params: this.user
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
          // 修改成功
          this.$message({
            message: d.data.info,
            type: "success"
          });
          this.$router.replace("/home/device");
          return;
        } else {
          // 修改失败
          this.$message({
            message: d.data.info,
            type: "warning"
          });
        }
      });
    },
    back() {
      this.$router.push("/home/device");
    }
  },
  mounted() {
    // 首先以挂载完成就去数据库查找，看路由后面接的id参数是谁
    this.id = this.$route.query.id;
    if (this.id == "xinjian") {
      // 若id='xinjian'就说明是添加设备
      this.isupdate = false;
    } else {
      // 若不是就说明是修改设备
      this.isupdate = true;
      this.$http({
        url: API.findDevice,
        params: {
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