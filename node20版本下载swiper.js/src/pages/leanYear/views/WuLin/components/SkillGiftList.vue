<template>
  <out-box class="SkillGiftList" title="title_4.png" :top-icon="true">
    <!-- 我的积分 -->
    <div class="WuLin_BottomBox_Present flex-center">
      我的积分：{{ skill_gifts }}
    </div>
    <div class="WuLin_BottomBox_AwardList">
      <!-- 领取项 -->
      <div
        v-for="(gift, key) in hot_gift"
        :key="gift.index"
        class="WuLin_BottomBox_AwardItem"
      >
        <div class="icon-box">
          <div class="update-icon"></div>
          <div class="last-reward">
            <img class="icon" :src="IconPath('ljs_60_60.png')" />
            <div class="text">+{{ gift.org_goods_num }}</div>
          </div>
          <div class="arrow-icon"></div>
          <div class="new-reward">
            <img class="icon" :src="IconPath('ljs_60_60.png')" />
            <div class="text">+{{ gift.goods_num }}</div>
          </div>
        </div>
        <div class="text-box">
          消耗<span>{{ gift.spend }}积分</span>兑换
        </div>
        <div
          class="WuLin_BottomBox_AwardButton button-noFinish"
          @click="$emit('exchargeSkillGift', key)"
        >
          兑换
        </div>
      </div>
    </div>
  </out-box>
</template>

<script>
export default {
  name: 'SkillGiftList',
  props: ['skill_gifts', 'hot_gift']
}
</script>

<style scoped lang="scss">
.SkillGiftList {
  // 兑换好礼图片标题
  position: relative;
  height: 720px;
  margin-top: 89px;
  padding-top: 63px;
  // 顶部数量
  .WuLin_BottomBox_Present {
    min-width: 320px;
    height: 48px;
    background: #9e362c;
    border-radius: 24px;
    color: #fff;
    font-size: 24px;
    margin: 0 auto 19px;
    width: fit-content;
    padding: 0 10px;
  }

  .WuLin_BottomBox_AwardList {
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    // 每项样式
    .WuLin_BottomBox_AwardItem {
      position: relative;
      margin: 0 auto 20px;
      width: 664px;
      height: 169px;
      display: flex;
      //align-items: center;
      background: url('@/pages/leanYear/assets/mk1_2.png') no-repeat left
        top/100% 100%;

      .icon-box {
        position: relative;
        display: flex;
        align-items: flex-end;
        margin: 5px 26px 0 6px;
        width: 245px;
        height: 159px;
        padding: 2px 2px 25px;
        background: url('@/pages/leanYear/assets/mk1_3.png') no-repeat left
          top/100% 100%;
        flex-wrap: nowrap;

        .update-icon {
          position: absolute;
          top: 19px;
          right: 21px;
          width: 23px;
          height: 24px;
          background: url('@/pages/leanYear/assets/mk4_7.png') no-repeat left
            top/100% 100%;
        }

        .arrow-icon {
          position: absolute;
          top: 54px;
          left: 78px;
          width: 45px;
          height: 34px;
          background: url('@/pages/leanYear/assets/mk4_8.png') no-repeat left
            top/100% 100%;
        }

        .last-reward,
        .new-reward {
          flex-shrink: 0;
          width: fit-content;
          height: fit-content;
          display: flex;
          flex-direction: column;
          align-items: center;

          .icon {
            //margin-bottom: 16px;
          }

          .text {
            position: relative;
            top: 5px;
            width: fit-content;
            font-size: 24px;
            color: #ffffff;
          }
        }

        .last-reward {
          margin-left: 20px;
          .icon {
            width: 60px;
            height: 60px;
          }
          .text {
            text-decoration: line-through;
            opacity: 0.6;
          }
        }

        .new-reward {
          margin-left: 45px;
          .icon {
            position: relative;
            top: 6px;
            width: 90px;
            height: 90px;
          }
        }
      }

      .text-box {
        margin-top: 32px;
        width: fit-content;
        font-size: 30px;
        color: #ffffff;

        span {
          color: #fffaa6;
        }
      }

      // 右侧按钮
      .WuLin_BottomBox_AwardButton {
        position: absolute;
        right: 20px;
        bottom: 27px;
        width: 136px;
        height: 64px;
      }
    }
  }
}
</style>
