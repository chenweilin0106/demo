<template>
  <div class="top_three">
    <div class="top2">
      <div class="top_img">
        <img class="user_box" src="../../../assets/mk6_21.png" alt="" />
        <div class="user_icon">
          <img src="../../../assets/mk6_24.png" alt="" />
        </div>
      </div>
      <div class="top_info">
        <div class="no_user">虚位以待</div>
        <div class="top_coun">0</div>
        <div class="top_text">赠送总价值</div>
      </div>
    </div>
    <div class="top1">
      <div class="top_img">
        <img class="user_box" src="../../../assets/mk6_20.png" alt="" />
        <div class="user_icon">
          <img src="../../../assets/mk6_24.png" alt="" />
        </div>
      </div>
      <div class="top_info">
        <div class="no_user">虚位以待遮罩</div>
        <div class="top_coun">0</div>
        <div class="top_text">赠送总价值</div>
      </div>
    </div>
    <div class="top3">
      <div class="top_img">
        <img class="user_box" src="../../../assets/mk6_22.png" alt="" />
        <div class="user_icon">
          <img src="../../../assets/mk6_24.png" alt="" />
        </div>
      </div>
      <div class="top_info">
        <div class="no_user">虚位以待</div>
        <div class="top_coun">0</div>
        <div class="top_text">赠送总价值</div>
      </div>
    </div>
  </div>
</template>

  <script>
export default {
  // 组件名称
  name: 'topThree',
  // props父组件参数
  props: {
    topThreeList: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  data () {
    return {}
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  methods: {},
  created () {
  },
  mounted () {
  },
  destroyed () {
  }
}
  </script>

<style lang="scss" scoped>
.top_three {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  width: 329px;
  height: 110px;
  background: url('../../../assets/mk6_23.png') no-repeat;
  background-size: 100%;
  .top2,
  .top1,
  .top3 {
    width: 118.9px;
    height: 100px;
    color: #fff;
    text-align: center;
    .top_info {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin-top: 50px;
      font-size: 12px;
      .no_user {
        width: 90px;
        font-size: 14px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .top_coun {
        margin-top: 10px;
        color: #fffaa6;
      }
    }
  }
  .top2,
  .top3 {
    position: relative;
    .top_img {
      width: 60px;
      .user_box {
        width: 55%;
        position: absolute;
        top: -28px;
        left: 28px;
        z-index: 10;
      }
      .user_icon {
        position: absolute;
        top: -15px;
        left: 30px;
        width: 56px;
        height: 56px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .top1 {
    position: relative;
    .top_img {
      width: 60px;
      .user_box {
        width: 65%;
        position: absolute;
        top: -50px;
        left: 20px;
        z-index: 10;
      }
      .user_icon {
        position: absolute;
        top: -35px;
        left: 24px;
        width: 64px;
        height: 64px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}
</style>
