<template>
  <div class="gamePlay-desc" @click.self="clickClose">
    <div class="propmt-main gamePlay-desc-main">
      <div class="gamePlay-desc-head">
        <!--标题图片-->
        <img class="gamePlay-desc-title" :src="IconPath('title_4.png')" />
      </div>

      <div class="gamePlay-desc-content">
        <div ref="scrollEl" class="gamePlay-desc-inner">
          <!--说明文本1-->
          <div class="ThemeBox_BottomText">
            <ul>
              <li>
                <span></span>玩家每消费198钻石自动获得1个<img
                  :src="IconPath('cz_26_34.png')"
                />，可
              </li>
              <li>选择手动砸蛋或一键砸蛋。</li>
              <li><span></span>每次砸蛋会获得随机奖励，奖励如下。</li>
              <li><span></span>玩家砸破不同颜色的蛋壳达到进度可领取</li>
              <li>对应奖励。</li>
            </ul>
          </div>
          <!--普通砸蛋奖励-->
          <div class="normal-rewards-title"></div>
          <div class="form1"></div>
          <!--说明文本2-->
          <div class="ThemeBox_BottomText">
            <ul>
              <li><span></span>砸破后蛋壳会自动刷新，有机会刷新到超</li>
              <li>级蛋。</li>
              <li><span></span>玩家砸破普通超级蛋可直接获得普通奖</li>
              <li>励，砸破贪婪超级蛋可选择普通奖励或贪</li>
              <li>婪奖励其一。</li>
            </ul>
          </div>
          <div ref="form2" class="form2"></div>
          <!--奖励列表-->
          <div class="reward-list">
            <div
              v-for="(item, index) in [
                { icon: 'yb_120_120.png', text: '奖池10%元宝' },
                { icon: 'sswz_120_120.png', text: '神圣王座座驾' },
                { icon: 'jz_qlzj_120_120.png', text: '绮丽钻戒', label: true }
              ]"
              :key="index"
              class="reward-content"
            >
              <div class="reward-box">
                <div v-if="item.label" class="label">
                  <span>价值1314</span><img :src="IconPath('mk4_15.png')" />
                </div>
                <div class="reward-box-inner">
                  <img :src="IconPath(item.icon)" />
                </div>
              </div>
              <div class="reward-text">{{ item.text }}</div>
            </div>
          </div>
          <!--蛋壳刷新概率-->
          <div class="egg-refresh-title"></div>
          <div class="form3"></div>
        </div>
      </div>

      <div class="gamePlay-desc-foot"></div>
    </div>
  </div>
</template>

<script>
import { promptFixed } from '../../mixins/prompt'
export default {
  mixins: [promptFixed],
  props: ['isScroll'],
  data() {
    return {}
  },
  computed: {},
  created() {
    this.afterOpen()
  },
  mounted() {
    if (this.isScroll) {
      this.scrollFn()
    }
  },
  methods: {
    scrollFn() {
      this.$nextTick(() => {
        const top = this.$refs.form2.offsetTop
        this.$refs.scrollEl.scrollTo({
          top,
          behavior: 'smooth'
        })
      })
    },
    clickClose() {
      this.$emit('close')
      this.beforeClose()
    }
  }
}
</script>

<style scoped lang="scss">
.gamePlay-desc {
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);

  .gamePlay-desc-main {
    width: 653px;
    height: fit-content;
    position: relative;
    //padding: 8px;
    .gamePlay-desc-head {
      position: relative;
      width: 100%;
      height: 137px;
      background: url('@/pages/crazyEgg/assets/tk_bg_1.png') no-repeat left
        top/100% 100%;
      .gamePlay-desc-title {
        width: 537px;
        height: 124px;
        position: absolute;
        top: -40px;
        left: 50%;
        transform: translateX(-50%);
      }
    }

    .gamePlay-desc-content {
      position: relative;
      z-index: 2;
      width: 100%;
      height: 822px;
      background: url('@/pages/crazyEgg/assets/tk_bg_2.png') no-repeat left
        top/100% 100%;
      font-size: 30px;
      padding-top: 87px;
      //overflow: hidden;
    }

    .gamePlay-desc-foot {
      margin-top: -18px;
      width: 100%;
      height: 66px;
      background: url('@/pages/crazyEgg/assets/tk_bg_3.png') no-repeat left
        top/100% 100%;
    }
  }

  .gamePlay-desc-inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 820px;
    overflow-y: scroll;
    overflow-x: hidden;
    .ThemeBox_BottomText {
      color: #ffe397;
      margin-left: 80px;
      width: 518px;
      height: 187px;
      white-space: nowrap;
      letter-spacing: 0px;
      span {
        top: 12px;
        left: -25px;
      }
      img {
        position: relative;
        top: -3px;
        width: auto;
        height: 40px;
        margin: 0 14px;
      }
    }

    .normal-rewards-title {
      margin: 15px auto 20px;
      width: 527px;
      height: 58px;
      background: url('@/pages/crazyEgg/assets/rule_5.png') no-repeat left
        top/100% auto;
    }

    .form1 {
      margin: 0 auto 31px;
      width: 564px;
      height: 364px;
      background: url('@/pages/crazyEgg/assets/rule_1.png') no-repeat left
        top/100% auto;
    }

    .form2 {
      margin: 25px auto;

      width: 564px;
      height: 424px;
      background: url('@/pages/crazyEgg/assets/rule_2.png') no-repeat left
        top/100% auto;
    }
    .reward-list {
      display: flex;
      align-items: center;
      justify-content: center;
      .reward-content {
        width: 148px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 0 19px;
        .reward-box {
          position: relative;
          width: 148px;
          height: 148px;
          background: #c86325;
          border-radius: 16px;
          padding: 4px;

          .label {
            position: absolute;
            top: 4px;
            right: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 126px;
            height: 35px;
            background: #46ac96;
            border-radius: 18px 12px 0px 18px;
            white-space: nowrap;
            span {
              margin-left: -7px;
              font-size: 24px;
              font-weight: 500;
              color: #ffffff;
              transform: scale(0.83);
              white-space: nowrap;
            }
            > img {
              margin-left: -7px;
              width: 27px;
              height: 20px;
            }
          }
          .reward-box-inner {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            background-color: #fffbdd;
            border-radius: 12px;
            > img {
              width: 78%;
            }
          }
        }
        .reward-text {
          margin-top: 18px;
          font-size: 28px;
          font-weight: 500;
          color: #ffffff;
          white-space: nowrap;
        }
      }
    }
    .egg-refresh-title {
      margin: 20px auto 13px;
      width: 527px;
      height: 58px;
      background: url('@/pages/crazyEgg/assets/rule_4.png') no-repeat left
        top/100% auto;
    }
    .form3 {
      margin: 0 auto;
      width: 564px;
      height: 724px;
      background: url('@/pages/crazyEgg/assets/rule_3.png') no-repeat left
        top/100% auto;
    }
  }
}
</style>
