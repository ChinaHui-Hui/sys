<template>
  <div class="wrapper">
    <v-header></v-header>
    <v-main></v-main>
  </div>
</template>
<script type='text/ecmascript-6'>
import vHeader from "../views/header";
import vMain from "../views/main";
export default {
  components: {
    vHeader,
    vMain
  },
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  mounted() {},
  
};
</script>
<style lang='stylus' scoped>
@import '../../stylus/index.styl';

.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>