<template>
  <div class="component">
    <van-popup
      v-model="isShowPo"
      :close-on-click-overlay="false"
      @click-overlay="clickClose"
    >
      <PopupBox class="popup-content" title="title_11.png" balloon="true">
        <div class="main">
          <div class="myCoupons">剩余礼券<img :src="IconPath('mk5_11.png')" />：{{myCouponsNum}}</div>
          <div class="rewardsListDiv">
            <div class="rewardItem" v-for="(item, index) in chList" :key="index">
              <PublicJson :jsonName="item.icon"></PublicJson>
              <div class="name">永久称号</div>
              <div :class="['status', item.has_right == 2?'dis':item.isChosed?'chosed':'noChosed']" @click="chChoose(item)"></div>
            </div>
          </div>
          <div class="myCoupons">共消耗<img :src="IconPath('mk5_11.png')" />：{{needCouponsNum}}</div>
          <div class="btn" @click="confirmBtnCk"></div>
        </div>
      </PopupBox>
    </van-popup>
  </div>
</template>

<script>
import PublicJson from '@/pages/gardenParty/components/PublicJson.vue'
import { getPageData } from '@/pages/gardenParty/api/index.js'

export default {
  name: 'exchangeChPopup',
  props: ['myCouponsNum', 'chList'],
  components: {
    PublicJson
  },
  data() {
    return {
      isShowPo: true,
      chosenCh: {}, // 所选称号
      needCouponsNum: 0 // 所需礼券
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    /**
     * 关闭弹窗
     */
    clickClose() {
      this.$emit('clickClose')
    },
    /**
     * 选择称号
     */
    chChoose(item) {
      if (item.has_right == 2) {
        this.$toast('已拥有此称号')
      } else {
        if (item.isChosed) {
          delete this.chosenCh[item.id]
          item.isChosed = false
          this.needCouponsNum -= 100
        } else {
          this.$set(this.chosenCh, item.id, item)
          item.isChosed = true
          this.needCouponsNum += 100
        }
      }
    },
    /**
     * 兑换
     */
    confirmBtnCk() {
      if (this.myCouponsNum >= this.needCouponsNum) {
        // obj转array
        let idsList = []
        Object.keys(this.chosenCh).map((key) => this.chosenCh[key]).forEach(e => {
          idsList.push(e.goods_id)
        })
        // let msg = Object.keys(this.chosenCh).map((key) => this.chosenCh[key])
        console.log(idsList)
        if (idsList.length > 0) {
          getPageData({ type: 'title_return_exchange', mark: JSON.stringify({ ids: idsList }) }).then((res) => {
            if (res.errno == 0) {
              this.$toast(res.errmsg)
              this.$emit('getPageData')
              this.clickClose()
            } else {
              this.$toast(res.errmsg)
            }
          })
        }
      } else {
        this.$toast('礼券不足')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.component{
  .van-popup {
    width: 100%;
    height: 100%;
    background-color: transparent;
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .popup-content {
    position: fixed;
    padding: 5px;
    pointer-events: auto;
    .main {
      width: 100%;
      // height: 600px;
      color: #fff;
      padding: 80px 20px 60px 20px;
      .myCoupons {
        width: 320px;
        height: 60px;
        margin: 0px auto 0 auto;
        color: #fff;
        font-size: 28px;
        text-align: center;
        line-height: 60px;
        white-space: nowrap;
        img {
          width: 40px;
          height: 33px;
          margin: 0 5px;
        }
      }
      .rewardsListDiv {
        width: 450px;
        margin: 0 auto;
        min-height: 300px;
        max-height: 500px;
        overflow-y: scroll;
        overflow-x: hidden;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-flow: row wrap;
        .rewardItem {
          width: 180px;
          height: 120px;
          background: #FFFFFF;
          border-radius: 12px;
          border: 4px solid #FFD0E7;
          position: relative;
          margin-bottom: 50px;
          .name {
            white-space: nowrap;
            height: 25px;
            font-size: 26px;
            position: absolute;
            left: 50%;
            transform: translate(-50%);
            top: 120px;
          }
          .status{
            width: 57px;
            height: 55px;
            position: absolute;
            right: -20px;
            bottom: -14px;
            &.dis{
              background-image: url('@/pages/gardenParty/assets/tk_15.png');
              background-size: 100% 100%;
            }
            &.chosed{
              background-image: url('@/pages/gardenParty/assets/tk_13.png');
              background-size: 100% 100%;
            }
            &.noChosed{
              background-image: url('@/pages/gardenParty/assets/tk_14.png');
              background-size: 100% 100%;
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
        margin: 10px auto 0px auto;
        font-size: 32px;
        color: #A9792C;
        line-height: 70px;
        text-align: center;
        &::after {
          content: '兑换';
        }
      }
    }
  }
}
</style>
