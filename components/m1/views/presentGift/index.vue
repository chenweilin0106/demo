<template>
  <div class="presentGift">
    <GiftPack :config="{goods_info:bug_gift_list[0],id:bug_gift_list[0].gift_id}" @update="getPageData" />
    <CpRewards :config="configCpRewards" @update="marriage_gift.has_right=2" />
    <!--<LotteryMarried @update="getPageData" />-->
    <LimitDiscount />
    <!--<OutBox title="mk1_title_7.png" class="cpHelp">-->
    <!--  <img :src="IconPath('mk2_2.png')" class="ruleBtn position-absolute" @click="isShowRulesPopup=true" />-->
    <!--  <p class="cpHelpTip line-height-1 flex justify-center">双方互赠钻石礼物达到指定门槛解锁奖励</p>-->
    <!--  <div class="users flex justify-between align-center margin-row-center">-->
    <!--    <div class="user flex-column align-center">-->
    <!--      <img class="radius-50 fit-cover block avatar" :src="IconPath(user_icon||'mk3_4.png')" @error="imgAtError" @click="toUserMain(uid)" />-->
    <!--      <div class="username line-height-1 text-center ellipsis">{{username||'虚位以待'}}</div>-->
    <!--    </div>-->
    <!--    <div class="user flex-column align-center">-->
    <!--      <img class="radius-50 fit-cover block avatar" :src="IconPath(cp_info.tprofile_image||'mk3_4.png')" @error="imgAtError" @click="toUserMain(cp_info.tuid)" />-->
    <!--      <div class="username line-height-1 text-center ellipsis">{{cp_info.tusername||'暂无CP'}}</div>-->
    <!--    </div>-->
    <!--  </div>-->
    <!--  <p class="pointNum width-fit margin-row-center flex justify-center align-center">-->
    <!--    <template v-if="!cp_info.cp_id">你还没有CP，快去邂逅吧！<img :src="IconPath('mk3_5.png')" @click="jumpMetHouse" /></template>-->
    <!--    <template v-else>互赠钻石礼物：{{cp_info.num}}钻</template>-->
    <!--  </p>-->
    <!--  <StepProgress :tot_num="cp_info.num||0" :tot_list="tot_list" @openReceivePopup="openReceivePopup" />-->
    <!--  <div class="rules-text">-->
    <!--    <ul>-->
    <!--      <li><span></span>参与【年度CP】争霸赛可获更多奖励！<address style="margin-left: -0.5em" @click="$router.replace({path:'/m7',query:{rankChosen:'2',scroll:true}})">立即前往</address></li>-->
    <!--    </ul>-->
    <!--  </div>-->
    <!--</OutBox>-->
    <!--<RobRewards :config="configRobRewards" @update="award_list[0].has_right=2" />-->
    <!--<GiftUpdate />-->
    <ConsumeTasksList :consume_status="consume_status" :transitionClass="transitionClass" @receiveAward="receiveAward" />
    <!--<PresentGiftRank v-bind="presentGiftRankData" />-->
    <!--<ReceivePopup v-if="isShowReceivePopup" :config="configReceivePopup" @clickClose="isShowReceivePopup = false" />-->
    <!--<RulesPopup v-if="isShowRulesPopup" :config="configRulesPopup" @clickClose="isShowRulesPopup = false" />-->
  </div>
</template>

<script>
import { toUserMain, compareVersions, toSweetMeet } from '@/utils/toApp'
import { imgAtError } from '@/utils/tool'
// import GiftUpdate from '@/pages/springFestival/views/m1/views/presentGift/components/index.vue' // 礼物焕新
// import RobRewards from './components/robRewards.vue' // 打劫有礼
// import LotteryMarried from '@/pages/springFestival/views/m1/views/presentGift/components/lotteryMarried/index.vue' // 抽奖结婚
import LimitDiscount from './components/limitDiscount.vue' // 限时折扣
import CpRewards from './components/newCpRewards.vue' // cp贺礼
import ConsumeTasksList from './components/consumeTasksList.vue' // 累计消费
import GiftPack from './components/giftPack.vue' // 内购礼包
// import StepProgress from '@/pages/springFestival/views/m1/views/presentGift/components/stepProgress.vue'
// import PresentGiftRank from '@/pages/springFestival/views/m1/views/presentGift/components/presentGiftRank.vue'
import { getPageData } from '@/api/index'
// import ReceivePopup from '@/pages/springFestival/components/receivePopup.vue'
// import RulesPopup from '@/pages/springFestival/views/m1/views/presentGift/popups/rulesPopup.vue'
import { mapState } from 'vuex'

