<template>
  <OutBox class="jump2024">
    <div class="rules-text">
      <ul>
        <li>本活动<i>首日消耗的{{ pointName }}</i>额外转化为淬炼币<img :src="IconPath('clb_45_46.png')">，淬</li>
        <li>炼币<img :src="IconPath('clb_45_46.png')">可用于【晶石淬炼】活动</li>
      </ul>
    </div>
    <div class="button" @click="jump">立即前往</div>
  </OutBox>
</template>

<script>
import { compareVersions, urlRouterWithApp } from '@/utils/toApp'
export default {
  name: 'jump2024Vue',
  props: ['pointName'],
  computed: {
  },
  methods: {
    jump() {
      if (compareVersions('5.9.6') != -1) {
        urlRouterWithApp(`dandan-${window.location.origin}/vue/normal/game2048/index.html`)
      } else {
        this.$toast('因客户端版本较低，跳转后可能无法游戏，请更新版本或从聊天室功能盒中进入晶石淬炼')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.jump2024 {
  //margin-top: -89px;
  //width: 716px !important;
  border-image-slice: 0 0 0 0 fill !important;
  border-image-width: 0 0 0 0 !important;
  border-image-source: url('@/pages/celebration/assets/mk1_2.png') !important;
  //padding-top: 103px !important;
  //i {
  //  color: #009FA1;
  //}
  img {
    margin: 0 5px;
    width: 45px;
    height: 46px;
  }
  .button {
    margin: 24px auto 0;
    position: relative;
    width: 288px;
    height: 89px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url('@/pages/celebration/assets/mk1_6.png') no-repeat left top/100% 100%;
    color: transparent;
    // --------------------
    //font-size: 32px;
    //background: linear-gradient(0deg, #E95533, #FFC74E);
    //border-radius: 36px;
    //border: 2px solid #FFFFFF;
  }
}
</style>
