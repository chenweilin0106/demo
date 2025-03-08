<template>
  <!--派对有礼-->
  <div class="HalloweenParty">
    <div class="main">
      <!--标题图片-->
      <div class="head"></div>
      <!--规则弹框按钮-->
      <div
        class="rule_icon"
        @click="$emit('showRule')"
        :style="{ width: '200px' }"
      ></div>
      <!--拥有糖果数量-->
      <div class="sweets_nums flex_across">
        拥有糖果<img :src="IconPath('mk1_4.png')" />：{{ propData.candy_nums }}
      </div>
      <ProgressBar :propData="goods_list" />
      <!--1-4-->
      <div class="list1">
        <AwardItem
          v-for="item in list1"
          :key="item.goods_id"
          :award="item"
          @clickPreview="$emit('clickPreview', item)"
          @sweetsExchange="
            $emit('sweetsExchange', item.goods_id, item.has_right)
          "
        >
          <public-svga
            v-if="item.goods_id == 3"
            svgaName="ts_jjzy"
            :userAvatar="$store.getters.user_icon"
          />
        </AwardItem>
      </div>
      <!--5-8-->
      <div class="list2">
        <AwardItem
          v-for="item in list2"
          :key="item.goods_id"
          :award="item"
          @clickPreview="$emit('clickPreview', item)"
          @sweetsExchange="
            $emit('sweetsExchange', item.goods_id, item.has_right)
          "
        >
          <!--ts_yyml-->
          <public-svga
            v-if="item.goods_id == 6"
            svgaName="ts_jjzy"
            :userAvatar="$store.getters.user_icon"
          />
        </AwardItem>
      </div>
      <!--9-10-->
      <div class="list3">
        <AwardItem
          v-for="item in list3"
          :key="item.goods_id"
          :award="item"
          @clickPreview="$emit('clickPreview', item)"
          @sweetsExchange="
            $emit('sweetsExchange', item.goods_id, item.has_right)
          "
        />
        <!--神奇宝箱-->
        <div class="magic_box">
          <div
            class="magic_box_icon"
            @click="$emit('clickPreview', goods_list[10])"
          >
            <div class="magic_box_name">神奇宝箱</div>
          </div>
          <div
            :class="goods_list[10].has_right == 1 && 'magic_box_index_active'"
            class="magic_box_index flex_across"
            @click.stop
          >
            轮询
          </div>
          <div
            :class="{
              already_exchange: goods_list[10].has_right == 2,
              not_unlock: goods_list[10].has_right == 0
            }"
            class="magic_box_btn flex_across"
            @click="
              $emit(
                'sweetsExchange',
                goods_list[10].goods_id,
                goods_list[10].has_right
              )
            "
          >
            <template v-if="goods_list[10].has_right == 1">
              <div class="nums">
                <span>{{ goods_list[10].price }}</span
                ><img :src="IconPath('mk1_4.png')" />
              </div>
              <div class="btn_txt">领取</div>
            </template>
            <template v-if="goods_list[10].has_right == 2">已兑换</template>
            <template v-if="goods_list[10].has_right == 0">未解锁</template>
          </div>
        </div>
      </div>
      <!--每日任务标题-->
      <div class="daily_task_title"></div>
      <!--每日任务列表-->
      <div class="daily_task_list">
        <div
          v-for="item in daily_task_list"
          :key="item.task_id"
          class="daily_task_item"
        >
          <div class="daily_award_icon">
            <div class="icon_main flex_across">
              <img :src="IconPath('mk1_4.png')" />
            </div>
            <div class="name flex_across">
              <span>{{ item.award_text }}</span>
            </div>
          </div>
          <div class="daily_award_txt">
            <div class="task_txt">{{ item.task_name }}</div>
            <div class="task_status">
              （{{ item.finish_time }}/{{ item.max_time }}）
            </div>
          </div>
          <!--按钮 未完成/去完成 领取 已领取-->
          <div
            :class="{
              can_exchange: item.has_right == 1,
              already_exchange: item.has_right == 2
            }"
            class="daily_award_btn flex_across"
            @click="getTaskAward(item)"
          >
            {{ daily_task_btn_txt(item.task_id, item.has_right) }}
          </div>
        </div>
      </div>
      <!--限定任务标题-->
      <div class="limited_task_title"></div>
      <!--限定任务列表-->
      <div class="limited_task_list">
        <div
          v-for="item in limit_task_list"
          :key="item.task_id"
          class="daily_task_item"
        >
          <div class="daily_award_icon">
            <div class="icon_main flex_across">
              <img :src="IconPath('mk1_4.png')" />
            </div>
            <div class="name flex_across">
              <span>{{ item.award_text }}</span>
            </div>
          </div>
          <div class="daily_award_txt">
            <div class="task_txt">{{ item.task_name }}</div>
            <div v-if="item.task_id == 6" class="task_status">
              {{ item.desc }}
            </div>
          </div>
          <!--按钮 去完成 领取 已领取 自动发放-->
          <div
            :class="{
              can_exchange: item.has_right == 1,
              already_exchange: item.has_right == 2
            }"
            class="daily_award_btn flex_across"
            @click="getTaskAward(item)"
          >
            {{ limit_task_btn_txt(item.need_rev, item.has_right) }}
          </div>
        </div>
      </div>
      <!--底部图片-->
      <div class="foot"></div>
    </div>
  </div>
