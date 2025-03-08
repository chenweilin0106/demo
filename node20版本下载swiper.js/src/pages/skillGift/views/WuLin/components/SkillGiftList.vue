<template>
  <themeBox class="SkillGiftList" :title="'title_4.png'">
    <!-- 我的积分 -->
    <div class="WuLin_BottomBox_Present flex-center">
      我的积分 ：{{ skill_gifts }}
    </div>
    <div class="WuLin_BottomBox_AwardList">
      <!-- 领取项 -->
      <div
        v-for="(gift, key) in hot_gift"
        :key="gift.index"
        class="WuLin_BottomBox_AwardItem"
      >
        <div class="icon-box">
          <!--<div class="update-icon"></div>-->
          <div class="icon">
            <img :src="IconPath(gift.goods_icon)" alt="" />
          </div>
          <div class="text">+{{ gift.goods_num }}</div>
        </div>
        <div class="text-box">
          消耗<span>{{ gift.spend }}积分</span>兑换
        </div>
        <div
          class="WuLin_BottomBox_AwardButton button-receive"
          @click="$emit('exchangeSkillGift', key)"
        >
          兑换
        </div>
      </div>
    </div>
  </themeBox>
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
  height: 641px;
  margin-top: 85px;
  padding-top: 69px;
  // 顶部数量
  .WuLin_BottomBox_Present {
    min-width: 324px;
    height: 52px;
    color: #fff;
    font-size: 24px;
    margin: 0 auto 19px;
    width: fit-content;
    background: linear-gradient(
      90deg,
      rgba(83, 140, 255, 0.5),
      rgba(57, 74, 206, 0.5),
      rgba(83, 140, 255, 0.5)
    );
    border: 2px solid #95f4ff;
    border-radius: 22px 0px 22px 0px;
  }

  .WuLin_BottomBox_AwardList {
    width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    // 每项样式
    .WuLin_BottomBox_AwardItem {
      position: relative;
      margin: 0 auto 16px;
      width: 664px;
      height: 140px;
      display: flex;
      //align-items: center;
      background: url('@/pages/skillGift/assets/mk1_1.png') no-repeat left
        top/100% 100%;

      .icon-box {
        margin-top: 15px;
        display: flex;
        align-items: center;
        flex-direction: column;
        width: 108px;
        height: 108px;
        background: #ffffff;
        border: 4px solid #ae58fb;
        margin-left: 30px;
        margin-right: 26px;
        padding: 0 2px 2px;

        .icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 68px;

          > img {
            width: 80%;
            height: auto;
          }
        }

        .text {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          background: #4e3fdd;
          font-size: 24px;
          color: #ffffff;
          white-space: nowrap;
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
        right: 9px;
        top: 50%;
        transform: translateY(-50%);
        width: 151px;
        height: 84px;
      }
    }
  }
}
</style>
