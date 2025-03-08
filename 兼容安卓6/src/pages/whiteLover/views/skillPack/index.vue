<template>
  <div class="skillPack-page">
    <div class="skillPack-page-top-box">
      <!-- 白色边框 -->
      <div
        style="
          border: 1px solid #fff;
          width: 100%;
          height: 100%;
          padding: 14px 10px 0;
          box-sizing: border-box;
        "
      >
        <div class="top-box-item">
          <div class="img-box">
            <img src="../../assets/mk6_1.png" alt="" />
          </div>
          <div class="text-box">
            <p>佛山无影脚</p>
            <p><span>每使用一次+20积分</span></p>
          </div>
        </div>
        <div class="top-box-item">
          <div class="img-box">
            <img src="../../assets/mk6_2.png" alt="" />
          </div>
          <div class="text-box">
            <p>唇齿相依</p>
            <p><span>每使用一次+15积分</span></p>
          </div>
        </div>
        <div class="top-box-item">
          <div class="img-box">
            <img src="../../assets/mk6_3.png" alt="" />
          </div>
          <div class="text-box">
            <p>空空妙手</p>
            <p><span>每使用一次+1积分</span></p>
          </div>
        </div>
        <div class="top-box-item">
          <div class="img-box">
            <img src="../../assets/mk6_4.png" alt="" />
          </div>
          <div class="text-box">
            <p>一阳指</p>
            <p><span>每使用一次+15积分</span></p>
          </div>
        </div>
        <div class="top-box-item">
          <div class="img-box">
            <img src="../../assets/mk6_5.png" alt="" />
          </div>
          <div class="text-box">
            <p>斗转星移</p>
            <p><span>每使用一次+10积分</span></p>
          </div>
        </div>
        <div class="skillPack-page-top-box-text">
          <!-- 说明文字 -->
          <ul>
            <li>活动期间内使用指定技能可获得1~20积分</li>
            <li>对自己使用技能不获得积分奖励</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="skillPack-page-bottom-box">
      <!-- 白色边框 -->
      <div class="border-box">
        <!-- 技能礼包 -->
        <div class="img-box" style="text-align: center">
          <img src="../../assets/title_6.png" alt="" />
        </div>
        <!-- 我的积分 -->
        <div class="bottom-top">我的积分 ：{{ skillPackData.skill_gifts }}</div>
        <div class="bottom-body">
          <!-- 领取项 -->
          <div
            v-for="(item, key) in skillPackData.hot_gift"
            :key="key"
            class="top-item"
          >
            <div class="img-box">
              <div class="img-top">
                <img
                  :src="require('../../assets/' + imgUrl(item.goods_icon))"
                  alt=""
                />
              </div>
              <div class="img-bottom">+{{ item.goods_num }}</div>
            </div>
            <div class="text-box">
              <p>
                消耗<span>{{ item.spend }}积分</span>兑换
              </p>
            </div>
            <div class="item-button" @click="onBottomClick(key)">兑换</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 请求接口导入
import { getSkillPackData } from '../../api/skillPack'
// 防抖节流
import { _throttle } from '../../utils/ThrottleAndDebounce'
export default {
  name: 'skillPack',
  components: {},
  props: {},
  data() {
    return {
      skillPackData: {}
    }
  },
  computed: {
    imgUrl() {
      return (url) => {
        return url.split('/')[url.split('/').length - 1]
      }
    }
  },
  watch: {},
  async created() {
    await this.getSkillPackData()
  },
  methods: {
    // 获取页面数据
    async getSkillPackData() {
      const { data } = await getSkillPackData({
        type: 'tab',
        mark: 'm6'
      })
      this.skillPackData = data
    },
    // 下方兑换请求
    async getBottomExcharge(payload) {
      const res = await getSkillPackData({
        ...payload,
        type: 'hot_gift'
      })
      return res
    },
    // 点击事件-下方兑换按钮
    // 节流
    onBottomClick: _throttle(async function (key) {
      const res = await this.getBottomExcharge({ mark: key })
      this.$toast(res.errmsg)
      await this.getSkillPackData()
    }, 2000)
  }
}
</script>

