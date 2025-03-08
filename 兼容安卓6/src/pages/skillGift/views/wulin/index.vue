<template>
  <div class="skillPack-page">
    <div class="theme_box skillPack-page-top-box">
      <div class="border_box">
        <!-- 白色边框 -->
        <div class="white_border">
          <div class="top-box-item theme_item_bgc_horizontal">
            <div class="img-box">
              <img src="../../assets/mk4_1.png" alt="" />
            </div>
            <div class="text-box">
              <p>佛山无影脚</p>
              <p><span>每使用一次+20积分</span></p>
            </div>
          </div>
          <div class="top-box-item theme_item_bgc_horizontal">
            <div class="img-box">
              <img src="../../assets/mk4_2.png" alt="" />
            </div>
            <div class="text-box">
              <p>唇齿相依</p>
              <p><span>每使用一次+15积分</span></p>
            </div>
          </div>
          <div class="top-box-item theme_item_bgc_horizontal">
            <div class="img-box">
              <img src="../../assets/mk4_3.png" alt="" />
            </div>
            <div class="text-box">
              <p>空空妙手</p>
              <p><span>每使用一次+1积分</span></p>
            </div>
          </div>
          <div class="top-box-item theme_item_bgc_horizontal">
            <div class="img-box">
              <img src="../../assets/mk4_4.png" alt="" />
            </div>
            <div class="text-box">
              <p>一阳指</p>
              <p><span>每使用一次+15积分</span></p>
            </div>
          </div>
          <div class="top-box-item theme_item_bgc_horizontal">
            <div class="img-box">
              <img src="../../assets/mk4_5.png" alt="" />
            </div>
            <div class="text-box">
              <p>斗转星移</p>
              <p><span>每使用一次+10积分</span></p>
            </div>
          </div>
          <div class="top-text skillPack-page-top-box-text">
            <!-- 说明文字 -->
            <ul>
              <li><span></span>活动期间内使用指定技能可获得1~20积分</li>
              <li><span></span>对自己使用技能不获得积分奖励</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="theme_box skillPack-page-bottom-box">
      <!-- 技能礼包 -->
      <div class="img-box" style="text-align: center">
        <img src="../../assets/title_4.png" alt="" />
      </div>
      <div class="border_box">
        <!-- 白色边框 -->
        <div class="white_border">
          <!-- 我的积分 -->
          <div class="theme_present bottom-top">我的积分 ：0</div>
          <div class="bottom-body">
            <!-- 领取项 -->
            <div
              v-for="(item, key) in wuLinData.hot_gift"
              :key="item.index"
              class="top-item theme_item_bgc_horizontal"
            >
              <div class="img-box">
                <div class="img-top">
                  <img
                    :src="require(`../../assets/${item.goods_icon}`)"
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
              <div
                class="item-button theme_botton_did"
                @click="onBottomClick(key)"
              >
                兑换
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 请求接口导入
import { getPageData } from '../../api/index'
export default {
  name: 'skillPack',
  components: {},
  props: {},
  data() {
    return {
      wuLinData: {
        skill_gifts: 0,
        hot_gift: {
          hot_100: {
            goods_icon: 'mk4_6.png',
            goods_id: 2,
            goods_name: '绿晶石',
            goods_num: 100,
            has_right: 1,
            index: 1,
            spend: 100
          },
          hot_450: {
            goods_icon: 'mk4_6.png',
            goods_id: 2,
            goods_name: '绿晶石',
            goods_num: 500,
            has_right: 1,
            index: 2,
            spend: 450
          },
          hot_900: {
            goods_icon: 'mk4_6.png',
            goods_id: 2,
            goods_name: '绿晶石',
            goods_num: 1000,
            has_right: 1,
            index: 3,
            spend: 900
          }
        }
      }
    }
  },
  computed: {},
  watch: {},
  async created() {
    await this.getSkillPackData()
  },
  methods: {
    // 获取页面数据
    async getSkillPackData() {
      const res = await getPageData({
        type: 'tab',
        mark: 'm4'
      })
      if (res.errno != 0) {
        return this.$toast(res.errmsg)
      }
      this.wuLinData = res.data
    },
    // 下方兑换请求
    async getBottomExcharge(mark) {
      const res = await getPageData({
        mark,
        type: 'hot_gift'
      })
      return res
    },
    // 点击事件-下方兑换按钮
    async onBottomClick(mark) {
      await this.getBottomExcharge(mark)
      await this.getSkillPackData()
    }
  }
}
</script>

<style scoped lang="scss">
.skillPack-page {
  .skillPack-page-top-box {
    .white_border {
      padding: 14px 10px;
      align-items: flex-start;
    }
    .top-box-item {
      position: relative;
      border-radius: 6px;
      display: flex;
      align-items: center;
      width: 100%;
      height: 66px;
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
      margin-left: 0px;
    }
  }
  .skillPack-page-bottom-box {
    // 兑换好礼图片标题
    position: relative;
    .white_border {
      padding-bottom: 15px;
    }
    // 顶部数量
    .bottom-top {
      margin: 26px auto 12px;
    }
    .bottom-body {
      width: 100%;
      padding: 0 10px;
      box-sizing: border-box;
      // 每项样式
      .top-item {
        position: relative;
        margin-bottom: 11px;
        height: 66px;
        border-radius: 6px;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        .img-box {
          width: 54px;
          height: 54px;
          // 奖励项左边边框背景图
          border: 2px solid #98bffb;
          border-radius: 6px;
          background-color: #ffffff;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          margin: 0 14px;
          // 奖励项图片样式
          .img-top {
            width: 100%;
            height: 36px;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              height: 100%;
            }
          }
          .img-bottom {
            // 奖励项图片下方样式
            background-color: #1647af;
            font-size: 12px;
            font-weight: 500;
            color: #ffffff;
            width: 100%;
            height: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
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
          width: 62px;
          height: 32px;
          border-radius: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
        }
      }
    }
  }
}
</style>
