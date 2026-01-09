<template>
  <PopupBox title="title_26.png" @clickClose="clickClose">
    <div :class="['previewImg',(config.type=='pst_privilege'||config.type=='car')?'gift':config.type=='title'?'titleSp':config.type=='CP_card'?'cpCardSp':config.type=='world_msg_skins'?'wmsSp':config.type=='room_dec_suit'?'roomSp':'other']">
      <PublicImg :imgName="config.img" :imgType="config.type"></PublicImg>
      <div class="cpIcon" v-if="config.type=='CP_card'"></div>
      <div class="roomSuitIcon" v-if="config.type=='room_dec_suit'"></div>
    </div>
    <div class="tip1Text" v-html="config.tip1"></div>
    <div class="tip2Text" v-html="config.tip2"></div>
    <div class="tip2Text" v-if="config.type=='pst_privilege'">仅静态效果展示，礼物动效惊喜等你来体验</div>
    <!-- <div class="tip2Text" v-if="config.type=='car'">仅静态效果展示，座驾动效惊喜等你来体验</div> -->
  </PopupBox>
</template>

<script>
export default {
  name: 'previewPopup',
  props: ['config'],
  components: {},
  data() {
    return {

    }
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
::v-deep .popupContent.popupSize-2{
  min-height: 410px;
}
.previewImg{
  margin: 0px auto 0 auto;
  overflow: hidden;
  background: #FFFFFF;
  border-radius: 20px;
  border: 4px solid #DBC1FF;
  &.gift{
    width: 427px;
    height: 740px;
    background: url('@/pages/520/assets/tk_44.png') no-repeat left top/100% 100%;
    border: none;
    border-radius: 0px;
  }
  &.titleSp{
    width: 210px*1.4;
    height: 96px*1.4;
  }
  &.cpCardSp{
    width: 455px;
    height: 217px;
    position: relative;
    background: transparent;
    border: none;
    border-radius: 0px;
    .cpIcon{
      width: 394px;
      height: 180px;
      background: url('@/pages/520/assets/tk_40.png') no-repeat left top/100% 100%;
      position: absolute;
      left: 50%;
      top: 46%;
      transform: translate(-50%,-50%);
    }
  }
  &.wmsSp{
    width: 520px;
    height: 155px;
    background: transparent;
    border: none;
    border-radius: 0px;
    margin-top: 40px;
  }
  &.roomSp{
    width: 340px;
    height: 736px;
    border: none;
    border-radius: 0px;
    .roomSuitIcon{
      width: 340px;
      height: 736px;
      background: url('@/pages/520/assets/tk_54.png') no-repeat left top/100% 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 0;
    }
  }
  &.other{
    width: 120px*1.4;
    height: 120px*1.4;
  }
}
.tip1Text{
  font-size: 28px;
  color: #fff;
  text-align: center;
  margin: 30px auto 0px auto;
  white-space: pre-wrap;
}
.tip2Text{
  font-size: 24px;
  color: #2870D7;
  text-align: center;
  margin: 10px auto 0 auto;
  white-space: pre-wrap;
}
</style>
