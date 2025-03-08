<template>
  <PopupBox title="mk1_title_13.png" @clickClose="clickClose">
    <p class="flex justify-center line-height-100">仅展示队长uid</p>
    <div v-for="item in 3" :key="`list_${item}`" class="item">
      <div class="date flex align-center line-height-100"><span class="flex-1"></span>&nbsp;&nbsp;11月17日&nbsp;&nbsp;<span class="flex-1"></span></div>
      <div class="uidList flex flex-wrap">
        <div v-for="(item, index) in rankListShow" :key="`${item.uid}_${index}`" class="uidBox flex align-center justify-center line-height-100">
            <div :class="['userPrettyCode']">
              <div class="havenBg" v-if="item.pretty_type!=0">
                <PublicImg :imgName="$store.state.prettyTypeBg[item.pretty_type]"></PublicImg>
              </div>
              <span v-if="item.pretty_type!=0" :class="['prettyCode', `color${item.pretty_type}`]">{{item.code}}</span>
              <span v-else class="noPrettyCode">{{item.code}}</span>
          </div>
        </div>
      </div>
    </div>
  </PopupBox>
</template>

<script>
export default {
  data() {
    return {
      mark: 1,
      rankListShow: [
        { rank: 1, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', diff: 0, time: 0 },
        { rank: 2, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', diff: 0, time: 0 },
        { rank: 3, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', diff: 0, time: 0 },
        { rank: 4, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', diff: 0, time: 0 },
        { rank: 5, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', diff: 0, time: 0 },
        { rank: 6, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', diff: 0, time: 0 },
        { rank: 7, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', diff: 0, time: 0 },
        { rank: 8, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', diff: 0, time: 0 },
        { rank: 9, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', diff: 0, time: 0 },
        { rank: 10, uid: 0, code: 0, pretty_type: 0, username: '虚位以待', profile_image: '', diff: 0, time: 0 }
      ]
    }
  },
  methods: {
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .main {
  min-height: 255px + 253 + 278 - 274 !important;
  max-height: 255px + 461 + 278 - 274 !important;
  padding-left: 17px;
  padding-right: 17px;
  >p {
    font-size: 28px;
    color: #FFFFFF;
  }
}
.item {
  margin-top: 38px;
  .date {
    font-weight: 500;
    font-size: 29px;
    color: #FFFFFF;
    >span {
      height: 3px;
      background: #FFFFFF;
    }
  }
  .uidList {
    margin-top: 28px;
    padding: 0 21px;
    .uidBox {
      width: 180px;
      height: 60px;
      background: rgba(102, 51, 219, 0.3);
      border-radius: 30px;
      font-weight: 500;
      font-size: 26px;
      color: #FFFFFF;
      margin-right: 16px;
      margin-bottom: 12px;
      &:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
}
</style>
