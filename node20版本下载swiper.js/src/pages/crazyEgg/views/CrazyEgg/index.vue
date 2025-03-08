<template>
  <div class="CrazyEgg">
    <!--砸蛋-->
    <div class="eggList position-relative overflow-hidden">
      <div class="rule-button" @click="openRule(false)"></div>
      <div class="smash-info">
        <div class="hammer-num">
          <img :src="IconPath('cz_26_34.png')" />
          {{ pageData.hammer_nums }}
        </div>
        <div class="diamond-num">消费钻石：{{ pageData.consume }}</div>
      </div>
      <div class="prizePool position-absolute position-row-center">
        <div class="price-pool-num text-center line-height-100 text-nowrap">{{ pageData.server_pool }}</div>
      </div>
      <!--蛋列表-->
      <div class="eggsListMain flex align-center justify-center flex-wrap">
        <div v-for="(item, index) in pageData.egg_list" :key="index" class="egg-box">
          <div class="egg-click-box" @click="smashEgg(1, item)"></div>
          <div
            class="egg-main"
            :class="{ 'normal-animation': isSuperEgg(item.egg_type), 'smash-animation': animationArray.includes(item.egg_id) }"
            @animationend="animationEnd($event, item)"
          >
            <img :src="IconPath(item.egg_icon)" />
          </div>
          <!--动态光效-超级蛋-->
          <div v-if="isSuperEgg(item.egg_type)" class="json-light"><PublicImg imgName="crazy_egg_light" /></div>
          <!--静态光效-普通蛋-->
          <div v-else class="light"><img :src="IconPath('dan_light_2.png')" /></div>
          <div class="base"></div>
          <!--锤子-->
          <div class="hammer" :class="{ 'hammer-animation': animationArray.includes(item.egg_id) }"></div>
        </div>
      </div>
      <div class="smash-button" @click.self="smashEgg(2)"></div>
    </div>
    <!--说明文本-->
    <div class="rule-txt">
      <div class="ThemeBox_BottomText">
        <ul>
          <li><span></span>玩家<i class="focus-color">每消费300钻石</i>可自动获得1个<img :src="IconPath('cz_26_34.png')" />，可选择手</li>
          <li>动砸蛋或一键砸蛋。</li>
          <li><span></span>每次砸蛋会获得随机奖励，砸破后蛋壳会自动刷新，</li>
          <li>有机会刷新到超级蛋。</li>
        </ul>
      </div>
    </div>

    <!--砸蛋进度-->
    <div class="smash-egg-status">
      <!--大奖预告按钮-->
      <!--<div class="award-preview-button" @click="openRule(true)"></div>-->
      <smash-egg-progress
        :progress-data="{
          smash_nums: pageData.smash_nums,
          process_awards: pageData.process_awards
        }"
        @receiveRewardSuccess="receiveRewardSuccess"
      />
      <!--<div class="progress-bar-list">-->
      <!--  <div v-for="item in pageData.process_awards" :key="item.type_id" class="progress-bar">-->
      <!--    &lt;!&ndash;文本&ndash;&gt;-->
      <!--    <div class="progress-bar-txt">砸破的{{ item.egg_name }}：{{ item.smash_times }}</div>-->
      <!--    <div class="progress-bar-main">-->
      <!--      <div v-for="(award, index) in item.awards" :key="index" class="award-box">-->
      <!--        <div class="award-icon" @click="getProgressReward(item.type_id, award)">-->
      <!--          &lt;!&ndash;图标&ndash;&gt;-->
      <!--          <img class="icon" :src="IconPath(award.icon)" />-->
      <!--          &lt;!&ndash;数量&ndash;&gt;-->
      <!--          <div class="num">{{ award.text }}</div>-->
      <!--          &lt;!&ndash;红点&ndash;&gt;-->
      <!--          <div v-if="award.has_right == 1" class="red-point"></div>-->
      <!--          &lt;!&ndash;遮盖层&ndash;&gt;-->
      <!--          <div v-if="award.has_right == 2" class="overlay"></div>-->
      <!--        </div>-->
      <!--        <div class="progress-num">{{ award.max }}</div>-->
      <!--      </div>-->
      <!--      &lt;!&ndash;进度条 13% 31.5% 50% 68.5% 87.5% 100%&ndash;&gt;-->
      <!--      <div class="progress-bar-out">-->
      <!--        <div :style="{ width: progressWidth(item.smash_times) }" class="progress-bar-inner"></div>-->
      <!--      </div>-->
      <!--    </div>-->
      <!--  </div>-->
      <!--</div>-->
      <!--&lt;!&ndash;说明文本&ndash;&gt;-->
      <!--<div class="ThemeBox_BottomText">-->
      <!--  <ul>-->
      <!--    <li><span></span>玩家砸破不同颜色的蛋达到进度可领取对应奖励。</li>-->
      <!--  </ul>-->
      <!--</div>-->
    </div>
    <!--玩法说明弹框-->
    <PlayRulesPopup v-if="showPlayRulesPopup" :is-scroll="isScroll" :list="playRulesPopupData" @clickClose="showPlayRulesPopup = false" />
    <!--恭喜获得弹框-->
    <CongratsGetPopup v-if="showCongratsGetPopup" :list="congratsGetPopupData" @clickClose="showCongratsGetPopup = false" />
    <!--请选择弹框-->
    <PleaseSelectPopup
      v-if="showPleaseSelectPopup"
      :select-data="pleaseSelectPopupData"
      @confirm="confirmSelect"
      @clickClose="showPleaseSelectPopup = false"
    />
    <!--很遗憾弹框-->
    <MissedRewardPopup v-if="showMissedRewardPopup" :egg-type="missedRewardPopupData" @clickClose="showMissedRewardPopup = false" />
  </div>
