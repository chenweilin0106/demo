<template>
  <OutBox class="jump2024">
    <div class="rules-text">
      <ul>
        <li>本活动<i>首日消耗的{{ pointName }}</i>额外转化为淬炼币<img :src="IconPath('clb_45_46.png')">，淬</li>
        <li>炼币<img :src="IconPath('clb_45_46.png')">可用于【晶石淬炼】活动</li>
      </ul>
    </div>
    <div class="button" @click="jump"><div class="main">立即前往</div></div>
  </OutBox>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'jump2024Vue',
  props: ['pointName'],
  computed: {
    ...mapState(['uid', 'access_token', 'app_version'])
  },
  methods: {
    jump() {
      window.location.href = `${process.env.VUE_APP_BASE_API}vue/normal/game2048/index.html?uid=${this.uid}&access_token=${this.access_token}&app_version=${this.app_version}&referal_source=${process.env.VUE_APP_ICON_PATH}#/`
    }
  }
}
</script>

<style lang="scss" scoped>
.jump2024 {
  margin-top: -89px;
  width: 716px !important;
  border-image-slice: 0 0 0 0 fill !important;
  border-image-width: 0 0 0 0 !important;
  border-image-source: url('@/pages/nationalDay/assets/mk1_5.png') !important;
  padding-top: 103px !important;
  i {
    color: #009FA1;
  }
  img {
    margin: 0 5px;
    width: 45px;
    height: 46px;
  }
  .button {
    margin: 24px auto 0;
    position: relative;
    font-size: 28px;
    width: 280px;
    height: 72px;
    .main {
      position: relative;
      z-index: 2;
      width: 100%;
      height: 100%;
      border-radius: 99999px;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 100%;
      white-space: nowrap;
      font-size: 32px;
      color: #FFFFFF;
      background: linear-gradient(0deg, #F57F2C, #FFE464);
    }
    &::before {
      content: '';
      z-index: 1;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: calc(100% + 3px * 2);
      height: calc(100% + 3px * 2);
      background-color: #fff;
      border-radius: 99999px;
    }
  }
}
</style>
