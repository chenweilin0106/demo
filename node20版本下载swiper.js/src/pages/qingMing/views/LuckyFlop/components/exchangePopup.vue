<template>
  <van-popup v-model="isShowPo" :close-on-click-overlay="false" @click-overlay="clickClose">
    <div class="popup-content">
      <img class="title-image" v-if="typePo === 1" :src="IconPath('title_13.png')" />
      <img class="title-image" v-else-if="typePo === 2" :src="IconPath('title_12.png')" />
      <img class="title-image" v-else-if="typePo === 3" :src="IconPath('title_14.png')" />
      <!-- 兑换奖励 -->
      <div :class="['main', `type${typePo}`]" v-if="typePo === 1">
        <div class="ownedNumText" v-if="config.is_all">剩余全套卡牌：{{ config.ownedNum }}套</div>
        <div class="ownedNumText" v-else>剩余{{ config.cardName }}卡牌：{{ config.ownedNum }}张</div>
        <div :class="['rewardIconDiv', config.rewardType == 'title' ? 'special' : 'other']">
          <PublicSvga
            v-if="config.rewardType == 'mic'"
            class="svgaIcon"
            :svgaName="config.rewardIcon"
            :userAvatar="$store.state.user_icon"
          ></PublicSvga>
          <img v-else :src="IconPath(config.rewardIcon)" />
        </div>
        <!-- <div class="rewardDescDiv">{{ config.rewardDesc }}</div> -->
        <div class="rewardDescDiv">
          {{ config.rewardType == 'mic' ? '头饰' : config.rewardType == 'car' ? '座驾' : null }}{{ config.rewardDesc
          }}<span v-if="config.rewardType == 'mic' || config.rewardType == 'car'">天</span>
        </div>
        <div class="computeDiv">
          <div class="min" @click="minCk">最小</div>
          <div class="minus" @click="minusCk">
            <img :src="IconPath('pop_1.png')" />
          </div>
          <div class="exchangeNumDiv">{{ exchangeNum }}</div>
          <div class="plus" @click="plusCk">
            <img :src="IconPath('pop_2.png')" />
          </div>
          <div class="max" @click="maxCk">最大</div>
        </div>
        <div class="partingLine"></div>
        <div class="needNumDiv" v-if="config.is_all">共消耗全套卡牌：{{ Number(config.needNum) * exchangeNum }}套</div>
        <div class="needNumDiv" v-else>共消耗{{ config.cardName }}卡牌：{{ Number(config.needNum) * exchangeNum }}张</div>
        <div class="exchangeBtn" @click="exchangeBtnCk">兑换</div>
      </div>
      <!-- 恭喜获得 -->
      <div :class="['main', `type${typePo}`]" v-if="typePo === 2">
        <div class="rewardsListDiv">
          <div :class="['rewardItem', item.type == 'title' ? 'special' : 'other']" v-for="(item, index) in awardsList" :key="index">
            <div class="itemIcon">
              <img v-if="item.type != 'mic'" :src="IconPath(item.icon)" />
              <PublicSvga v-else class="svgaIcon" :svgaName="item.icon" :userAvatar="$store.state.user_icon"></PublicSvga>
            </div>
            <div class="name">
              {{ item.type == 'mic' ? '头饰' : item.type == 'car' ? '座驾' : item.name }}<span v-if="item.nums">+{{ item.nums }}</span
              ><span v-if="item.type == 'mic' || item.type == 'car'">天</span>
            </div>
          </div>
        </div>
        <div
          :class="['btn', awardsList[0].type == 'mic' ? 'mic' : awardsList[0].type == 'car' ? 'car' : 'other']"
          @click="type2BtnCk(awardsList[0].type == 'mic' || awardsList[0].type == 'car' ? awardsList[0].type : 'other', awardsList[0].id)"
        ></div>
      </div>
      <!-- 背包已满 -->
      <div :class="['main', `type${typePo}`]" v-if="typePo === 3">
        <div class="tip1">符石背包已达上限</div>
        <div class="packageImg"></div>
        <div class="tip2" v-if="tipsType == 1">你的符石背包已满，请先分解符石</div>
        <div class="tip2" v-else-if="tipsType == 2">你的符石背包已满，请将任意技能升至50级，开启符石寻宝分解符石。</div>
        <div class="cancel" @click="clickClose">取消</div>
        <div class="confirm" v-if="tipsType == 1" @click="type3GoCk(1)">分解符石</div>
        <div class="confirm" v-else-if="tipsType == 2" @click="type3GoCk(2)">技能升级</div>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { _throttle } from '@/pages/qingMing/utils/tool'
