<template>
  <div class="wuLin">
    <OutBox class="skillRulesBox">
      <div class="skillListDiv">
        <div class="ruleItem" v-for="ruleItem in skillRules" :key="ruleItem.name">
          <div class="skillIcon"></div>
          <div class="rulesTextDiv">
            <p class="rulesTextP1">{{ ruleItem.name }}</p>
            <p class="rulesTextP2">每使用一次+{{ ruleItem.spendPoint }}积分</p>
          </div>
        </div>
      </div>
      <div class="rules-text">
        <ul>
          <li><span></span>活动期间内使用指定技能可获得10~20积分</li>
        </ul>
      </div>
    </OutBox>
    <OutBox class="skillGiftBox" title="技能礼包" left right>
      <div class="skillPointNum">我的积分：{{ skill_gifts }}</div>
      <div class="giftList">
        <div v-for="(gift, key) in hot_gift" :key="key" class="giftItem">
          <div class="awardDiv">
            <div class="iconDiv">
              <img :src="IconPath(gift.goods_icon)" alt="" />
            </div>
            <div class="textDiv">+{{ gift.goods_num }}</div>
          </div>
          <div class="giftDesc">消耗<span>{{ gift.spend }}积分</span>兑换</div>
          <div class="exchangeButton button-receive" @click="exchange(gift, key)">兑换</div>
        </div>
      </div>
    </OutBox>
  </div>
</template>

<script>
import { getPageData } from '@/api'
import { _throttle } from '@/utils/tool'

export default {
  name: 'wuLin',
  data() {
    return {
      skillRules: Object.freeze([
        { name: '佛山无影脚', spendPoint: '20' },
        { name: '唇齿相依', spendPoint: '15' },
        { name: '画地为牢', spendPoint: '20' },
        { name: '一阳指', spendPoint: '15' },
        { name: '斗转星移', spendPoint: '10' }
      ]), // 规则列表
      skill_gifts: '0', // 我的积分
      hot_gift: {
        hot_100: { goods_icon: 'ljs_60_60.png', goods_id: 2, goods_name: '绿晶石', goods_num: 100, has_right: 1, index: 1, spend: 100 },
        hot_450: { goods_icon: 'ljs_60_60.png', goods_id: 2, goods_name: '绿晶石', goods_num: 500, has_right: 1, index: 2, spend: 450 },
        hot_900: { goods_icon: 'ljs_60_60.png', goods_id: 2, goods_name: '绿晶石', goods_num: 1000, has_right: 1, index: 3, spend: 900 }
      } // 技能礼包
    }
  },
  created() {
    this.getHomePage()
  },
  methods: {
    /**
     * 兑换技能礼包
     * @param {Object} gift 礼包数据
     * @param {Number} mark 礼包标识
     */
    exchange: _throttle(async function (gift, mark) {
      if (Number(gift.spend) > Number(this.skill_gifts)) return this.$toast('技能积分不足')
      const res = await getPageData({ mark, type: 'skill_gift' })
      this.$toast(res.errmsg)
      if (!res.errno) this.skill_gifts = res.hots
    }),
    /**
     * 获取首页数据
     */
    async getHomePage() {
      const res = await getPageData('m5')
      if (res.errno) return this.$toast(res.errmsg)
      this.skill_gifts = res.skill_gifts
      this.hot_gift = res.hot_gift
    }
  }
}
</script>

<style lang="scss" scoped>
.wuLin {
  .skillRulesBox {
    .skillListDiv {
      .ruleItem {
        position: relative;
        display: flex;
        align-items: center;
        width: 680px;
        height: 148px;
        margin: 0 auto 12px;
        background: url('@/pages/childrenDay/assets/mk1_4.png') no-repeat left top/100% 100%;
        .skillIcon {
          width: 96px;
          height: 96px;
          margin-left: 41px;
          margin-right: 18px;
        }
        .rulesTextDiv {
          line-height: 1;
          .rulesTextP1 {
            font-size: 32px;
            color: #FFFFFF;
            margin-bottom: 20px;
          }
          .rulesTextP2 {
            font-size: 24px;
            color: #FFFAA6;
          }
        }
        &:nth-child(1) {
          .skillIcon {
            background: url('@/pages/childrenDay/assets/mk3_1.png') no-repeat left top/100% 100%;
          }
        }
        &:nth-child(2) {
          .skillIcon {
            background: url('@/pages/childrenDay/assets/mk3_2.png') no-repeat left top/100% 100%;
          }
        }
        &:nth-child(3) {
          .skillIcon {
            background: url('@/pages/childrenDay/assets/mk3_3.png') no-repeat left top/100% 100%;
          }
        }
        &:nth-child(4) {
          .skillIcon {
            background: url('@/pages/childrenDay/assets/mk3_4.png') no-repeat left top/100% 100%;
          }
        }
        &:nth-child(5) {
          .skillIcon {
            background: url('@/pages/childrenDay/assets/mk3_5.png') no-repeat left top/100% 100%;
          }
        }
      }
    }
  }
  .skillGiftBox {
    .skillPointNum {
      min-width: 320px;
      width: fit-content;
      height: 48px;
      margin: 0 auto 20px;
      font-size: 28px;
      color: #FFFFFF;
      background: #C18460;
      border-radius: 20px 0 20px 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .giftList {
      .giftItem {
        position: relative;
        margin: 0 auto 8px;
        width: 680px;
        height: 148px;
        display: flex;
        background: url('@/pages/childrenDay/assets/mk1_4.png') no-repeat left top/100% 100%;
        .awardDiv {
          position: absolute;
          top: 17px;
          left: 38px;
          display: flex;
          align-items: center;
          flex-direction: column;
          width: 108px;
          height: 108px;
          background: #ffffff;
          border: 4px solid #CF9375;
          padding: 0 2px 2px;
          .iconDiv {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 68px;
            > img {
              width: 80%;
              height: auto;
            }
          }
          .textDiv {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            background: #791D2A;
            font-size: 24px;
            color: #ffffff;
          }
        }
        .giftDesc {
          position: absolute;
          top: 33px;
          left: 172px;
          font-size: 30px;
          color: #FFFFFF;
          line-height: 1;
          > span {
            color: #fffaa6;
          }
        }
        .exchangeButton {
          position: absolute;
          right: 31px;
          top: 37px;
          width: 126px;
          height: 66px;
          font-size: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          white-space: nowrap;
          // 渐变
          border: 3px solid transparent;
          border-radius: 99999px;
          -webkit-background-clip: padding-box, border-box;
          -webkit-background-origin: padding-box, border-box;
          color: #6F2E37;
          background-image: linear-gradient(0deg, #EDCFB2, #F3C08F), -webkit-linear-gradient(#6F2F37, #6F2F37);
        }
      }
    }
  }
}
</style>
