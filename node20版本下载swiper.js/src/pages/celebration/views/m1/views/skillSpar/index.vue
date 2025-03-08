<template>
  <div class="skillSpar">
    <OutBox class="tipBox">
      <p class="text-center">活动期间收到钻石礼物，<br>可获得双倍经验值和双倍基础魅力值，<br>魅力值上限提高<i>100%</i><img :src="IconPath('mk4_2.png')" /></p>
    </OutBox>
    <SparParty v-if="currentOpen == 2" v-bind="sparPartyData" @update="updateSparParty" />
    <SkillGift v-bind="skillGiftData" @update="updateSkillGifts" />
    <SparParty v-if="currentOpen == 1" v-bind="sparPartyData" @update="updateSparParty" />
  </div>
</template>

<script>
import SkillGift from './components/skillGift/index.vue'
import SparParty from './components/sparParty/index.vue'
export default {
  name: 'skillSpar',
  components: { SkillGift, SparParty },
  data() {
    return {
      currentOpen: 1,
      spend_list: [
        { id: 2, name: '绿晶石', icon_s: 'ljs_60_60.png', current: 0, target: 100 },
        { id: 1, name: '紫晶石', icon_s: 'zjs_60_60.png', current: 0, target: 25 }
      ], // 消费列表
      point_accumulated: 0, // 累计获得积分
      spar_point: 0, // 可用积分
      exchange_list: [
        { id: 2, name: '绿晶石', price: 10, current: 0, max: 50, icon: 'ljs_120_120.png', nums: 100 },
        { id: 1, name: '紫晶石', price: 10, current: 0, max: 50, icon: 'zjs_120_120.png', nums: 10 }
      ], // 兑换列表
      skill_gifts: '0',
      hot_gift: {
        hot_100: { goods_icon: 'ljs_60_60.png', goods_id: 2, goods_name: '绿晶石', goods_num: 100, has_right: 1, index: 1, spend: 100 },
        hot_450: { goods_icon: 'ljs_60_60.png', goods_id: 2, goods_name: '绿晶石', goods_num: 500, has_right: 1, index: 2, spend: 450 },
        hot_900: { goods_icon: 'ljs_60_60.png', goods_id: 2, goods_name: '绿晶石', goods_num: 1000, has_right: 1, index: 3, spend: 900 }
      }
    }
  },
  computed: {
    sparPartyData() {
      return { spend_list: this.spend_list, point_accumulated: this.point_accumulated, spar_point: this.spar_point, exchange_list: this.exchange_list }
    },
    skillGiftData() {
      return { skill_gifts: this.skill_gifts, hot_gift: this.hot_gift }
    }
  },
  methods: {
    updateSparParty(param) {
      Object.assign(this, param)
    },
    updateSkillGifts(skill_gifts) {
      this.hot_gift = skill_gifts
    }
  }
}
</script>

<style lang="scss" scoped>
.skillSpar {
  .tipBox {
    margin-top: -24px;
    padding-top: 121px - 6;
    width: 742px;
    height: 378px;
    border-image-source: none !important;
    background: url('@/pages/celebration/assets/mk4_1.png') no-repeat left top/100% 100%;
    >p {
      font-size: 28px;
      color: #6E56E7;
      line-height: 40px;
      >i {
        color: #F552AE;
      }
      >img {
        width: 33px;
        height: auto;
      }
    }
  }
}
</style>
