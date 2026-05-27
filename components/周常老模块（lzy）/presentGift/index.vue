<template>
  <div class="presentGift">
    <OutBox class="consumeListBox" title="累计消费有礼">
      <img :src="IconPath('mk2_1.png')" alt="" class="resetIcon position-absolute" />
      <transition-group class="listMain" tag="ul" :name="transitionClass">
        <div class="taskItem flex align-center" v-for="item in consume_status" :key="item.condition">
          <div class="awardItem" v-for="awardItem in item.awards" :key="awardItem.condition">
            <div class="awardIcon flex align-center justify-center"><img :src="IconPath(awardItem.icon)" alt="" /></div>
            <div class="awardText flex align-center justify-center">+{{ awardItem.text }}</div>
          </div>
          <div class="taskText flex-column justify-between line-height-100">
            <p>累计消费<span class="focus-color">{{ item.condition }}钻</span></p>
            <p class="focus-color">（{{ item.consume_nums }}/{{ item.condition }}）</p>
          </div>
          <div class="button" :class="`status${item.has_right}`" @click="receiveConsumeAwards(item)">{{ item.has_right == 0 ? '未完成' : item.has_right == 1 ? '领取' : '已领取' }}</div>
        </div>
      </transition-group>
      <div class="rules-text">
        <ul>
          <li><span></span>求婚时购买求婚物品的消费计算在内</li>
          <li><span></span>消耗<img :src="IconPath('cbt_43_35.png')"  alt=""/>及<img :src="IconPath('hjcbt_45_37.png')" alt="" />分别可进行1/30次符石寻宝</li>
          <!-- <li><span></span>消耗<img :src="IconPath('hjcbt_45_37.png')" alt="" />可进行30次符石寻宝</li> -->
          <!-- <li><span></span>消耗<img class="pydIcon" :src="IconPath('pyd_43_44.png')" alt="" />可抵用一次天赋修炼</li> -->
        </ul>
      </div>
    </OutBox>
  </div>
</template>

<script>
import { getPageData } from '@/api'

export default {
  name: 'presentGift',
  data() {
    return {
      consume_status: {
        1000: { awards: [{ icon: 'yb_120_120.png', name: '元宝', nums: 50000, text: '5万', tool_id: 'gamegold', type: 'property' }, { icon: 'fsjc_120_120.png', name: '符石精粹', nums: 100, text: '100', tool_id: 4, type: 'hero_tools' }], condition: 1000, consume_nums: 0, has_right: 0, is_daily: true },
        2000: { awards: [{ icon: 'yb_120_120.png', name: '元宝', nums: 100000, text: '10万', tool_id: 'gamegold', type: 'property' }, { icon: 'fsjc_120_120.png', name: '符石精粹', nums: 100, text: '100', tool_id: 4, type: 'hero_tools' }], condition: 2000, consume_nums: 0, has_right: 0, is_daily: true },
        3000: { awards: [{ icon: 'yb_120_120.png', name: '元宝', nums: 150000, text: '15万', tool_id: 'gamegold', type: 'property' }, { icon: 'fsjc_120_120.png', name: '符石精粹', nums: 100, text: '100', tool_id: 4, type: 'hero_tools' }], condition: 3000, consume_nums: 0, has_right: 0, is_daily: true },
        5000: { awards: [{ icon: 'yb_120_120.png', name: '元宝', nums: 250000, text: '25万', tool_id: 'gamegold', type: 'property' }, { icon: 'fsjc_120_120.png', name: '符石精粹', nums: 200, text: '200', tool_id: 4, type: 'hero_tools' }], condition: 5000, consume_nums: 0, has_right: 0, is_daily: true },
        10000: { awards: [{ icon: 'yb_120_120.png', name: '元宝', nums: 500000, text: '50万', tool_id: 'gamegold', type: 'property' }, { icon: 'cbt_120_120.png', id: 158, name: '藏宝图', nums: 20, text: '20', type: 'cbt' }, { icon: 'fsjc_120_120.png', name: '符石精粹', nums: 500, text: '500', tool_id: 4, type: 'hero_tools' }], condition: 10000, consume_nums: 0, has_right: 0, is_daily: true },
        20000: { awards: [{ icon: 'yb_120_120.png', name: '元宝', nums: 750000, text: '75万', tool_id: 'gamegold', type: 'property' }, { icon: 'cbt_120_120.png', id: 158, name: '藏宝图', nums: 20, text: '20', type: 'cbt' }, { icon: 'fsjc_120_120.png', name: '符石精粹', nums: 1000, text: '1000', tool_id: 4, type: 'hero_tools' }], condition: 20000, consume_nums: 0, has_right: 0, is_daily: true },
        30000: { awards: [{ icon: 'yb_120_120.png', name: '元宝', nums: 1200000, text: '120万', tool_id: 'gamegold', type: 'property' }, { icon: 'cbt_120_120.png', id: 158, name: '藏宝图', nums: 20, text: '20', type: 'cbt' }, { icon: 'fsjc_120_120.png', name: '符石精粹', nums: 1000, text: '1000', tool_id: 4, type: 'hero_tools' }], condition: 30000, consume_nums: 0, has_right: 0, is_daily: true },
        50000: { awards: [{ icon: 'yb_120_120.png', name: '元宝', nums: 1600000, text: '160万', tool_id: 'gamegold', type: 'property' }, { icon: 'hjcbt_120_120.png', name: '黄金藏宝图', nums: 1, text: '1', tool_id: 4, type: 'hero_tools' }, { icon: 'fsjc_120_120.png', name: '符石精粹', nums: 2000, text: '2000', tool_id: 4, type: 'hero_tools' }], condition: 50000, consume_nums: 0, has_right: 0, is_daily: true },
        100000: { awards: [{ icon: 'yb_120_120.png', name: '元宝', nums: 2400000, text: '240万', tool_id: 'gamegold', type: 'property' }, { icon: 'hjcbt_120_120.png', name: '黄金藏宝图', nums: 2, text: '2', tool_id: 4, type: 'hero_tools' }, { icon: 'fsjc_120_120.png', name: '符石精粹', nums: 3000, text: '3000', tool_id: 4, type: 'hero_tools' }], condition: 100000, consume_nums: 0, has_right: 0, is_daily: true },
        150000: { awards: [{ icon: 'yb_120_120.png', name: '元宝', nums: 3000000, text: '300万', tool_id: 'gamegold', type: 'property' }, { icon: 'hjcbt_120_120.png', name: '黄金藏宝图', nums: 3, text: '3', tool_id: 4, type: 'hero_tools' }, { icon: 'fsjc_120_120.png', name: '符石精粹', nums: 4500, text: '4500', tool_id: 4, type: 'hero_tools' }], condition: 150000, consume_nums: 0, has_right: 0, is_daily: true }
      },
      transitionClass: 'noTransition'
    }
  },
  mounted() {
    this.getHomePage()
  },
  methods: {
    /**
     * 累计消费有礼领取
     */
    async receiveConsumeAwards(param) {
      if (param.has_right != 1) return
      const res = await getPageData({ type: 'consume_reward', mark: param.condition })
      this.$toast(res.errmsg)
      if (res.errno) return
      param.has_right = 2
      this.consume_status = this.sortList(this.consume_status)
    },
    /**
     * 主页接口
     */
    async getHomePage() {
      const res = await getPageData({ type: 'tab', mark: 'm3' })
      if (res.errno) return this.$toast(res.errmsg)
      this.consume_status = this.sortList(res.data.consume_status)
      this.$nextTick(() => {
        this.transitionClass = 'hasTransition'
      })
    },
    /**
     * 列表排序 领取-未完成-已完成
     */
    sortList(arr) {
      return Object.values(arr).reduce((acc, item) => {
        if (item.has_right < 2) {
          acc[0].push(item)
        } else {
          acc[1].push(item)
        }
        return acc
      }, [[], []]).flat()
    }
  }
}
</script>

