<template>
  <div class="compo">
    <OutBox :title="'title_3.png'">
      <transition-group :name="flipAnim" tag="ul">
        <li :class="['accumulateItem', 'type1']" v-for="(item) in consume_status_show" :key="item.condition">
          <div class="nameDesc"><i>累计</i>消费满<i>{{item.condition}}钻&ensp;({{item.consume_nums}}/{{item.condition}})</i></div>
          <div class="awardsDivType1">
            <div class="awardItem" v-for="(it,inex) in item.awards" :key="inex">
              <PublicImg class="awardIcon" :imgName="it.icon" />
              <span>+{{it.text}}</span>
              <span v-if="(inex+1)!=item.awards.length">,&ensp;</span>
            </div>
          </div>
          <div :class="['accumulateBtn', 'type1', item.has_right==0?`button-noFinish`:item.has_right==1?`button-receive`:item.has_right==2?`button-finish`:null]" @click="consumeBtnCk(item)">{{item.has_right==0?'未完成':item.has_right==1?'领取':item.has_right==2?'已领取':null}}</div>
        </li>
      </transition-group>
      <div class="rules-text">
        <ul>
          <li><span></span>求婚时购买求婚物品的消费计算在内</li>
          <li><span></span>消耗<img :src="IconPath('hjcbt_120_120.png')" />可进行30次符石寻宝</li>
        </ul>
      </div>
    </OutBox>
    <OutBox class="rankBox">
      <div class="rankTag">
        <div :class="['tagItem', typeRankTag==1?'active':'unactive']" @click="changeRankCk(1)">赠送榜</div>
        <div :class="['tagItem', typeRankTag==2?'active':'unactive']" @click="changeRankCk(2)">获赠榜</div>
      </div>
      <div class="rankTopTip">
        <span v-if="typeRankTag==1">我赠送的钻石礼物:&ensp;{{presentShow}}钻</span>
        <span v-else-if="typeRankTag==2">我获赠的钻石礼物:&ensp;{{presentShow}}钻</span>
      </div>
      <div class="rankArea">
        <div class="rankTitleDiv">
          <div class="rank">排名</div>
          <div class="name">名字</div>
          <div class="value">价值(钻)</div>
          <div class="rewards">奖励</div>
        </div>
        <div class="rankDiv" ref="rankDiv">
          <div class="rankItem" v-for="(item,index) in presentListShow" :key="item.uid+index">
            <div class="rank">{{index + 1}}</div>
            <div class="name">
              <img :src="IconPath(item.profile_image)" @click="goHome(item)" @error.once="moveErrorImg"/>
              <span>{{item.username}}</span>
            </div>
            <div class="value">{{item.time}}</div>
            <div class="rewards">
              <img :src="IconPath('ljs_120_120.png')"/>
              <span>+{{item.tool_nums}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="rules-text">
        <ul>
          <li><span></span>活动期间，<i>每日赠送和获赠钻石礼物价值</i>最高的前</li>
          <li>10名玩家可获得排名奖励，榜单每日重置，奖励会</li>
          <li>在次日发放</li>
          <li><span></span>活动期间收到钻石礼物，可获得双倍经验值和<i>双倍</i></li>
          <li><i>基础魅力值，魅力值上限提高50%</i></li>
          <li><span></span>每个ID只能获得一个榜单的排名奖励，按最大名次</li>
          <li>派发</li>
        </ul>
      </div>
    </OutBox>
  </div>
</template>

<script>
import { getPageData } from '@/pages/luckyFlop/api/index'
import { toUserMain } from '@/pages/luckyFlop/utils/toApp.js'

export default {
  name: 'diamondGift',
  props: [],
  components: {},
  data() {
    return {
      flipAnim: 'flipMoveNo', // 控制是否滚动
      consume_status: [], // 累计消费有礼列表
      consume_status_show: {
        1000: { condition: 1000, consume_nums: 0, has_right: 0, is_daily: false, awards: [{ type: 'property', name: '元宝', tool_id: 'gamegold', nums: 50000, text: '5万', icon: 'yb_120_120.png' }, { type: 'tool', name: '精粹', tool_id: 142, nums: 100, text: '100', icon: 'fsjc_60_60.png' }] },
        2000: { condition: 2000, consume_nums: 0, has_right: 0, is_daily: false, awards: [{ type: 'property', name: '元宝', tool_id: 'gamegold', nums: 100000, text: '10万', icon: 'yb_120_120.png' }, { type: 'tool', name: '精粹', tool_id: 142, nums: 100, text: '100', icon: 'fsjc_60_60.png' }] },
        3000: { condition: 3000, consume_nums: 0, has_right: 0, is_daily: false, awards: [{ type: 'property', name: '元宝', tool_id: 'gamegold', nums: 150000, text: '15万', icon: 'yb_120_120.png' }, { type: 'tool', name: '精粹', tool_id: 142, nums: 100, text: '100', icon: 'fsjc_60_60.png' }] },
        5000: { condition: 5000, consume_nums: 0, has_right: 0, is_daily: false, awards: [{ type: 'property', name: '元宝', tool_id: 'gamegold', nums: 200000, text: '20万', icon: 'yb_120_120.png' }, { type: 'tool', name: '精粹', tool_id: 142, nums: 200, text: '200', icon: 'fsjc_60_60.png' }] },
        10000: { condition: 10000, consume_nums: 0, has_right: 0, is_daily: false, awards: [{ type: 'property', name: '元宝', tool_id: 'gamegold', nums: 400000, text: '40万', icon: 'yb_120_120.png' }, { type: 'tool', name: '精粹', tool_id: 142, nums: 500, text: '500', icon: 'fsjc_60_60.png' }] },
        20000: { condition: 20000, consume_nums: 0, has_right: 0, is_daily: false, awards: [{ type: 'property', name: '元宝', tool_id: 'gamegold', nums: 600000, text: '60万', icon: 'yb_120_120.png' }, { type: 'tool', name: '黄金藏宝图', id: 159, nums: 1, text: '1', icon: 'hjcbt_60_60.png' }, { type: 'tool', name: '精粹', tool_id: 142, nums: 1000, text: '1000', icon: 'fsjc_60_60.png' }] },
        30000: { condition: 30000, consume_nums: 0, has_right: 0, is_daily: false, awards: [{ type: 'property', name: '元宝', tool_id: 'gamegold', nums: 850000, text: '85万', icon: 'yb_120_120.png' }, { type: 'tool', name: '精粹', tool_id: 142, nums: 1000, text: '1000', icon: 'fsjc_60_60.png' }] },
        50000: { condition: 50000, consume_nums: 0, has_right: 0, is_daily: false, awards: [{ type: 'property', name: '元宝', tool_id: 'gamegold', nums: 1300000, text: '130万', icon: 'yb_120_120.png' }, { type: 'tool', name: '黄金藏宝图', id: 159, nums: 1, text: '1', icon: 'hjcbt_60_60.png' }, { type: 'tool', name: '精粹', tool_id: 142, nums: 2000, text: '2000', icon: 'fsjc_60_60.png' }] },
        100000: { condition: 100000, consume_nums: 0, has_right: 0, is_daily: false, awards: [{ type: 'property', name: '元宝', tool_id: 'gamegold', nums: 2000000, text: '200万', icon: 'yb_120_120.png' }, { type: 'tool', name: '黄金藏宝图', id: 159, nums: 2, text: '2', icon: 'hjcbt_60_60.png' }, { type: 'tool', name: '精粹', tool_id: 142, nums: 3000, text: '3000', icon: 'fsjc_60_60.png' }] }
      },
      typeRankTag: 1, // 榜单 1:赠送榜 2:获赠榜
      presentShow: 0, // 钻石礼物数量展示
      my_send_present: 0, // 赠送数量
      my_present: 0, // 获赠数量
      presentListShow: [
        { uid: '', profile_image: 'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: '--', tool_nums: 1000 },
        { uid: '', profile_image: 'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: '--', tool_nums: 800 },
        { uid: '', profile_image: 'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: '--', tool_nums: 600 },
        { uid: '', profile_image: 'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: '--', tool_nums: 300 },
        { uid: '', profile_image: 'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: '--', tool_nums: 300 },
        { uid: '', profile_image: 'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: '--', tool_nums: 300 },
        { uid: '', profile_image: 'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: '--', tool_nums: 300 },
        { uid: '', profile_image: 'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: '--', tool_nums: 300 },
        { uid: '', profile_image: 'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: '--', tool_nums: 300 },
        { uid: '', profile_image: 'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: '--', tool_nums: 300 }
      ], // 榜单展示
      send_present_top: [
        { uid: '', profile_image: 'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: '--', tool_nums: 1000 },
        { uid: '', profile_image: 'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: '--', tool_nums: 800 },
        { uid: '', profile_image: 'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: '--', tool_nums: 600 },
        { uid: '', profile_image: 'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: '--', tool_nums: 300 },
        { uid: '', profile_image: 'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: '--', tool_nums: 300 },
        { uid: '', profile_image: 'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: '--', tool_nums: 300 },
        { uid: '', profile_image: 'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: '--', tool_nums: 300 },
        { uid: '', profile_image: 'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: '--', tool_nums: 300 },
        { uid: '', profile_image: 'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: '--', tool_nums: 300 },
        { uid: '', profile_image: 'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: '--', tool_nums: 300 }
      ], // 赠送榜单
      present_top: [
        { uid: '', profile_image: 'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: '--', tool_nums: 1000 },
        { uid: '', profile_image: 'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: '--', tool_nums: 800 },
        { uid: '', profile_image: 'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: '--', tool_nums: 600 },
        { uid: '', profile_image: 'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: '--', tool_nums: 300 },
        { uid: '', profile_image: 'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: '--', tool_nums: 300 },
        { uid: '', profile_image: 'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: '--', tool_nums: 300 },
        { uid: '', profile_image: 'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: '--', tool_nums: 300 },
        { uid: '', profile_image: 'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: '--', tool_nums: 300 },
        { uid: '', profile_image: 'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: '--', tool_nums: 300 },
        { uid: '', profile_image: 'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: '--', tool_nums: 300 }
      ] // 获赠榜单
    }
  },
  created() {
    this.getPageData()
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    /**
     * 获取首页信息
     */
    getPageData() {
      getPageData({ type: 'tab', mark: 'm3' }).then((res) => {
        if (res.errno == 0) {
          // console.log(res)
          this.consume_status = Object.values(res.data.consume_status)
          this.consume_status_show = this.sortRechargeList(this.consume_status)
          setTimeout(() => {
            this.flipAnim = 'flipMove'
          }, 1000)
          this.my_send_present = res.data.my_send_present
          this.my_present = res.data.my_present
          this.send_present_top = res.data.send_present_top
          this.present_top = res.data.present_top
          this.changeRankCk(1)
        } else {
          this.changeRankCk(1)
          this.$toast(res.errmsg)
        }
      })
    },
    /**
     * 领取
     */
    consumeBtnCk(item) {
      if (item.has_right == 1) {
        getPageData({ type: 'consume_reward', mark: item.condition }).then((res) => {
          if (res.errno == 0) {
            // this.getPageData()
            item.has_right = 2
            this.consume_status_show = this.sortRechargeList(this.consume_status)
            this.$toast(res.errmsg)
          } else {
            this.$toast(res.errmsg)
          }
        })
      }
    },
    /**
     * 排序数组
     */
    sortRechargeList(list) {
      let a = []
      let b = []
      for (let item of list) {
        if (item.has_right == 2) {
          b.push(item)
        } else {
          a.push(item)
        }
      }
      return a.concat(b)
    },
    /**
     * 切换榜单
     */
    changeRankCk(type) {
      this.typeRankTag = type
      if (this.typeRankTag == 1) {
        this.presentShow = this.my_send_present
        this.presentListShow = this.send_present_top
      } else if (this.typeRankTag == 2) {
        this.presentShow = this.my_present
        this.presentListShow = this.present_top
      }
      if (this.$refs.rankDiv && this.$refs.rankDiv.scrollTop > 0) {
        this.$refs.rankDiv.scrollTo({ top: 0, behavior: 'instant' })
      }
    },
    /**
     * 点击头像去往用户主页
     */
    goHome(item) {
      console.log(item)
      toUserMain(item.uid)
    },
    /**
     * 替换裂开的图片
     */
    moveErrorImg(event) {
      // console.log('event:', event)
      event.currentTarget.src = 'https://imagevo.dandanvoice.com/app/activity/head/no_seat_white.png'
      event.currentTarget.style.width = 'auto'
      return true
    }
  }
}
</script>

<style scoped lang="scss">
.compo{
  .flipMove-move{
    transition: all 1s;
  }
  .flipMoveNo-move{
    transition: none;
  }
  .accumulateItem{
    margin: 10px auto 0 auto;
    width: 660px;
    position: relative;
    &.type1{
      height: 142px;
      background: url('@/pages/luckyFlop/assets/mk1_1.png') no-repeat left top/100% 100%;
    }
    &.type2{
      height: 374px;
      background: url('@/pages/luckyFlop/assets/mk2_4.png') no-repeat left top/100% 100%;
    }
    .nameDesc{
      font-size: 30px;
      color: #fff;
      position: absolute;
      left: 20px;
      top: 25px;
      i{
        color: #FFFAA6;
      }
    }
    .awardsDivType1{
      min-width: 200px;
      height: 50px;
      border-image-source: url('@/pages/luckyFlop/assets/mk2_7.png');
      border-image-slice: 0 50 0 50 fill;
      border-image-width: 0 50px 0 50px;
      padding: 0 10px;
      position: absolute;
      left: 20px;
      bottom: 20px;
      display: flex;
      .awardItem{
        font-size: 24px;
        line-height: 24px;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        .awardIcon{
          width: 50px;
          height: 50px;
        }
      }
    }
    .awardsDivType2{
      width: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 70px;
      display: flex;
      justify-content: space-evenly;
      .awardItem{
        background: #F3F4FF;
        border-radius: 12px;
        border: 2px solid #F0C8FF;
        position: relative;
        &.title{
          width: 160px;
          height: 130px;
        }
        &.other{
          width: 120px;
          height: 130px;
        }
        .awardIcon{
          position: absolute;
          top: -15px;
        }
        .awardText{
          width: 100%;
          height: 30px;
          background: #B070ED;
          border-radius: 0 0 12px 12px;
          font-size: 24px;
          color: #FFFFFF;
          text-align: center;
          line-height: 35px;
          position: absolute;
          bottom: 0;
        }
      }
      .bottomTip{
        font-size: 24px;
        color: #FFFAA6;
        position: absolute;
        left: 20px;
        bottom: -150px;
      }
    }
    .accumulateBtn{
      position: absolute;
      &.type1{
        right: 20px;
        bottom: 20px;
      }
      &.type2{
        left: 50%;
        transform: translateX(-50%);
        bottom: 70px;
      }
    }
  }
  .rules-text{
    img{
      width: 60px;
      height: 60px;
    }
  }
  .rankBox{
    margin-top: 80px;
    .rankTag{
      display: flex;
      margin: -120px auto 0 auto;
      justify-content: center;
      font-weight: 500;
      .tagItem{
        width: 363px;
        height: 150px;
        font-size: 40px;
        text-align: center;
        line-height: 150px;
        &.active{
          background: url('@/pages/luckyFlop/assets/tab_3.png') no-repeat left top/100% 100%;
          color: #6359E4;
          text-shadow: 1px 0 #F0F6A5,-1px 0 #F0F6A5,0 1px #F0F6A5,0 -1px #F0F6A5,1px 1px #F0F6A5,-1px -1px #F0F6A5,1px -1px #F0F6A5,-1px 1px #F0F6A5;
        }
        &.unactive{
          background: url('@/pages/luckyFlop/assets/tab_4.png') no-repeat left top/100% 100%;
          color: #FFFFFF;
          text-shadow: 1px 0 #8185E6,-1px 0 #8185E6,0 1px #8185E6,0 -1px #8185E6,1px 1px #8185E6,-1px -1px #8185E6,1px -1px #8185E6,-1px 1px #8185E6;
        }
      }
    }
    .rankTopTip{
      font-size: 28px;
      color: #4A50D1;
      line-height: 36px;
      text-align: center;
    }
    .rankArea{
      width: 660px;
      margin: 10px auto 10px auto;
      .rankTitleDiv{
        height: 48px;
        background: #6B7FFD;
        border-radius: 12px;
        display: flex;
        font-size: 24px;
        color: #FFFAA6;
        line-height: 50px;
        text-align: center;
        .rank{
          width: 60px;
        }
        .name{
          width: 240px;
        }
        .value{
          width: 180px;
        }
        .rewards{
          width: 180px;
        }
      }
      .rankDiv{
        height: 400px;
        background: linear-gradient(180deg, #406BD7, #6E6DD7);
        border-radius: 12px;
        margin-top: 10px;
        overflow-y: scroll;
        .rankItem{
          height: 70px;
          display: flex;
          font-size: 24px;
          color: #fff;
          line-height: 70px;
          text-align: center;
          .rank{
            width: 60px;
          }
          .name{
            width: 240px;
            text-align: left;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            img{
              width: 36px;
              height: 36px;
              margin: auto 5px;
              border-radius: 50px;
            }
          }
          .value{
            width: 180px;
          }
          .rewards{
            width: 180px;
            img{
              width: 50px;
              height: 50px;
            }
          }
        }
      }
    }
    .rules-text{
      i{
        color: #FF78D0;
      }
    }
  }
}
</style>
