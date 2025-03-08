<template>
  <van-popup
    v-model="isShowPo"
    :close-on-click-overlay="false"
    @click-overlay="clickClose"
  >
    <div class="popup-content">
      <!-- 标题图片 -->
      <img class="title-image" :src="IconPath(config.titleImage)" />
      <div class="main">
        <!-- type1 获取方式弹窗 -->
        <div class="type1" v-if="config.type === 1">
          <div class="loveImgDiv">
            <img class="loveIcon" :src="IconPath('mk1_1_1.png')" />
            <div class="loveText">爱心+1</div>
          </div>
          <div class="text1">每消费100钻石</div>
          <div class="text2">当前已消费钻石：{{config.params.diamondNum}}</div>
          <div class="tip">自动发放</div>
        </div>
        <!-- type2 奖励获取弹窗 -->
        <div class="type2" v-else-if="config.type === 2">
          <!-- <div :class="['rewardDiv',config.params.type=='title'?'title':'other']">
            <img :src="IconPath(config.params.icon)" />
          </div>
          <div class="name">{{config.params.name}}<span v-if="config.params.type!='title'">+{{config.params.nums}}</span></div> -->
          <div class="rewardsListDiv">
            <div :class="['rewardItem',item.type=='title'?'title':'other']" v-for="(item,index) in config.params.list" :key="index">
              <div class="itemIcon">
                <img :src="IconPath(item.icon)" />
              </div>
              <div class="name">{{item.name}}<span v-if="item.type!='title'">+{{item.nums}}</span></div>
            </div>
          </div>
          <div :class="['btn',config.params.list[0].type=='title'?'title':'other']" @click="type2BtnCk(config.params.list[0].type=='title'?'title':'other',config.params.list[0].id)"></div>
        </div>
        <!-- type3 兑换奖励弹窗 -->
        <div class="type3" v-else-if="config.type === 3">
          <div class="ownedNumText" v-if="config.params.isSuit">剩余全套卡牌：{{config.params.ownedNum}}套</div>
          <div class="ownedNumText" v-else>剩余卡牌：{{config.params.ownedNum}}张</div>
          <div class="rewardIconDiv">
            <img :src="IconPath(config.params.icon)" />
          </div>
          <div class="aPartDiv" v-if="config.params.isSuit">+{{config.params.aPart}}</div>
          <div class="aPartDiv" v-else>{{config.params.aPart}}</div>
          <div class="computeDiv">
            <div class="min" @click="minCk">最小</div>
            <div class="minus" @click="minusCk"><img :src="IconPath('pop_1.png')" /></div>
            <div class="exchangeNumDiv">{{exchangeNum}}</div>
            <div class="plus" @click="plusCk"><img :src="IconPath('pop_2.png')" /></div>
            <div class="max" @click="maxCk">最大</div>
          </div>
          <div class="partingLine"></div>
          <div class="needNumDiv" v-if="config.params.isSuit">共消耗全套卡牌：{{Number(config.params.needNum)*exchangeNum}}套</div>
          <div class="needNumDiv" v-else>共消耗随机卡牌：{{Number(config.params.needNum)*exchangeNum}}张</div>
          <div class="exchangeBtn" @click="exchangeBtnCk">兑换</div>
        </div>
        <!-- type4 二次确认弹窗 -->
        <div class="type4" v-else-if="config.type === 4">
          <div class="text1">{{config.params.tip1}}<i>{{config.params.tip2}}</i></div>
          <div class="text2">确定消耗吗</div>
          <div class="cancel" @click="cancelCk">取消</div>
          <div class="confirm" @click="type4ConfirmCk">确认</div>
        </div>
        <!-- type5 多选一弹窗 -->
        <div class="type5" v-else-if="config.type === 5">
          <div class="rewardsList">
            <div class="rewardsItem" v-for="(item) in config.params.list" :key="item.id">
              <img class="rewardsItemImg" :src="IconPath(item.icon)" @click="rewardsItemChoose(item)"/>
              <div :class="['rewardsItemChosen',rewardsItemChosen&&item.id == rewardsItemChosen.id?'yes':null]" @click="rewardsItemChoose(item)"></div>
              <div class="rewardsItemTip">{{item.tip}}</div>
            </div>
          </div>
          <div class="cancel" @click="cancelCk">取消</div>
          <div class="confirm" @click="type5ConfirmCk">确认</div>
          <div class="type5Tip">仅当次有效</div>
        </div>
        <!-- type6 -->
        <div class="type6" v-else-if="config.type === 6">
          <div class="tip1">符石背包已达上限</div>
          <div class="packageImg"></div>
          <div class="tip2" v-if="config.params.showType == 1">你的符石背包已满，请先分解符石</div>
          <div class="tip2" v-else-if="config.params.showType == 2">你的符石背包已满，请将任意技能升至50级，开启符石寻宝分解符石。</div>
          <div class="cancel" @click="cancelCk">取消</div>
          <div class="confirm" v-if="config.params.showType == 1" @click="type6GoCk(1)">分解符石</div>
          <div class="confirm" v-else-if="config.params.showType == 2" @click="type6GoCk(2)">技能升级</div>
        </div>
      </div>
    </div>
  </van-popup>
