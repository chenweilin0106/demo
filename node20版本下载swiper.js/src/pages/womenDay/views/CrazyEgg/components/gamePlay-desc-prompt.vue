<template>
  <div class="gamePlay-desc" @click.self="clickClose">
    <div class="prompt-main gamePlay-desc-main">
      <div class="gamePlay-desc-head">
        <!--标题图片-->
        <img
          class="gamePlay-desc-title pointer-none"
          :src="IconPath('title_9.png')"
        />
      </div>

      <div class="gamePlay-desc-content">
        <div ref="scrollEl" class="gamePlay-desc-inner">
          <!--说明文本1-->
          <div class="rule-text text-1">
            <ul>
              <li>
                <span></span>玩家每消费300钻石自动获得1个<img
                  :src="IconPath('cz_26_34.png')"
                />，可
              </li>
              <li>选择手动砸蛋或一键砸蛋。</li>
              <li><span></span>每次砸蛋会获得随机奖励，奖励如下。</li>
              <li><span></span>玩家累计砸破蛋壳达到进度可领取对应奖</li>
              <li>励。</li>
            </ul>
          </div>
          <!--普通砸蛋奖励-->
          <div class="normal-rewards-title"></div>
          <div class="form1"></div>
          <!--说明文本2-->
          <div class="rule-text text-2">
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
                { icon: 'llyt_120_120.png', text: '玲珑玉兔座驾' },
                { icon: '', text: '碳酸汽水声波' }
              ]"
              :key="index"
              class="reward-content"
            >
              <div class="reward-box">
                <div v-if="item.label" class="label">
                  <span>价值1314</span><img :src="IconPath('mk4_15.png')" />
                </div>
                <div class="reward-box-inner">
                  <img v-if="item.icon" :src="IconPath(item.icon)" />
                  <public-json
                    v-else
                    jsonName="sb_tsqs1"
                    :userAvatar="$store.state.user_icon"
                  />
                </div>
              </div>
              <div class="reward-text">{{ item.text }}</div>
            </div>
          </div>
          <!--蛋壳刷新概率-->
          <div class="egg-refresh-title"></div>
          <div class="form3"></div>
          <!--说明文本3-->
          <div class="rule-text text-3">
            <ul>
              <li>全服奖池：</li>
              <li><span></span>全服每完成10次砸蛋，系统将为奖池注入</li>
              <li>1万元宝。玩家砸破炫彩蛋即可获得【瓜</li>
              <li>分实时奖池10%】的元宝大奖。</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PublicJson from '@/pages/womenDay/components/PublicJson.vue'
export default {
  props: ['isScroll'],
  components: { PublicJson },
  mounted() {
    if (this.isScroll) {
      this.scrollFn()
    }
    document.querySelector('html').style.overflow = 'hidden'
    document.querySelector('body').style.overflow = 'hidden'
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
    }
  },
  beforeDestroy() {
    document.querySelector('html').style.overflow = 'auto'
    document.querySelector('body').style.overflow = 'auto'
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
  touch-action: none;

  .gamePlay-desc-main {
    padding: 23px 21px 20px;
    width: 642px;
    height: fit-content;
    position: relative;
    border-image-source: url('@/pages/womenDay/assets/tk_5.png');
    border-image-slice: 92 0 109 0 fill;
    border-image-width: 92px 0 109px 0;
    .gamePlay-desc-title {
      position: absolute;
      z-index: 3;
      width: 593px;
      height: 176px;
      top: -126px;
      left: 50%;
      transform: translateX(-50%);
    }

    .gamePlay-desc-content {
      position: relative;
      z-index: 2;
      width: 100%;
      height: 941px;
      margin: 0 auto;
      font-size: 30px;
      padding-top: 87px;
      border-radius: 40px;
      overflow: hidden;
    }
  }

  .gamePlay-desc-inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 36px 0 0;
    overflow-y: scroll;
    overflow-x: hidden;

    .rule-text {
      margin-left: 56px;
      //margin-bottom: 20px;
      width: 518px;
      height: 187px;
      white-space: nowrap;
      font-size: 28px;
      color: #ffffff;
      line-height: 40px;
      letter-spacing: 0px;

      span {
        background-color: #fffaa6;
        top: 12px;
        left: -25px;
      }

      img {
        position: relative;
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
      height: 424px;
      background: url('@/pages/womenDay/assets/rule_1.png') no-repeat left
        top/100% auto;
    }

    .form2 {
      margin: 25px auto;
      width: 564px;
      height: 424px;
      background: url('@/pages/womenDay/assets/rule_2.png') no-repeat left
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
              height: 100%;
            }

            .PublicJson {
              ::v-deep .micAvatar_img {
                width: 70%;
                height: 70%;
              }
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
      margin: 0 auto 26px;
      width: 564px;
      height: 724px;
      background: url('@/pages/womenDay/assets/rule_3.png') no-repeat left
        top/100% auto;
    }
    .text-3 {
      margin-bottom: 30px;
      height: 147px;
    }
  }
}
</style>
