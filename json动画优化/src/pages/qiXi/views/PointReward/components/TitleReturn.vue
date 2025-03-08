<template>
  <div class="TitleReturn">
    <!-- 称号列表渲染 -->
    <div class="title_list">
      <div class="titleBox_item" v-for="item in titleData" :key="item.id">
        <div class="title_json_box flex_across" @click="handleCheck(item)">
          <img v-if="item.icon" :src="IconPath(item.icon)" />
          <PublicJson
            v-else
            :lottieJson_name="title_data[item.id].name"
            :lottieJson="title_data[item.id].data"
          ></PublicJson>
        </div>
        <!-- 右下角勾选框 -->
        <div class="checkBox" @click="handleCheck(item)">
          <img :src="IconPath(checkedIcon(item))" />
        </div>
        <!-- 称号名称 -->
        <div class="title_name flex_across" @click.stop>永久称号</div>
      </div>
    </div>
  </div>
</template>

<script>
// 佳偶天成
import ch_jotc from '../../../assets/lottie/ch_jotc/data.json'
// 最佳情人
import ch_zjqr from '../../../assets/lottie/ch_zjqr/data.json'
// 天仙配红
import ch_txp_red from '../../../assets/lottie/ch_txp_red/data.json'
// 天仙配蓝
import ch_txp_blue from '../../../assets/lottie/ch_txp_blue/data.json'
// 一世一双人1
import ch_ysysr1 from '../../../assets/lottie/ch_ysysr1/data.json'
// 一世一双人2
import ch_ysysr2 from '../../../assets/lottie/ch_ysysr2/data.json'
// json组件
import PublicJson from '../../../components/PublicJson'
export default {
  name: 'TitleReturn',
  components: {
    PublicJson
  },
  props: ['titleData'],
  data() {
    return {
      // 选中头饰数据（仅占位，未完善）
      checkedTitle: [],
      // 称号数据
      title_data: {
        4870: {
          name: 'ch_txp_blue',
          data: ch_txp_blue
        },
        4871: {
          name: 'ch_txp_red',
          data: ch_txp_red
        },
        4853: {
          name: 'ch_ysysr1',
          data: ch_ysysr1
        },
        4854: {
          name: 'ch_ysysr2',
          data: ch_ysysr2
        },
        4762: {
          name: 'ch_jotc',
          data: ch_jotc
        },
        4764: {
          name: 'ch_zjqr',
          data: ch_zjqr
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
          return this.checkedTitle.includes(data.goods_id)
            ? 'tk_1.png'
            : 'tk_2.png'
        }
      }
    }
  },
  methods: {
    // 选择头饰（选一个称号，需要更新计数器组件的input，计数器根据input值更新共消耗）
    handleCheck(data) {
      // 根据称号标识筛选出点击头饰数据，判断该称号是否已拥有
      if (data.has_right == 2) return this.$toast('已拥有此称号')
      // 更新本地选中头饰数据，计算属性会根据选中头饰数量更新共消耗
      // 筛选出选中头饰数据，更新本地选中头饰数据
      if (this.checkedTitle.includes(data.goods_id)) {
        this.checkedTitle = this.checkedTitle.filter(
          (item) => item !== data.goods_id
        )
      } else {
        this.checkedTitle.push(data.goods_id)
      }
      // 提交父组件选中称号数据，父组件根据选中称号数据更新计数器消耗
      this.$emit('checkedTitle', this.checkedTitle)
    }
  }
}
</script>

<style scoped lang="scss">
.TitleReturn {
  .title_list {
    width: 100%;
    height: 226px;
    overflow-y: scroll;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-evenly;
    .titleBox_item {
      position: relative;
      &:nth-of-type(2n + 1) {
        margin-right: 15px;
      }
      // 称号json容器
      .title_json_box {
        width: 94px;
        height: 64px;
        border: 2px solid #956ee5;
        border-radius: 8px;
        background: #fff;
        > img {
          width: 100%;
        }
      }
      // 选择框
      .checkBox {
        position: absolute;
        bottom: 26px;
        right: -9px;
        width: 27px;
        height: 27px;
        img {
          width: 100%;
        }
      }
      // 称号名称
      .title_name {
        margin: 5px 0 7px;
        font-size: 14px;
        color: #ffffff;
      }
    }
  }
}
</style>
