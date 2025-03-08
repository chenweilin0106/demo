<template>
  <out-box class="draw_box">
    <div class="Probability_des" @click="$emit('showPro')">概率说明</div>
    <div class="draw_awards">
      <div
        class="draw_item"
        :class="{ residueDegree: index == 4 }"
        v-for="(item, index) in pageData1.lottery_pool.length + 1"
        :key="index"
      >
        <div class="light" v-show="islight(index)"></div>
        <div class="icon" v-if="index != 4">
          <img
            :src="IconPath(pageData1.lottery_pool[map2[index]].icon)"
            alt=""
          />
        </div>
        <div class="name" v-if="index != 4">
          {{ pageData1.lottery_pool[map2[index]].text }}
        </div>
        <div class="tit" v-if="index == 4">剩余抽奖次数</div>
        <div class="time" v-if="index == 4">{{ pageData1.lottery_ticket }}</div>
      </div>
    </div>
    <div class="draw_info">
      <!-- <div class="left_tip">剩余抽奖机会：{{ pageData1.lottery_ticket }}</div> -->
      <div class="right_tip">已消费：{{ pageData1.consume }}钻</div>
    </div>
    <div class="draw_selects">
      <div class="select_item" @click="changeSelectType(1)">
        抽一次
        <div class="draw_point" v-if="select_type == 1">抽一次</div>
      </div>
      <div class="select_item" @click="changeSelectType(2)">
        抽十次
        <div class="draw_point" v-if="select_type == 2">抽十次</div>
      </div>
      <div class="select_item" @click="changeSelectType(3)">
        抽百次
        <div class="draw_point" v-if="select_type == 3">抽百次</div>
      </div>
    </div>
    <div class="draw_now" @click="draw"></div>
    <!-- 说明文字 -->
    <div class="caption">
      <ul>
        <li><span></span>活动期间<i>每消费200钻石</i>可得一次抽奖机会</li>
        <li>
          <span></span>每抽奖一次可得1张礼券
          <img :src="IconPath('mk6_5.png')" alt="" />
          ，每100张礼券<img
            :src="IconPath('mk6_5.png')"
            alt=""
          />可兑换一份大奖，大奖可在奖池中自选
        </li>
      </ul>
    </div>
  </out-box>
</template>