</template>

<script>
import AwardItem from '@/components/AwardItem.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import PublicSvga from '@/components/PublicSvga.vue'
import { recharge, toChatRoom, toVip } from '@/utils/toApp'

export default {
  name: 'HalloweenParty',
  components: { PublicSvga, ProgressBar, AwardItem },
  props: ['propData'],
  data() {
    return {
      myWidth: '200'
    }
  },
  mounted() {
    this.myWidth = this.myWidth++
  },
  computed: {
    // 限定任务按钮文本
    limit_task_btn_txt() {
      return (need_rev, has_right) => {
        return need_rev
          ? has_right == 0
            ? '去完成'
            : has_right == 1
            ? '领取'
            : '已领取'
          : '自动发放'
      }
    },
    // 每日任务按钮文本
    daily_task_btn_txt() {
      return (task_id, has_right) => {
        return has_right == 0
          ? task_id == 4
            ? this.propData.room_id
              ? '去完成'
              : '未完成'
            : task_id == 3
            ? '去完成'
            : '未完成'
          : has_right == 1
          ? '领取'
          : '已领取'
      }
    },
    // 糖果列表1-4
    list1() {
      return this.goods_list.slice(0, 4)
    },
    // 糖果列表5-8
    list2() {
      return this.goods_list.slice(4, 8).reverse()
    },
    // 糖果列表9-10
    list3() {
      return this.goods_list.slice(8, 10)
    },
    // 糖果兑奖列表
    goods_list() {
      return this.propData.goods_list
    },
    // 每日任务
    daily_task_list() {
      return this.propData.daily_task_list
    },
    // 限定任务
    limit_task_list() {
      return this.propData.limit_task_list
    }
  },
  methods: {
    getTaskAward(data) {
      const { task_id, has_right } = data
      if (task_id == 3 && has_right == 0) {
        return recharge()
      } else if (task_id == 4 && has_right == 0 && this.propData.room_id) {
        return toChatRoom(this.propData.room_id)
      } else if (task_id == 5 && has_right == 0) {
        return toVip()
      } else if (has_right == 1) {
        this.$emit('getTaskAward', task_id)
      }
    }
  }
}
</script>

