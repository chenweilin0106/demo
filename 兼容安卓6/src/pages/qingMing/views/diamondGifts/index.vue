<template>
  <div class="diamondGifts">
    <div class="theme_box diamondGifts_top_box">
      <!-- 兑换好礼标题 -->
      <div class="img-box" style="text-align: center">
        <img src="../../assets/title_3.png" alt="" />
      </div>
      <!-- 白色边框 -->
      <div class="white_border">
        <div class="diamondGifts_top_body">
          <!-- 领取项 -->
          <div
            class="top-item theme_item_bgc_horizontal"
            v-for="(item, key) in diamondGiftsData.consume_status"
            :key="key"
          >
            <div class="img-box">
              <div class="img-top">
                <img src="../../assets/mk2_1.png" alt="" />
              </div>
              <div class="img-bottom">+{{ item.gamegold_text }}</div>
            </div>
            <div class="text-box">
              <p>
                累计消费<span>{{ key }}钻</span>
              </p>
              <p>({{ item.consume_nums }}/{{ key }})</p>
            </div>
            <div
              @click="onClickTop(item.has_right, key)"
              class="item-button-toDid theme_botton_undid"
              :class="{
                theme_botton_did: item.has_right == 1,
                theme_botton_done: item.has_right == 2
              }"
            >
              {{
                item.has_right == 0
                  ? '未完成'
                  : item.has_right == 1
                  ? '领取'
                  : item.has_right == 2
                  ? '已领取'
                  : ''
              }}
            </div>
          </div>
          <!-- 说明文字 -->
          <div class="top-text">
            <ul>
              <li><span></span>求婚时选择规模和信物的消费不计算在内</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="theme_box diamondGifts-bottom">
      <!-- 白色边框 -->
      <div class="white_border">
        <!-- tab切换 -->
        <div class="diamondGifts-bottom-tab">
          <router-link
            replace
            :to="{
              path: '/diamondGifts/giveRank'
            }"
            :class="{
              'a-active': $route.path === '/diamondGifts/giveRank'
            }"
          >
            赠送榜</router-link
          >
          <router-link
            replace
            :to="{
              path: '/diamondGifts/awardRank'
            }"
            :class="{
              'a-active': $route.path === '/diamondGifts/awardRank'
            }"
          >
            获赠榜</router-link
          >
        </div>
        <!-- 赠送榜和获赠榜 -->
        <router-view :diamondGiftsData="diamondGiftsData"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
