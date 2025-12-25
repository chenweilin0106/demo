<template>
  <div class="presentGift">
    <OutBox class="presentGiftOutBox1" title="mk3_01.png">
      <div class="presentGiftOutBox1P1">每日首次被赠予<img :src="IconPath('nwtg_60.png')">即可开启礼包！</div>
      <div class="presentGiftOutBox1Icon1">
        <div class="presentGiftOutBox1Btn" :class="`status${gift_day_first_st.has_right}`" @click="receive1">{{ gift_day_first_st.has_right == 0 ? '未完成' :  gift_day_first_st.has_right == 1 ? '领 取' : '已领取' }}</div>
      </div>
      <div class="presentGiftOutBox1List1">
        <div v-for="(item, index) in tot_awards" :key="index" class="presentGiftOutBox1List1Item">
          <div class="presentGiftOutBox1List1ItemIcon">
            <div v-if="item.award.is_new" class="leftLabel"></div>
            <div v-if="item.award.show_price" class="rightLabel">{{ item.award.show_price }}<img :src="IconPath('zs_42_32.png')" /></div>
            <div v-if="$store.state.typeToNameMap[item.award.type]" class="typeLabel">{{ $store.state.typeToNameMap[item.award.type] }}</div>
            <div class="presentGiftOutBox1List1ItemIconTop">
              <PublicImg :imgName="item.award.icon" :imgType="item.award.type" />
            </div>
            <div class="presentGiftOutBox1List1ItemIconBottom">{{ $toShowText(item.award) }}</div>
          </div>
          <div class="presentGiftOutBox1List1ItemName">累计收到{{ item.need_num }}个<img :src="IconPath('nwtg_60.png')" />钻石礼物</div>
          <div class="presentGiftOutBox1List1ItemNum">（{{ Math.min(tot_rev_nums, item.need_num) }}/{{ item.need_num }}）</div>
          <div class="presentGiftOutBox1List1ItemBtn" :class="`status${item.has_right}`" @click="receive2(item)">{{ item.has_right == 0 ? '未完成' :  item.has_right == 1 ? '领取' : '已领取' }}</div>
        </div>
      </div>
      <div class="rules-text presentGiftOutBox1RulesText">
        <ul>
          <li><span></span>向自己赠送的钻石礼物不计算在内</li>
          <li><span></span>活动期间收到指定的钻石礼物<img :src="IconPath('nwtg_60.png')">,且收取数量累计</li>
          <li>达到指定次数，即可领取奖励</li>
        </ul>
      </div>
    </OutBox>
    <OutBox class="consumeListBox" title="mk3_04.png">
      <transition-group class="consumeList" :name="transitionClass" tag="ul">
        <div class="consumeItemDiv" v-for="consumeItem in consumeListShow" :key="consumeItem.condition">
          <div class="taskDetail">
          <p class="consumeItemP1">
            <span class="consumeItemP1Span1">累计消费满</span>
            <span class="consumeItemP1Span2">{{ consumeItem.condition }}钻</span>
            <span class="consumeItemP1Span3 consumeItemP1DeepSpan">（{{ consumeItem.consume_nums }}/{{ consumeItem.condition }}）</span>
          </p>
          <div class="awards">
            <div v-for="(awardItem, awardIndex) in consumeItem.awards" :key="awardIndex" class="awardItemBox">
              <img class="awardItemIcon" v-lazy="IconPath(awardItem.icon)" />
              <i class="awardItemText">+{{ `${awardItem.text}` }}</i>
              <template v-if="consumeItem.text_add">
                <i :key="awardIndex + 10" class="awardItemAddIcon"></i>
                <span :key="awardIndex + 100" class="awardItemAddText"> {{ consumeItem.text_add }}</span>
                <i>,</i>
              </template>
            </div>
          </div>
          </div>
          <div class="button" :class="`status${consumeItem.has_right}`" @click="receive(consumeItem)">
            {{ consumeItem.has_right == 0 ? '未完成' : consumeItem.has_right == 1 ? '领取' : '已领取' }}
          </div>
        </div>
      </transition-group>
      <div class="rules-text">
        <ul>
          <li><span></span>求婚时购买求婚物品的消费计算在内</li>
          <li><span></span>消耗<img :src="IconPath('cbt_60_60.png')" />及<img :src="IconPath('hjcbt_60_60.png')" />分别可进行1/30次符石寻宝</li>
          <!-- <li><span></span>消耗<img :src="IconPath('pyd_60_60.png')" />可抵用一次天赋修炼</li> -->
        </ul>
      </div>
    </OutBox>
    <OutBox class="rankBox">
      <div class="tabs" :class="`status${currentTab.id}`">
        <div v-for="tabItem in tabsArray" :key="tabItem.id" class="tab" @click="switchTab(tabItem)"></div>
      </div>
      <div class="myPoints">我{{ currentTab.text }}的钻石礼物：{{ this[currentTab.pointKey] }}钻</div>
      <div class="rank">
        <div class="rankHead">
          <div v-for="item in ['排名', '名字', '价值(钻)', '奖励']" :key="item" class="rankHeadDiv">{{ item }}</div>
        </div>
        <div class="rankList">
          <div ref="scrollBox" class="scrollBox">
            <div v-for="(item, index) in this[currentTab.listKey]" :key="`${currentTab.listKey}_${index}_${item.uid}`" class="rankItem" :class="{ 'rankItem2': item.awards?.length > 1 }">
              <div class="rankNum">{{ index + 1 }}</div>
              <div class="rankUser">
                <img class="rankUserAvatar" v-lazy="IconPath(item.profile_image || avatarDefault)" @error="imgAtError" @click="toUserMain(item.uid)" />
                <span class="rankUsername" @click="toUserMain(item.uid)">{{ item.username }}</span>
              </div>
              <div class="rankPrice">{{ item.time }}</div>
              <div class="rankAwards">
                <div v-for="(awardItem, awardIndex) in item?.awards || [{ type: 'tool', nums: item.tool_nums, icon: 'ljs_60_60.png' }]" :key="awardIndex" class="rankAwardItem">
                  <img class="rankAwardItemIcon" v-lazy="IconPath(awardItem.type == 'pst_privilege' ? 'mk3_7.png' : 'ljs_60_60.png')" alt="" />
                  <span class="rankAwardItemNum">{{ awardItem.type == 'pst_privilege' ? awardItem.name : `+${awardItem.nums}` }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="rules-text">
          <ul>
            <li><span></span>活动期间，每周<i>赠送和获赠钻石礼物价值</i>最高的前</li>
            <li>10名玩家可获得排名奖励，奖励会在次日发放</li>
            <li><span></span>活动期间收到钻石礼物，可获得<i>双倍经验值和双倍</i></li>
            <li><i>基础魅力值，魅力值上限提高50%</i></li>
            <li><span></span>每个ID只能获得一个榜单的排名奖励，按最大名次</li>
            <li>派发</li>
          </ul>
        </div>
      </div>
    </OutBox>
    <ReceivePopup v-if="isShowReceivePopup" :config="configReceivePopup" @clickClose="isShowReceivePopup = false" />
  </div>
</template>

<script>
import { getPageData } from '@/api'
import { _throttle, imgAtError } from '@/utils/tool'
import { toUserMain } from '@/utils/toApp'
import ReceivePopup from './popups/receivePopup.vue'

export default {
  name: 'presentGift',
  components: { ReceivePopup },
  data() {
    return {
      isShowReceivePopup: false,
      configReceivePopup: [],
      avatarDefault: Object.freeze('avatarDefault.png'),
      tot_rev_nums: 0,
      gift_day_first_st: {
        name: '每日首次被赠与礼物奖励',
        awards: [
          { id: 'gamegold', type: 'property', name: '元宝', nums: 20000, icon: 'yb_120_120.png', unit: '' },
          { id: 120, type: 'mic', name: '幽冥魔灵', nums: 3, icon: 'ts_ymml.svga', unit: '天' }
        ],
        has_right: 0
      },
      tot_awards: [
        { id: 20, need_num: 20, award: { id: 9, type: 'chat_bubble', nums: 1, name: '纯爱降临', unit: '天', icon: 'qp_cajl_sc' }, has_right: 0 },
        { id: 50, need_num: 50, award: { id: 158, type: 'tool', nums: 2, name: '藏宝图', unit: '', icon: 'cbt_120_120.png' }, has_right: 0 },
        { id: 120, need_num: 120, award: { id: 0, type: 'ring', nums: 1, name: '糖心魔咒', unit: '', icon: 'txmz_120_120.png', show_price: 6666, is_new: true }, has_right: 0 }
      ],
      my_present: 0,
      my_profile_image: '',
      my_send_present: 0,
      my_username: '--',
      consume_status: {
        1000: { awards: [{ icon: 'yb_120_120.png', name: '元宝', nums: 50000, text: '5万', tool_id: 'gamegold', type: 'property' }, { icon: 'fsjc_60_60.png', name: '精粹', nums: 100, text: '100', tool_id: 142, type: 'tool' }], condition: 1000, consume_nums: 0, has_right: 0, is_daily: false },
        2000: { awards: [{ icon: 'yb_120_120.png', name: '元宝', nums: 100000, text: '10万', tool_id: 'gamegold', type: 'property' }, { icon: 'fsjc_60_60.png', name: '精粹', nums: 100, text: '100', tool_id: 142, type: 'tool' }], condition: 2000, consume_nums: 0, has_right: 0, is_daily: false },
        3000: { awards: [{ icon: 'yb_120_120.png', name: '元宝', nums: 150000, text: '15万', tool_id: 'gamegold', type: 'property' }, { icon: 'fsjc_60_60.png', name: '精粹', nums: 100, text: '100', tool_id: 142, type: 'tool' }], condition: 3000, consume_nums: 0, has_right: 0, is_daily: false },
        5000: { awards: [{ icon: 'yb_120_120.png', name: '元宝', nums: 200000, text: '20万', tool_id: 'gamegold', type: 'property' }, { icon: 'fsjc_60_60.png', name: '精粹', nums: 200, text: '200', tool_id: 142, type: 'tool' }], condition: 5000, consume_nums: 0, has_right: 0, is_daily: false },
        10000: { awards: [{ icon: 'yb_120_120.png', name: '元宝', nums: 400000, text: '40万', tool_id: 'gamegold', type: 'property' }, { icon: 'fsjc_60_60.png', name: '精粹', nums: 500, text: '500', tool_id: 142, type: 'tool' }], condition: 10000, consume_nums: 0, has_right: 0, is_daily: false },
        20000: { awards: [{ icon: 'yb_120_120.png', name: '元宝', nums: 600000, text: '60万', tool_id: 'gamegold', type: 'property' }, { type: 'tool', name: '黄金藏宝图', id: 158, nums: 1, text: '1', icon: 'hjcbt_60_60.png' }, { icon: 'fsjc_60_60.png', name: '精粹', nums: 1000, text: '1000', tool_id: 142, type: 'tool' }], condition: 20000, consume_nums: 0, has_right: 0, is_daily: false },
        30000: { awards: [{ icon: 'yb_120_120.png', name: '元宝', nums: 850000, text: '85万', tool_id: 'gamegold', type: 'property' }, { icon: 'fsjc_60_60.png', name: '精粹', nums: 1000, text: '1000', tool_id: 142, type: 'tool' }], condition: 30000, consume_nums: 0, has_right: 0, is_daily: false },
        50000: { awards: [{ icon: 'yb_120_120.png', name: '元宝', nums: 1300000, text: '130万', tool_id: 'gamegold', type: 'property' }, { type: 'tool', name: '黄金藏宝图', id: 158, nums: 1, text: '1', icon: 'hjcbt_60_60.png' }, { icon: 'fsjc_60_60.png', name: '精粹', nums: 2000, text: '2000', tool_id: 142, type: 'tool' }], condition: 50000, consume_nums: 0, has_right: 0, is_daily: false },
        100000: { awards: [{ icon: 'yb_120_120.png', name: '元宝', nums: 2000000, text: '200万', tool_id: 'gamegold', type: 'property' }, { type: 'tool', name: '黄金藏宝图', id: 158, nums: 2, text: '2', icon: 'hjcbt_60_60.png' }, { icon: 'fsjc_60_60.png', name: '精粹', nums: 3000, text: '3000', tool_id: 142, type: 'tool' }], condition: 100000, consume_nums: 0, has_right: 0, is_daily: false }
      },
      present_top: [
        { uid: 0, code: 0, pretty_type: 0, profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: 0, awards: [{ id: 2, type: 'tool', nums: 3000, name: '绿晶石+3000', text: '+3000' }] },
        { uid: 0, code: 0, pretty_type: 0, profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: 0, awards: [{ id: 2, type: 'tool', nums: 2400, name: '绿晶石+2400', text: '+2400' }] },
        { uid: 0, code: 0, pretty_type: 0, profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: 0, awards: [{ id: 2, type: 'tool', nums: 1800, name: '绿晶石+1800', text: '+1800' }] },
        { uid: 0, code: 0, pretty_type: 0, profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: 0, awards: [{ id: 2, type: 'tool', nums: 900, name: '绿晶石+900', text: '+900' }] },
        { uid: 0, code: 0, pretty_type: 0, profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: 0, awards: [{ id: 2, type: 'tool', nums: 900, name: '绿晶石+900', text: '+900' }] },
        { uid: 0, code: 0, pretty_type: 0, profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: 0, awards: [{ id: 2, type: 'tool', nums: 300, name: '绿晶石+300', text: '+300' }] },
        { uid: 0, code: 0, pretty_type: 0, profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: 0, awards: [{ id: 2, type: 'tool', nums: 300, name: '绿晶石+300', text: '+300' }] },
        { uid: 0, code: 0, pretty_type: 0, profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: 0, awards: [{ id: 2, type: 'tool', nums: 300, name: '绿晶石+300', text: '+300' }] },
        { uid: 0, code: 0, pretty_type: 0, profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: 0, awards: [{ id: 2, type: 'tool', nums: 300, name: '绿晶石+300', text: '+300' }] },
        { uid: 0, code: 0, pretty_type: 0, profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: 0, awards: [{ id: 2, type: 'tool', nums: 300, name: '绿晶石+300', text: '+300' }] }
      ],
      send_present_top: [
        { uid: 0, code: 0, pretty_type: 0, profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: 0, awards: [{ id: 2, type: 'tool', nums: 3000, name: '绿晶石+3000', text: '+3000' }] },
        { uid: 0, code: 0, pretty_type: 0, profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: 0, awards: [{ id: 2, type: 'tool', nums: 2400, name: '绿晶石+2400', text: '+2400' }] },
        { uid: 0, code: 0, pretty_type: 0, profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: 0, awards: [{ id: 2, type: 'tool', nums: 1800, name: '绿晶石+1800', text: '+1800' }] },
        { uid: 0, code: 0, pretty_type: 0, profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: 0, awards: [{ id: 2, type: 'tool', nums: 900, name: '绿晶石+900', text: '+900' }] },
        { uid: 0, code: 0, pretty_type: 0, profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: 0, awards: [{ id: 2, type: 'tool', nums: 900, name: '绿晶石+900', text: '+900' }] },
        { uid: 0, code: 0, pretty_type: 0, profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: 0, awards: [{ id: 2, type: 'tool', nums: 300, name: '绿晶石+300', text: '+300' }] },
        { uid: 0, code: 0, pretty_type: 0, profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: 0, awards: [{ id: 2, type: 'tool', nums: 300, name: '绿晶石+300', text: '+300' }] },
        { uid: 0, code: 0, pretty_type: 0, profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: 0, awards: [{ id: 2, type: 'tool', nums: 300, name: '绿晶石+300', text: '+300' }] },
        { uid: 0, code: 0, pretty_type: 0, profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: 0, awards: [{ id: 2, type: 'tool', nums: 300, name: '绿晶石+300', text: '+300' }] },
        { uid: 0, code: 0, pretty_type: 0, profile_image: 'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png', username: '虚位以待', time: 0, awards: [{ id: 2, type: 'tool', nums: 300, name: '绿晶石+300', text: '+300' }] }
      ],
      uid: '0',
      transitionClass: '',
      tabsArray: Object.freeze([{ id: 1, tabName: '赠送榜', listKey: 'send_present_top', pointKey: 'my_send_present', text: '赠送' }, { id: 2, tabName: '获赠榜', listKey: 'present_top', pointKey: 'my_present', text: '获赠' }]),
      currentTab: { id: 1, tabName: '赠送榜', listKey: 'send_present_top', pointKey: 'my_send_present', text: '赠送' }
    }
  },
  computed: {
    consumeListShow() {
      const list = Object.values(this.consume_status)
      return list.reduce((acc, item) => {
        if (item.has_right < 2) {
          acc[0].push(item)
        } else {
          acc[1].push(item)
        }
        return acc
      }, [[], []]).flat()
    }
  },
  created() {
    this.getHomePage('created')
  },
  methods: {
    /**
     * 每日首次受赠领取
     */
    async receive1() {
      console.log('每日首次受赠领取')
      if (this.gift_day_first_st.has_right != 1) return
      const res = await getPageData({ type: 'woman_day_gift_rev' })
      if (res.errno) return this.$toast(res.errmsg)
      this.openReceivePopup(res)
      this.gift_day_first_st.has_right = 2
    },
    /**
     * 收礼任务领取
     */
    async receive2(item) {
      if (item.has_right != 1) return
      const res = await getPageData({ type: 'woman_tot_gift_rev', mark: item.id })
      if (res.errno) return this.$toast(res.errmsg)
      this.openReceivePopup(res)
      item.has_right = 2
    },
    /**
     * 切换tab
     */
    switchTab(tabItem) {
      this.currentTab = tabItem
      if (this.$refs.scrollBox && this.$refs.scrollBox.scrollTop > 0) this.$refs.scrollBox.scrollTo({ top: 0 })
    },
    /**
     * 累计消费领取
     */
    receive: _throttle(async function (item) {
      if (item.has_right != 1) return
      const res = await getPageData({ type: 'consume_reward', mark: item.condition })
      this.$toast(res.errmsg)
      if (res.errno) return
      item.has_right = 2
    }),
    /**
     * 打开恭喜获得弹框
     */
    openReceivePopup(res, isUpdate = false) {
      if (this.isShowReceivePopup) this.isShowReceivePopup = false
      this.$nextTick(() => {
        this.configReceivePopup = Object.freeze(this.getType(res.data) == 'Array' ? res.data : this.getType(res.data?.awards) == 'Array' ? res.data.awards : res.data?.award ? [res.data.award] : [])
        this.isShowReceivePopup = true
        if (isUpdate) this.$emit('update')
      })
    },
    /**
     * 获取类型
     * @returns {'Array' | 'Object' | 'String' | 'Number' | 'Boolean' | 'Function' | 'Null' | 'Undefined' } type 类型
     */
    getType(value) {
       return Object.prototype.toString.call(value).slice(8, -1)
    },
    /**
     * 获取首页数据
     */
    async getHomePage(type) {
      const res = await getPageData({ type: 'tab', mark: 'm3' })
      if (res.errno) return this.$toast(res.errmsg)
      this.consume_status = res.data.consume_status
      if (type == 'created') this.$nextTick(() => { this.transitionClass = 'hasTransition' })
      this.gift_day_first_st = res.data.gift_day_first_st
      this.my_present = res.data.my_present
      this.my_profile_image = res.data.my_profile_image
      this.my_send_present = res.data.my_send_present
      this.my_username = res.data.my_username
      this.present_top = res.data.present_top
      this.send_present_top = res.data.send_present_top
      this.tot_awards = res.data.tot_awards
      this.tot_rev_nums = res.data.tot_rev_nums
      this.uid = res.data.uid
    },
    imgAtError,
    toUserMain
  }
}
</script>

<style scoped lang="scss">
.presentGift {
  .presentGiftOutBox1 {
    .presentGiftOutBox1P1 {
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 500;
      font-size: 28px;
      color: #FFFFFF;
      img {
        height: 55px;
      }
    }
  }
  .presentGiftOutBox1Icon1 {
    position: relative;
    margin: 0 auto;
    width: 348px;
    height: 202px;
    background: url('@/pages/halloween/assets/mk3_02.png') no-repeat left top/100% 100%;
    .presentGiftOutBox1Btn {
      position: absolute;
      top: 152px;
      left: 26px;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      white-space: nowrap;
      font-size: 32px;
      font-weight: 500;
      width: 264px;
      height: 74px;
      // 渐变
      border: 2px solid transparent;
      border-radius: 99999px;
      -webkit-background-clip: padding-box, border-box;
      -webkit-background-origin: padding-box, border-box;
      transition: all 0.3s;
      &.status0{
        pointer-events: none;
        color: #FFFFFF;
        background-image: linear-gradient(0deg, #777BFF, #AFAFF2), -webkit-linear-gradient(#fff, #fff);
      }
      &.status1{
        pointer-events: auto;
        color: #FFFFFF;
        background-image: linear-gradient(0deg, #F38237, #F8DD90), -webkit-linear-gradient(#fff, #fff);
      }
      &.status2{
        pointer-events: none;
        color: #ffffff;
        background-image: linear-gradient(0deg, #8A8A8A, #D4D4D4), -webkit-linear-gradient(#fff, #fff);
      }
    }
  }
  .presentGiftOutBox1List1 {
    width: 660px;
    margin: 52px auto 0;
    .presentGiftOutBox1List1Item {
      position: relative;
      width: 664px;
      height: 156px;
      background: url('@/pages/halloween/assets/mk3_03.png') no-repeat left top/100% 100%;
      margin-bottom: 28px;
      .presentGiftOutBox1List1ItemIcon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 18px;
        width: 128px;
        height: 128px;
        padding: 4px;
        background-color: #BCC9FE;
        border-radius: 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        .presentGiftOutBox1List1ItemIconTop {
          // flex: 1;
          width: 100%;
          height: 100%;
          background-color: #6D67BF;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 0;
        }
        .presentGiftOutBox1List1ItemIconBottom {
          position: absolute;
          z-index: 2;
          bottom: 4px;
          left: 4px;
          right: 4px;
          // width: 100%;
          height: 32px;
          font-weight: 500;
          font-size: 24px;
          color: #FFFFFF;
          background: #42498D;
          border-radius: 0px 0px 12px 12px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .leftLabel {
          position: absolute;
          z-index: 1;
          top: -21px;
          left: -27px;
          width: 56px;
          height: 49px;
          background: url('@/pages/halloween/assets/mk1_23.png') no-repeat left top/100% 100%;
        }
        .rightLabel {
          position: absolute;
          z-index: 1;
          top: -9px;
          right: -10px;
          padding: 0 5px;
          width: fit-content;
          height: 30px;
          background: linear-gradient(-90deg, #DD7D32, #EFA144 50%);
          border-radius: 15px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 500;
          font-size: 20px;
          color: #FFFFFF;
          img {
            width: 24px;
            height: 18px;
          }
        }
        .typeLabel {
          position: absolute;
          z-index: 1;
          top: -9px;
          right: -10px;
          padding: 0 10px;
          width: fit-content;
          height: 30px;
          background: linear-gradient(-90deg, #DD7D32, #EFA144 50%);
          border-radius: 15px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 500;
          font-size: 20px;
          color: #FFFFFF;
        }
      }
      .presentGiftOutBox1List1ItemName {
        position: absolute;
        top: 28px;
        left: 162px;
        display: flex;
        align-items: center;
        font-weight: 500;
        font-size: 26px;
        color: #FFFFFF;
        img {
          height: 55px;
        }
      }
      .presentGiftOutBox1List1ItemNum {
        position: absolute;
        top: 96px;
        left: 167px;
        font-weight: 500;
        font-size: 24px;
        color: #FFE25E;
        line-height: 1;
        text-indent: -0.5em;
      }
      .presentGiftOutBox1List1ItemBtn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 20px;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        line-height: 1;
        white-space: nowrap;
        font-size: 28px;
        font-weight: 500;
        width: 124px;
        height: 64px;
        // 渐变
        border: 2px solid transparent;
        border-radius: 99999px;
        -webkit-background-clip: padding-box, border-box;
        -webkit-background-origin: padding-box, border-box;
        &.status0{
          pointer-events: none;
          color: #FFFFFF;
          background-image: linear-gradient(0deg, #777BFF, #AFAFF2), -webkit-linear-gradient(#fff, #fff);
        }
        &.status1{
          pointer-events: auto;
          color: #FFFFFF;
          background-image: linear-gradient(0deg, #F38237, #F8DD90), -webkit-linear-gradient(#fff, #fff);
        }
        &.status2{
          pointer-events: none;
          color: #ffffff;
          background-image: linear-gradient(0deg, #8A8A8A, #D4D4D4), -webkit-linear-gradient(#fff, #fff);
        }
      }
    }
  }
  .presentGiftOutBox1RulesText {
    li {
      img {
        height: 55px;
      }
    }
  }
  .consumeListBox {
    padding-top: 172px;
    .consumeList {
      .consumeItemDiv {
        position: relative;
        margin: 0 auto 21px;
        color: #ffffff;
        width: 664px;
        height: 136px;
        background: linear-gradient(-90deg, #6662AF, #827ECB);
        border-radius: 14px;
        border: 2px solid #564F9B;
        display: flex;
        justify-content: space-between;
        .taskDetail {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          color: #fff;
          padding: 23px 0 18px 17px;
          .consumeItemP1 {
            font-size: 30px;
            line-height: 1;
            .consumeItemP1DeepSpan {
              color: #FFE25E;
              font-size: 24px;
            }
          }
          .awards {
            display: flex;
            align-items: center;
            width: fit-content;
            line-height: 1;
            .awardItemBox {
              display: flex;
              align-items: center;
              height: 37px;
              background: linear-gradient(90deg, rgba(66,73,141,0), rgba(66,73,141,0.76));
              border-radius: 10px;
              margin-right: 20px;
              font-weight: 500;
              font-size: 24px;
              color: #FFE25E;
              padding-right: 8px;
              &:last-child {
                margin-right: 0;
              }
              .awardItemText {
                flex-shrink: 0;
              }
              .awardItemIcon {
                margin: 0 5px 0 -3px;
                width: 50px;
                height: 50px;
                flex-shrink: 0;
              }
              awardItemAddIcon {
                width: 30px;
                height: auto;
              }
              .awardItemAddText {
                color: #fff;
              }
            }
          }
        }
        .button {
          position: absolute;
          right: 30px;
          top: 46px;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
          white-space: nowrap;
          font-size: 28px;
          font-weight: normal;
          width: 124px;
          height: 64px;
          -webkit-background-clip: padding-box, border-box;
          -webkit-background-origin: padding-box, border-box;
          border-radius: 99999px;
          border: 2px solid transparent;
          &.status0 {
            color: #FFFFFF;
            background-image: linear-gradient(0deg, #777BFF, #AFAFF2), -webkit-linear-gradient(#fff, #fff);
          }
          &.status1 {
            color: #FFFFFF;
            background-image: linear-gradient(0deg, #F38237, #F8DD90), -webkit-linear-gradient(#fff, #fff);
          }
          &.status2 {
            pointer-events: none;
            color: #ffffff;
            background-image: linear-gradient(0deg, #8A8A8A, #D4D4D4), -webkit-linear-gradient(#fff, #fff);
          }
        }
      }
    }
  }
  .rankBox {
    padding-top: 160px;
    .tabs {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 45px;
      width: 574px;
      height: 87px;
      background: no-repeat left top/100% 100%;
      &.status1 {
        background-image: url('@/pages/halloween/assets/mk3_05.png');
      }
      &.status2 {
        background-image: url('@/pages/halloween/assets/mk3_05_1.png');
      }
      .tab {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 50%;
        height: 100%;
        // background-color: #fff;
        // border: 1px solid #564F9B;
      }
    }
    .myPoints {
      line-height: 1;
      min-width: 460px;
      width: fit-content;
      height: 48px;
      margin: 0 auto 18px;
      font-size: 28px;
      color: #ffffff;
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #6D69B6;
      border-radius: 24px;
    }
    .rank {
      .rankHead {
        position: relative;
        width: 664px;
        height: 72px;
        margin: 0 auto;
        background: linear-gradient(-90deg, #6662AF, #827ECB);
        border-radius: 14px 14px 0 0;
        border-top: 2px solid #564F9B;
        border-right: 2px solid #564F9B;
        border-left: 2px solid #564F9B;
        .rankHeadDiv {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          line-height: 1;
          font-size: 26px;
          color: #FFE25E;
          &:nth-child(1) {
            left: 17px;
          }
          &:nth-child(2) {
            left: 140px;
          }
          &:nth-child(3) {
            left: 295px;
          }
          &:nth-child(4) {
            left: 519px;
          }
        }
      }
      .rankList {
        width: 664px;
        height: 402px;
        margin: 0 auto 33px;
        background: linear-gradient(-90deg, #6662AF, #827ECB);
        border-radius: 0 0 14px 14px;
        border-bottom: 2px solid #564F9B;
        border-right: 2px solid #564F9B;
        border-left: 2px solid #564F9B;
        .scrollBox {
          width: 100%;
          height: 373px;
          overflow-x: hidden;
          overflow-y: scroll;
          .rankItem {
            display: flex;
            align-items: center;
            height: 80px;
            &.rankItem2 {
              height: fit-content;
              padding: 5px 0;
            }
            color: #fff;
            &:nth-child(odd) {
              background: rgba(188,201,254,0.5);
            }
            .rankNum {
              display: flex;
              align-items: center;
              width: 44px;
              font-size: 24px;
              color: #FFE25E;
              margin-left: 11px;
            }
            &:nth-child(1) {
              .rankNum {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 33px;
                color: #FFFAA6;
                background: url('@/pages/halloween/assets/namb_1.png') no-repeat center top/auto 100%;
              }
            }
            &:nth-child(2) {
              .rankNum {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 33px;
                color: #FFFAA6;
                background: url('@/pages/halloween/assets/namb_2.png') no-repeat center top/auto 100%;
              }
            }
            &:nth-child(3) {
              .rankNum {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 33px;
                color: #FFFAA6;
                background: url('@/pages/halloween/assets/namb_3.png') no-repeat center top/auto 100%;
              }
            }
            .rankUser {
              display: flex;
              align-items: center;
              margin-left: 13px;
              width: 142px + 11px + 36px;
              .rankUserAvatar {
                border-radius: 50%;
                object-fit: cover;
                width: 36px;
                margin-right: 10px;
              }
              .rankUsername {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: 24px;
                max-width: 142px;
              }
            }
            .rankPrice {
              width: 139px;
              margin-left: 8px;
              font-size: 24px;
              text-align: center;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .rankAwards {
              display: flex;
              flex-direction: column;
              justify-content: center;
              margin-left: 62px;
              .rankAwardItem {
                display: flex;
                align-items: center;
                .rankAwardItemIcon {
                  object-fit: cover;
                  width: 45px;
                  height: 40px;
                }
                .rankAwardItemNum {
                  font-size: 22px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
