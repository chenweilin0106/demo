<template>
  <div class="goodsItem">
    <div class="img-box">
      <img :src="imgSrc" alt="" />
    </div>
    <div class="text-box" :style="{ fontSize: fontNum }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'goodsItem',
  components: {},
  props: {
    imgSrc: {
      type: String,
      required: true
    },
    fontNum: {
      type: String,
      default: '12px'
    }
  },
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
.goodsItem {
  width: 100%;
  height: 100%;
  background: url('../assets/mk4_11.png') no-repeat;
  background-size: 100% 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .img-box {
    width: 100%;
    height: 56px;
    box-sizing: 5px;
    img {
      width: 100%;
    }
  }
  .text-box {
    position: relative;
    top: -5px;
    width: 95%;
    height: 22px;
    background: #6b77e1;
    border-radius: 0 0 10px 10px;

    color: #f5f5f8;
    text-align: center;
    line-height: 24px;
  }
}
</style>