export default {
  name: 'presentGift',
  components: { ConsumeTasksList, LimitDiscount, CpRewards, GiftPack },
  data() {
    return {
      // isShowRulesPopup: false, // 显示规则弹窗
      // configReceivePopup: [], // 恭喜获得弹窗配置
      // isShowReceivePopup: false, // 显示恭喜获得弹窗
      // CP助力----------------------------------
      // cp_info: { cp_id: 0, uid: '', username: '', profile_image: '', tuid: '', tusername: '', tprofile_image: '', num: 0 }, // cp信息
      // cp_info: {}, // cp信息
      // tot_list: [
      //   { id: 1, need_num: 1314, has_right: 0, award: { id: 19, type: 'tool', icon: 'sjmg_120_120.png', nums: 99, unit: '', name: '水晶玫瑰' } },
      //   { id: 2, need_num: 5200, has_right: 0, award: { id: 38, type: 'costume', icon: 'txqq_120_120.png', nums: 5, unit: '天', name: '桃心气球' } },
      //   { id: 3, need_num: 9999, has_right: 0, award: { id: 11, type: 'chat_bubble', icon: 'qp_xdsk_sc', nums: 5, unit: '天', name: '心动时刻' } },
      //   { id: 4, need_num: 20520, has_right: 0, award: { id: 6, type: 'CP_card', icon: 'wrmm_120_120.png', nums: 7, unit: '天', name: '温柔弥漫' } },
      //   { id: 5, need_num: 33440, has_right: 0, award: { id: 31, type: 'ring', icon: 'cbsh_120_120.png', nums: 1, unit: '', name: '纯白守护' } }
      // ], // CP助力进度奖励
      // ----------------------------------------
      // uid: '0',
      // my_username: '--',
      // 打劫有礼-----------------
      // masonry_nums: 0, // 累计收到的钻石礼物对应的钻石数
      // masonry_max: 26666, // 奖励达成条件，需要的钻石礼物数
      // recharge_nums: 0, // 累计充值金额
      // recharge_max: 300, // 奖励达成条件，需要累计充值金额数
      // award_list: [{ key: 1, type: 'title', name: '千里共婵娟', icon: 'ch_qlgcj', tool_id: 4986, nums: false, text: '永久称号', has_right: 0 }], // 打劫有礼奖励 0-不可以领取，1-可以领取，2-已领取
      // 专属礼包-----------------
      bug_gift_list: [
        { gift_id: 6, price: 6, apple_id: 'new_active_6', goods_type: 'activity_bingo', status: 1 }
      ],
      // cp贺礼-------------------
      user_gender: '0', // 性别 0：男 1：女
      user_icon: '', // 头像
      marriage_gift: { awards: [{ icon: 'ts_tslm.svga', id: 0, name: '天生浪漫', nums: 3, text: '头饰+3天', type: 'mic', show_text: '头饰+3天' }, { icon: 'yb_120_120.png', id: 'gamegold', name: '元宝', nums: 200000, text: '元宝+20万', type: 'property', show_text: '元宝+20万' }], has_right: 0 }, // cp贺礼
      // 消费有礼-----------------
      consume_status: {
        1000: { awards: [{ icon: 'yb_120_120.png', name: '元宝', nums: 50000, text: '5万', tool_id: 'gamegold', type: 'property' }, { icon: 'fsjc_60_60.png', name: '符石精粹', nums: 100, text: '100', tool_id: 142, type: 'hero_tools' }], condition: 1000, consume_nums: 0, has_right: 0, is_daily: true },
        2000: { awards: [{ icon: 'yb_120_120.png', name: '元宝', nums: 100000, text: '10万', tool_id: 'gamegold', type: 'property' }, { icon: 'fsjc_60_60.png', name: '符石精粹', nums: 100, text: '100', tool_id: 142, type: 'hero_tools' }], condition: 2000, consume_nums: 0, has_right: 0, is_daily: true },
        3000: { awards: [{ icon: 'yb_120_120.png', name: '元宝', nums: 150000, text: '15万', tool_id: 'gamegold', type: 'property' }, { icon: 'fsjc_60_60.png', name: '符石精粹', nums: 100, text: '100', tool_id: 142, type: 'hero_tools' }], condition: 3000, consume_nums: 0, has_right: 0, is_daily: true },
        5000: { awards: [{ icon: 'yb_120_120.png', name: '元宝', nums: 200000, text: '20万', tool_id: 'gamegold', type: 'property' }, { icon: 'fsjc_60_60.png', name: '符石精粹', nums: 200, text: '200', tool_id: 142, type: 'hero_tools' }], condition: 5000, consume_nums: 0, has_right: 0, is_daily: true },
        10000: { awards: [{ icon: 'yb_120_120.png', name: '元宝', nums: 400000, text: '40万', tool_id: 'gamegold', type: 'property' }, { icon: 'fsjc_60_60.png', name: '符石精粹', nums: 500, text: '500', tool_id: 142, type: 'hero_tools' }], condition: 10000, consume_nums: 0, has_right: 0, is_daily: true },
        20000: { awards: [{ icon: 'yb_120_120.png', name: '元宝', nums: 600000, text: '60万', tool_id: 'gamegold', type: 'property' }, { icon: 'hjcbt_60_60.png', name: '黄金藏宝图', nums: 1, text: '1', tool_id: 159, type: 'hero_tools' }, { icon: 'fsjc_60_60.png', name: '符石精粹', nums: 1000, text: '1000', tool_id: 142, type: 'hero_tools' }], condition: 20000, consume_nums: 0, has_right: 0, is_daily: true },
        30000: { awards: [{ icon: 'yb_120_120.png', name: '元宝', nums: 850000, text: '85万', tool_id: 'gamegold', type: 'property' }, { icon: 'fsjc_60_60.png', name: '符石精粹', nums: 1000, text: '1000', tool_id: 142, type: 'hero_tools' }, { icon: 'pyd_60_60.png', name: '培元丹', nums: 50, text: '50', tool_id: 153, type: 'hero_tools' }], condition: 30000, consume_nums: 0, has_right: 0, is_daily: true },
        50000: { awards: [{ icon: 'yb_120_120.png', name: '元宝', nums: 1300000, text: '130万', tool_id: 'gamegold', type: 'property' }, { icon: 'hjcbt_60_60.png', name: '黄金藏宝图', nums: 1, text: '1', tool_id: 159, type: 'hero_tools' }, { icon: 'fsjc_60_60.png', name: '符石精粹', nums: 2000, text: '2000', tool_id: 142, type: 'hero_tools' }], condition: 50000, consume_nums: 0, has_right: 0, is_daily: true },
        100000: { awards: [{ icon: 'yb_120_120.png', name: '元宝', nums: 2000000, text: '200万', tool_id: 'gamegold', type: 'property' }, { icon: 'hjcbt_60_60.png', name: '黄金藏宝图', nums: 2, text: '2', tool_id: 159, type: 'hero_tools' }, { icon: 'fsjc_60_60.png', name: '符石精粹', nums: 3000, text: '3000', tool_id: 142, type: 'hero_tools' }], condition: 100000, consume_nums: 0, has_right: 0, is_daily: true }
        // 150000: { awards: [{ icon: 'yb_120_120.png', name: '元宝', nums: 3000000, text: '300万', tool_id: 'gamegold', type: 'property' }, { icon: 'hjcbt_60_60.png', name: '黄金藏宝图', nums: 3, text: '3', tool_id: 159, type: 'hero_tools' }, { icon: 'fsjc_60_60.png', name: '符石精粹', nums: 4500, text: '4500', tool_id: 142, type: 'hero_tools' }], condition: 150000, consume_nums: 0, has_right: 0, is_daily: true }
      },
      // 送礼/获赠排行榜------------
      // my_present: 0, // 我收到的数量
      // my_profile_image: '', // 我的头像
      // my_send_present: 0, // 我赠送的数量
      // present_top: [
      //   { profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`, time: '--', tool_nums: 1000, uid: '', username: '虚位以待' },
      //   { profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`, time: '--', tool_nums: 800, uid: '', username: '虚位以待' },
      //   { profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`, time: '--', tool_nums: 600, uid: '', username: '虚位以待' },
      //   { profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`, time: '--', tool_nums: 300, uid: '', username: '虚位以待' },
      //   { profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`, time: '--', tool_nums: 300, uid: '', username: '虚位以待' },
      //   { profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`, time: '--', tool_nums: 300, uid: '', username: '虚位以待' },
      //   { profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`, time: '--', tool_nums: 300, uid: '', username: '虚位以待' },
      //   { profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`, time: '--', tool_nums: 300, uid: '', username: '虚位以待' },
      //   { profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`, time: '--', tool_nums: 300, uid: '', username: '虚位以待' },
      //   { profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`, time: '--', tool_nums: 300, uid: '', username: '虚位以待' }
      // ], // 收礼排行榜
      // send_present_top: [
      //   { profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`, time: '--', tool_nums: 1000, uid: '', username: '虚位以待' },
      //   { profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`, time: '--', tool_nums: 800, uid: '', username: '虚位以待' },
      //   { profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`, time: '--', tool_nums: 600, uid: '', username: '虚位以待' },
      //   { profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`, time: '--', tool_nums: 300, uid: '', username: '虚位以待' },
      //   { profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`, time: '--', tool_nums: 300, uid: '', username: '虚位以待' },
      //   { profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`, time: '--', tool_nums: 300, uid: '', username: '虚位以待' },
      //   { profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`, time: '--', tool_nums: 300, uid: '', username: '虚位以待' },
      //   { profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`, time: '--', tool_nums: 300, uid: '', username: '虚位以待' },
      //   { profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`, time: '--', tool_nums: 300, uid: '', username: '虚位以待' },
      //   { profile_image: `${process.env.VUE_APP_OSS_PATH}app/activity/head/no_seat_white.png`, time: '--', tool_nums: 300, uid: '', username: '虚位以待' }
      // ], // 送礼排行榜
      transitionClass: 'noTransition'
    }
  },
  computed: {
    ...mapState(['uid', 'username']),
    // 结婚贺礼数据
    configCpRewards() {
      return { user_gender: this.user_gender, marriage_gift: this.marriage_gift }
    }
    // 打劫有礼数据
    // configRobRewards() {
    //   return { masonry_nums: this.masonry_nums, masonry_max: this.masonry_max, recharge_nums: this.recharge_nums, recharge_max: this.recharge_max, award_list: this.award_list }
    // },
    // 榜单数据
    // presentGiftRankData() {
    //   return { my_send_present: this.my_send_present, my_present: this.my_present, present_top: this.present_top, send_present_top: this.send_present_top }
    // }
  },
  async created() {
    await this.getPageData()
    this.transitionClass = 'hasTransition'
  },
  methods: {
    /**
     * 打开恭喜获得弹窗
     */
    openReceivePopup(list, id) {
      this.configReceivePopup = list
      this.isShowReceivePopup = true
      this.tot_list.find(item => item.id == id).has_right = 2
    },
    jumpMetHouse() {
      const res = compareVersions('6.0.0')
      if (res == -1) return this.$toast('请升级版本')
      toSweetMeet()
    },
    // 累计消费领取
    async receiveAward(mark) {
      const res = await getPageData({ type: 'consume_reward', mark })
      this.$toast(res.errmsg)
      if (!res.errno) this.consume_status[mark].has_right = 2
    },
    async getPageData() {
      const res = await getPageData({ type: 'tab', mark: 'm3' })
      if (res.errno) return this.$toast(res.errmsg)
      // this.my_send_present = res.data.my_send_present
      // this.my_present = res.data.my_present
      // this.present_top = res.data.present_top
      // this.send_present_top = res.data.send_present_top
      this.consume_status = this.sortList(res.data.consume_status)
      this.$nextTick(() => {
        this.transitionClass = 'hasTransition'
      })
    },
    toUserMain,
    imgAtError
  }
}
</script>

