<template>
  <div class="wrapper">
    <v-left></v-left>
    <v-right></v-right>
  </div>
</template>
<script type='text/ecmascript-6'>
import vLeft from "./left";
import vRight from "./right";
export default {
  components: {
    vLeft,
    vRight
  },
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
.wrapper {
  flex: 1;
  display: flex;
  margin-top: 60px;
  flex-direction: row;
  height: 100vh;
}
</style>