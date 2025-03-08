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
          <li><span></span>活动期间内使用指定技能可获得10~20积分</li>
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
import { getPageData } from '../../api/index'

export default {
  name: 'wuLin',
  components: {},
  data() {
    return {
      skillsList: [
        { id: 1, icon: 'mk5_1.png', name: '佛山无影脚', text: '每使用一次+20积分' },
        { id: 2, icon: 'mk5_2.png', name: '唇齿相依', text: '每使用一次+15积分' },
        { id: 3, icon: 'mk5_3.png', name: '画地为牢', text: '每使用一次+20积分' },
        { id: 4, icon: 'mk5_4.png', name: '一阳指', text: '每使用一次+15积分' },
        { id: 5, icon: 'mk5_5.png', name: '斗转星移', text: '每使用一次+10积分' }
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
      getPageData({ type: 'tab', mark: 'm5' }).then((res) => {
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

<style>
i{
  color: #FF5FAB;
}
</style>
<style lang="scss" scoped>
.wuLin {
  .skillsBox{
    padding: 20px 0 20px 0;
    .skillItem{
      width: 670px;
      height: 148px;
      background: url('@/pages/childrenDay/assets/mk5_6.png') no-repeat left top/100% 100%;
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
        color: #4786E6;
        position: absolute;
        left: 160px;
        top: 40px;
      }
      .skillText{
        font-size: 24px;
        color: #FF5FAB;
        position: absolute;
        left: 160px;
        bottom: 30px;
      }
    }
  }
  .giftsBox{
    margin: 140px auto 0 auto;
    padding: 60px 0 20px 0;
    .topTip{
      // display: inline-block;
      margin: 0 auto 20px auto;
      text-align: center;
      width: fit-content;
      padding: 5px 40px;
      background: #5F96EA;
      border-radius: 24px;
    }
    .giftItem{
      width: 670px;
      height: 148px;
      background: url('@/pages/childrenDay/assets/mk5_6.png') no-repeat left top/100% 100%;
      margin: 0 auto 10px auto;
      position: relative;
      .giftIcon{
        width: 100px;
        height: 100px;
        background: #D9F7FF;
        border-radius: 12px;
        border: 2px solid #7FB0F1;
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
          background: #5F96EA;
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
        font-size: 32px;
        color: #4786E6;
        position: absolute;
        left: 160px;
        top: 40px;
      }
      .exchangeBtn{
        width: 124px;
        height: 64px;
        background: url('@/pages/childrenDay/assets/btn_3.png') no-repeat left top/100% 100%;
        position: absolute;
        right: 40px;
        bottom: 30px;
        font-size: 28px;
        color: #FFFFFF;
        text-align: center;
        line-height: 66px;
        text-shadow: 1px 0 #2D77C3,-1px 0 #2D77C3,0 1px #2D77C3,0 -1px #2D77C3,1px 1px #2D77C3,-1px -1px #2D77C3,1px -1px #2D77C3,-1px 1px #2D77C3;
      }
    }
  }
}
</style>
