<template>
  <div class="playmateItem">
    <!-- 排名 -->
    <div class="ranking-box">
      <!-- ../../../assets/mk3_13.png -->
      <img :src="rankingSrc" alt="" />
    </div>
    <!-- 头像框 -->
    <div class="avatar-box">
      <div class="avatar-item">
        <div class="lottie"></div>
        <img
          v-if="tprofile_image.includes('http')"
          :src="tprofile_image"
          alt=""
        />
        <img v-else src="../../../assets/mk3_17.png" alt="" />
      </div>
      <div class="avatar-item">
        <div class="lottie"></div>
        <img
          v-if="tprofile_image.includes('http')"
          :src="profile_image"
          alt=""
        />
        <img v-else src="../../../assets/mk3_17.png" alt="" />
      </div>
    </div>

    <!-- 昵称 -->
    <div class="nickname">
      <p>{{ nickname1 }}</p>
      <p>{{ nickname2 }}</p>
    </div>
    <!-- 亲密度 -->
    <p class="loveNum">
      新增<span>{{ loveNum }}</span
      >亲密度
    </p>
  </div>
</template>

<script>
import { svgFun } from '../../../utils/json'
import zjwb from '../../../assets/lottie/zjwb/data.json'
export default {
  name: 'playmateItem',
  components: {},
  props: {
    rankingSrc: {
      type: String,
      required: true
    },
    profile_image: {
      type: String,
      required: true
    },
    tprofile_image: {
      type: String,
      required: true
    },
    nickname1: {
      type: String,
      required: true
    },
    nickname2: {
      type: String,
      required: true
    },
    loveNum: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      num: 0
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    svgFun(0, zjwb, 'zjwb')
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.playmateItem {
  display: flex;
  flex-direction: column;
  align-items: center;
  .ranking-box {
    position: relative;
    top: -10px;
    left: 1px;
    width: 34px;
    height: 0;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  .avatar-box {
    display: flex;
    .avatar-item {
      position: relative;
      width: 65px;
      height: 65px;
      .lottie {
        position: relative;
        z-index: 3;
        width: 100%;
        height: 100%;
      }
      img {
        width: 100%;
        border-radius: 50%;
      }
    }
  }
  .nickname {
    width: 123px;
    height: 51px;
    background: url('../../../assets/mk3_12.png') no-repeat;
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2px;
    p {
      font-size: 12px;

      color: #ffffff;
      text-align: center;
      margin-top: 8px;
    }
  }
  .loveNum {
    text-align: center;
    font-size: 10px;

    color: #595ec3;
    margin-bottom: 4px;
    span {
      color: #f67baf;
    }
  }
}
</style>
