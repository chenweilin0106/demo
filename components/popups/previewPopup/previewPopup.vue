<template>
  <PopupBox title="title_40.png" @clickClose="clickClose">
    <div :class="['previewImg', config.type == 'pst_privilege' || config.type == 'car' ? 'gift' : config.type == 'title' ? 'titleSp' : config.type == 'CP_card' ? 'cpCardSp' : config.type == 'world_msg_skins' ? 'wmsSp' : config.type == 'room_dec_suit' ? 'roomSp' : config.type == 'costume' ? 'userMainSp' : config.type == 'ring' ? 'ringSp' : config.type == 'virtual_avatar_components_suite' ? 'vascSp' : config.type == 'joke_gift' ? 'jokeGiftSp' : 'other']">
      <PublicImg :imgName="config.img" :imgType="config.type"></PublicImg>
      <div class="cpIcon" v-if="config.type == 'CP_card'"></div>
      <div class="roomSuitIcon" v-if="config.type == 'room_dec_suit'"></div>
    </div>
    <div class="tip1Text">
      <div class="zpMark" v-if="config.type=='virtual_avatar_components_suite'"></div>{{ config.tip1 }}
    </div>
    <div class="tip2Text" v-if="config.tip2" v-html="config.tip2"></div>
    <div class="tip2Text" v-if="config.type == 'pst_privilege'">仅静态效果展示，礼物动效惊喜等你来体验</div>
    <!-- <div class="tip2Text" v-if="config.type=='car'">仅静态效果展示，座驾动效惊喜等你来体验</div> -->
  </PopupBox>
</template>

<script>
export default {
  name: 'previewPopup',
  props: ['config'],
  components: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    /**
     * 关闭弹窗(必需)
     */
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .popupContent {
  // min-height: 410px;
  .main {
    margin-bottom: 94px;
    .previewImg {
      margin: 0 auto 0 auto;
      overflow: hidden;
      background: #ffffff;
      border-radius: 20px;
      border: 4px solid #dbc1ff;
      &.gift {
        width: 427px;
        height: 740px;
        background: url('@/pages/labaFestival/assets/chat_room_bg.png') no-repeat left top/100% 100%;
        border: none;
        border-radius: 0;
      }
      &.titleSp {
        width: 210px * 1.4;
        height: 96px * 1.4;
      }
      &.ringSp {
        width: 207px;
        height: 206px;
        background: transparent;
        border: none;
        border-radius: 0;
      }
      &.cpCardSp {
        width: 455px;
        height: 217px;
        position: relative;
        background: transparent;
        border: none;
        border-radius: 0;
        .cpIcon {
          width: 394px;
          height: 180px;
          background: url('@/pages/labaFestival/assets/cp_card_bg.png') no-repeat left top/100% 100%;
          position: absolute;
          left: 50%;
          top: 46%;
          transform: translate(-50%, -50%);
        }
      }
      &.wmsSp {
        width: 520px;
        height: 155px;
        background: transparent;
        border: none;
        border-radius: 0;
        margin-top: 40px;
      }
      &.roomSp {
        width: 340px;
        height: 736px;
        border: none;
        border-radius: 0;
        .roomSuitIcon {
          width: 340px;
          height: 736px;
          background: url('@/pages/labaFestival/assets/room_suit_bg.png') no-repeat left top/100% 100%;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 0;
        }
      }
      &.userMainSp {
        width: 414px;
        height: 740px;
        border: none;
        border-radius: 0;
        background: url('@/pages/labaFestival/assets/user_main_bg.png') no-repeat left top/100% 100%;
      }
      &.vascSp {
        width: 481px;
        height: 615px;
        background: transparent;
        border: none;
        border-radius: 0px;
      }
      &.jokeGiftSp {
        width: 562px;
        height: 591px;
        background: transparent;
        border: none;
        border-radius: 0;
      }
      &.other {
        width: 120px * 1.4;
        height: 120px * 1.4;
      }
    }
    .tip1Text {
      width: fit-content;
      font-size: 28px;
      color: #DB3819;
      text-align: center;
      margin: 26px auto 0;
      white-space: pre-wrap;
      line-height: 1;
      position: relative;
      display: flex;
      align-items: center;
      .zpMark {
        margin-right: 5px;
        width: 66px;
        height: 33px;
        background: url('@/pages/labaFestival/assets/tk_20.png') no-repeat left top/100% 100%;
      }
    }
    .tip2Text {
      font-size: 24px;
      color: #80362E;
      text-align: center;
      margin: 15px auto 0;
      white-space: pre-wrap;
      line-height: 1;
    }
  }
}
</style>