// 接口导入
import { getDiamondGiftsData } from '../../api/diamondGifts'
export default {
  name: 'diamondGifts',
  components: {
    // czItem
  },
  props: {},
  data() {
    return {
      diamondGiftsData: {
        my_present: 0,
        my_profile_image:
          'http://cdn-image.dandan818.com/app/head/head_block_1.png',
        my_send_present: 0,
        my_username: '--',
        consume_status: {
          1000: {
            consume_nums: 0,
            gamegold_text: '5万',
            has_right: 0,
            is_daily: false,
            nums: 50000,
            tool_id: 'gamegold',
            type: 'property'
          },
          2000: {
            consume_nums: 0,
            gamegold_text: '10万',
            has_right: 0,
            is_daily: false,
            nums: 100000,
            tool_id: 'gamegold',
            type: 'property'
          },
          3000: {
            consume_nums: 0,
            gamegold_text: '15万',
            has_right: 0,
            is_daily: false,
            nums: 150000,
            tool_id: 'gamegold',
            type: 'property'
          },
          5000: {
            consume_nums: 0,
            gamegold_text: '20万',
            has_right: 0,
            is_daily: false,
            nums: 200000,
            tool_id: 'gamegold',
            type: 'property'
          },
          10000: {
            consume_nums: 0,
            gamegold_text: '40万',
            has_right: 0,
            is_daily: false,
            nums: 400000,
            tool_id: 'gamegold',
            type: 'property'
          },
          20000: {
            consume_nums: 0,
            gamegold_text: '60万',
            has_right: 0,
            is_daily: false,
            nums: 600000,
            tool_id: 'gamegold',
            type: 'property'
          },
          30000: {
            consume_nums: 0,
            gamegold_text: '85万',
            has_right: 0,
            is_daily: false,
            nums: 850000,
            tool_id: 'gamegold',
            type: 'property'
          },
          50000: {
            consume_nums: 0,
            gamegold_text: '130万',
            has_right: 0,
            is_daily: false,
            nums: 1300000,
            tool_id: 'gamegold',
            type: 'property'
          },
          100000: {
            consume_nums: 0,
            gamegold_text: '200万',
            has_right: 0,
            is_daily: false,
            nums: 2000000,
            tool_id: 'gamegold',
            type: 'property'
          }
        },
        present_top: [
          {
            profile_image:
              'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            time: '--',
            tool_nums: 1000,
            uid: '',
            username: '虚位以待'
          },
          {
            profile_image:
              'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            time: '--',
            tool_nums: 800,
            uid: '',
            username: '虚位以待'
          },
          {
            profile_image:
              'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            time: '--',
            tool_nums: 600,
            uid: '',
            username: '虚位以待'
          },
          {
            profile_image:
              'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            time: '--',
            tool_nums: 300,
            uid: '',
            username: '虚位以待'
          },
          {
            profile_image:
              'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            time: '--',
            tool_nums: 300,
            uid: '',
            username: '虚位以待'
          },
          {
            profile_image:
              'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            time: '--',
            tool_nums: 300,
            uid: '',
            username: '虚位以待'
          },
          {
            profile_image:
              'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            time: '--',
            tool_nums: 300,
            uid: '',
            username: '虚位以待'
          },
          {
            profile_image:
              'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            time: '--',
            tool_nums: 300,
            uid: '',
            username: '虚位以待'
          },
          {
            profile_image:
              'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            time: '--',
            tool_nums: 300,
            uid: '',
            username: '虚位以待'
          },
          {
            profile_image:
              'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            time: '--',
            tool_nums: 300,
            uid: '',
            username: '虚位以待'
          }
        ],
        send_present_top: [
          {
            profile_image:
              'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            time: '--',
            tool_nums: 1000,
            uid: '',
            username: '虚位以待'
          },
          {
            profile_image:
              'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            time: '--',
            tool_nums: 800,
            uid: '',
            username: '虚位以待'
          },
          {
            profile_image:
              'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            time: '--',
            tool_nums: 600,
            uid: '',
            username: '虚位以待'
          },
          {
            profile_image:
              'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            time: '--',
            tool_nums: 300,
            uid: '',
            username: '虚位以待'
          },
          {
            profile_image:
              'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            time: '--',
            tool_nums: 300,
            uid: '',
            username: '虚位以待'
          },
          {
            profile_image:
              'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            time: '--',
            tool_nums: 300,
            uid: '',
            username: '虚位以待'
          },
          {
            profile_image:
              'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            time: '--',
            tool_nums: 300,
            uid: '',
            username: '虚位以待'
          },
          {
            profile_image:
              'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            time: '--',
            tool_nums: 300,
            uid: '',
            username: '虚位以待'
          },
          {
            profile_image:
              'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            time: '--',
            tool_nums: 300,
            uid: '',
            username: '虚位以待'
          },
          {
            profile_image:
              'https://cdn-image.dandan818.com/app/activity/head/no_seat_white.png',
            time: '--',
            tool_nums: 300,
            uid: '',
            username: '虚位以待'
          }
        ],
        uid: '0'
      }
    }
  },
  computed: {
    consume_status() {
      return this.diamondGiftsData.consume_status
    }
  },
  watch: {},
  async created() {
    await this.getDiamondGiftsData()
  },
  methods: {
    // 累计消费点击事件
    async onClickTop(flag, mark) {
      if (flag === 1) {
        const res = await this.getAward(mark)
        this.$toast(res.errmsg)
        await this.getDiamondGiftsData()
      }
    },
    // 累计消费按钮接口
    async getAward(mark) {
      const res = await getDiamondGiftsData({
        type: 'consume_reward',
        mark
      })
      return res
    },
    // 获取页面数据接口
    async getDiamondGiftsData() {
      const res = await getDiamondGiftsData({
        type: 'tab',
        mark: 'm3'
      })
      if (res.errno != 0) {
        return this.$toast(res.errmsg)
      }
      this.diamondGiftsData = res.data
    }
  }
}
</script>

