<template>
  <PopupBox :title="typePo === 1?'title_13.png':typePo === 2?'title_12.png':typePo === 3?'title_14.png':null" @clickClose="clickClose">
    <!-- 恭喜获得 -->
    <div :class="['main', `type${typePo}`]">
      <div class="rewardsListDiv">
        <div :class="['rewardItem', item.type == 'title' ? 'special' : 'other']" v-for="(item, index) in config" :key="index">
          <div class="itemIcon">
            <img v-if="item.type!='mic'" :src="IconPath(item.icon)" />
            <PublicImg v-else class="svgaIcon" :imgName="item.icon" :userAvatar="$store.state.user_icon"></PublicImg>
          </div>
          <div class="name">{{ item.type=='mic'?'头饰':item.type=='car'?'座驾':item.type=='chat_bubble'?'气泡':item.type=='costume'?'主页特效':item.name }}<span v-if="item.nums">+{{ item.nums }}</span><span v-if="item.type=='mic'||item.type=='car'||item.type=='chat_bubble'||item.type=='costume'">天</span></div>
        </div>
      </div>
      <!-- 20240618 新增气泡类型 -->
      <div :class="['btn', config[0].type == 'mic'?'mic':config[0].type == 'car'?'car': config[0].type == 'chat_bubble'?'chat_bubble': config[0].type == 'costume'?'costume': 'other']" @click="type2BtnCk((config[0].type == 'mic' || config[0].type == 'car' || config[0].type == 'chat_bubble'|| config[0].type == 'costume') ? config[0].type : 'other',config[0].id)"></div>
    </div>
  </PopupBox>
</template>

<script>
import { nowEquip } from '@/pages/luckyFlop/api/index.js'

export default {
  props: ['config'],
  components: {},
  data() {
    return {
      isShowPo: true,
      typePo: 2, // 弹窗类型: 1.兑换奖励 2.恭喜获得 3.背包已满
      exchangeNum: 1, // 兑换的数量
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
    }
  }
}
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  text-align: center;
  text-align: -webkit-center;
  color: #fff;
  position: relative;
  // overflow-y: scroll;
  &.type1{
    height: 450px;
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
      border: 4px solid #FFBDFD;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      top: 90px;
      &.special{
        height: 104px;
        img {
          width: 210px;
          height: 96px;
        }
      }
      &.other{
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
        background: #6359E4;
      }
      .minus {
        width: 48px;
        height: 48px;
        background: #6359E4;
        img {
          width: 48px;
          height: 48px;
        }
      }
      .exchangeNumDiv {
        width: 120px;
        height: 48px;
        background: #6359E4;
        font-size: 36px;
        color: #fffaa6;
      }
      .plus {
        width: 48px;
        height: 48px;
        background: #6359E4;
        img {
          width: 48px;
          height: 48px;
        }
      }
      .max {
        width: 72px;
        height: 48px;
        background: #6359E4;
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
      background: linear-gradient(180deg, #EBFEFF, #BAF1F9);
      border-radius: 30px;
      border: 2px solid;
      border-image: linear-gradient(0deg, #7CD5FF, #DBFCFD) 0 0;
      position: absolute;
      left: 450px;
      top: 390px;
      font-size: 32px;
      color: #4A50D1;
      line-height: 60px;
    }
  }
  &.type2{
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
            border: 4px solid #FFBDFD;
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
            border: 4px solid #FFBDFD;
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
      background: linear-gradient(180deg, #EBFEFF, #BAF1F9);
      border-radius: 36px;
      border: 2px solid;
      border-image: linear-gradient(0deg, #7CD5FF, #DBFCFD) 0 0;
      margin: 10px auto 0px auto;
      font-size: 32px;
      color: #4A50D1;
      line-height: 70px;
      &.mic::after {
        content: '立即装扮';
      }
      &.car::after {
        content: '立即装备';
      }
      &.chat_bubble::after {
        content: '立即装扮';
      }
      &.costume::after {
        content: '立即装扮';
      }
      &.other::after {
        content: '我知道了';
      }
    }
  }
  &.type3{
    .tip1 {
      width: 400px;
      font-weight: bold;
      font-size: 34px;
      color: #FFFAA6;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      top: 50px;
    }
    .packageImg {
      width: 139px;
      height: 140px;
      background: url('@/pages/luckyFlop/assets/tk_19.png') no-repeat left top/100% 100%;
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
      background: linear-gradient(180deg, #F599FF, #8A6AF3);
      border-radius: 36px;
      border: 2px solid #F9C9FF;
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
      background: linear-gradient(180deg, #EBFEFF, #BAF1F9);
      border-radius: 36px;
      border: 2px solid;
      border-image: linear-gradient(0deg, #7CD5FF, #DBFCFD) 0 0;
      font-size: 32px;
      color: #4A50D1;
      line-height: 72px;
      position: absolute;
      left: 73%;
      transform: translate(-50%);
      top: 380px;
    }
  }
}
</style>