import { getPageData, nowEquip } from '@/pages/qingMing/api/index.js'
import { compareVersions, toRuneStoneTreasureHuntPanel, toMySkillPanel } from '@/pages/qingMing/utils/toApp.js'
import PublicSvga from '@/pages/qingMing/components/PublicSvga.vue'

export default {
  props: ['config'],
  components: {
    PublicSvga
  },
  data() {
    return {
      isShowPo: true,
      typePo: 1, // 弹窗类型: 1.兑换奖励 2.恭喜获得 3.背包已满
      exchangeNum: 1, // 兑换的数量
      awardsList: [], // 获得的奖励
      tipsType: 2 // 背包满提示类型
    }
  },
  computed: {},
  mounted() {},
  watch: {},
  methods: {
    clickClose() {
      this.$emit('closePopups')
    },
    // type1
    minCk() {
      this.exchangeNum = 1
    },
    minusCk() {
      this.exchangeNum = this.exchangeNum > 1 ? this.exchangeNum - 1 : 1
    },
    plusCk() {
      if (this.exchangeNum < this.config.exchangeLimite) {
        this.exchangeNum = this.exchangeNum < Math.floor(this.config.ownedNum / this.config.needNum) ? this.exchangeNum + 1 : this.exchangeNum
      } else {
        return 0
      }
    },
    maxCk() {
      this.exchangeNum = Math.floor(this.config.ownedNum / this.config.needNum) > 0 ? Math.floor(this.config.ownedNum / this.config.needNum) : 1
      if (this.exchangeNum < this.config.exchangeLimite) {
        return 0
      } else {
        this.exchangeNum = this.config.exchangeLimite
      }
    },
    /**
     * 兑换
     */
    exchangeBtnCk: _throttle(function () {
      console.log('兑换')
      getPageData({ type: 'love_card_exchange', mark: { id: this.config.exchangeId, num: this.exchangeNum } }).then((res) => {
        if (res.errno == 0) {
          this.$emit('getUserInformation')
          this.typePo = 2
          this.awardsList = res.data
        } else if (res.errno == -5 || res.errno == -6) {
          if (compareVersions(this.$store.state.app_version, '5.7.8') == -1) {
            this.$toast('你的符石背包已满，请升级到最新版本分解符石')
            this.clickClose()
          } else {
            this.typePo = 3
            if (res.errno == -5) {
              this.tipsType = 2
            } else if (res.errno == -6) {
              this.tipsType = 1
            }
          }
        } else {
          this.$toast(res.errmsg)
        }
      })
    }, 1000),
    type2BtnCk(type, id) {
      if (type !== 'other') {
        // console.log(type)
        nowEquip({ type, id }).then((res) => {
          if (res.errno == 0) {
            console.log('已装扮')
            this.$toast(res.errmsg)
            this.clickClose()
          } else {
            this.$toast(res.errmsg)
            this.clickClose()
          }
        })
      } else {
        console.log('other')
        this.clickClose()
      }
    },
    /**
     * 背包满处理
     */
    type3GoCk(type) {
      if (type == 1) {
        toRuneStoneTreasureHuntPanel()
      } else if (type == 2) {
        toMySkillPanel()
      }
    }
  }
}
</script>

