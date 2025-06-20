<template>
  <PopupBox title="title_16.png" @clickClose="clickClose">
    <div class="awardTip flex align-center justify-center text-nowrap line-height-100">确认领取此{{textMap[config.type]}}</div>
    <div class="awardBox flex align-center justify-center position-relative" :class="config.type">
      <PublicImg :imgName="equipIdToNameMap[config.id]" :imgType="config.type" />
    </div>
    <p class="awardName flex align-center justify-center line-height-100">{{awardNameMap[config.type]||config.name}}</p>
    <div class="awardButtons w-100 flex align-center justify-center">
      <PublicButton class="cancel" @click="clickClose">取消</PublicButton>
      <PublicButton hasRight="1" class="confirm" @click="confirm">领取并{{nowEquipText[config.type]}}</PublicButton>
    </div>
  </PopupBox>
</template>

<script>
import { mapState } from 'vuex'
import { getPageData, nowEquip } from '@/api'

export default {
  props: ['config'],
  inject: ['equipIdToNameMap'],
  data() {
    return {
      textMap: Object.freeze({ title: '称号', mic: '头饰' }), // todo 类型文本映射
      awardNameMap: Object.freeze({ title: '永久称号' }) // todo 奖励特殊名称映射
    }
  },
  computed: {
    ...mapState(['typeToNameMap', 'nowEquipText'])
  },
  methods: {
    async confirm() {
      const { id, goods_id, type, has_right } = this.config
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
::v-deep .main{
  margin-bottom: 102px !important;
}
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
  margin: 20px 0 60px;
  color: #ffffff;
  font-size: 28px;
}
.awardButtons {
  .cancel,
  .confirm {
    width: 246px;
    height: 78px;
    font-size: 32px;
  }
  div:nth-child(2) {
    margin-left: 18px;
  }
}
</style>