</template>

<script>
/**
 * props传参:
 * 1. isShow Boolean 控制弹窗是否显示
 * 2. config Obj { type: 1, titleImage: 'tk_6_03.png', params: {} } type:弹窗类型(必传) titleImage:标题图片名称(必传)
 * type === 1 获取方式弹窗 => params:{ diamondNum: 99 } diamondNum:已消费钻石
 * type === 2 奖励获取弹窗 => params:{ list:[{id: 0, type: '', nums: 20, name: '', icon: ''},] } type: title时为铭牌，铭牌与其他需特别区分
 * type === 3 兑换奖励弹窗 => params:{ isSuit:true, id: 0, ownedNum: 13, needNum: 2, aPart: 5, exchangeLimite: 20, icon:'', fn:fn } isSuit:兑换是否消耗套牌 id:兑换id ownedNum:拥有的数量 needNum:兑换一份所需要的数量 aPart:一份有几个 exchangeLimite:兑换上限 icon:图标 fn:可执行方法
 * type === 4 二次确认弹窗 => params:{ tip1:'', tip2:'' }
 * type === 5 多选一弹窗 => params:{ list: [{ id: 1, icon: 'yb_120_120.png', tip: '+80' },] } list:可选奖励列表
 * type === 6 背包满弹窗 => params:{ showType:1 } showType: 1 分解符石 2 技能升级
 */
import { _throttle } from '@/pages/whiteValentine/utils/tool'
import { getPageData, nowEquip } from '@/pages/whiteValentine/api/index.js'
import { compareVersions, toRuneStoneTreasureHuntPanel, toMySkillPanel } from '@/pages/whiteValentine/utils/toApp.js'

// import { nowEquip } from '@/pages/whiteValentine/api/index.js'