<style scoped lang="scss">
.diamondGifts {
  margin-top: 35px !important;
  // 奖励兑换 下方box
  .diamondGifts_top_box {
    .white_border {
      padding: 30px 10px 10px;
    }
    .diamondGifts_top_body {
      width: 100%;
      .top-item {
        position: relative;
        margin-bottom: 11px;
        width: 100%;
        height: 66px;
        // background: linear-gradient(-90deg, #7ea1e9, #4dafb5);
        // box-shadow: 0px 3px 0px 0px #a2cbf1;
        // border-radius: 6px;
        display: flex;
        box-sizing: border-box;
        .img-box {
          width: 52px;
          height: 52px;
          // 奖励项左边边框背景图
          background: #fefaef;
          border: 2px solid #7cd2d7;
          border-radius: 6px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          margin: 6px 13px 0 14px;
          // 奖励项图片样式
          .img-top {
            position: relative;
            width: 100%;
            height: 34px;
            text-align: center;
            img {
              height: 100%;
            }
          }
          .img-bottom {
            // 奖励项图片下方样式
            background: #27707f;
            font-size: 12px;
            font-weight: 500;
            color: #ffffff;
            width: 50px;
            height: 16px;
            text-align: center;
            line-height: 15px;
            border-radius: 0 0 6px 6px;
          }
        }
        .text-box {
          width: 180px;
          height: 100%;
          // 中间字体样式
          p:nth-child(1) {
            font-size: 15px;
            color: #ffffff;
            margin-top: 15px;
            span {
              color: #fffaa6;
            }
          }
          p:nth-child(2) {
            font-size: 12px;
            color: #fffaa6;
            margin-top: 8px;
          }
        }
        // 右侧按钮
        // 去完成
        .item-button-toDid {
          position: absolute;
          right: 16px;
          top: 19px;
          width: 64px;
          height: 34px;
          // background: linear-gradient(0deg, #fff6c1, #ffffff);
          border: 2px solid #ffffff;
          border-radius: 34px;
          box-sizing: border-box;
          // color: #b28d2b;
          text-align: center;
          line-height: 32px;
        }
        // 领取
        .item-button-did {
          background: linear-gradient(0deg, #e99b13, #f9e16e) !important;
          color: #fff !important;
        }
        // 已领取
        .item-button-get {
          background: linear-gradient(0deg, #9d9d9d, #e7e7e7) !important;
          color: #fff !important;
        }
      }
      // 下方说明字体样式
      .top-text {
        margin-left: 5px;
        color: #107094;
        line-height: 25px;
        li {
          position: relative;
          span {
            position: absolute;
            top: 10px;
            left: -13px;
            display: block;
            width: 6px;
            height: 6px;
            background: #54b39e;
            border-radius: 50%;
            margin-right: 10px;
          }
          list-style-type: none;
          margin-left: 10px;
        }
      }
    }
  }
  .diamondGifts-bottom {
    margin-top: 30px;
    .diamondGifts-bottom-tab {
      width: 100%;
      margin-bottom: 10px;
      display: flex;
      height: 50px;
      a {
        flex: 1;
        height: 39px;
        font-size: 16px;
        color: #f1f8ff;
        background: #126a8b;
        text-align: center;
        line-height: 36px;
        text-decoration: none;
      }
      // 底部tab栏活动
      .a-active {
        color: #126a8b !important;
        font-size: 20px !important;
        font-weight: 500 !important;
        background: url('../../assets/mk2_11.png') no-repeat !important;
        background-size: 100% 100% !important;
        height: 50px !important;
      }
    }
  }
}
</style>
