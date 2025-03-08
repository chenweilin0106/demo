<template>
  <OutBox class="skillGift" title="mk1_title_9.png">
    <img :src="IconPath(statusIconMap[0])" class="openStatus position-absolute" />
    <div class="openDate position-absolute text-center flex align-center justify-center">11.15-11.17<br>开启</div>
    <p class="line-height-100">使用技能可获得技能积分</p>
    <img :src="IconPath('mk4_6.png')" class="rules block" />
    <div class="numBox flex align-center justify-center line-height-100">我的技能积分：{{ skill_gifts }}</div>
    <PublicCard v-for="(gift, key) in hot_gift" :key="gift.index" class="exchangeItem flex align-center">
      <div class="icon-content">
        <div class="icon flex align-center justify-center"><img :src="IconPath(gift.goods_icon)" alt="" /></div>
        <div class="text">+{{ gift.goods_num }}</div>
      </div>
      <div class="text-box flex-column">
        <p class="line-height-100">消耗<span>{{ gift.spend }}技能积分</span>兑换</p>
        <img :src="IconPath('mk4_7.png')" class="update" />
      </div>
      <PublicButton hasRight="1" class="exchangeBtn" @click="exchangeSkillGift(key)">兑换</PublicButton>
    </PublicCard>
  </OutBox>
</template>

<script>
import { getPageData } from '@/api'
import { _throttle } from '@/utils/tool'
export default {
  name: 'skillGift',
  props: ['skill_gifts', 'hot_gift'],
  data() {
    return {
      statusIconMap: Object.freeze(['mk4_4.png', 'mk4_3.png', 'mk4_5.png'])
    }
  },
  components: {},
  methods: {
    // 兑换技能礼包
    exchangeSkillGift: _throttle(async function (mark) {
      const res = await getPageData({ mark, type: 'hot_gift' })
      this.$toast(res.errmsg)
      if (res.errno == 0) this.$emit('update', res.hots)
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.skillGift {
  .openStatus {
    top: -59px;
    left: 150px;
    width: 120px;
    height: 99px;
  }
  .openDate {
    top: -20px;
    right: 11px;
    width: 215px;
    height: 107px;
    background: url('@/pages/celebration/assets/mk2_8.png') no-repeat left top/100% 100%;
    font-weight: 800;
    font-size: 24px;
    color: #F552AE;
    line-height: 24px;
  }
  >p {
    padding-left: 221px;
    margin-bottom: 24px;
    font-weight: 500;
    font-size: 28px;
    color: #6E56E7;
  }
  .rules {
    margin-left: 40px;
    width: 671px;
    height: 204px;
  }
  .numBox {
    margin: 32px 0 0 213px;
    min-width: 320px;
    width: fit-content;
    height: 48px;
    background: #877FF1;
    border-radius: 24px;
    padding: 0 10px;
    font-size: 28px;
    color: #FFFFFF;
  }
  .exchangeItem {
    width: 664px;
    height: 136px;
    margin: 20px 0 0 42px;
    padding: 0 22px 0 28px;
    .icon-content {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 108px;
      height: 108px;
      padding: 4px;
      margin: 0 26px 0 0; /*todo 道具左边距*/
      border-radius: 16px;
      background-color: #DBC1FF; /*todo 任务列表中道具边框颜色*/
      .icon {
        width: 100%;
        height: 68px;
        border-radius: 12px 12px 0 0;
        background-color: #FFFFFF; /*todo 任务列表中道具图标背景颜色*/
        // 图片大小
        > img {
          width: 68px; /*todo 道具宽度*/
          height: auto;
        }
      }
      .text {
        flex: 1;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 0 0 12px 12px;
        font-size: 24px;
        white-space: nowrap;
        line-height: 100%;
        background-color: #7954E4; /*todo 背景色*/
        color: #fff; /*todo 字体颜色*/
      }
    }
    .text-box {
      //margin-top: 32px;
      width: fit-content;
      font-size: 30px;
      color: #ffffff;
      span {
        color: #fffaa6;
      }
      .update {
        margin-top: 11px;
        width: 128px;
        height: 41px;
      }
    }
    .exchangeBtn {
      margin-left: auto;
      width: 124px;
      height: 64px;
    }
  }
}
</style>
