<template>
  <OutBox class="presentGiftRank position-relative">
    <!-- lzy -->
    <div class="rank-tabs">
      <div v-for="item in rankText" :key="item" :class="['tab flex align-center justify-center',rankMark==item?'active':'' ]" @click="chooseRank(item)"></div>
    </div>
    <!-- wpq -->
    <!-- <div class="rank-tabs flex align-center justify-center" :class="[rankMark=='获赠榜'?'active':'']">
      <div v-for="item in rankText" :key="item" class="tab"></div>
    </div> -->
    <div class="tabs_contain">
      <!-- 我的道具数量 -->
      <div class="top_my_goods">我{{rankMark.slice(0, 2)}}的钻石礼物：{{rankData.userPresent}}钻</div>
      <!-- 排行榜头部 -->
      <div class="rank_header">
        <div class="flex align-center justify-center">排名</div>
        <div class="flex align-center justify-center">名字</div>
        <div class="flex align-center justify-center">价值(钻)</div>
        <div class="flex align-center justify-center">奖励</div>
      </div>
      <!-- 排行榜列表 -->
      <div class="rank_list">
        <div ref="rankList" class="inner w-100 h-100">
          <div class="rank_list_item line-height-1" v-for="(item,index) in rankData.rankList" :key="`${rankMark}-${item.uid}-${index}`">
            <div class="rank_num" :style="{color:index<=2?'#FFF99E':'#fff'}">{{index+1}}</div>
            <div class="rank_user" @click="toUserMain(item.uid)">
              <img v-lazy="item.profile_image" @error="imgAtError" />
              <span>{{item.username}}</span>
            </div>
            <!-- 用户道具数量 -->
            <div class="rank_price">{{item.time}}</div>
            <!-- 排行奖励 -->
            <div class="rank_reward flex align-center flex-no-wrap">
              <p v-if="true">
                <img :src="IconPath('ljs_120_120.png')" />
                <span>+{{item.tool_nums}}</span>
              </p>
              <!--前三名特殊奖励-->
              <template v-else>
                <div class="awardBox flex-column align-center flex-shrink-0">
                  <div class="iconBox w-100 flex align-center justify-center position-relative">
                    <img :src="IconPath('ljs_120_120.png')" />
                  </div>
                  <div class="textBox w-100 flex-1 flex align-center justify-center line-height-1">+{{item.tool_nums}}</div>
                </div>
                <div class="awardBox flex-column align-center flex-shrink-0">
                  <div class="iconBox w-100 flex align-center justify-center position-relative">
                    <img :src="IconPath('jlyh_120_120.png')" />
                    <div class="typeLabel position-absolute pointer-none">赠送权</div>
                    <van-popover v-model="bubbleMap[index]" theme="dark" trigger="click" placement="top" :offset="[0, 8]" >
                      <p class="popoverMain text-center">
                        礼物鲸落云海<br><i style="color: #FFEF6A">价值1314</i><img :src="IconPath('zs_42_32.png')" class="diamond" /><br>仅钻石可赠送
                      </p>
                      <template #reference>
                        <div class="bubble position-absolute"></div>
                      </template>
                    </van-popover>
                  </div>
                  <div class="textBox w-100 flex-1 flex align-center justify-center line-height-1">+{{3-index}}天</div>
                </div>
            </template>
          </div>
        </div>
      </div>
      </div>
      <div class="rules-text">
        <ul>
          <li><span></span>活动期间，每日<i>赠送和获赠钻石礼物价值</i>最高的前</li>
          <li>10名玩家可获得排名奖励，榜单<i>每日重置</i>，奖励会</li>
          <li>在次日发放</li>
          <li><span></span>活动期间收到钻石礼物，可获得<i>双倍经验值和双倍</i></li>
          <li><i>基础魅力值，魅力值上限提高50%</i></li>
          <li><span></span>每个ID只能获得一个榜单的排名奖励，按最大名次</li>
          <li>派发</li>
        </ul>
      </div>
    </div>
  </OutBox>
</template>

<script>
import { imgAtError } from '@/utils/tool'
import { toUserMain } from '@/utils/toApp'

export default {
  name: 'presentGiftRank',
  props: ['my_present', 'my_send_present', 'present_top', 'send_present_top'],
  data() {
    return {
      rankText: Object.freeze(['赠送榜', '获赠榜']),
      rankMark: '赠送榜',
      bubbleMap: { 0: false, 1: false, 2: false },
      showPopover: false
    }
  },
  computed: {
    // 排行榜数据
    rankData() {
      return {
        rankList: this.rankMark === '赠送榜' ? this.send_present_top : this.present_top,
        userPresent: this.rankMark === '赠送榜' ? this.my_send_present : this.my_present
      }
    }
  },
  methods: {
    chooseRank(item) {
      this.$refs.rankList.scrollTop = 0
      this.rankMark = item
    },
    toUserMain,
    imgAtError
  }
}
</script>

