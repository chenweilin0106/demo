<template>
  <div class="infoShow">
    <div class="player-container">
      <!-- <VideoPlayer></VideoPlayer> -->
    </div>
    <mySwipe></mySwipe>
    <div class="backgroundStory">
      <img class="story" src="../../assets/img_story.png" alt="" />
      <img
        v-if="gameWarmupData.gender == 1"
        class="story"
        src="../../assets/img_story.png"
        alt=""
      />
    </div>
    <div class="cover"></div>
    <myTurntable
      :lotteryStatus="gameWarmupData.lottery_status"
      :lotteryPool="gameWarmupData.lottery_pool"
      @updateData="getGameWarmup"
      @onClickLottery="onClickLottery"
    ></myTurntable>
    <div class="end-text-box">
      <p>活动由本公司组织并提供奖品</p>
      <p>与苹果公司无关</p>
    </div>
    <van-overlay :show="show" @click="close">
      <div class="wrapper" @click.stop="close">
        <div class="block">
          <div class="img_box" v-if="awardDetail.award_info">
            <img
              :src="require(`../../assets/${awardDetail.award_info.icon}`)"
              alt=""
            />
          </div>
          <div class="text_box" v-if="awardDetail.award_info">
            {{ awardDetail.award_info.name + awardDetail.award_info.text }}
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { getGameWarmup, getLottery } from '../../api/index'
import mySwipe from '../../components/swipe/index.vue'
import myTurntable from '../../components/turntable/index.vue'
export default {
  name: 'infoShow',
  components: {
    mySwipe,
    myTurntable
  },
  props: {},
  data() {
    return {
      time: null,
      show: false,
      gameWarmupData: {
        count_down: 977135,
        game_step: 1,
        gender: 0,
        lottery_pool: [
          {
            icon: 'icon_yb.png',
            id: 'gamegold',
            name: '元宝',
            nums: 50000,
            text: '+5万',
            type: 'property'
          },
          {
            icon: 'icon_zjs.png',
            id: 1,
            name: '紫晶石',
            nums: 3,
            text: '+3',
            type: 'tool'
          },
          {
            icon: 'icon_yb.png',
            id: 'gamegold',
            name: '元宝',
            nums: 20000,
            text: '+2万',
            type: 'property'
          },
          {
            icon: 'icon_ljs.png',
            id: 2,
            name: '绿晶石',
            nums: 10,
            text: '+10',
            type: 'tool'
          },
          {
            icon: 'icon_fbs.png',
            id: 9,
            name: '防爆石',
            nums: 3,
            text: '+3',
            type: 'tool'
          },
          {
            icon: 'icon_ljs.png',
            id: 2,
            name: '绿晶石',
            nums: 20,
            text: '+20',
            type: 'tool'
          }
        ]
      },
      awardDetail: {},
      count: 1,
      countTimer: null
    }
  },
  computed: {},
  watch: {},
  async created() {
    this.$store.commit(
      'user/getUidAndAccess_token',
      window.location.search.substring(1)
    )
    await this.getGameWarmup()
  },
  destroyed() {
    clearTimeout(this.countTimer)
    this.countTimer = null
  },
  methods: {
    // 退出弹框
    async close() {
      this.show = false
      await this.getGameWarmup()
    },
    // 抽奖
    async onClickLottery(e) {
      if (this.time) {
        return
      }
      if (this.gameWarmupData.lottery_status != 1) {
        return
      }
      let num = 1
      this.$sensors.quick('trackAllHeatMap', e.target, {
        activity_date: '20230420',
        element: '立即抽奖'
      })
      await this.getGameWarmup()
      this.gameWarmupData.lottery_pool[0].flag = false
      this.gameWarmupData.lottery_pool[1].flag = true
      this.time = setInterval(() => {
        if (num == 11) {
          this.gameWarmupData.lottery_pool[5].flag = false
          this.gameWarmupData.lottery_pool[0].flag = true
          if (this.gameWarmupData.lottery_pool[0].flag) {
            clearInterval(this.time)
            this.time = null
            this.handleLottery()
            return
          }
        } else {
          num += 1
          if (this.count >= 5) {
            this.count = 0
          } else {
            this.count += 1
          }
        }
        this.gameWarmupData.lottery_pool[
          this.count - 1 < 0 ? 5 : this.count - 1
        ].flag = false
        this.gameWarmupData.lottery_pool[this.count].flag = true
      }, 100)
    },
    async handleLottery() {
      await this.getLottery()
      this.show = true
    },
    // 封装抽奖接口
    async getLottery() {
      const { data } = await getLottery()
      this.awardDetail = data
    },
    // 封装页面信息接口
    async getGameWarmup() {
      const res = await getGameWarmup({
        mark: 'm1'
      })
      if (res.errno != 0) {
        return this.$toast(res.errmsg)
      } else {
        this.gameWarmupData = res.data
        // 如果小于等于2个小时，就开始开启定时器，时间到后跳转下一个游戏预热
        if (this.gameWarmupData.count_down <= 7200) {
          this.countTimer = setTimeout(() => {
            window.location.href = 'https://www.baidu.com/'
          }, this.gameWarmupData.count_down * 1000)
        }
        this.gameWarmupData.lottery_pool = this.gameWarmupData.lottery_pool.map(
          (item, index) => {
            return { ...item, flag: index == 0 ? true : false }
          }
        )
      }
    }
  }
}
</script>

<style scoped lang="scss">
.infoShow {
  margin-top: -130px;
  width: 100%;
  height: 2790px;
  background: url('../../assets/bg1.png') no-repeat;
  background-size: 100%;
  padding-top: 260px;
  box-sizing: border-box;
  position: relative;
  ::v-deep .van-overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    .wrapper {
      width: 100%;
      height: 231px;
    }

    .block {
      width: 100%;
      height: 100%;
      background: url('../../assets/img_congrate.png') no-repeat;
      background-size: 100%;
      background-position: center center;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .img_box {
        // margin-top: 40px;
        margin: 40px 0 10px;
        width: 41px;
        img {
          width: 100%;
        }
      }
      .text_box {
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #ffe3c9;
      }
    }
  }
  .player-container {
    margin-top: 100px;
    margin-bottom: 200px;
  }
  .video-js .vjs-icon-placeholder {
    width: 100%;
    height: 100%;
    display: block;
  }
  .backgroundStory {
    position: relative;
    width: 100%;
    height: 380px;
    padding-left: 65px;
    padding-bottom: 40px;
    overflow-y: scroll;
    margin-bottom: 160px;
    box-sizing: border-box;
    .story {
      width: 245px;
    }
  }
  .cover {
    position: absolute;
    top: 2012px;
    left: 31px;
    width: 305px;
    height: 60px;
    background: url('../../assets/img_paper.png') no-repeat;
    background-size: 100%;
  }
  .end-text-box {
    p {
      font-size: 13px;
      text-align: center;
      color: #faf3dd;
    }
  }
}
</style>
