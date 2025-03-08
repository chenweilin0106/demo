<template>
  <div class="component">
    <!-- 轮盘 -->
    <div class="wheelDiscArea">
      <div :class="['rewardItem']" v-for="item in rewardsList" :key="item.id">
        <PublicJson class="rewardJson" v-if="item.type == 'title'" :jsonName="item.icon"></PublicJson>
        <img class="rewardIcon" v-else :src="IconPath(item.icon)" />
        <div class="rewardDesc">{{ item.text }}</div>
        <div class="active" v-show="item.active"></div>
        <div class="label" v-if="item.label"></div>
      </div>
    </div>
    <!-- 抽奖 -->
    <div class="lotteryArea">
      <div class="drawsNum">
        剩余抽奖次数
        <p>{{ confiigWheelDisc.leftDrawsNum }}</p>
      </div>
      <div class="diamondConsumedDiv">已消费：{{ confiigWheelDisc.diamondConsumed }}钻</div>
      <div class="drawTypeDiv">
        <div
          :class="['drawTypeItem', drawType == item.id ? 'active' : 'unActive']"
          v-for="item in [
            { id: 1, name: '抽一次' },
            { id: 10, name: '抽十次' },
            { id: 100, name: '抽百次' }
          ]"
          :key="item.id"
          @click="drawTypeCk(item.id)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="lotteryBtn" @click="lotteryBtnCk"></div>
    </div>
    <!-- 文案说明 -->
    <div class="rulesText">
      <ul>
        <li><span></span>活动期间<i>每消费200钻石</i>可得一次抽奖机会，抽中</li>
        <li>大奖若已拥有自动转化为500绿晶石</li>
        <li><span></span>每抽奖一次可得一张<img :src="IconPath('mk5_11.png')" />，每100张<img :src="IconPath('mk5_11.png')" />可兑换一份</li>
        <li>大奖，大奖可在奖池中自选</li>
        <li><span></span>求婚时购买求婚物品的消费计算在内</li>
      </ul>
    </div>
    <!-- 获奖弹窗 -->
    <van-popup v-model="isShowPo" :close-on-click-overlay="false" @click-overlay="clickClose">
      <PopupBox class="popup-content" title="title_7.png" balloon="true">
        <div class="main">
          <div class="bigTip" v-if="isBigTip">大奖已拥有<br />已转化为500绿晶石</div>
          <div class="rewardsListDiv">
            <div :class="['rewardItem', item.awards.type == 'title' ? 'special' : 'other']" v-for="(item, index) in poList" :key="index">
              <div class="itemIcon">
                <PublicJson class="rewardJson" v-if="item.awards.type == 'title'" :jsonName="item.awards.icon"></PublicJson>
                <img v-else :src="IconPath(item.awards.icon)" />
              </div>
              <div class="name">{{ item.awards.text }}</div>
            </div>
          </div>
          <div
            :class="['btn', poList.length == 1 && poList[0].awards.type == 'title' ? 'title' : 'other']"
            @click="confirmBtnCk(poList.length == 1 && poList[0].awards.type == 'title' ? 'title' : 'other', poList[0].awards.tool_id)"
          ></div>
        </div>
      </PopupBox>
    </van-popup>
  </div>
</template>

<script>
import PublicJson from '@/pages/gardenParty/components/PublicJson.vue'
import { getPageData, nowEquip } from '@/pages/gardenParty/api/index.js'

