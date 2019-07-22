<template>
  <el-button type="danger" size="mini" @click="del()">删除</el-button>
</template>
<script type='text/ecmascript-6'>
export default {
  components: {},
  props: ['id'],
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
    del() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$emit("del", this.id);
      });
    }
  },
  mounted() {}
};
</script>
<style lang='stylus' scoped>
.wrapper {
}
</style>