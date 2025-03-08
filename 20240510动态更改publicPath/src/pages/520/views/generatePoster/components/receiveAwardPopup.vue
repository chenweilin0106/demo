<template>
  <PopupBox title="title_15.png" @clickClose="clickClose">
    <div class="awardTip flex align-center justify-center text-nowrap line-height-100">{{ topTextMap[receiveAwardPopupData.goods_id] }}</div>
    <div class="awardBox flex align-center justify-center" :class="receiveAwardPopupData.type == 'title' && 'titleBox'">
      <PublicImg v-if="receiveAwardPopupData.type == 'title'" :img-name="equipIdToNameMap[receiveAwardPopupData.id]" />
      <PublicSvga v-else :svgaName="equipIdToNameMap[receiveAwardPopupData.id]" :userAvatar="$store.state.user_icon" />
    </div>
    <p class="awardName flex align-center justify-center line-height-100">{{ receiveAwardPopupData.name }}</p>
    <div class="awardButtons w-100 flex align-center justify-center">
      <div class="cancel button-noFinish" @click="clickClose">取消</div>
      <div class="confirm button-receive" @click="confirm">
        {{ buttonTextMap[receiveAwardPopupData.goods_id] }}
      </div>
    </div>
  </PopupBox>
</template>

<script>
import PopupBox from '@/pages/520/components/popupBox.vue'
import PublicImg from '@/pages/520/components/publicImg.vue'
import PublicSvga from '@/pages/520/components/publicSvga.vue'
import { getPageData, nowEquip } from '@/pages/520/api'

export default {
  props: ['receiveAwardPopupData', 'equipIdToNameMap'],
  components: { PopupBox, PublicSvga, PublicImg },
  data() {
    return {
      topTextMap: Object.freeze({ 3: '确认领取此头饰', 5: '确认领取此称号' }),
      buttonTextMap: Object.freeze({ 3: '领取并装扮', 5: '领取并佩戴' })
    }
  },
  methods: {
    async confirm() {
      const { id, goods_id, type, has_right } = this.receiveAwardPopupData
      const res = await getPageData({ type: 'lovename_award_rev', 'mark[goods_id]': goods_id, 'mark[action_type]': has_right, 'mark[id]': id })
      if (res.errno) return this.$toast(res.errmsg)
      this.$toast((await nowEquip({ type, id })).errmsg)
      this.clickClose()
      this.$emit('update')
    },
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .popupContent {
  width: 608px;
  padding: 0;
  background: linear-gradient(0deg, #f9c984, #f378a6);
  border-radius: 144px 144px 84px 84px;
  border: 4px solid #fff;
  box-shadow: 0 0 0 6px rgba(255, 255, 255, 0.3);
}
::v-deep .main {
  height: 528px;
  padding-top: 86px;
}
::v-deep .titleIcon {
  top: -99px !important;
}
.awardTip {
  font-size: 30px;
  color: #ffffff;
}
.awardBox {
  margin: 44px auto 20px;
  width: 128px;
  height: 128px;
  background: #fefaef;
  border-radius: 16px;
  border: 4px solid #ffd0e7;
  > img {
    height: 100%;
  }
  .PublicSvga {
    ::v-deep .micAvatar_img {
      width: 80% !important;
      height: 80% !important;
    }
  }
  .PublicJson {
    ::v-deep .micAvatar_img {
      width: 70% !important;
      height: 70% !important;
    }
  }
}
.titleBox {
  width: 188px;
}
.awardName {
  margin: 16px 0 60px;
  color: #ffffff;
  font-size: 28px;
}
.addPhoto {
  width: 324px;
  height: 76px;
  font-size: 32px;
  margin-bottom: 40px;
  border-radius: 36px;
}
.awardButtons {
  .cancel,
  .confirm {
    width: 248px;
    height: 72px;
    font-size: 32px;
    border-radius: 38px;
  }
  div:nth-child(2) {
    margin-left: 24px;
  }
}
</style>
