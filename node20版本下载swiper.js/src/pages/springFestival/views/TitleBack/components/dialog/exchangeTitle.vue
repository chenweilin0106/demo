<template>
  <van-popup
    v-model="showPopup"
    @closed="clickClose"
    :lock-scroll="true"
    close-on-click-overlay
    @click="showPopup = false"
  >
    <div class="popup-content" @click.stop>
      <!--标题图片-->
      <img class="title-image" :src="IconPath('title_21.png')" />

      <div class="inner-content">
        <div class="main-content">
          <!-- 剩余礼券 -->
          <div class="remainder">
            剩余礼券<img :src="IconPath('mk6_5.png')" alt="" />：{{
              pageData1.gift_ticket
            }}
          </div>
          <!--列表-->
          <div class="list">
            <div v-for="(item, index) in titleData" :key="index" class="award">
              <!--边框-->
              <div class="icon" :id="item.tool_id == 5054 && 'ch_dbyf'">
                <!--图片背景色-->
                <div class="icon-main">
                  <PublicJson
                    v-if="title_data[item.goods_id]?.name"
                    :jsonName="title_data[item.goods_id].name"
                  ></PublicJson>
                  <img v-else :src="IconPath(title_data[item.goods_id].icon)" />
                </div>
                <!-- 复选框 -->
                <div class="check_box" @click="onChecked(item)">
                  <img :src="IconPath(checkedIcon(item))" alt="" />
                </div>
              </div>

              <!--文本-->
              <div class="text">永久称号</div>
            </div>
          </div>
          <div class="spend">
            共消耗<img :src="IconPath('mk6_5.png')" alt="" />：{{ totalSpend }}
          </div>

          <!--按钮-->
          <div class="button" @click="excharge">兑换</div>
        </div>
        <img class="bottom-icon" :src="IconPath('tk_5.png')" />
        <img class="prompt-bg" :src="IconPath('tk_4.png')" />
      </div>
    </div>
  </van-popup>
</template>

<script>
// 引入接口
import { getPageData } from '../../../../api/index'
import PublicJson from '../../../../components/PublicJson.vue'

export default {
  components: { PublicJson },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    pageData1: {}
  },

  async created() {},
  mounted() {},
  watch: {
    showPopup: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.checkedTitleArr = []
          document.querySelector('html').style.overflow = 'hidden'
          this.init()
        } else {
          document.querySelector('html').style.overflow = 'auto'
        }
      }
    }
  },
  data() {
    return {
      showPopup: false,
      // 选中头饰数据
      checkedTitleArr: [],
      titleData: [
        {
          goods_id: 1,
          has_right: 0,
          price: 100
        },
        {
          goods_id: 2,
          has_right: 0,
          price: 100
        },
        {
          goods_id: 3,
          has_right: 0,
          price: 100
        },
        {
          goods_id: 4,
          has_right: 0,
          price: 100
        },
        {
          goods_id: 5,
          has_right: 0,
          price: 100
        },
        {
          goods_id: 6,
          has_right: 0,
          price: 100
        },
        {
          goods_id: 7,
          has_right: 0,
          price: 100
        },
        {
          goods_id: 8,
          has_right: 0,
          price: 100
        },
        {
          goods_id: 9,
          has_right: 0,
          price: 100
        },
        {
          goods_id: 10,
          has_right: 0,
          price: 100
        }
      ],
      // 称号数据
      title_data: {
        1: {
          icon: 'https://imagevo.dandanvoice.com/activity/weekly/gif/ch_fyll.gif'
        },
        2: {
          icon: 'https://imagevo.dandanvoice.com/activity/weekly/gif/ch_yqmm.gif'
        },
        3: {
          icon: 'https://imagevo.dandanvoice.com/activity/weekly/gif/ch_dynz.gif'
        },
        4: {
          icon: 'https://imagevo.dandanvoice.com/activity/weekly/gif/ch_ndts.gif'
        },
        5: {
          icon: 'https://imagevo.dandanvoice.com/activity/weekly/gif/ch_drjl.gif'
        },
        6: {
          icon: 'https://imagevo.dandanvoice.com/activity/weekly/gif/ch_xjl.gif'
        },
        7: {
          icon: 'https://imagevo.dandanvoice.com/activity/weekly/gif/ch_lmcd.gif'
        },
        8: {
          icon: 'https://imagevo.dandanvoice.com/activity/weekly/gif/ch_bxcm.gif'
        },
        9: {
          icon: 'https://imagevo.dandanvoice.com/activity/weekly/gif/ch_mldr.gif'
        },
        10: {
          icon: 'https://imagevo.dandanvoice.com/activity/weekly/gif/ch_dtldybh.gif'
        }
      }
    }
  },
  computed: {
    checkedIcon() {
      return (data) => {
        if (data.has_right == '2') {
          return 'tk_17.png'
        } else {
          return this.checkedTitleArr.some(
            (item) => item.goods_id == data.goods_id
          )
            ? 'tk_15.png'
            : 'tk_16.png'
        }
      }
    },
    /* 共消耗数量 */
    totalSpend() {
      return this.checkedTitleArr.reduce((total, item) => {
        return total + 100
      }, 0)
    }
  },
  methods: {
    async init() {
      const res = await getPageData({
        type: 'title_return_list'
      })
      console.log(res)
      if (res.errno == 0) {
        this.titleData = res.data.list
        this.$emit('init')
      } else {
        this.$toast(res.errmsg)
      }
    },
    // 称号返场兑换弹框 兑换称号
    async exchangeTitle(array) {
      if (array.length == 0) {
        this.$toast('当前未勾选称号')
        return (this.showPopup = false)
      }
      const res = await getPageData({
        type: 'title_return_exchange',
        mark: JSON.stringify({ ids: array })
      })
      this.$toast(res.errmsg)
      if (res.errno == 0) {
        this.$emit('init')
      }
      this.showPopup = false
    },
    excharge() {
      const array = this.checkedTitleArr.map((item) => item.goods_id)
      this.exchangeTitle(array)
    },
    // 选择头饰
    onChecked(params) {
      // 根据称号标识筛选出点击头饰数据，判断该称号是否已拥有
      if (params.has_right == 2) return this.$toast('已拥有此称号')
      // 更新本地选中头饰数据，计算属性会根据选中头饰数量更新共消耗
      // 筛选出选中头饰数据，更新本地选中头饰数据
      const flag = this.checkedTitleArr.some(
        (item) => item.goods_id == params.goods_id
      )
      if (flag) {
        this.checkedTitleArr = this.checkedTitleArr.filter(
          (item) => item.goods_id !== params.goods_id
        )
      } else {
        this.checkedTitleArr.push(params)
      }
    },

    clickClose() {
      this.showPopup = false
    }
  }
}
</script>