<style lang="scss" scoped>
.presentGift {
  .consumeListBox {
    .resetIcon {
      z-index: 2;
      top: -30px;
      right: 185px;
      width: 124px;
      height: auto;
    }
    // 累积消费返利列表
    .listMain {
      display: flex;
      flex-direction: column;
      align-items: center;
      // 累积消费返利列表项
      .taskItem {
        display: flex;
        align-items: center;
        position: relative;
        margin-left: 8px;
        margin-bottom: 19px;
        width: 664px;
        height: 142px;
        -webkit-background-clip: content-box, border-box;
        -webkit-background-origin: content-box, border-box;
        background-image: linear-gradient(-90deg, #FFAC7F, #C74545), -webkit-linear-gradient(#F9DE8D, #F9DE8D);
        border-radius: 16px;
        border: 4px solid transparent;
        //box-shadow: inset 0 0 27px 15px rgba(232, 153, 255, 0.5);
        .focus-color {
          color: #fffaa6 !important;
        }
        .awardItem {
          $radius: 12px;
          $borderWidth: 4px;
          display: flex;
          flex-direction: column;
          width: 80px + $borderWidth * 2;
          height: 80px + $borderWidth * 2;
          background-color: #E9CC7B;
          padding: $borderWidth;
          border-radius: $radius + $borderWidth;
          margin-left: 13 - $borderWidth * 2;
          .awardIcon {
            width: 100%;
            height: 54px;
            background: #fff;
            border-radius: $radius $radius 0 0;
            > img {
              width: 85%;
            }
          }
          .awardText {
            flex: 1;
            font-size: 20px;
            color: #fff;
            width: 100%;
            background-color: #6D6DC3;
            border-radius: 0 0 $radius $radius;
          }
        }
      }
      .taskText {
        margin-left: 5px;
        font-size: 24px;
        line-height: 100%;
        p:nth-child(1) {
          font-size: 29px;
          color: #ffffff;
        }
        p:nth-child(2) {
          margin-top: 24px;
          font-size: 24px;
          margin-left: -0.5em;
        }
      }
      // 右侧按钮
      .button {
        position: absolute;
        right: 11px;
        bottom: 15px;
        width: 126px;
        height: 66px;
        font-size: 28px;
        color: #FFFFFF;
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
        &.status0{
          color: #4D7DDD;
          background-image: linear-gradient(0deg, #CAE7FF, #FFFFFF), -webkit-linear-gradient(#fff, #fff);
        }
        &.status1{
          color: #A9792C;
          background-image: linear-gradient(0deg, #FFF5B0, #FFFFFF), -webkit-linear-gradient(#fff, #fff);
        }
        &.status2{
          color: #fff;
          background-image: linear-gradient(0deg, #9D9D9D, #E7E7E7), -webkit-linear-gradient(#fff, #fff);
        }
      }
    }
    .rules-text {
      img {
        width: auto;
        height: 35px;
      }
      .pydIcon {
        width: auto;
        height: 40px;
      }
    }
  }
}
</style>
