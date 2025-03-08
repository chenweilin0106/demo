<template>
  <div class="wuLin">
    <OutBox class="skillsBox">
      <div class="skillItem" v-for="(item) in skillsList" :key="item.id">
        <div class="skillIcon">
          <PublicImg :imgName="item.icon"></PublicImg>
        </div>
        <div class="skillName">{{item.name}}</div>
        <div class="skillText">{{item.text}}</div>
      </div>
      <div class="rules-text">
        <ul>
          <li><span></span>活动期间内使用指定技能可获得1~20积分</li>
        </ul>
      </div>
    </OutBox>
    <OutBox class="giftsBox" :title="'title_7.png'">
      <div class="topTip">我的积分:&ensp;{{skill_gifts}}</div>
      <div class="giftItem" v-for="(item,index) in hot_gift" :key="index">
        <div class="giftIcon">
          <div class="iconImg">
            <PublicImg :imgName="item.goods_icon"></PublicImg>
          </div>
          <div class="giftNumsDesc">+{{item.goods_num}}</div>
        </div>
        <div class="giftTextDesc">消耗<i>{{item.spend}}积分</i>兑换</div>
        <div class="exchangeBtn" @click="exchangeBtnCk(item, index)">兑换</div>
      </div>
    </OutBox>
  </div>
</template>

<script>
import { getPageData } from '@/api/index'

export default {
  name: 'wuLin',
  components: {},
  data() {
    return {
      skillsList: [
        { id: 1, icon: 'mk6_1.png', name: '佛山无影脚', text: '每使用一次+20积分' },
        { id: 2, icon: 'mk6_2.png', name: '唇齿相依', text: '每使用一次+15积分' },
        { id: 3, icon: 'mk6_3.png', name: '妙手空空', text: '每使用一次+1积分' },
        { id: 4, icon: 'mk6_4.png', name: '一阳指', text: '每使用一次+15积分' },
        { id: 5, icon: 'mk6_5.png', name: '斗转星移', text: '每使用一次+10积分' }
      ], // 技能列表
      skill_gifts: 0, // 我的积分
      hot_gift: {
        hot_100: { goods_name: '绿晶石', goods_id: 2, goods_num: 100, spend: 100, goods_icon: 'ljs_60_60.png', index: 1, has_right: 1 },
        hot_450: { goods_name: '绿晶石', goods_id: 2, goods_num: 500, spend: 450, goods_icon: 'ljs_60_60.png', index: 2, has_right: 1 },
        hot_900: { goods_name: '绿晶石', goods_id: 2, goods_num: 1000, spend: 900, goods_icon: 'ljs_60_60.png', index: 3, has_right: 1 }
      } // 可兑换列表
    }
  },
  created() {
    this.getPageData()
  },
  methods: {
    /**
     * 获取页面信息
     */
    getPageData() {
      getPageData({ type: 'tab', mark: 'm6' }).then((res) => {
        if (res.errno == 0) {
          console.log(res)
          this.hot_gift = res.data.hot_gift
          this.skill_gifts = res.data.skill_gifts
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    /**
     * 兑换
     */
    exchangeBtnCk(item, index) {
      console.log(item)
      getPageData({ type: 'hot_gift', mark: index }).then((res) => {
        if (res.errno == 0) {
          console.log(res)
          this.getPageData()
          this.$toast(res.errmsg)
        } else {
          this.$toast(res.errmsg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.wuLin {
  .skillsBox{
    padding: 40px 0 20px 0;
    .skillItem{
      width: 660px;
      height: 132px;
      background: linear-gradient(90deg, #EE7A27, #FFCC52);
      border-radius: 20px;
      border: 3px solid #FFA245;
      margin: 0 auto 10px auto;
      position: relative;
      .skillIcon{
        width: 96px;
        height: 96px;
        position: absolute;
        left: 40px;
        top: 50%;
        transform: translateY(-50%);
      }
      .skillName{
        font-size: 32px;
        color: #fff;
        position: absolute;
        left: 160px;
        top: 30px;
      }
      .skillText{
        font-size: 24px;
        color: #FFFAA6;
        position: absolute;
        left: 160px;
        bottom: 20px;
      }
    }
  }
  .giftsBox{
    // margin: 140px auto 0 auto;
    padding: 60px 0 20px 0;
    .topTip{
      // display: inline-block;
      margin: 0 auto 20px auto;
      text-align: center;
      width: fit-content;
      padding: 5px 50px;
      background: #B55023;
      border-radius: 24px;
    }
    .giftItem{
      width: 660px;
      height: 132px;
      background: linear-gradient(90deg, #EE7A27, #FFCC52);
      border-radius: 12px;
      border: 3px solid #FFA245;
      margin: 0 auto 10px auto;
      position: relative;
      .giftIcon{
        width: 100px;
        height: 100px;
        background: #fff;
        border-radius: 12px;
        border: 2px solid #D25E2A;
        position: absolute;
        left: 40px;
        top: 50%;
        transform: translateY(-50%);
        .iconImg{
          width: 80px;
          height: 80px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: -5px;
        }
        .giftNumsDesc{
          width: 96px;
          height: 30px;
          background: #B55023;
          border-radius: 0px 0px 12px 12px;
          position: absolute;
          bottom: 0;
          text-align: center;
          font-size: 24px;
          color: #FFFFFF;
          line-height: 34px;
        }
      }
      .giftTextDesc{
        font-size: 30px;
        color: #fff;
        position: absolute;
        left: 160px;
        top: 40px;
        i{
          color: #FFFAA6;
        }
      }
      .exchangeBtn{
        width: 120px;
        height: 60px;
        background: linear-gradient(0deg, #CAE7FF, #FFFFFF);
        border-radius: 30px;
        border: 3px solid #FFFFFF;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        right: 40px;
        bottom: 30px;
        font-size: 28px;
        font-weight: 400;
        color: #4D7DDD;
      }
    }
  }
}
</style>
