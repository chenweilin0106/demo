<template>
  <div class="layout">
    <!--banner-->
    <img :src="IconPath('banner.png')" class="banner" />

    <!--tab盒子-->
    <div class="tabs_box">
      <div
        v-for="(tab, index) in tabsArray"
        :key="index"
        :class="`tab_${index + 1}`"
        class="tab flex-center"
      >
        <!--点击容器-->
        <div class="click-content" @click.self="track(tab)"></div>
        <span class="flex-center">{{ tab.tabName }}</span>
        <!-- 使用图片替换tab -->
        <img
          v-if="!$route.path.includes(tab.to)"
          class="tab_img"
          :src="IconPath(tab.actIcon)"
        />
        <img v-else class="tab_img" :src="IconPath(tab.icon)" />
      </div>
    </div>
    <router-view></router-view>
    <div :class="['bgi-1', `bgi-1_${$route.path}`]"></div>
    <div :class="['bgi-2', `bgi-2_${$route.path}`]"></div>
    <div :class="['bgi-3', `bgi-3_${$route.path}`]"></div>
    <div :class="['bgi-4', `bgi-4_${$route.path}`]"></div>
    <!-- 底部文本 -->
    <div class="BottomText">
      <p>活动由本公司组织并提供奖品</p>
      <p>与苹果公司无关</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'LayOut',
  data() {
    return {
      tabsArray: Object.freeze([
        {
          tabName: '浪漫回馈',
          to: '/valentineGift',
          icon: 'tab_1.png',
          actIcon: 'tab_1_1.png'
        },
        {
          tabName: '告白情歌',
          to: '/loveSong',
          icon: 'tab_2.png',
          actIcon: 'tab_2_1.png'
        },
        {
          tabName: '甜蜜宝藏',
          to: '/sweetTreasure',
          icon: 'tab_3.png',
          actIcon: 'tab_3_1.png'
        },
        {
          tabName: '桃花签运',
          to: '/luckSign',
          icon: 'tab_4.png',
          actIcon: 'tab_4_1.png'
        },
        {
          tabName: '心动较量',
          to: '/loveRank',
          icon: 'tab_5.png',
          actIcon: 'tab_5_1.png'
        }
      ])
    }
  },
  computed: {
    ...mapState(['uid', 'referal_source', 'app_version', 'access_token']),
    /**
     * 判断是不是首页
     * 用于banner样式 tab栏 弹幕 背景图的显示隐藏
     */
    isHome() {
      return this.$route.path === '/'
    }
  },
  mounted() {
    // 低版本需手动携带account_id上报
    if (this.appVersion && this.appVersion < 564) {
      this.$thinking.login(this.uid)
    }
    // 数数页面浏览埋点
    this.$thinking.quick('autoTrack', {
      referal_source: this.referal_source
    })
  },
  methods: {
    /**
     * 切换模块
     * @param {Object} params 模块信息
     * @param {String} params.tabName 模块名称
     * @param {String} params.to 跳转路径
     * @param {Number} params.module_status 模块状态 1开启 0关闭
     * 注意：
     * 1.因为要活动banner要开放到2号，需要对部分模块切换进行拦截 toast('活动已结束')
     */
    track(params) {
      const { tabName, to } = params
      this.tabActive = tabName
      // 数数点击埋点
      this.$thinking.track(
        'WebClick', // 追踪事件的名称
        {
          element: '模块选择',
          module: tabName
        }
      )
      if (
        this.$route.path.includes('/valentineGift') &&
        to == '/valentineGift'
      ) {
        return
      }
      if (to != this.$route.path) this.$router.replace(to)
    }
  }
}
</script>

<style scoped lang="scss">
.layout {
  position: relative;
  padding-bottom: 61px;

  .banner {
    position: relative;
    margin-bottom: -172px;
    width: 100%;
    height: 733px;
  }

  .tabs_box {
    position: relative;
    z-index: 3;
    width: 100%;
    height: 219px;
    background: url('@/pages/valentineDay/assets/back_1.png') no-repeat left
      top/100% 100%;
    display: flex;
    //justify-content: center;
    flex-wrap: nowrap;
    //overflow: hidden;

    .tab {
      flex-shrink: 0;
      position: relative;
      width: 163px;
      height: 142px;

      .click-content {
        position: absolute;
        z-index: 2;
        top: 50%;
        left: 30px;
        transform: translateY(-50%);
        width: 130px;
        height: 130px;
      }

      .tab_img {
        position: relative;
        z-index: 1;
        width: 100%;
        height: 100%;
      }

      > span {
        position: absolute;
        z-index: 1;
        opacity: 0;
      }
    }

    .tab_1 {
      margin-top: 34px;
      margin-left: 3px;
    }

    .tab_2 {
      margin-top: -28px;
      margin-left: -14px;
    }

    .tab_3 {
      margin-top: 29px;
      margin-left: -27px;
    }

    .tab_4 {
      margin-top: 70px;
      margin-left: -24px;
    }

    .tab_5 {
      margin-top: 50px;
      margin-left: -9px;
    }
  }

  // 底部文本
  .BottomText {
    position: relative;
    z-index: 3;
    width: fit-content;
    margin: 37px auto 0;
    font-size: 28px;

    p {
      text-align: center;
      //margin-bottom: 20px;
      color: #fff;
      line-height: 42px;
      //line-height: 2.71vh;
    }
  }

  .bgi-1 {
    position: absolute;
    z-index: 1;
    left: 0;
    width: 100%;
    height: 447px;
    background: url('@/pages/valentineDay/assets/back_2.png') no-repeat left
      top/100% 100%;
  }

  .bgi-2,
  .bgi-4 {
    position: absolute;
    z-index: 1;
    left: 0;
    width: 100%;
    height: 367px;
    background: url('@/pages/valentineDay/assets/back_3.png') no-repeat left
      top/100% 100%;
  }

  .bgi-3 {
    position: absolute;
    z-index: 1;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 362px;
    background: url('@/pages/valentineDay/assets/back_4.png') no-repeat left
      top/100% 100%;
  }

  .bgi-4 {
    display: none;
  }

  .bgi-1_\/valentineGift\/pointReward {
    top: 604px;
  }

  .bgi-2_\/valentineGift\/pointReward {
    top: 1809px;
  }

  .bgi-1_\/valentineGift\/rechargeRebate {
    top: 604px;
  }

  .bgi-2_\/valentineGift\/rechargeRebate {
    top: 1736px;
  }

  .bgi-1_\/valentineGift\/consumeGift {
    top: 604px;
  }

  .bgi-2_\/valentineGift\/consumeGift {
    top: 1435px;
  }

  .bgi-4_\/valentineGift\/consumeGift {
    display: block;
    top: 1828px;
  }

  .bgi-1_\/loveSong {
    top: 604px;
  }

  .bgi-2_\/loveSong {
    width: 714px;
    height: 367px;
    top: 1883px;
    left: 36px;
  }

  .bgi-1_\/sweetTreasure {
    top: 604px;
  }

  .bgi-2_\/sweetTreasure {
    top: 1150px;
  }

  .bgi-1_\/luckSign {
    top: 604px;
  }

  .bgi-2_\/luckSign {
    top: 1315px;
  }

  .bgi-1_\/loveRank {
    top: 604px;
  }

  .bgi-2_\/loveRank {
    display: none;
  }
}
</style>
