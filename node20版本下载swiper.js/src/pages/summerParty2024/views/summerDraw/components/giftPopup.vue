<template>
  <div class="compo">
    <PopupBox :title="config.id==1?'title_12.png':config.id==2?'title_13.png':config.id==3?'title_14.png':null" :size="'small'" @clickClose="clickClose">
      <div class="rewardsListDiv">
        <div :class="['rewardItem', item.type == 'title' ? 'title' : 'other']" v-for="(item, index) in config.awards" :key="index">
          <div :class="['itemIcon']">
            <div class="iconBg">
              <PublicImg :imgName="item.icon" :imgType="item.type"></PublicImg>
              <div class="markIcon" v-if="item.type=='hammer'">赠</div>
            </div>
          </div>
          <div class="name">{{ item.text }}</div>
        </div>
      </div>
      <div class="btn" @click="btnCk"><img :src="IconPath('zs_39_30.png')"/><i>{{config.price}}</i>购买</div>
      <div class="tip2">每日限购1次</div>
    </PopupBox>
  </div>
</template>

<script>
import { getPageData } from '@/pages/summerParty2024/api'
import { diamondRechargePart } from '@/pages/summerParty2024/utils/toApp'
export default {
  name: 'giftPopup',
  props: ['config'],
  components: {},
  data() {
    return {

    }
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    /**
     * 关闭弹窗(必需)
     */
    clickClose() {
      this.$emit('clickClose')
    },
    btnCk() {
      console.log(this.config)
      getPageData({ type: 'summer_buy_gift', mark: this.config.id }).then((res) => {
        if (res.errno == 0) {
          // console.log(res)
          this.$emit('openReceiveAwardsPopup', res.data)
        } else if (res.errno == -3) {
          // this.$toast(res.errmsg)
          console.log('跳转充值半屏')
          diamondRechargePart(this.config.price)
        } else {
          this.$toast(res.errmsg)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.compo{
  .rewardsListDiv {
    width: 100%;
    margin: 0px auto 0 auto;
    min-height: 200px;
    max-height: 600px;
    overflow: hidden scroll;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: row wrap;
    .rewardItem {
      height: 180px;
      padding: 15px 0 0 0;
      position: relative;
      display: flex;
      justify-content: center;
      &.title {
        width: 240px;
        .itemIcon {
          width: 218px;
          height: 128px;
        }
      }
      &.other {
        width: 160px;
        .itemIcon {
          width: 128px;
          height: 128px;
        }
      }
      .itemIcon{
        background:  #FBE590;
        border-radius: 12px;
        padding: 4px;
        .iconBg{
          width: 100%;
          height: 100%;
          background: #fefaef;
          border-radius: 12px;
          position: relative;
        }
      }
      .name {
        color: #fff;
        white-space: nowrap;
        height: 25px;
        font-size: 26px;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        bottom: 0px;
      }
      .markIcon{
        background: #FF6541;
        border-radius: 12px 0px 12px 0px;
        padding: 5px 10px;
        font-size: 22px;
        color: #FFFFFF;
        text-align: center;
        position: absolute;
        left: 0px;
        top: 0px;
      }
    }
  }
}
.btn {
  width: 320px;
  height: 72px;
  background: linear-gradient(0deg, #FFF9D1, #FFFFFF);
  border-radius: 36px;
  border: 2px solid #FFFFFF;
  margin: 20px auto 20px auto;
  font-size: 32px;
  color: #A9792C;
  line-height: 70px;
  text-align: center;
  img{
    width: 39px;
    height: 30px;
  }
  i{
    color: #BC57FF;
  }
}
.tip2{
  font-weight: 400;
  font-size: 26px;
  color: #FFEE7A;
  text-align: center;
}
</style>
