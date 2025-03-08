<template>
  <out-box
    class="WeddingGifts"
    title="title_3.png"
    :left-icon="true"
    :right-icon="true"
  >
    <!-- 道具列表 -->
    <div class="WeddingGifts_list flex-center">
      <div
        class="gifts_item"
        v-for="item in marriage_gift.awards"
        :key="item.id"
      >
        <div class="icon flex-center">
          <img v-if="item.icon" :src="IconPath(item.icon)" />
          <public-svga
            v-else
            :svgaName="user_mic_type"
            :userAvatar="$store.state.user_icon"
          />
        </div>
        <div class="text flex-center">
          {{ item.type == 'property' ? '元宝' + item.text : item.text }}
        </div>
      </div>
    </div>
    <!-- 按钮 -->
    <div
      class="WeddingGifts_btn flex-center"
      @click="getWeddingGifts"
      :class="ButtonStyle('1', marriage_gift.has_right)"
    >
      {{ ButtonText('1', marriage_gift.has_right) }}
    </div>
    <!-- 说明文本 -->
    <div class="WeddingGifts_text flex-center">
      <div class="rule-text">
        <ul>
          <li><span></span>活动期间求婚并登记成功的，夫妻双方可领取【新</li>
          <li>婚贺礼】</li>
          <li><span></span>每人只能领取一次</li>
        </ul>
      </div>
    </div>
  </out-box>
</template>

<script>
import PublicSvga from '@/pages/valentineDay/components/PublicSvga.vue'

export default {
  name: 'WeddingGifts',
  components: {
    PublicSvga
  },
  props: ['marriage_gift', 'user_gender', 'user_mic_type'],
  methods: {
    getWeddingGifts() {
      this.marriage_gift.has_right == '1' && this.$emit('clickWeddingGiftsBtn')
    }
  }
}
</script>

<style scoped lang="scss">
.WeddingGifts {
  margin-top: 46px;
  margin-bottom: 35px;
  position: relative;
  height: 691px;
  padding-top: 142px;

  ::v-deep .left-icon {
    top: -21px;
    left: -8px;
  }

  ::v-deep .right-icon {
    top: -21px;
    right: -8px;
  }

  // 结婚贺礼奖励列表
  .WeddingGifts_list {
    .gifts_item {
      display: flex;
      flex-direction: column;
      width: 168px;
      height: 168px;
      background: #b18aff;
      padding: 4px;
      border-radius: 17px;

      &:nth-of-type(1) {
        margin-right: 48px;
      }

      .icon {
        width: 100%;
        background: linear-gradient(180deg, #ffd9fd, #ffffff);
        height: 112px;
        border-radius: 12px 12px 0 0;

        img {
          height: 100%;
        }

        ::v-deep .PublicSvga {
          width: 108px;
          height: 110px;

          .micAvatar_img {
            width: 80%;
            height: 80%;
          }
        }
      }

      .text {
        flex: 1;
        font-size: 28px;
        font-weight: 400;
        color: #f5f5f8;
        border-radius: 0px 0px 12px 12px;
        white-space: nowrap;
        background-color: #6f46cc;
      }
    }
  }

  // 结婚贺礼领取按钮
  .WeddingGifts_btn {
    width: 276px;
    height: 68px;
    margin: 36px auto 40px;
    border-radius: 68px;
    font-size: 32px;
    //color: #fff;
    //background: linear-gradient(0deg, #7979ff, #92e4ff);
    //border: 2px solid #ffffff;
  }

  .button-noFinish {
    color: #fff;
    background: linear-gradient(0deg, #7979ff, #92e4ff);
    border: 2px solid #ffffff;
  }

  .button-receive {
    color: #fff;
    background: linear-gradient(0deg, #895bfe, #faadff);
    border: 2px solid #ffffff;
  }

  // 结婚贺礼说明文本
  .WeddingGifts_text {
    margin: 0 auto;
    width: 670px;
    height: 147px;
    background: #edddff;
    border-radius: 20px;

    .rule-text {
      width: 615px;
      margin-left: 38px;
      line-height: 40px;
    }
  }
}
</style>
