<template>
  <OutBox class="jump2024" size="2">
    <div class="rules-text">
      <ul>
        <li>本活动<i>首日消耗的{{pointName}}</i>额外转化为淬炼币<img :src="IconPath('clb_45_46.png')">，淬</li>
        <li>炼币<img :src="IconPath('clb_45_46.png')">可用于【晶石淬炼】活动</li>
      </ul>
    </div>
    <PublicButton has-right="3" class="button" @click="jump">立即前往</PublicButton>
  </OutBox>
</template>

<script>
import { compareVersions, urlRouterWithApp } from '@/utils/toApp'

export default {
  name: 'jump2024Vue',
  props: ['pointName', 'show_full'],
  computed: {
  },
  methods: {
    jump() {
      if (compareVersions('5.9.6') != -1) {
        urlRouterWithApp(`dandan-${window.location.origin}/vue/normal/game2048/index.html?show_full=${this.show_full == 1 ? 0 : this.show_full == 2 ? 1 : null}`)
      } else {
        this.$toast('因客户端版本较低，跳转后可能无法游戏，请更新版本或从聊天室功能盒中进入晶石淬炼')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.jump2024 {
  padding-top: 115px;
  .button {
    margin: 24px auto 0;
  }
}
</style>