<style scoped lang="scss">
.presentGiftRank {
  margin-top: 32px;
  // lzy
  .rank-tabs {
    position: relative;
    display: flex;
    justify-content: center;
    margin: -115px auto 20px;
    width: 651px;
    height: 109px;
    background: url('@/pages/motherDay/assets/mk3_2.png') no-repeat left top/100% 100%;
    transition: background-image 0.3s;
    .tab {
      position: relative;
      font-size: 32px;
      color: #FFFFFF;
      flex: 1;
      height: 100%;
    }
    // 底部tab栏活动
    &.active {
      background-image: url('@/pages/motherDay/assets/mk3_2_1.png');
    }
  }
  // wpq
  // .rank-tabs {
  //   position: relative;
  //   display: flex;
  //   justify-content: center;
  //   margin: -80px auto 30px;
  //   width: 658px;
  //   height: 76px;
  //   background: url('@/pages/mayDay/assets/mk3_tab_1.png') no-repeat left top/100% 100%;
  //   .tab {
  //     position: relative;
  //     font-size: 32px;
  //     color: #FFFFFF;
  //     flex: 1;
  //     height: 100%;
  //   }
  //   // 底部tab栏活动
  //   .tab-active {
  //     background: url('@/pages/mayDay/assets/mk3_tab_1_1.png') no-repeat left top/100% 100%;
  //   }
  // }
  .tabs_contain {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
    // 我的道具数量
    .top_my_goods {
      width: 100%;
      // font-size: 28px;
      font-size: 28px;
      color: #4A50D1;
      text-align: center;
      margin-bottom: 18px;
    }
    // 排行榜头部
    .rank_header {
      line-height: 24px;
      display: flex;
      margin: 0 auto 6px;
      width: 660px;
      height: 48px;
      background: #62ACFF;
      border-radius: 12px;
      > div {
        height: 100%;
        font-size: 24px;
        color: #fffaa6;
      }
      // 排名
      > div:nth-child(1) {
        width: 100px;
      }
      // 名称
      > div:nth-child(2) {
        width: 170px;
      }
      // 价值
      > div:nth-child(3) {
        margin-left: 38px;
      }
      // 奖励
      > div:nth-child(4) {
        margin-left: 140px;
      }
    }
    // 排行榜列表
    .rank_list {
      width: 660px;
      height: 451px;
      padding: 4px;
      border-radius: 12px;
      margin: 0 auto 20px;
      .inner {
        background: linear-gradient(90deg, #ADA9FC, #62C4FF);
        overflow-y: scroll;
        overflow-x: hidden;
        border-radius: 12px;
      }
      .rank_list_item {
        //margin: 5px 0; // 前三名特殊奖励时关闭
        width: 100%;
        height: 65px;
        display: flex;
        align-items: center;
        > div {
          height: 100%;
          text-align: center;
          font-size: 24px;
          line-height: 26px;
          color: #fff;
        }
        // 排名
        .rank_num {
          width: 69px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .rank_user {
          width: 210px;
          margin-left: 10px;
          display: flex;
          align-items: center;
          span {
            width: 100%;
            text-align: left;
            font-size: 24px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          img {
            margin-right: 10px;
            min-width: 36px;
            height: 36px;
            object-fit: cover;
            border-radius: 50%;
            background-color: #fff;
          }
        }
        // 价值
        .rank_price {
          width: 120px;
          // line-height: 48px;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        // 奖励
        .rank_reward {
          margin-right: 10px;
          margin-left: 75px;
        }
        // 奖励图标
        .rank_reward {
          > p {
            display: flex;
            align-items: center;
            white-space: nowrap;
            > span {
              height: 100%;
            }
            &:nth-of-type(1) {
              img {
                //margin-left: -6px;
                width: 50px;
              }
            }
            &:nth-of-type(2) {
              img {
                width: 69px;
                height: 42px;
                margin-right: 5px;
              }
            }
          }
          .awardBox {
            width: 88px;
            height: 88px;
            background: #FFD669;
            border-radius: 16px;
            padding: 4px;
            .iconBox {
              z-index: 1;
              height: 58px;
              background-color: #fff;
              border-radius: 12px 12px 0 0;
              >img {
                width: auto;
                height: 100%;
              }
              .typeLabel {
                top: -11px;
                right: -12px;
                padding: 0 9px;
                height: 27px;
                background: #FD7729;
                border-radius: 14px;
                font-size: 19px;
                color: #FFFFFF;
              }
              .bubble {
                top: 31px;
                right: -6px;
                width: 32px;
                height: 32px;
                // background: url('@/pages/springFestival/assets/mk3_4.png') no-repeat left top/100% 100%;
                .bubbleMain {
                  font-size: 20px;
                  color: #FFFFFF;
                  line-height: 29px;
                  padding-top: 9px;
                  white-space: normal;
                  .diamond {
                    width: 27px;
                    height: 20px;
                  }
                }
              }
            }
            .textBox {
              width: 80px;
              height: 22px;
              background: #C94A32;
              border-radius: 0 0 12px 12px;
              font-size: 20px;
              color: #FFFFFF;
            }
            &:nth-of-type(2) {
              margin-left: 9px;
            }
          }
        }
        // &:nth-of-type(1) {
        //   background: rgba(230, 81, 15, 0.2);
        // }
        // &:nth-of-type(2) {
        //   background: rgba(230, 81, 15, 0.4);
        // }
        // &:nth-of-type(3) {
        //   background: rgba(230, 81, 15, 0.2);
        // }
      }
      // 前三名特殊奖励打开
      // .rank_list_item:nth-of-type(1),
      // .rank_list_item:nth-of-type(2),
      // .rank_list_item:nth-of-type(3) {
      //   margin: 0;
      //   height: 116px;
      // }
    }
  }
}
</style>