<style lang="scss" scoped>
.presentGift {
  //.cpHelp {
  //  margin-bottom: 25px;
  //  .ruleBtn{
  //    top: 8px;
  //    right: 33px;
  //    width: 56px;
  //  }
  //  .cpHelpTip {
  //    font-size: 30px;
  //    color: #0767C1;
  //  }
  //  .users {
  //    margin-top: 20px;
  //    padding: 0 69px;
  //    width: 666px;
  //    height: 267px;
  //    background: url('@/pages/springFestival/assets/mk3_2.png') no-repeat left top/100% 100%;
  //    .user {
  //      .avatar {
  //        width: 128px;
  //        height: 128px;
  //        background: #FFFFFF;
  //        border: 4px solid #fff;
  //      }
  //      .username {
  //        padding: 21px 2px 0;
  //        font-weight: 500;
  //        font-size: 25px;
  //        color: #1F93E4;
  //        background: url('@/pages/springFestival/assets/mk3_3.png') no-repeat left top/100% 100%;
  //        width: 201px;
  //        height: 64px;
  //      }
  //    }
  //  }
  //  .pointNum{
  //    margin-top: 23px;
  //    font-size: 26px;
  //    color: #FFFFFF;
  //    //min-width: 502px;
  //    height: 48px;
  //    background: #52B1DD;
  //    border-radius: 999999999px;
  //    padding: 0 10px;
  //    >img{
  //      margin-right: -54px;
  //      width: 197px;
  //    }
  //  }
  //}
}
</style>
