<template>
  <van-popup v-model="showPopup" @closed="clickClose">
    <div class="popup-content">
      <!--标题图片-->
      <img class="title-image" :src="IconPath('title_9.png')" />

      <div class="inner-bgc">
        <!-- 剩余 -->
        <div class="remain_num flex-center">
          剩余{{ toolName }}：{{ goodsNum }}
        </div>
        <!-- 称号列表渲染 -->
        <div class="title_list">
          <div
            class="titleBox_item"
            v-for="item in titleData"
            :key="item.goods_id"
          >
            <div class="title_json_box flex-center" @click="onChecked(item)">
              <PublicJson
                v-if="title_data[item.goods_id]?.name"
                :jsonName="title_data[item.goods_id].name"
              />
              <img v-else :src="IconPath(title_data[item.goods_id].icon)" />
            </div>
            <!-- 右下角勾选框 -->
            <div class="checkBox" @click="onChecked(item)">
              <img :src="IconPath(checkedIcon(item))" />
            </div>
            <!-- 称号名称 -->
            <div class="title_name flex-center" @click.stop>永久称号</div>
          </div>
        </div>
        <!-- 共消耗 -->
        <div class="total-miles flex-center">
          共消耗{{ toolName }}：{{ totalSpend }}
        </div>
        <!-- 按钮 -->
        <div class="button flex-center" @click="excharge">兑换</div>
      </div>
    </div>
  </van-popup>
</template>

<script>
import PublicJson from '@/components/PublicJson.vue'
import { getPageData } from '@/api'

export default {
  components: { PublicJson },
  props: ['goodsNum', 'toolName'],
  data() {
    return {
      showPopup: false,
      // 选中头饰数据
      checkedTitleArr: [],
      titleData: [
        {
          goods_id: 1,
          has_right: 0,
          price: 600
        },
        {
          goods_id: 2,
          has_right: 0,
          price: 600
        },
        {
          goods_id: 3,
          has_right: 0,
          price: 600
        },
        {
          goods_id: 4,
          has_right: 0,
          price: 600
        },
        {
          goods_id: 5,
          has_right: 0,
          price: 600
        },
        {
          goods_id: 6,
          has_right: 0,
          price: 600
        },
        {
          goods_id: 7,
          has_right: 0,
          price: 600
        },
        {
          goods_id: 8,
          has_right: 0,
          price: 600
        }
      ],
      // 称号数据
      title_data: {
        1: {
          name: 'ch_cwcd'
        },
        2: {
          name: 'ch_lltt'
        },
        3: {
          name: 'ch_qmox'
        },
        4: {
          name: 'ch_jdtj'
        },
        5: {
          name: 'ch_bfxg'
        },
        6: {
          name: 'ch_dbyf'
        },
        7: {
          name: 'ch_jsws'
        },
        8: {
          name: 'ch_wxkj'
        }
      }
    }
  },
  computed: {
    // 勾选框图片
    // 有三种状态，选中、未选中、已拥有
    // 选中：tk_1.png
    // 未选中：tk_2.png
    // 已拥有：tk_3.png
    checkedIcon() {
      return (data) => {
        if (data.has_right == '2') {
          return 'tk_3.png'
        } else {
          return this.checkedTitleArr.some(
            (item) => item.goods_id == data.goods_id
          )
            ? 'tk_5.png'
            : 'tk_2.png'
        }
      }
    },
    /* 共消耗数量 */
    totalSpend() {
      return this.checkedTitleArr.reduce((total, item) => {
        return total + item.price
      }, 0)
    }
  },
  methods: {
    // 称号返场兑换弹框 兑换称号
    async exchangeTitle(array) {
      if (array.length == 0) {
        this.$toast('当前未勾选称号')
        return (this.showPopup = false)
      }
      const res = await getPageData({
        type: 'pop_exchange_titles',
        mark: JSON.stringify({ ids: array })
      })
      this.$toast(res.errmsg)
      if (res.errno == 0) this.$emit('update', res.data.user_mileages)
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
      this.$emit('close')
      document.querySelector('html').style.overflow = 'auto'
    },
    // 打开弹框
    async openPrompt() {
      if (this.goodsNum < 1) return this.$toast(`${this.toolName}不足`)
      const res = await getPageData({ type: 'point_reward_return_titles' })
      if (res.errno) return this.$toast(res.errmsg)
      this.checkedTitleArr = []
      this.titleData = res.data.list
      document.querySelector('html').style.overflow = 'hidden'
      this.showPopup = true
    },
    touchmove(e) {
      const el = e.target
      const scrollTop = el.scrollTop
      const scrollHeight = el.scrollHeight
      const height = el.clientHeight
      const deltaY = e.deltaY
      const isTop = scrollTop === 0
      const isBottom = scrollTop + height >= scrollHeight
      if ((deltaY < 0 && isTop) || (deltaY > 0 && isBottom)) {
        e.preventDefault()
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
}

.popup-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 612px;
  height: 880px;
  background-color: #fff;
  border: 6px solid #ffce4a;
  padding: 4px;
  border-radius: 30px;
}

.title-image {
  width: 439px;
  height: 214px;
  position: absolute;
  top: -118px;
  left: 50%;
  transform: translateX(-50%);
  pointer-events: none;
}

.inner-bgc {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #955913, #d7812d);
  overflow: hidden;
  border-radius: 20px;
  padding-top: 78px;
}

.remain_num {
  margin: 50px 0 30px;
  font-size: 32px;
  color: #ffffff;
}

.title_list {
  width: 100%;
  height: 452px;
  overflow-y: scroll;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
  pointer-events: auto;

  .titleBox_item {
    position: relative;

    &:nth-of-type(2n + 1) {
      margin-right: 30px;
    }

    // 称号json容器
    .title_json_box {
      width: 188px;
      height: 128px;
      border: 4px solid #826cf7;
      border-radius: 16px;
      background: #fff;

      > img {
        width: 100%;
      }

      .PublicJson {
        width: 95%;
      }
    }

    // 选择框
    .checkBox {
      position: absolute;
      bottom: 52px;
      right: -18px;
      width: 54px;
      height: 54px;

      img {
        width: 100%;
      }
    }

    // 称号名称
    .title_name {
      margin: 10px 0 14px;
      font-size: 28px;
      color: #ffffff;
    }
  }
}

.total-miles {
  margin: 25px 0 25px;
  font-size: 32px;
  color: #ffffff;
}

.button {
  margin: 0 auto;
  width: 324px;
  height: 86px;
  border-radius: 38px;
  font-size: 32px;
  background: linear-gradient(0deg, #fff9d1, #ffffff);
  border: 2px solid #ffffff;
  color: #a9792c;
}
</style>