export default {
  name: 'wheelDisc',
  props: ['confiigWheelDisc'], // 此组件props参只做展示用
  components: {
    PublicJson
  },
  data() {
    return {
      drawType: 1, // 抽奖种类 1抽一次 2 抽十次 3 抽百次
      rewardsList: [
        { id: 1, icon: 'ch_sjglds', type: 'title', text: '永久称号', label: true, active: true },
        { id: 2, icon: 'sjmg_120_120.png', type: '', text: '水晶玫瑰+3', label: false, active: false }, // 修改
        { id: 3, icon: 'jb_120_120.png', type: '', text: '金币+1万', label: false, active: false },
        { id: 4, icon: 'ljs_120_120.png', type: '', text: '绿晶石+3', label: false, active: false },
        { id: 5, icon: 'bx_120_120.png', type: '', text: '比心+1', label: false, active: false },
        { id: 6, icon: 'zjs_120_120.png', type: '', text: '紫晶石+1', label: false, active: false },
        { id: 7, icon: 'ljs_120_120.png', type: '', text: '绿晶石+1', label: false, active: false },
        { id: 8, icon: 'fsjc_120_120.png', type: '', text: '符石精粹+20', label: false, active: false }
      ], // 轮盘数据
      rollTime: undefined, // 轮盘计时器
      nowRewardIndex: 0, // 当前第几
      isWheeling: false, // 轮盘是否在转动中
      isShowPo: false, // 获奖弹窗
      isBigTip: false, // 提示是否显示
      poList: [] // 弹窗奖励数据
    }
  },
  created() {
    this.drawType = localStorage.getItem('drawType') || 1
    this.getRewardsList()
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    /**
     * 获取轮盘数据
     */
    getRewardsList() {
      getPageData({ type: 'tab', mark: 'm5' }).then((res) => {
        if (res.errno == 0) {
          this.rewardsList = res.data.lottery_pool
          this.rewardsList.forEach((e) => {
            this.$set(e, 'active', false)
          })
          this.rewardsList[0].active = true
        } else {
          this.$toast(res.errmsg)
        }
      })
    },
    /**
     * 更改抽奖类型
     */
    drawTypeCk(typeId) {
      this.drawType = typeId
      localStorage.setItem('drawType', JSON.stringify(typeId))
    },
    /**
     * 点击抽奖
     */
    lotteryBtnCk() {
      if (!this.isWheeling) {
        if (Number(this.confiigWheelDisc.leftDrawsNum) >= Number(this.drawType)) {
          console.log('抽奖')
          getPageData({ type: 'title_lottery_multi', mark: this.drawType }).then((res) => {
            if (res.errno == 0) {
              // console.log(res.data.awards[0].awards.name)
              let times = Number(res.data.awards[0].sort) - this.nowRewardIndex + 8 * 3 // 8*3转三圈
              this.wheelDisc(times, this.nowRewardIndex, 0)
              this.poList = res.data.awards
              this.isBigTip = res.data.is_translate
            } else {
              this.$toast(res.errmsg)
            }
          })
        } else {
          this.$toast('当前抽奖机会不足，\n请先去消费')
        }
      }
    },
    /**
     * 转动轮盘
     * @times 总转动次数
     * @nowTime 从第几个开始转动/当前第几
     * @sum 计算切换总次数(控制轮盘动画渐慢效果) 默认0
     * @speed 转动时间间隔 默认7ms
     */
    wheelDisc(times, nowTime, sum, speed = 7) {
      this.isWheeling = true
      nowTime++ // 转动次数加1
      sum++ // 已转动次数加1
      // 判断time是否大于8
      nowTime = nowTime > 8 ? 1 : nowTime
      this.rewardsList.forEach((e) => {
        e.active = false
      })
      clearTimeout(this.rollTime)
      // 控制当前闪烁的奖励
      this.rewardsList[nowTime - 1].active = true
      this.rollTime = setTimeout(() => {
        window.requestAnimationFrame(() => {
          this.wheelDisc(times, nowTime, sum, speed)
        }) // 进行递归动画 这段代码的作用是启动一个动画帧，以便在浏览器中渲染动画效果。动画帧是通过调用requestAnimationFrame()方法实现的，它允许你在动画帧中执行代码，而不是直接设置元素的样式。这样可以确保在渲染过程中不会出现跳帧的情况，从而实现毫秒级的渲染效果。
      }, speed * sum)
      if (sum === times) {
        clearTimeout(this.rollTime) // 清除定时器
        this.nowRewardIndex = nowTime // 定位当前位置
        setTimeout(() => {
          this.isWheeling = false
          this.isShowPo = true
          this.$emit('getPageData')
        }, 1000) // 延迟一秒后再可抽奖(节流),展示奖励弹窗
        console.log('恭喜你抽中了', nowTime)
        return 0
      }
    },
    /**
     * 关闭弹窗
     */
    clickClose() {
      this.isShowPo = false
    },
    /**
     * 佩戴或关闭
     */
    confirmBtnCk(type, id) {
      if (type == 'title') {
        // console.log(type, id)
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
      } else if (type == 'other') {
        this.clickClose()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.component {
  width: 100%;
  height: 100%;
  .wheelDiscArea {
    width: 680px;
    height: 700px;
    background: linear-gradient(180deg, #b3d2f7, #cdc8fb, #fdc8dc);
    border-radius: 20px;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    .rewardItem {
      width: 200px;
      height: 200px;
      background-image: url('@/pages/gardenParty/assets/mk5_8.png');
      background-size: 100% 100%;
      position: relative;
      &:nth-of-type(1) {
        order: 2;
      }
      &:nth-of-type(2) {
        order: 2;
      }
      &:nth-of-type(3) {
        margin-left: 220px;
        order: 5;
      }
      &:nth-of-type(4) {
        order: 8;
      }
      &:nth-of-type(5) {
        order: 7;
      }
      &:nth-of-type(6) {
        order: 6;
      }
      &:nth-of-type(7) {
        order: 4;
      }
      &:nth-of-type(8) {
        order: 1;
      }
      .rewardJson {
        position: absolute;
        top: -10px;
      }
      .rewardIcon {
        width: 120px * 1.1;
        height: 120px * 1.1;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 20px;
      }
      .rewardDesc {
        white-space: nowrap;
        font-size: 24px;
        color: #ffffff;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 150px;
      }
      .active::after {
        content: '';
        position: absolute;
        left: -23px;
        top: -24px;
        width: 246px;
        height: 248px;
        background-image: url('@/pages/gardenParty/assets/mk5_7.png');
        background-size: 100% 100%;
      }
      .label {
        width: 97px;
        height: 78px;
        background-image: url('@/pages/gardenParty/assets/mk5_15.png');
        background-size: 100% 100%;
        position: absolute;
        top: -20px;
        right: -20px;
      }
    }
  }
  .lotteryArea {
    height: 300px;
    position: relative;
    .drawsNum {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -420px;
      white-space: nowrap;
      font-size: 24px;
      color: #5b67da;
      line-height: 60px;
      text-align: center;
      p {
        font-size: 60px;
        color: #fff36c;
      }
    }
    .diamondConsumedDiv {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 20px;
      font-size: 28px;
      color: #5b67da;
    }
    .drawTypeDiv {
      width: 480px;
      height: 48px;
      background: #a495ee;
      border-radius: 24px;
      font-size: 28px;
      color: #ffffff;
      display: flex;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 60px;
      z-index: 1;
      .drawTypeItem {
        width: 160px;
        height: 48px;
        line-height: 48px;
        text-align: center;
        z-index: 2;
        position: relative;
        z-index: 2;
        &.active::after {
          content: '';
          display: inline-block;
          width: 160px;
          height: 61px;
          background-image: url('@/pages/gardenParty/assets/mk5_9.png');
          background-size: 100% 100%;
          position: absolute;
          left: 0;
          top: 0;
          z-index: -1;
        }
        &.unActive::after {
          content: '';
        }
      }
    }
    .lotteryBtn {
      width: 446px;
      height: 116px;
      background-image: url('@/pages/gardenParty/assets/mk5_10.png');
      background-size: 100% 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 130px;
    }
  }
  .rulesText {
    line-height: 45px;
    color: #96526f;
    font-weight: 500;
    white-space: nowrap;
    width: 605px;
    // margin-left: 40px;
    margin: 0 auto;
    li {
      position: relative;
      list-style-type: none;
      font-size: 28px;
      display: flex;
      align-items: center;
      span {
        position: absolute;
        top: 16px;
        left: -28px;
        width: 12px;
        height: 12px;
        background: #ffb5d4;
        border-radius: 50%;
      }
      i {
        color: #4f85ff;
      }
      img {
        width: 40px;
        height: 33px;
        margin: 0 5px;
      }
    }
  }
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
      .bigTip {
        text-align: center;
        margin-bottom: 10px;
      }
      .rewardsListDiv {
        width: 460px;
        margin: 0 auto;
        min-height: 300px;
        max-height: 600px;
        overflow-y: scroll;
        overflow-x: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: row wrap;
        .rewardItem {
          height: 180px;
          position: relative;
          &.special {
            width: 230px;
            .itemIcon {
              width: 218px;
              height: 128px;
              background: #fefaef;
              border-radius: 12px;
              border: 4px solid #ffd0e7;
              display: flex;
              justify-content: center;
              align-items: center;
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              img {
                width: 210px;
                height: 96px;
              }
            }
          }
          &.other {
            width: 150px;
            .itemIcon {
              width: 128px;
              height: 128px;
              background: #fefaef;
              border-radius: 12px;
              border: 4px solid #ffd0e7;
              display: flex;
              justify-content: center;
              align-items: center;
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              img {
                width: 120px;
                height: 120px;
              }
            }
          }
          .name {
            white-space: nowrap;
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
        background: linear-gradient(0deg, #fff9d1, #ffffff);
        border-radius: 36px;
        border: 2px solid #ffffff;
        margin: 10px auto 0px auto;
        font-size: 32px;
        color: #a9792c;
        line-height: 70px;
        text-align: center;
        &.title::after {
          content: '立即佩戴';
        }
        &.other::after {
          content: '我知道了';
        }
      }
    }
  }
}
</style>