<style scoped lang="scss">
.skillPack-page {
  .skillPack-page-top-box,
  .skillPack-page-bottom-box {
    width: 100%;
    // 边框颜色
    border: 5px solid #7e86da;
    // 背景色
    background-color: #def2ff;
    box-sizing: border-box;
    margin-bottom: 38px;
  }
  .skillPack-page-top-box {
    .top-box-item {
      position: relative;
      box-shadow: 0px 3px 0px 0px #ffffff;
      border: 1px solid #ffffff;
      border-radius: 6px;
      display: flex;
      align-items: center;
      width: 100%;
      height: 66px;
      background: linear-gradient(-90deg, #a7c4ff, #828be2);
      margin-bottom: 10px;
      overflow: hidden;
      // 图片样式
      .img-box {
        width: 48px;
        height: 48px;
        margin-left: 16px;
        img {
          width: 100%;
        }
      }
      // 中间字体样式
      .text-box {
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: space-evenly;
        margin-left: 9px;
        p {
          font-size: 16px;

          color: #ffffff;
          span {
            font-size: 12px;
            color: #fffaa6;
          }
        }
      }
    }
    .skillPack-page-top-box-text {
      color: #595ec3;
      padding-left: 20px;
      padding-bottom: 10px;
      line-height: 25px;
      box-sizing: border-box;
      margin-top: 14px;
      li {
        padding-bottom: 5px;
      }
    }
  }
  .skillPack-page-bottom-box {
    // 兑换好礼图片标题
    position: relative;
    .border-box {
      border: 1px solid #fff;
      width: 100%;
      height: 100%;
      padding: 0 0 14px;
      box-sizing: border-box;
      > .img-box {
        position: absolute;
        width: 100%;
        top: -25px;
        // left: -20px;
        img {
          width: 262px;
        }
      }
      // 顶部数量
      .bottom-top {
        margin: 26px auto 12px;
        width: 160px;
        height: 24px;
        line-height: 24px;
        background: #99b2f9;
        border-radius: 12px;

        font-weight: 500;
        color: #ffffff;
        text-align: center;
      }
      .bottom-body {
        width: 100%;
        padding: 0 10px;
        box-sizing: border-box;
        // 每项样式
        .top-item {
          position: relative;
          margin-bottom: 11px;
          width: 100%;
          height: 66px;
          // 奖励项背景色
          background: linear-gradient(-90deg, #a7c4ff, #828be2);
          // 阴影
          box-shadow: 0px 3px 0px 0px #ffffff;
          border-radius: 6px;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          .img-box {
            width: 54px;
            height: 54px;
            // 奖励项左边边框背景图
            background: url('/src/pages/whiteLover/assets/mk4_9.png') no-repeat;
            background-size: 100% 100%;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            overflow: hidden;
            margin: 0 14px;
            // 奖励项图片样式
            .img-top {
              height: 38px;
              img {
                height: 38px;
              }
            }
            .img-bottom {
              // 奖励项图片下方样式
              background-color: #6872cc;
              font-size: 12px;

              font-weight: 500;
              color: #ffffff;
              width: 100%;
              height: 16px;
              text-align: center;
              line-height: 16px;
              border-radius: 0 0 6px 6px;
            }
          }
          .text-box {
            width: 180px;
            height: 100%;
            // 中间字体样式
            p {
              font-size: 15px;

              color: #ffffff;
              margin-top: 13px;
              span {
                color: #fffaa6;
              }
            }
          }
          // 右侧按钮
          .item-button {
            position: absolute;
            right: 16px;
            top: 19px;
            width: 64px;
            height: 34px;
            background: linear-gradient(0deg, #cae7ff, #ffffff);
            border: 2px solid #ffffff;
            border-radius: 33px;
            line-height: 33px;

            color: #4d7ddd;
            text-align: center;
            box-sizing: border-box;
          }
        }
      }
    }
  }
}
</style>