<style scoped lang="scss">
//派对有礼
.HalloweenParty {
  margin: 16px auto 0;
  width: 724px;
  height: 2509px;
  background-color: #916fdf;
  padding: 8px;
  border-radius: 52px;

  .main {
    position: relative;
    width: 100%;
    height: 100%;
    border: 4px solid #c1a8f5;
    background: linear-gradient(180deg, #382667, #4d3877);
    border-radius: 48px;
    //标题图片
    .head {
      position: absolute;
      top: -126px;
      left: 50%;
      width: 734px;
      height: 186px;
      transform: translateX(-50%);
      background: url('../assets/mk1_2.png') no-repeat left top/100% 100%;
    }

    //底部图片
    .foot {
      position: absolute;
      bottom: -23px;
      left: 50%;
      transform: translateX(-50%);
      width: 734px;
      height: 80px;
      background: url('../assets/mk1_3.png') no-repeat left top/100% 100%;
    }

    //规则弹框按钮
    .rule_icon {
      position: absolute;
      top: -32px;
      right: 61px;
      width: 200px;
      height: 56px;
      background: url('../assets/mk1_1.png') no-repeat left top/100% 100%;
    }

    //拥有糖果数量
    .sweets_nums {
      margin-top: 64px;
      margin-left: 4px;
      width: fit-content;
      min-width: 215px;
      height: 48px;
      background: #26173d;
      padding: 0 14px;
      border-radius: 0 24px 24px 0;
      font-size: 24px;
      font-weight: 500;
      color: #ffffff;

      > img {
        margin-left: 5px;
        margin-right: 1px;
        width: 45px;
        height: 32px;
      }
    }

    .ProgressBar {
      position: absolute;
      top: 320px;
      left: 0;
    }

    .list1,
    .list2,
    .list3 {
      margin: 14px auto 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 630px;
      height: fit-content;

      //尖叫之夜
      #ts_jjzy {
        width: 105px;
        height: 106px;
        ::v-deep .micAvatar_img {
          width: 80px;
          height: 80px;
        }
      }

      //幽冥魔灵
      #ts_ymml {
        width: 105px;
        height: 106px;
        ::v-deep .micAvatar_img {
          width: 80px;
          height: 80px;
        }
      }
    }

    .list2 {
      margin: 82px auto 0 !important;
    }

    .list3 {
      position: relative;
      margin: 82px auto 19px !important;
      justify-content: flex-start;

      .AwardItem:nth-of-type(2) {
        margin-left: 8px;
      }

      //神奇宝箱
      .magic_box {
        position: absolute;
        top: -62px;
        right: -5px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .magic_box_icon {
          position: relative;
          margin-top: -2px;
          margin-bottom: 1px;
          width: 315px;
          height: 249px;
          background: url('../assets/mk1_12.png') no-repeat left top/100% 100%;

          .magic_box_name {
            position: absolute;
            left: 50%;
            bottom: 20px;
            transform: translateX(-50%) scale(0.91);
            font-size: 22px;
            color: #ffd52b;
          }
        }

        .magic_box_index {
          width: 83px;
          height: 56px;
          background: url('../assets/mk1_7.png') no-repeat left top/100% 100%;
          font-size: 26px;
          font-weight: 500;
          color: #9473df;
        }

        .magic_box_index_active {
          background-image: url('../assets/mk1_8.png') !important;
          color: #ffec70 !important;
        }

        //领取
        .magic_box_btn {
          margin-top: 17px;
          width: 144px;
          height: 60px;
          background: linear-gradient(0deg, #ff803b, #ffc046);
          border: 2px solid #ffffff;
          border-radius: 30px;

          .nums {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 42px;
            height: fit-content;

            > span {
              margin-bottom: -5px;
              font-size: 20px !important;
              font-weight: 500 !important;
              color: #ffffff !important;
              transform: scale(0.83);
            }

            > img {
              width: 42px;
              height: 30px;
            }
          }

          .btn_txt {
            margin-left: 5px;
            font-size: 26px;
            font-weight: 500;
            color: #ffffff;
          }
        }

        //  已兑换
        .already_exchange {
          background: linear-gradient(0deg, #6b6b6b, #969696);
          border-color: #a3a3a3;
          font-size: 26px;
          font-weight: 500;
          color: #b4b4b5;
        }

        //  未解锁
        .not_unlock {
          width: 140px !important;
          height: 56px !important;
          border-color: transparent !important;
          background: #2d1e51 !important;
          border-radius: 28px !important;
          font-size: 26px;
          font-weight: 500;
          color: #735da5 !important;
        }
      }
    }

    .daily_task_title,
    .limited_task_title {
      width: 700px;
      height: 116px;
      background: url('../assets/mk1_13.png') no-repeat left top/100% 100%;
    }

    .limited_task_title {
      margin-top: 9px;
      background-image: url('../assets/mk1_14.png') !important;
    }

    .daily_task_list,
    .limited_task_list {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 11px;
      width: 100%;

      .daily_task_item {
        position: relative;
        display: flex;
        align-items: center;
        padding: 0 30px 0 28px;
        width: 660px;
        height: 137px;
        background: linear-gradient(-90deg, #382463, #2d1e51);
        border-radius: 20px;

        &:nth-of-type(-n + 3) {
          margin-bottom: 19px;
        }

        .daily_award_icon {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-right: 24px;
          width: 108px;
          height: 108px;
          padding: 4px;
          background-color: #8657e7;
          border-radius: 20px;

          .icon_main {
            width: 100%;
            height: 68px;
            border-radius: 16px 16px 0 0;
            background-color: #472787;

            > img {
              width: 71px;
              height: 50px;
            }
          }

          .name {
            flex: 1;
            width: 100%;
            padding-top: 4px;
            > span {
              font-size: 24px;
              line-height: 1;
              height: fit-content;
              white-space: nowrap;
              color: #ffffff;
              transform: scale(0.91);
            }
          }
        }

        .daily_award_txt {
          height: 100%;

          .task_txt {
            margin-top: 26px;
            margin-bottom: 20px;
            font-size: 30px;
            color: #ffffff;
          }

          .task_status {
            margin-left: -14px;
            font-size: 24px;
            color: #ccb2ff;
          }
        }

        .daily_award_btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 30px;
          width: 124px;
          height: 64px;
          background: linear-gradient(0deg, #fff5b0, #ffffff);
          border: 2px solid #ffffff;
          border-radius: 32px;
          font-size: 28px;
          color: #a9792c;
        }

        .can_exchange {
          background: linear-gradient(0deg, #ff803b, #ffc046) !important;
          color: #ffffff !important;
        }

        .already_exchange {
          background: linear-gradient(0deg, #6b6b6b, #969696) !important;
          border: 2px solid #a3a3a3 !important;
          color: #b4b4b5 !important;
        }
      }
    }

    .limited_task_list {
      margin-top: 9px !important;

      .daily_task_item {
        margin-bottom: 18px !important;

        &:nth-of-type(1) {
          .daily_award_txt {
            display: flex;
            align-items: center;
            width: 335px !important;

            .task_txt {
              margin: 0 !important;
              font-size: 28px !important;
            }
          }
        }

        &:nth-of-type(2) {
          .task_status {
            margin: 0 !important;
            color: #fff190 !important;
          }

          .daily_award_btn {
            border: none !important;
            border-radius: 0 !important;
            background-image: none !important;
            font-size: 26px !important;
            color: #ccb2ff !important;
          }
        }
      }
    }
  }
}
</style>