<script>
import { getPageData } from '../../../api/index'
export default {
  name: 'drawBox',
  data() {
    return {
      select_type: 1,
      selectIndex: 1,
      selectArr: [],
      horseTimer: null, // 跑马灯定时器
      map2: {
        0: 0,
        1: 1,
        2: 2,
        3: 7,
        5: 3,
        6: 6,
        7: 5,
        8: 4
      },
      awardData: [],
      map1: {
        1: 1,
        2: 2,
        3: 3,
        4: 6,
        5: 9,
        6: 8,
        7: 7,
        8: 4
      }
    }
  },
  props: ['pageData1'],
  computed: {
    selectFlag: {
      get() {
        return this.map1[this.selectIndex]
      }
      // set(value) {}
    }
  },
  created() {
    if (!window.localStorage.getItem('select_type')) {
      window.localStorage.setItem('select_type', this.select_type)
    } else {
      this.select_type = window.localStorage.getItem('select_type')
    }
  },
  methods: {
    islight(index) {
      return this.selectFlag == index + 1 || this.selectArr.includes(index + 1)
    },
    changeSelectType(i) {
      if (this.select_type == i) {
        return
      }
      this.select_type = i
      window.localStorage.setItem('select_type', this.select_type)
    },
    // 抽奖跑马灯
    horselight(speed, data, type, number) {
      // 跑马灯速度，请求数据 ，抽奖次数，跑马灯固定转圈数
      console.log(data, '抽奖数据')
      clearInterval(this.horseTimer)
      let nums = 0
      this.selectArr = []
      if (type == 2) {
        this.selectIndex = 1
      }
      this.horseTimer = setInterval(() => {
        if (nums / 8 >= number) {
          // 转完固定圈数
          // 填充抽到的奖励数组
          if (data.includes(this.selectIndex)) {
            const i = this.selectFlag
            this.selectArr.push(i)
          }
          // 转到最后一个奖励就停止
          if (this.selectIndex >= Math.max(...data)) {
            clearInterval(this.horseTimer)
            this.$emit('showCongrat', this.awardData)
          } else {
            this.selectIndex++
          }
        } else {
          // 没转完固定圈数
          nums++
          this.selectIndex == 8 ? (this.selectIndex = 1) : this.selectIndex++
        }
      }, speed)
    },
    async draw(mark) {
      this.select_type == 1
        ? (mark = 1)
        : this.select_type == 2
        ? (mark = 10)
        : (mark = 100)
      const res = await getPageData({
        type: 'title_lottery_multi',
        mark // 抽奖次数：1-抽一次，10-抽10次，100-抽100次
      })
      if (res.errno == 0) {
        // 跑马灯数组
        const arr = res.data.awards.map((item) => {
          return (item = item.id)
        })
        this.horselight(80, arr, 2, 1)
        // 恭喜获得奖励数组
        this.awardData = res.data.awards.map((item) => {
          return (item = item.awards)
        })
        // 更新主页数据
        this.$emit('init')
      } else {
        this.$toast(res.errmsg)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.draw_box {
  width: 710px;
  height: 1194px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  .Probability_des {
    position: absolute;
    top: -8px;
    right: 7px;
    width: 170px;
    height: 50px;
    background: linear-gradient(-90deg, #ffb82f, #5da595);
    border: 2px solid #e0b25b;
    border-radius: 25px 20px 0px 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
  }
  .draw_awards {
    width: 680px;
    height: 683px;
    background: linear-gradient(180deg, #fc8137, #ffbb45);
    border-radius: 40px;
    margin-top: 57px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 17px 16px 0;
    .draw_item {
      width: 206px;
      height: 207px;
      background-image: url('../../../assets/mk6_2.png');
      background-size: 100% 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      .light {
        width: 246px;
        height: 248px;
        background-image: url('../../../assets/mk6_1.png');
        background-size: 100% 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      .icon {
        margin-top: 32px;
        width: 110px;
        height: 110px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .name {
        margin-top: 8px;
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
      }
    }
    .residueDegree {
      background: transparent;
      display: flex;
      flex-direction: column;
      align-items: center;
      .tit {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #ffffff;
        margin-top: 58px;
      }
      .time {
        margin-top: 28px;
        font-size: 60px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #fff36c;
      }
    }
  }
  .draw_info {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 16px;
    .left_tip {
      width: 312px;
      height: 46px;
      background: #f5deac;
      border-radius: 23px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #b54a08;
      margin-left: 5px;
    }
    .right_tip {
      height: 46px;
      background: #f5deac;
      border-radius: 23px;
      margin-right: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #b54a08;
      padding: 0 38px;
    }
  }
  .draw_selects {
    width: 480px;
    height: 48px;
    background: #df944a;
    border-radius: 24px;
    position: relative;
    margin-top: 21px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 39px;
    .select_item {
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      position: relative;
      .draw_point {
        position: absolute;
        width: 160px;
        height: 62px;
        background-image: url('../../../assets/mk6_3.png');
        background-size: 100% 100%;
        left: 50%;
        transform: translateX(-50%);
        top: -11px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 9px;
      }
    }
  }
  .draw_now {
    margin-top: 18px;
    width: 446px;
    height: 117px;
    background-image: url('../../../assets/mk6_4.png');
    background-size: 100% 100%;
  }
  .caption {
    margin-top: 13px;
    margin-left: 64px;
    align-self: flex-start;
    li {
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ab5e1a;
      position: relative;
      width: 595px;
      line-height: 44px;
      i {
        color: #f52f0e;
      }
      span {
        width: 12px;
        height: 12px;
        background: #e56c3e;
        border-radius: 50%;
        position: absolute;
        top: 15px;
        left: -29px;
      }
      img {
        width: 40px;
        height: 33px;
      }
    }
  }
}
</style>
