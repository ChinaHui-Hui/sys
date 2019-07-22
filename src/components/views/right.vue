<template>
  <div class="right">
    <h3>{{$route.name}}</h3>
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
  mounted() {}
};
</script>
<style lang='stylus' scoped>
.right {
  flex: 1;
  background: #fff;
  padding: 20px;
  margin-left: 200px;

  h3 {
    height: 40px;
    font-size: 28px;
    margin-bottom: 30px;
    display: block;
  }
}
</style>