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
  //margin-top: -89px;
  //width: 716px !important;
  //border-image-slice: 0 0 0 0 fill !important;
  //border-image-width: 0 0 0 0 !important;
  //border-image-source: url('@/pages/goldenAutumn/assets/mk1_5.png') !important;
  //padding-top: 103px !important;
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
    font-size: 32px;
    width: 280px;
    height: 72px;
    background: linear-gradient(0deg, #E95533, #FFC74E);
    border-radius: 36px;
    border: 2px solid #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