</template>

<script>
import { crazyEgg } from '../../utils/pageData'
import { getPageData } from '../../api/index'
import SmashEggProgress from './components/smashEggProgress.vue'
const MissedRewardPopup = () => import('./components/missedRewardPopup.vue') // 很遗憾弹框
const PleaseSelectPopup = () => import('./components/pleaseSelectPopup.vue') // 请选择弹框
const CongratsGetPopup = () => import('@/pages/crazyEgg/components/congratsGetPopup.vue') // 恭喜获得弹框
const PlayRulesPopup = () => import('./components/playRulesPopup.vue') // 玩法说明弹框
export default {
  name: 'CrazyEgg',
  components: { SmashEggProgress, MissedRewardPopup, PleaseSelectPopup, PlayRulesPopup, CongratsGetPopup },
  data() {
    return {
      showMissedRewardPopup: false,
      missedRewardPopupData: {},
      showPleaseSelectPopup: false,
      pleaseSelectPopupData: {},
      showCongratsGetPopup: false,
      congratsGetPopupData: [],
      showPlayRulesPopup: false,
      playRulesPopupData: Object.freeze([
        { icon: 'yb_120_120.png', text: '奖池元宝10%' },
        { icon: 'llyt_120_120.png', text: '玲珑玉兔座驾' },
        { icon: 'xyjz_120_120.png', text: '星悦戒指', label: 1314 }
      ]), // todo 奖励更新
      isScroll: false,
      isSmashing: false,
      animationArray: []
    }
  },
  created() {
    this.pageData = crazyEgg
    this.getPageData({ type: 'tab', mark: 'm4' })
  },
  methods: {
    /**
     * 更新累计砸蛋奖励数据
     * @param {number} award_id 奖励id
     */
    receiveRewardSuccess(award_id) {
      this.pageData.process_awards.find((item) => item.award_id == award_id).has_right = 2
    },
    // async getProgressReward(type_id, params) {
    //   if (params.has_right == 1) {
    //     const res = await this.getProgressRewardApi(type_id, params.award_id)
    //     this.$toast(res.errmsg)
    //     if (res.errno == 0) {
    //       // 将该奖励has_right改成2
    //       const result = this.pageData.process_awards.find((item) => item.type_id == type_id)
    //       result.awards.find((item) => item.award_id == params.award_id).has_right = 2
    //     }
    //   }
    // },
    /**
     * 确认选择奖励
     * @param {number} mark 1-普通奖励，2-贪婪奖励
     */
    async confirmSelect(mark) {
      const res = await this.smashEggApi(1, this.pleaseSelectPopupData.egg_id, mark)
      if (res.errno) {
        this.$toast(res.errmsg)
      } else if (res.errno == 0) {
        const str = mark == 1 ? this.pleaseSelectPopupData.egg_type - 1 : this.pleaseSelectPopupData.egg_type // todo 恭喜获得弹框需要显示特定文本（目前写死，需要改成后端数据，后端没提供就写死）
        if (res.data.awards.length) {
          // 成功获得奖励，打开恭喜获得弹框
          this.congratsGetPopupData = [...res.data.awards]
          // 用于显示恭喜获得顶部文字
          this.congratsGetPopupData[0].egg_type = str
          setTimeout(() => {
            this.showCongratsGetPopup = true
          })
        } else {
          // 20%没有获得奖励，打开很遗憾弹框
          this.missedRewardPopupData = str
          this.showMissedRewardPopup = true
        }
      }
      // 更新页面数据
      this.getPageData({ type: 'tab', mark: 'm4' })
    },
    /**
     * 砸蛋动画结束回调 没有贪婪蛋时直接打开恭喜获得弹框，有贪婪蛋时打开请选择弹框
     * @param {object} event 事件对象
     * @param {object} data 蛋数据
     */
    animationEnd(event, data) {
      if (event.animationName.includes('quick-shake')) {
        this.animationArray = this.animationArray.filter((item) => item != data.egg_id)
        if (this.animationArray.length === 0) {
          this.isSmashing = false
          if (this.pageData.greedy_types.includes(+data.egg_type)) {
            this.pleaseSelectPopupData.list = this.pageData.greedy_awards[data.egg_type] // 获取贪婪蛋数据
            this.pleaseSelectPopupData.egg_type = data.egg_type // 设置贪婪蛋type
            this.pleaseSelectPopupData.egg_id = data.egg_id // 设置贪婪蛋id
            this.showPleaseSelectPopup = true
          } else {
            // 打开恭喜获得弹框
            // 恭喜获得弹框顶部文本 需要根据蛋种类判断，如果有普通超级蛋或者贪婪超级蛋，则顶部需要显示对应文本
            setTimeout(() => {
              this.showCongratsGetPopup = true
            })
            this.getPageData({ type: 'tab', mark: 'm4' })
          }
        }
      }
    },
    /**
     * 砸蛋
     * @param {number} type 1-砸一次 2-砸五次
     * @param {object} data
     */
    async smashEgg(type, data) {
      console.log('进入砸蛋')
      if (this.isSmashing) return
      if (this.pageData.hammer_nums) {
        if (type == 1) {
          console.log('开始砸蛋')
          // 砸1下
          // 打开砸蛋限制器
          this.isSmashing = true
          // 判断是否贪婪蛋
          if (this.pageData.greedy_types.includes(+data.egg_type)) {
            this.animationArray.push(data.egg_id)
          } else {
            const res = await this.smashEggApi(1, data.egg_id)
            if (res.errno) {
              this.isSmashing = false
              this.$toast(res.errmsg)
            } else {
              // 恭喜获得弹框需要数组
              this.congratsGetPopupData = [...res.data.awards]
              this.congratsGetPopupData.forEach((item) => (item.egg_type = data.egg_type))
              this.animationArray.push(data.egg_id)
            }
          }
        } else if (type == 2) {
          const flag = this.pageData.egg_list.some((item) => {
            return this.pageData.greedy_types.includes(+item.egg_type)
          })
          if (flag) return this.$toast('超级蛋大礼需手动砸破才能领取哦！')
          // 打开限制器
          this.isSmashing = true
          const res = await this.smashEggApi(2)
          if (res.errno == 0) {
            this.congratsGetPopupData = res.data.awards
            const arr = this.pageData.egg_list.map((item) => item.egg_id)
            // 砸5下
            this.animationArray.push(...arr)
          } else {
            this.isSmashing = false
            this.$toast(res.errmsg)
          }
        }
      } else {
        this.$toast('锤子不足，请先去消费吧')
      }
    },
    /**
     * 判断是否为普通超级蛋或者贪婪超级蛋
     * @param {number} egg_type 蛋种类
     * @return {boolean}
     */
    isSuperEgg(egg_type) {
      return +egg_type >= 6
    },
    // 打开规则说明 如果是大奖介绍，需要滚动
    openRule(flag) {
      this.isScroll = flag
      this.showPlayRulesPopup = true
    },
    // 进度条宽度计算
    progressWidth(num) {
      if (num <= 5) {
        return Math.floor((num / 5) * 0.13 * 100) + '%'
      } else if (num <= 10) {
        return Math.floor((((num - 5) / 5) * 0.185 + 0.13) * 100) + '%'
      } else if (num <= 15) {
        return Math.floor((((num - 10) / 5) * 0.185 + 0.315) * 100) + '%'
      } else if (num <= 20) {
        return Math.floor((((num - 15) / 5) * 0.185 + 0.5) * 100) + '%'
      } else if (num < 25) {
        return Math.floor((((num - 20) / 5) * 0.185 + 0.685) * 100) + '%'
      } else {
        return '100%'
      }
    },
    /**
     * 砸蛋接口
     * @param {number} type 1-砸一次，2-砸5次
     * @param {number} egg_id 蛋id，砸单个蛋时需传蛋id
     * @param {number|string} mode_type 砸单个贪婪蛋时需传砸蛋模式：1-普通模式，2-贪婪模式
     */
    smashEggApi(type, egg_id, mode_type) {
      const params = { 'mark[type]': type, 'mark[egg_id]': egg_id }
      if (mode_type) params['mark[mod_type]'] = mode_type
      return getPageData({ type: 'craze_egg_smash', ...params })
    },
    /**
     * 领取砸蛋进度奖励
     * @param {number} mark[egg_type] 蛋类型
     * @param {number} mark[award_id] 奖励id
     */
    getProgressRewardApi(egg_type, award_id) {
      const params = {
        type: 'craze_egg_rev_award',
        'mark[egg_type]': egg_type,
        'mark[award_id]': award_id
      }
      return getPageData({ ...params })
    }
  }
}
</script>

