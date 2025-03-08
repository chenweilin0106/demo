<template>
  <PopupBox title="title_18.png" @clickClose="clickClose">
    <div class="awardTip flex align-center justify-center text-nowrap line-height-100">确认领取此{{ topTextMap[award.type] }}</div>
    <div class="awardBox flex align-center justify-center position-relative" :class="award.type">
      <div v-if="typeToNameMap[award.goods_type]" class="typeLabel">{{ typeToNameMap[award.goods_type] }}</div>
      <PublicImg :imgName="equipIdToNameMap[award.id]" :imgType="award.type" />
    </div>
    <p class="awardName flex align-center justify-center line-height-100">{{ award.name }}</p>
    <div class="awardButtons w-100 flex align-center justify-center">
      <PublicButton class="cancel" @click="clickClose">取消</PublicButton>
      <PublicButton hasRight="1" class="confirm" @click="confirm">领取并{{ nowEquipText[award.type] }}</PublicButton>
    </div>
  </PopupBox>
</template>

<script>
import { mapState } from 'vuex'
import { getPageData, nowEquip } from '@/api'
export default {
  props: ['award', 'typeToText'],
  inject: ['equipIdToNameMap'],
  data() {
    return {
      topTextMap: Object.freeze({ mic: '头饰', title: '称号' })
    }
  },
  computed: {
    ...mapState(['typeToNameMap', 'nowEquipText'])
  },
  methods: {
    async confirm() {
      const { id, goods_id, type, has_right } = this.award
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
.awardTip {
  font-size: 30px;
  color: #ffffff;
}
.awardBox {
  margin: 44px auto 20px;
  width: 128px;
  height: 128px;
  background: #fefaef; /*todo 背景色*/
  border-radius: 16px;
  border: 4px solid #ffd0e7; /*todo 边框颜色*/
}
.title {
  width: 188px;
}
.awardName {
  margin: 16px 0 60px;
  color: #ffffff;
  font-size: 28px;
}
.awardButtons {
  padding-bottom: 3px; /*因为按钮边框是用阴影做的，不占位置*/
  .cancel,
  .confirm {
    width: 248px;
    height: 72px;
    border-radius: 38px;
  }
  div:nth-child(2) {
    margin-left: 24px;
  }
}
</style>