<style scoped lang="scss">
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
  position: relative;
  width: 628px;
  height: 559px;
  background: url('@/pages/qingMing/assets/tk_bg_1.png') no-repeat;
  background-size: 100% 100%;
  padding: 5px;
  pointer-events: auto;
  .title-image {
    width: 642px;
    height: 130px;
    position: absolute;
    z-index: 3;
    top: -70px;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
  }
  .main {
    width: 100%;
    height: calc(100% - 80px);
    // background-color: red;
    position: absolute;
    left: 0;
    top: 50px;
    text-align: center;
    text-align: -webkit-center;
    color: #fff;
    // overflow-y: scroll;
    &.type1 {
      .ownedNumText {
        font-size: 32px;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 20px;
        white-space: nowrap;
      }
      .rewardIconDiv {
        background: #fefaef;
        border-radius: 12px;
        border: 4px solid #75d093;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 90px;
        &.special {
          height: 104px;
          img {
            width: 210px;
            height: 96px;
          }
        }
        &.other {
          height: 128px;
          width: 128px;
          img {
            width: 120px;
            height: 120px;
          }
        }
      }
      .rewardDescDiv {
        font-size: 28px;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 230px;
      }
      .computeDiv {
        width: 440px;
        height: 48px;
        // background: #A9792C;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 280px;
        font-size: 28px;
        line-height: 48px;
        display: flex;
        justify-content: space-between;
        .min {
          width: 72px;
          height: 48px;
          background: #16474a;
        }
        .minus {
          width: 48px;
          height: 48px;
          background: #16474a;
          img {
            width: 48px;
            height: 48px;
          }
        }
        .exchangeNumDiv {
          width: 120px;
          height: 48px;
          background: #16474a;
          font-size: 36px;
          color: #fffaa6;
        }
        .plus {
          width: 48px;
          height: 48px;
          background: #16474a;
          img {
            width: 48px;
            height: 48px;
          }
        }
        .max {
          width: 72px;
          height: 48px;
          background: #16474a;
        }
      }
      .partingLine {
        width: 600px;
        height: 2px;
        background: #ffffff;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 350px;
      }
      .needNumDiv {
        position: absolute;
        left: 50px;
        top: 400px;
        font-size: 32px;
      }
      .exchangeBtn {
        width: 120px;
        height: 60px;
        background: linear-gradient(180deg, #f1ffe7, #e9f9e2, #befbc4);
        border-radius: 30px;
        border: 2px solid;
        border-image: linear-gradient(0deg, #00aaa3, #8ecf73) 0;
        position: absolute;
        left: 450px;
        top: 390px;
        font-size: 32px;
        color: #16474a;
        line-height: 60px;
      }
    }
    &.type2 {
      .rewardsListDiv {
        margin-top: 20px;
        width: 450px;
        min-height: 300px;
        max-height: 380px;
        // height: 380px;
        // background: red;
        overflow-y: scroll;
        overflow-x: hidden;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-flow: row wrap;
        .rewardItem {
          height: 180px;
          // background: #707CCB;
          position: relative;
          &.special {
            width: 230px;
            .itemIcon {
              width: 218px;
              height: 128px;
              background: #fefaef;
              border-radius: 12px;
              border: 4px solid #75d093;
              display: flex;
              justify-content: center;
              align-items: center;
              img {
                width: 210px;
                height: 96px;
              }
            }
          }
          &.other {
            width: 140px;
            .itemIcon {
              width: 128px;
              height: 128px;
              background: #fefaef;
              border-radius: 12px;
              border: 4px solid #75d093;
              display: flex;
              justify-content: center;
              align-items: center;
              img {
                width: 120px;
                height: 120px;
              }
            }
          }
          .name {
            width: 200px;
            height: 25px;
            font-size: 26px;
            position: absolute;
            left: 50%;
            transform: translate(-50%);
            top: 140px;
          }
        }
      }
      .btn {
        width: 320px;
        height: 72px;
        background: linear-gradient(180deg, #f1ffe7, #e9f9e2, #befbc4);
        border-radius: 36px;
        border: 2px solid;
        border-image: linear-gradient(0deg, #00aaa3, #8ecf73) 0;
        margin: 10px auto 0px auto;
        font-size: 32px;
        color: #16474a;
        line-height: 70px;
        &.mic::after {
          content: '立即装扮';
        }
        &.car::after {
          content: '立即装备';
        }
        &.other::after {
          content: '我知道了';
        }
      }
    }
    &.type3 {
      .tip1 {
        width: 400px;
        font-weight: bold;
        font-size: 34px;
        color: #fffaa6;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 50px;
      }
      .packageImg {
        width: 139px;
        height: 140px;
        background: url('@/pages/qingMing/assets/tk_19.png') no-repeat;
        background-size: 100% 100%;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 120px;
      }
      .tip2 {
        width: 470px;
        font-size: 28px;
        color: #fff;
        line-height: 35px;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 280px;
      }
      .cancel {
        width: 240px;
        height: 72px;
        background: linear-gradient(180deg, #0daa92, #13494c);
        border-radius: 36px;
        border: 2px solid #deffb2;
        font-size: 32px;
        color: #fff;
        line-height: 72px;
        position: absolute;
        left: 27%;
        transform: translate(-50%);
        top: 380px;
      }
      .confirm {
        width: 240px;
        height: 72px;
        background: linear-gradient(180deg, #f1ffe7, #e9f9e2, #befbc4);
        border-radius: 36px;
        border: 2px solid;
        border-image: linear-gradient(0deg, #00aaa3, #8ecf73) 0;
        font-size: 32px;
        color: #16474a;
        line-height: 72px;
        position: absolute;
        left: 73%;
        transform: translate(-50%);
        top: 380px;
      }
    }
  }
}
</style>
