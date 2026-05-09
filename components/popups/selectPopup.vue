<template>
  <PopupBox :title="popupTitleMap[popupType]" isSon @clickClose="clickClose">
    <template v-if="popupType === 1">
      <div class="cakeArea">
        <div :class="['cakeItem', selectedItem.id==item.id ? 'selected' : null, item.nums == 0 ? 'noSp' : null]" v-for="item in config.list" :key="item.id" @click="selectCake(item)">
          <div :class="['cakeImg', `cake_id_${item.id}`]"></div>
          <div class="cakeName">{{ item.name }}</div>
          <div class="cakeNums">{{ item.nums }}</div>
          <div class="cakeRare" v-if="item.id == 4 || item.id == 5">稀有</div>
        </div>
      </div>
      <div class="computeDiv">
        <div class="min" @click="min">最小</div>
        <div class="minus" @click="reduce">
          <img :src="IconPath('pop_1.png')" alt="" />
        </div>
        <div class="exchangeNumDiv">{{ sendNum }}</div>
        <div class="plus" @click="add">
          <img :src="IconPath('pop_2.png')" alt="" />
        </div>
        <div class="max" @click="max">最大</div>
      </div>
      <div class="sendButton" @click="send">赠送</div>
    </template>
    <template v-else-if="popupType === 2">
      <!-- <div class="topTip">是否赠送&thinsp;<i>{{ sendNum }}个{{ selectedItem.name }}</i>&thinsp;给</div> -->
      <div class="topTip">是否赠送&thinsp;<i>{{ '心动合约奖励领取权限' }}</i>&thinsp;给</div>
      <div class="userBg">
        <img class="radius-50 fit-cover block userAvatar" :src="IconPath(config.user.profile_image || 'avatarDefault.png')" alt="" @error="imgAtError" />
        <div class="userNameDiv">{{config.user.username}}</div>
        <div class="userCode userPrettyCode">
          <div class="havenBg" v-if="config.user.pretty_type != 0">
            <PublicImg :imgName="$store.state.prettyTypeBg[config.user.pretty_type]" />
          </div>
          <span v-if="config.user.pretty_type != 0" :class="['prettyCode', `color${config.user.pretty_type}`]" >{{ config.user.code }}</span >
          <span v-else class="noPrettyCode">ID:{{ config.user.code }}</span>
        </div>
      </div>
      <!-- <div class="isTodayNoTipArea"> -->
      <!--   <div :class="['isTodayNoTipIcon', isTodayNoTipM4==1?'act':'unact']" @click="changeIsTodayNoTip"></div> -->
      <!--   <span>&ensp;今日不再提醒</span> -->
      <!-- </div> -->
      <div class="rules-text-popup">
        <ul>
          <li><span></span>合约奖励一旦赠送解锁，无法索回，请谨慎操作。</li>
        </ul>
      </div>
      <div class="buttons">
        <div class="cancelButton status0" @click="clickClose">再想想</div>
        <div class="confirmButton status1" @click="confirm">确认</div>
      </div>
    </template>
  </PopupBox>
</template>

<script>
import { _throttle, imgAtError } from '@/utils/tool'
import { getPageData } from '@/api'

export default {
  name: 'selectPopup',
  props: ['config'],
  data() {
    return {
      popupTitleMap: Object.freeze({ 1: '选择', 2: '提示' }),
      avatarDefault: Object.freeze('avatarDefault.png'),
      popupType: 2, // 1-选择 2-二次确认
      selectedItem: {}, // 选中的物品
      sendNum: 1, // 赠送数量
      isTodayNoTipM4: 0
    }
  },
  created() {
    this.popupType = this.config.popupType || this.popupType
  },
  mounted() {
    for (let item of this.config.list) {
      if (item.nums > 0) {
        this.selectedItem = item
        break
      }
    }
    this.isTodayNoTipM4 = localStorage.getItem('isTodayNoTipM4') || 0
  },
  computed: {},
  watch: {},
  methods: {
    imgAtError,
    /**
     * 关闭弹窗(必需)
     */
    clickClose() {
      this.$emit('clickClose')
    },
    selectCake(item) {
      if (item.nums > 0) {
        this.selectedItem = item
        this.sendNum = 1
      }
    },
    min() {
      this.sendNum = 1
    },
    reduce() {
      this.sendNum = this.sendNum > 1 ? this.sendNum - 1 : 1
    },
    add() {
      if (this.sendNum < this.selectedItem.nums && this.sendNum < 200) {
        ++this.sendNum
      }
    },
    max() {
      if (this.selectedItem.nums > 200) {
        this.sendNum = 200
      } else {
        this.sendNum = this.selectedItem.nums
      }
    },
    send: _throttle(function () {
      if (this.isTodayNoTipM4 == 1) {
        console.log('赠送')
        this.confirm()
      } else if (this.isTodayNoTipM4 == 0) {
        this.popupType = 2
      }
    }),
    changeIsTodayNoTip () {
      this.isTodayNoTipM4 = this.isTodayNoTipM4 == 1 ? 0 : 1
      localStorage.setItem('isTodayNoTipM4', this.isTodayNoTipM4)
    },
    confirm: _throttle(async function () {
      // getPageData({ type: 'cake_shop_give_opt', mark: { moon_id: this.selectedItem.id, nums: this.sendNum, tuid: this.config.user.uid } }).then((res) => {
      //   if (res.errno == 0) {
      //     this.$toast('赠送成功')
      //     this.$emit('endSend')
      //     this.clickClose()
      //   } else {
      //     this.$toast(res.errmsg)
      //   }
      // })
      const res = await getPageData({ type: 'heart_meet_give_adv', mark: this.config.user.uid })
      this.$toast(res.errmsg)
      if (res.errno) return
      this.$emit('sendSuccess')
    })
  }
}
</script>