export default {
  props: ['isShow', 'config'],
  data() {
    return {
      isShowPo: false,
      // type3
      exchangeNum: 1,
      // type5
      rewardsItemChosen: undefined // 默认id选项
    }
  },
  computed: {},
  created() {},
  watch: {
    isShow(newV, oldV) {
      // console.log(newV, oldV)
      this.isShowPo = this.isShow
    }
  },
  methods: {
    clickClose() {
      this.$emit('closePopups')
      this.exchangeNum = 1
    },
    // type2
    type2BtnCk(type, id) {
      if (type === 'title') {
        // console.log(type)
        nowEquip({ type, id }).then((res) => {
          if (res.errno == 0) {
            console.log('已装扮')
            this.$toast(res.errmsg)
            this.clickClose()
          } else {
            this.$toast(res.errmsg)
          }
        })
      } else {
        console.log('other')
        this.clickClose()
      }
    },
    // type3
    minCk() {
      this.exchangeNum = 1
    },
    minusCk() {
      this.exchangeNum = this.exchangeNum > 1 ? this.exchangeNum - 1 : 1
    },
    plusCk() {
      if (this.exchangeNum < this.config.params.exchangeLimite) {
        this.exchangeNum = (this.exchangeNum < Math.floor(this.config.params.ownedNum / this.config.params.needNum)) ? this.exchangeNum + 1 : this.exchangeNum
      } else {
        return 0
      }
    },
    maxCk() {
      this.exchangeNum = Math.floor(this.config.params.ownedNum / this.config.params.needNum) > 0 ? Math.floor(this.config.params.ownedNum / this.config.params.needNum) : 1
      if (this.exchangeNum < this.config.params.exchangeLimite) {
        return 0
      } else {
        this.exchangeNum = this.config.params.exchangeLimite
      }
    },
    exchangeBtnCk: _throttle(function () {
      console.log('兑换')
      if (this.config.params.isSuit) {
        getPageData({ type: 'love_card_exchange', mark: { id: this.config.params.id, num: this.exchangeNum } }).then((res) => {
          if (res.errno == 0) {
            this.config.params.open2(res.data)
            //   console.log(res)
          } else if (res.errno == -5 || res.errno == -6) {
            if (compareVersions(this.$store.state.app_version, '5.7.8') == -1) {
              this.$toast('你的符石背包已满，请升级到最新版本分解符石')
              this.clickClose()
            } else {
              if (res.errno == -5) {
                this.config.params.open6(2)
              } else if (res.errno == -6) {
                this.config.params.open6(1)
              }
            }
          }
        })
      } else {
        this.config.params.isOpen4(this.config.params.id, this.exchangeNum)
      }
    }, 2000),
    // type4
    cancelCk() {
      this.clickClose()
    },
    type4ConfirmCk() {
      console.log('确认')
      getPageData({ type: 'love_card_exchange', mark: { id: this.config.params.id4, num: this.config.params.num4 } }).then((res) => {
        this.config.params.open2(res.data)
        //   console.log(res)
      })
    },
    // type5
    rewardsItemChoose(item) {
      this.rewardsItemChosen = item
      this.$emit('replaceImg', item)
    },
    type5ConfirmCk() {
      console.log('确认')
      console.log(this.rewardsItemChosen)
      if (this.rewardsItemChosen) {
        let item = {
          id: this.rewardsItemChosen.id,
          needNum: 1,
          aPart: this.rewardsItemChosen.tip,
          icon: this.rewardsItemChosen.icon
        }
        console.log(item)
        this.config.params.open3(item, this.config.params.isJudge4, this.config.params.isType4ImgCk)
      } else {
        this.$toast('请先选择奖励')
      }
    },
    // type6
    type6GoCk(type) {
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
  width: 620px;
  min-height: 300px;
  border: 5px solid #f6a1b0;
  background-color: #fff;
  padding: 5px;
  pointer-events: auto;
  border-radius: 34px;
  background: linear-gradient(180deg, #FFF3F4, #F9C4C7);
  .title-image {
    width: 644px;
    height: 230px;
    position: absolute;
    z-index: 3;
    top: -85px;
    left: 50%;
    transform: translateX(-50%);
    pointer-events: none;
  }
  .main{
    width: 100%;
    text-align: center;
    text-align: -webkit-center;
    overflow-y: scroll;
    .type1{
      width: 100%;
      height: 400px; // 控制type1高度
      padding-top: 60px;
      position: relative;
      .loveImgDiv{
        width: 120px;
        height: 120px;
        background: #FEFAEF;
        border-radius: 12px;
        border: 4px solid #F6A1B0;
        position: absolute;
        left: 100px;
        top: 120px;
        .loveIcon{
          position: absolute;
          left: 50%;
          transform: translate(-50%);
          top: 15px;
          width: 43*1.4px;
          height: 34*1.4px;
        }
        .loveText{
          width: 112px;
          height: 40px;
          background: #C16D6F;
          border-radius: 0px 0px 12px 12px;
          position: absolute;
          bottom: -1px;
          line-height: 40px;
          text-align: center;
          font-size: 26px;
        }
      }
      .text1{
        font-size: 28px;
        color: #B35553;
        position: absolute;
        left: 260px;
        top: 130px;
      }
      .text2{
        font-size: 24px;
        color: #B35553;
        position: absolute;
        left: 260px;
        top: 200px;
      }
      .tip{
        font-size: 26px;
        color: #FFFFFF;
        line-height: 40px;
        width: 449px;
        height: 40px;
        background: url('@/pages/whiteValentine/assets/tk_6_04.png') no-repeat;
        background-size: 100% 100%;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 300px;
      }
    }
    .type2{
      width: 100%;
      // height: 420px; // 控制type2高度
      padding-top: 100px;
      position: relative;
      .rewardsListDiv{
        width: 450px;
        min-height: 200px;
        max-height: 600px;
        // background: red;
        overflow-y: scroll;
        overflow-x: hidden;
        display: flex;
        justify-content: space-around;
        flex-flow: row wrap;
        .rewardItem{
          height: 200px;
          // background: #707CCB;
          position: relative;
          &.title{
            width: 230px;
            .itemIcon{
              width: 218px;
              height: 128px;
              background: #FEFAEF;
              border-radius: 12px;
              border: 4px solid #F6A1B0;
              display: flex;
              justify-content: center;
              align-items: center;
              img{
                width: 210px;
                height: 96px;
              }
            }
          }
          &.other{
            width: 140px;
            .itemIcon{
              width: 128px;
              height: 128px;
              background: #FEFAEF;
              border-radius: 12px;
              border: 4px solid #F6A1B0;
              display: flex;
              justify-content: center;
              align-items: center;
              img{
                width: 120px;
                height: 120px;
              }
            }
          }
          .name{
            width: 200px;
            height: 25px;
            font-size: 26px;
            color: #B35553;
            position: absolute;
            left: 50%;
            transform: translate(-50%);
            top: 140px;
          }
        }
      }
      .btn{
        width: 320px;
        height: 72px;
        background: linear-gradient(0deg, #FFF9D1, #FFFFFF);
        border-radius: 36px;
        border: 2px solid #FFFFFF;
        margin: 30px auto 50px auto;
        font-size: 32px;
        color: #A9792C;
        line-height: 70px;
        &.title::after{
          content: '立即佩戴';
        }
        &.other::after{
          content: '我知道了';
        }
      }
    }
    .type3{
      width: 100%;
      height: 520px; // 控制type3高度
      padding-top: 60px;
      position: relative;
      .ownedNumText{
        color: #B35553;
        font-size: 32px;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 80px;
        white-space: nowrap;
      }
      .rewardIconDiv{
        height: 128px;
        background: #FEFAEF;
        border-radius: 12px;
        border: 4px solid #F6A1B0;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 150px;
        img{
          width: 120px;
          height: 120px;
        }
      }
      .aPartDiv{
        font-size: 28px;
        color: #B35553;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 290px;
      }
      .computeDiv{
        width: 440px;
        height: 48px;
        // background: #A9792C;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 340px;
        font-size: 28px;
        line-height: 48px;
        display: flex;
        justify-content: space-between;
        .min{
          width: 72px;
          height: 48px;
          background: #C16D6F;
        }
        .minus{
          width: 48px;
          height: 48px;
          background: #C16D6F;
          img{
            width: 48px;
            height: 48px;
          }
        }
        .exchangeNumDiv{
          width: 120px;
          height: 48px;
          background: #C16D6F;
          font-size: 36px;
          color: #FFFAA6;
        }
        .plus{
          width: 48px;
          height: 48px;
          background: #C16D6F;
          img{
            width: 48px;
            height: 48px;
          }
        }
        .max{
          width: 72px;
          height: 48px;
          background: #C16D6F;
        }
      }
      .partingLine{
        width: 600px;
        height: 2px;
        background: #FFFFFF;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 410px;
      }
      .needNumDiv{
        position: absolute;
        left: 30px;
        top: 450px;
        font-size: 32px;
        color: #B35553;
      }
      .exchangeBtn{
        width: 120px;
        height: 60px;
        background: linear-gradient(0deg, #BCC4F1, #FFFFFF);
        border-radius: 30px;
        border: 3px solid #FFFFFF;
        position: absolute;
        left: 450px;
        top: 440px;
        font-size: 32px;
        color: #707CCB;
        line-height: 60px;
      }
    }
    .type4{
      width: 100%;
      height: 360px; // 控制type4高度
      padding-top: 60px;
      position: relative;
      .text1{
        font-size: 32px;
        color: #B35553;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 100px;
        white-space: nowrap;
        i{
          color: #7588F3;
        }
      }
      .text2{
        font-size: 32px;
        color: #B35553;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 150px;
        white-space: nowrap;
      }
      .cancel{
        width: 240px;
        height: 72px;
        background: linear-gradient(0deg, #BCC4F1, #FFFFFF);
        border-radius: 36px;
        border: 3px solid #FFFFFF;
        font-size: 32px;
        color: #707CCB;
        line-height: 72px;
        position: absolute;
        left: 27%;
        transform: translate(-50%);
        top: 250px;
      }
      .confirm{
        width: 240px;
        height: 72px;
        background: linear-gradient(0deg, #FFF9D1, #FFFFFF);
        border-radius: 36px;
        border: 3px solid #FFFFFF;
        font-size: 32px;
        color: #A9792C;
        line-height: 72px;
        position: absolute;
        left: 73%;
        transform: translate(-50%);
        top: 250px;
      }
    }
    .type5{
      width: 100%;
      height: 460px; // 控制type5高度
      padding-top: 60px;
      position: relative;
      .rewardsList{
        width: 500px;
        height: 200px;
        // background: linear-gradient(0deg, #FFF9D1, #FFFFFF);
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 100px;
        display: flex;
        justify-content: space-between;
        .rewardsItem{
          width: 128px;
          height: 128px;
          background: #FEFAEF;
          border-radius: 12px;
          border: 4px solid #F6A1B0;
          position: relative;
          .rewardsItemImg{
            width: 120px;
            height: 120px;
          }
          .rewardsItemChosen{
            width: 56px;
            height: 45px;
            background: url('@/pages/whiteValentine/assets/tk_6_15.png') no-repeat;
            background-size: 100% 100%;
            position: absolute;
            top: -22px;
            left: 95px;
            &.yes{
              background: url('@/pages/whiteValentine/assets/tk_6_14.png') no-repeat;
              background-size: 100% 100%;
            }
          }
          .rewardsItemTip{
            font-size: 26px;
            color: #B35553;
            position: absolute;
            top: 140px;
            left: 50%;
            transform: translate(-50%);
            white-space: nowrap;
          }
        }
      }
      .cancel{
        width: 240px;
        height: 72px;
        background: linear-gradient(0deg, #BCC4F1, #FFFFFF);
        border-radius: 36px;
        border: 3px solid #FFFFFF;
        font-size: 32px;
        color: #707CCB;
        line-height: 72px;
        position: absolute;
        left: 27%;
        transform: translate(-50%);
        top: 310px;
      }
      .confirm{
        width: 240px;
        height: 72px;
        background: linear-gradient(0deg, #FFF9D1, #FFFFFF);
        border-radius: 36px;
        border: 3px solid #FFFFFF;
        font-size: 32px;
        color: #A9792C;
        line-height: 72px;
        position: absolute;
        left: 73%;
        transform: translate(-50%);
        top: 310px;
      }
      .type5Tip{
        font-size: 26px;
        color: #B35553;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 400px;
      }
    }
    .type6{
      width: 100%;
      height: 500px; // 控制type6高度
      padding-top: 60px;
      position: relative;
      .tip1{
        width: 400px;
        font-weight: bold;
        font-size: 34px;
        color: #7588F3;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 50px;
      }
      .packageImg{
        width: 139px;
        height: 140px;
        background: url('@/pages/whiteValentine/assets/tk_19.png') no-repeat;
        background-size: 100% 100%;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 120px;
      }
      .tip2{
        width: 470px;
        font-size: 28px;
        color: #B35553;
        line-height: 35px;
        position: absolute;
        left: 50%;
        transform: translate(-50%);
        top: 280px;
      }
      .cancel{
        width: 240px;
        height: 72px;
        background: linear-gradient(0deg, #BCC4F1, #FFFFFF);
        border-radius: 36px;
        border: 3px solid #FFFFFF;
        font-size: 32px;
        color: #707CCB;
        line-height: 72px;
        position: absolute;
        left: 27%;
        transform: translate(-50%);
        top: 380px;
      }
      .confirm{
        width: 240px;
        height: 72px;
        background: linear-gradient(0deg, #FFF9D1, #FFFFFF);
        border-radius: 36px;
        border: 3px solid #FFFFFF;
        font-size: 32px;
        color: #A9792C;
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
