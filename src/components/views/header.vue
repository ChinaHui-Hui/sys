<template>
  <div class="header">
    <div>
      <div class="back">
        <div class="name">{{username}}</div>
        <div class="exit" @click.stop="toexit()">退出登录</div>
      </div>
    </div>
  </div>
</template>
<script type='text/ecmascript-6'>
import API from "../../common/API";
// $(function() {
//   $(".back").hover(
//     function(ev) {
//       // 滑上
//       $(".exit").css("display", "block");
//       $(".back").css("background", "white");
//       return false
//     },
//     function(ev) {
//       // 滑离
//       $(".exit").css("display", "none");
//       $(".back").css("background", "rgba(207, 207, 207, 0.5)");
//       return false
//     }
//   );
// });
export default {
  components: {},
  props: {},
  data() {
    return {
      username: localStorage.getItem("username")
    };
  },
  watch: {},
  computed: {},
  methods: {
    toexit() {
      this.$http({
        url: API.exit
      }).then(d => {
        console.log(d);
        this.$router.replace("/login");
      });
    }
  },
  mounted() {}
};
</script>
<style lang='stylus' scoped>
@import '../../stylus/index.styl';

.header {
  position: fixed;
  left: 0;
  top: 0;
  height: 59px;
  width: 100vw;
  background: rgba(207, 207, 207, 0.5);
  border-bottom: 1px solid #666;

  .back {
    float: right;
    height: 100%;
    font-size: 20px;
    width: 226px;
    text-align: center;
    cursor: pointer;

    .name {
      line-height: 60px;
      display:inline-block;
    }

    .exit {
      
      width: 103px;
      height: 60px;
      line-height: 60px;
      color :orange
      font-size: 15px;
      cursor: pointer;
      display: inline-block;
    }
  }
}
</style>