<style scoped lang="scss">
.cakeArea {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 10px auto 0 auto;
  .cakeItem {
    width: 120px;
    height: 120px;
    background: #FFFFFF;
    border-radius: 12px;
    border: 4px solid #FFD782;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 26px 80px 26px;
    position: relative;
    &.selected::after {
      content: '';
      width: 170px;
      height: 173px;
      //background: url('@/pages/celebration/assets/tk_29.png') no-repeat left top/100% 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    &.noSp {
      opacity: 0.8;
    }
    .cakeImg {
      width: 90px;
      height: 90px;
      &.cake_id_1 {
        //background: url('@/pages/celebration/assets/yqts_120_120.png') no-repeat left top/100% 100%;
      }
      &.cake_id_2 {
        //background: url('@/pages/celebration/assets/zyts_120_120.png') no-repeat left top/100% 100%;
      }
      &.cake_id_3 {
        //background: url('@/pages/celebration/assets/pbts_120_120.png') no-repeat left top/100% 100%;
      }
      &.cake_id_4 {
        //background: url('@/pages/celebration/assets/ryts_120_120.png') no-repeat left top/100% 100%;
      }
      &.cake_id_5 {
        //background: url('@/pages/celebration/assets/xyts_120_120.png') no-repeat left top/100% 100%;
      }
    }
    .cakeName {
      font-weight: 400;
      font-size: 28px;
      color: #FFFFFF;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: -50px;
    }
    .cakeNums {
      font-weight: 400;
      font-size: 22px;
      color: #598cf3;
      position: absolute;
      right: 2px;
      bottom: 0px;
    }
    .cakeRare {
      width: 50px;
      height: 28px;
      background: linear-gradient(90deg, #CC57F3, #60A0FF);
      border-radius: 0 10px 0 12px;
      font-weight: 500;
      font-size: 20px;
      color: #FFFFFF;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}
.computeDiv {
  width: 440px;
  height: 48px;
  color: #fff;
  margin: 20px auto 0 auto;
  font-size: 28px;
  display: flex;
  justify-content: space-between;
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .min {
    width: 72px;
    height: 48px;
    background: #717ADB;
  }
  .minus {
    width: 48px;
    height: 48px;
    background: #717ADB;
    img {
      width: 48px;
      height: 48px;
    }
  }
  .exchangeNumDiv {
    width: 120px;
    height: 48px;
    background: #717ADB;
    font-size: 36px;
    color: #FFFAA6;
  }
  .plus {
    width: 48px;
    height: 48px;
    background: #717ADB;
    img {
      width: 48px;
      height: 48px;
    }
  }
  .max {
    width: 72px;
    height: 48px;
    background: #717ADB;
  }
}
.sendButton {
  width: 320px;
  height: 72px;
  background: linear-gradient(0deg, #FFF9D1, #FFFFFF);
  border-radius: 36px;
  border: 2px solid #FFFFFF;
  font-weight: 400;
  font-size: 32px;
  color: #A9792C;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px auto 0 auto;
}
.topTip {
  font-size: 32px;
  color: #FFFFFF;
  text-align: center;
  i {
    color: #FFF889;
  }
}
.userBg {
  width: 388px;
  height: 120px;
  background: rgba(214, 94, 62, 0.3);
  border-radius: 60px;
  margin: 32px auto 0 auto;
  position: relative;
  .userAvatar {
    width: 78px;
    height: 78px;
    position: absolute;
    left: 21px;
    top: 50%;
    transform: translateY(-50%);
    object-fit: cover;
    border: 4px solid transparent;
    background-color: #FBE0A7;
  }
  .userNameDiv {
    max-width: 238px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 30px;
    color: #FFF889;
    position: absolute;
    left: 114px;
    top: 21px;
  }
  .userCode {
    position: absolute;
    left: 114px;
    bottom: 19px;
    font-size: 24px;
    color: #FFF889;
    width: 160px;
    height: 37px;
    display: flex;
    align-items: center;
  }
}
.isTodayNoTipArea{
  font-size: 24px;
  color: #FFFFFF;
  line-height: 36px;
  display: flex;
  justify-content: center;
  margin: 30px 0 0 0;
  .isTodayNoTipIcon{
    width: 36px;
    height: 36px;
    &.act{
      //background: url('@/pages/celebration/assets/tk_27_1.png') no-repeat left top/100% 100%;
    }
    &.unact{
      //background: url('@/pages/celebration/assets/tk_27.png') no-repeat left top/100% 100%;
    }
  }
}
.rules-text-popup {
  margin-top: 36px;
  line-height: 1;
}
.buttons {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px auto 0 auto;
  > div {
    $border: 3px;
    width: 246px;
    height: 78px;
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
    white-space: nowrap;
    font-size: 32px;
    font-weight: normal;
    border: $border solid transparent;
    border-radius: 99999px;
    -webkit-background-clip: padding-box, border-box;
    -webkit-background-origin: padding-box, border-box;
    margin: 0 10px;
    &.status0 {
      color: #4d7ddd;
      background-image: linear-gradient(0deg, #cae7ff, #ffffff), linear-gradient(#fff, #fff);
    }
    &.status1 {
      color: #a9792c;
      background-image: linear-gradient(0deg, #fff5b0, #ffffff), linear-gradient(#fff, #fff);
    }
  }
}
</style>