<style scoped lang="scss">
.van-popup {
  width: 100%;
  height: 100%;
  background-color: transparent;
  //   pointer-events: none;
}

.popup-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 609px;
  min-height: 418px;
  height: fit-content;
  pointer-events: auto;
  padding: 5px;
  border: 3px solid rgba(255, 220, 122, 0.5);
  //border-bottom: none;
  border-radius: 60px;
  background-color: transparent;

  .inner-content {
    width: 100%;
    min-height: 418px;
    border: 4px solid #ffdc7a;
    border-radius: 52px;
    background: linear-gradient(0deg, #fdb13e, #ea6243) no-repeat;
    background-size: 100% 100%;
    border-bottom: none;
    .main-content {
      position: relative;
      z-index: 4;
      width: 100%;
      min-height: 418px;
      padding-bottom: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .remainder,
      .spend {
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        margin-top: 70px;
        img {
          width: 40px;
          height: 33px;
          margin: 0 6px;
        }
      }
      .spend {
        margin-top: 20px;
      }
    }
    .bottom-icon {
      position: absolute;
      z-index: 3;
      bottom: -40px;
      left: 50%;
      transform: translateX(-50%);
      width: 704px;
      height: 307px;
      //opacity: 0.5;
    }

    .prompt-bg {
      position: absolute;
      z-index: 2;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }
}

.title-image {
  width: 598px;
  height: 188px;
  position: absolute;
  top: -143px;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
}

.list {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 26px;
  height: 450px;
  overflow-y: scroll;

  .award {
    margin: 0 0px 13px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .icon {
      width: 180px;
      height: 120px;
      background: #ffffff;
      border: 4px solid #d14514;
      border-radius: 12px;
      padding: 4px;
      position: relative;

      .icon-main {
        width: 100%;
        height: 100%;
        background-color: #fff;
        border-radius: 12px;
        display: flex;
        align-items: center;
        img {
          width: 100%;
        }
      }
      .check_box {
        width: 53px;
        height: 53px;
        position: absolute;
        bottom: -6px;
        right: -23px;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    #ch_dbyf {
      width: 180px;
      height: 128px;
    }

    .text {
      margin-top: 14px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28px;
      color: #ffffff;
      white-space: nowrap;
    }

    /* 选择第2，5，8等元素 */
    &:nth-child(2n) {
      /* 样式规则 */
      margin-left: 69px;
    }
  }
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 25px auto 0;
  width: 324px;
  height: 76px;
  background: linear-gradient(0deg, #fff9d1, #ffffff);
  border: 2px solid #ffffff;
  border-radius: 38px;
  font-size: 32px;
  color: #a9792c;
}
</style>
