<template>
  <div class="left">
    <router-link to="/home/manage" active-class="select" v-if='isAdmin=="0"'>管理员管理</router-link>
    <router-link to="/home/user" active-class="select" v-if='isAdmin!="2"'>用户管理</router-link>
    <router-link to="/home/news" active-class="select">通知</router-link>
    <router-link to="/home/device" active-class="select">设备管理</router-link>
  </div>
</template>
<script type='text/ecmascript-6'>
export default {
  components: {},
  props: {},
  data() {
    return {
      isAdmin:''
    };
  },
  watch: {},
  computed: {},
  methods: {},
  mounted() {
    this.isAdmin = localStorage.getItem('isAdmin')
  }
};
</script>
<style lang='stylus' scoped>
.left {
  width: 200px;
  background: rgba(0, 0, 0, 0.1);
  height: 100%;
  padding-top: 20px;
  position: fixed;

  a {
    font-size: 15px;
    display: block !important;
    line-height: 40px;
    text-align: center;
    height: 40px;
    width: 200px;
    color: #333333;

    &:hover {
      background: #ffffff;
    }
  }

  .select {
    background: #b3c0d1;
  }
}
</style>