<style scoped lang="scss">
@keyframes slow-shake {
  0% {
    transform: rotate(-5deg);
  }

  50% {
    transform: rotate(5deg);
  }

  100% {
    transform: rotate(-5deg);
  }
}
@keyframes quick-shake {
  0% {
    transform: rotate(0deg);
  }
  15% {
    transform: rotate(-8deg);
  }
  30% {
    transform: rotate(8deg);
  }
  45% {
    transform: rotate(-8deg);
  }
  60% {
    transform: rotate(8deg);
  }
  75% {
    transform: rotate(-8deg);
  }
  90% {
    transform: rotate(8deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
@keyframes hammer-smash {
  0% {
    opacity: 0;
    transform: rotate(0deg);
  }

  30% {
    opacity: 1;
    transform: rotate(30deg);
  }
  60% {
    opacity: 1;
    //top: 20px;
    //right: -10px;
    transform: rotate(60deg);
  }
  80% {
    opacity: 1;
    //top: 25px;
    //right: -10px;
    transform: rotate(0deg);
  }
  100% {
    opacity: 0;
    //top: 25px;
    //right: -10px;
    transform: rotate(20deg);
  }
}
.CrazyEgg {
  margin-top: 13px;
  .eggList {
    width: 100%;
    height: 975px;
    background: url('@/pages/crazyEgg/assets/bg_9.png') no-repeat center top/auto 100%;
    .prizePool {
      top: 46px;
      width: 329px;
      height: 116px;
      background: url('@/pages/crazyEgg/assets/bg_10.png') no-repeat left top/100% auto;
      .price-pool-num {
        margin-top: 52px;
        font-size: 36px;
        font-weight: 500;
        color: #fff875;
      }
    }

    .rule-button {
      position: absolute;
      top: 85px;
      right: 28px;
      width: 58px;
      height: 58px;
      background: url('@/pages/crazyEgg/assets/rule.png') no-repeat left top/100% auto;
    }

    .smash-info {
      width: 548px;
      margin: 167px auto 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 30px;
      font-weight: 500;
      color: #ffdb8f;

      .hammer-num {
        //margin-right: 182px;
        display: flex;
        align-items: center;
        //justify-content: space-between;
        //min-width: 158px;
        width: fit-content;
        height: 42px;
        padding: 0 15px 0 12px;
        background: rgba(219, 130, 74, 0.3);
        border: 1px solid #c18251;
        border-radius: 21px;

        > img {
          margin-right: 20px;
          width: 26px;
          height: 34px;
        }
      }

      .diamond-num {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: fit-content;
        padding: 0 17px;
        height: 42px;
        background: rgba(219, 130, 74, 0.3);
        border: 1px solid #c18251;
        border-radius: 21px;
        > img {
          margin-right: 5px;
          width: 35px;
          height: 27px;
        }
      }
    }
    .eggsListMain {
      padding-top: 15px;
      .egg-box {
        position: relative;
        width: fit-content;
        .egg-click-box {
          position: absolute;
          z-index: 10;
          //opacity: 0;
          top: 35px;
          left: 50%;
          transform: translateX(-50%);
          width: 166px;
          height: 187px;
          border-radius: 120px 120px 120px 120px/160px 160px 120px 120px;
        }
        .egg-main {
          position: relative;
          top: 35px;
          margin: 0 auto;
          z-index: 2;
          width: 170px;
          height: 194px;
          transform-origin: bottom;
          > img {
            width: 100%;
            height: 100%;
          }
        }
        .normal-animation {
          animation: slow-shake 2s infinite linear !important;
        }
        .smash-animation {
          animation: quick-shake 0.5s 0.5s linear !important;
          //animation-delay: 5s;
        }
        .light,
        .json-light {
          position: absolute;
          z-index: 3 !important;
          top: 41px;
          left: 50%;
          transform: translateX(-50%);
          width: 235px;
          height: 201px;
          //pointer-events: none; /* 遮盖层的点击事件透过 */
          > img {
            width: 100%;
            height: 100%;
          }
        }
        .json-light {
          top: 13px;
          width: 322px !important;
          height: 251px !important;
          transform: translateX(-48.8%);
        }
        .base {
          position: relative;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1;
          width: 186px;
          height: 64px;
          background: url('@/pages/crazyEgg/assets/dan_di.png') no-repeat left top/100% auto;
        }
        .hammer {
          position: absolute;
          opacity: 0;
          z-index: 5;
          top: 50px;
          right: 10px;
          width: 76px;
          height: 102px;
          background: url('@/pages/crazyEgg/assets/cz_76_102.png') no-repeat left top/100% auto;
          transform-origin: 85% 96%;
          //animation: hammer-smash 1.5s linear infinite;
        }
        .hammer-animation {
          animation: hammer-smash 0.6s linear;
        }
        &:nth-of-type(1) {
          margin-left: 128px;
          margin-right: 68px;
          margin-bottom: 45px;
        }
        &:nth-of-type(2) {
          margin-right: 128px;
          margin-bottom: 45px;
        }
        &:nth-of-type(3) {
          margin-right: 30px;
        }
        &:nth-of-type(4) {
          margin-right: 30px;
        }
      }
    }
    .smash-button {
      margin: 40px auto 0;
      width: 340px;
      height: 107px;
      background: url('@/pages/crazyEgg/assets/btn_za.png') no-repeat left top/100% auto;
    }
  }
  .rule-txt {
    margin: 19px auto 32px;
    display: flex;
    //align-items: center;
    width: 720px;
    height: 190px;
    background: url('@/pages/crazyEgg/assets/bg_3.png') no-repeat left top/100% auto;
    .ThemeBox_BottomText {
      margin-top: 17px;
      margin-left: 65px;
      width: 623px;
      height: 147px;
      font-size: 28px;
      font-weight: 500;
      color: #fffefe;
      line-height: 40px;
      white-space: nowrap;
      img {
        margin: 0 10px;
        width: 26px;
        height: 34px;
      }
      span {
        top: 12px;
      }
    }
  }
  .smash-egg-status {
    position: relative;
    margin-bottom: 180px;
    width: 750px;
    //height: 1281px;
    height: 590px;
    background: url('@/pages/crazyEgg/assets/mk4_bg.png') no-repeat left top/100% auto;
    overflow: hidden;
    //.award-preview-button {
    //  position: absolute;
    //  top: 50px;
    //  right: 38px;
    //  background: url('@/pages/crazyEgg/assets/btn_js.png') no-repeat left top/100% auto;
    //  width: 126px;
    //  height: 89px;
    //}
    //.progress-bar-list {
    //  margin-top: 870px;
    //
    //  .progress-bar {
    //    margin: 0 auto;
    //    width: 696px;
    //    height: 212px;
    //    padding-left: 14px;
    //    overflow: hidden;
    //
    //    .progress-bar-txt {
    //      margin-top: 25px;
    //      margin-bottom: 15px;
    //      font-size: 28px;
    //      font-weight: 500;
    //      color: #ffffff;
    //    }
    //
    //    .progress-bar-main {
    //      position: relative;
    //      display: flex;
    //      align-items: center;
    //
    //      .award-box {
    //        position: relative;
    //        z-index: 2;
    //        margin-left: 21px;
    //
    //        .award-icon {
    //          text-align: center;
    //          position: relative;
    //          width: 102px;
    //          height: 91px;
    //          background: url('@/pages/crazyEgg/assets/bg_5.png') no-repeat left top/100% auto;
    //          padding-top: 3px;
    //
    //          .icon {
    //            width: auto;
    //            height: 55px;
    //          }
    //
    //          .num {
    //            margin-top: 1px;
    //            font-size: 24px;
    //            font-weight: 500;
    //            color: #fee8bc;
    //            transform: scale(0.91);
    //          }
    //
    //          .red-point {
    //            position: absolute;
    //            top: -5px;
    //            right: 10px;
    //            width: 26px;
    //            height: 26px;
    //            background: url('@/pages/crazyEgg/assets/red.png') no-repeat left top/100% auto;
    //          }
    //
    //          .overlay {
    //            position: absolute;
    //            top: 0;
    //            left: 0;
    //            width: 100%;
    //            height: 100%;
    //            background: url('@/pages/crazyEgg/assets/bg_6.png') no-repeat left top/100% auto;
    //          }
    //        }
    //
    //        .progress-num {
    //          margin-top: 8px;
    //          text-align: center;
    //          font-size: 28px;
    //          font-weight: 500;
    //          color: #ffefcf;
    //        }
    //
    //        &:nth-of-type(1) {
    //          margin-left: 37px !important;
    //        }
    //      }
    //
    //      .progress-bar-out {
    //        position: absolute;
    //        bottom: 87px;
    //        width: 669px;
    //        height: 18px;
    //        background: #692e19;
    //        border: 1px solid #ffb859;
    //        border-radius: 9px;
    //        overflow: hidden;
    //        padding: 2px;
    //
    //        .progress-bar-inner {
    //          height: 100%;
    //          background: linear-gradient(0deg, #f5b124, #ffefcf);
    //          border-radius: 6px;
    //        }
    //      }
    //    }
    //  }
    //}
    .ThemeBox_BottomText {
      margin-top: 45px;
      margin-left: 85px;
      span {
        top: 13px;
      }
    }
  }
}
</style>
