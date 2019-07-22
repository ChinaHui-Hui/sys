<template>
  <div class="wrapper">
    <router-view></router-view>
  </div>
</template>
<script type='text/ecmascript-6'>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  mounted() {},
  beforeRouteEnter(to,from,next){
    var isAdmin=localStorage.getItem("isAdmin");
    if(isAdmin=='0'){
      next();
    }else{
      next("/home")
    }
  }
};
</script>
<style lang='stylus' scoped>
</style>