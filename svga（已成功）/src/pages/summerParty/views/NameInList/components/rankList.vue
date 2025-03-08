<template>
  <div class="rankList">
    <div class="list_header">
      <span class="ranking">排名</span>
      <span class="name">昵称</span>
      <span class="total">总价值</span>
    </div>
    <div class="list_content">
      <!-- 赠送榜 -->
      <div class="list" ref="list" v-if="tabActive == '赠送榜'">
        <div
          class="listItem"
          v-for="(item, index) in send_present_top"
          :key="index"
          :class="{
            addNumber: (index + 1) % 2 != 0
          }"
        >
          <div class="leftrank">{{ index + 1 }}</div>
          <div class="center_nickname">
            <div class="avatar" @click="toUserMain(item.uid)">
              <img :src="item.profile_image" alt="" />
            </div>
            <div class="right">
              <div class="top" @click="toUserMain(item.uid)">
                {{ item.username }}

              </div>
            </div>
          </div>
          <div class="right_total">0</div>
        </div>
      </div>
      <!-- 获赠榜 -->
      <div class="list2" ref="list" v-else>
        <div
          class="listItem"
          v-for="(item, index) in present_top"
          :key="index"
          :class="{
            addNumber: (index + 1) % 2 != 0
          }"
        >
          <div class="leftrank">{{ index + 1 }}</div>
          <div class="center_nickname">
            <div class="avatar" @click="toUserMain(item.uid)">
              <img :src="item.profile_image" alt="" />
            </div>
            <div class="right">
              <div class="top" @click="toUserMain(item.uid)">
                {{ item.username }}
              </div>
            </div>
          </div>
          <div class="right_total">0</div>
        </div>
      </div>
      <!-- 20+ 赠送榜 -->
      <div class="more" v-if="tabActive == '赠送榜'">
        <div class="leftrank">20+</div>
        <div class="center_nickname">
          <div class="avatar" @click="toUserMain()">
            <img src="../../../assets/mk6_26.png" alt="" />
          </div>
          <div class="right">
            <div class="top" @click="toUserMain()">虚位以待</div>
          </div>
        </div>
        <div class="right_total">0</div>
      </div>
      <!-- 20+ 获赠榜 -->
      <div class="more" v-else>
        <div class="leftrank">20+</div>
        <div class="center_nickname">
          <div class="avatar" @click="toUserMain()">
            <img src="../../../assets/mk6_26.png" alt="" />
          </div>
          <div class="right">
            <div class="top" @click="toUserMain()">虚位以待</div>
          </div>
        </div>
        <div class="right_total">0</div>
      </div>
    </div>
  </div>
</template>

  <script>
// 默认数据
import { summerRank } from '../../../utils/pageData'

export default {
  // 组件名称
  name: 'rankList',
  // props父组件参数
  props: {
    tabActive: {
      type: String,
      default: '赠送榜'
    },
    tabList: {
      type: Array,
      default: () => []
    }
  },
  components: {},
  data () {
    return {
      lucky_ranks_index: [],
      present_top: [],
      send_present_top: []
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  methods: {

  },
  created () {
    this.lucky_ranks_index = summerRank.lucky_ranks_index
    this.present_top = summerRank.present_top
    this.send_present_top = summerRank.send_present_top
  },
  mounted () {
  },
  destroyed () {
  }
}
  </script>

<style lang="scss" scoped>
.rankList {
  width: 334px;
  height: 100%;
  min-height: 373.5px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .list_header {
    width: 100%;
    height: 30px;
    line-height: 30px;
    color: #fff;
    background-color: #5ca0ec;
    border-radius: 10px 10px 0 0;
    display: flex;
    justify-content: space-between;
    align-content: center;
    font-size: 14px;
    .ranking {
      padding-left: 10px;
    }
    .name {
      padding-right: 100px;
    }
    .total {
      padding-right: 30px;
    }
  }
  .list_content {
    width: 100%;
    .list,
    .list2 {
      width: 100%;
      height: 293.5px;
      display: flex;
      flex-wrap: nowrap;
      flex-direction: column;
      align-items: center;
      overflow: scroll;
      .listItem {
        width: 100%;
        height: 50px;
        background: #ccf0ff;
        border-radius: 6px;
        margin-bottom: 9px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: space-around;
        position: relative;
      }

      .addNumber {
        background: #b3e9f7;
      }
    }
    .leftrank {
      font-family: PingFangSC-Semibold;
      font-weight: 500;
      color: #31697c;
      font-size: 13px;
      margin-left: 10px;
    }

    .center_nickname {
      width: 160px;
      margin-right: 30px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .avatar {
        width: 30px;
        height: 30px;
        background: #5ebc94;
        border-radius: 50%;
        margin-left: 10px;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      .right {
        margin-left: 7px;
        width:70%;
        .top {
          width: 100%;
          font-size: 15px;
          font-family: PingFang SC;
          font-weight: 400;
          font-size: 12px;
          color: #3270b9;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    .right_total {
      margin-right: 40px;
    }
  }

  .more {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    height: 50px;
    background: linear-gradient(-90deg, #5da0ee, #0db294);
    border-radius: 0 0 10px 10px;
    overflow: hidden;
    color: #fffaa6;

    .leftrank {
      color: #fff;
    }
    .center_nickname {
      margin-left: -15px;
      .top {
        color: #fffaa6 !important;
        overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
      }
    }
  }

  .textcontainer {
    .ruleKText {
      display: flex;
      align-items: flex-start;
      margin-top: 11px;

      P {
        margin-right: 10px;
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #0e6946;
      }

      .circle {
        flex-shrink: 0;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        margin-top: 3px;
        margin-left: 10px;
        margin-right: 9px;
        background-color: #ff9fd5;
      }

      .special {
        color: #fe8ab1;
      }
    }

    .ruleKText:first-child {
      margin-top: 18px;
    }

    .ruleKText:last-child {
      margin-bottom: 18px;
    }
  }
}
</style>
