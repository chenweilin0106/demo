<template>
  <div>
    <div class="themeBox">
      <!-- 白色边框 -->
      <div
        style="
          border: 1px solid #fff;
          width: 100%;
          height: 100%;
          padding: 14px 10px;
          box-sizing: border-box;
        "
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'themeBox',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  methods: {}
}
</script>

<style scoped lang="scss">
.themeBox {
  width: 100%;
  // 边框颜色
  border: 5px solid #7e86da;
  // 背景色
  background-color: #def2ff;
  box-sizing: border-box;
  margin-bottom: 38px;
}
</style>
