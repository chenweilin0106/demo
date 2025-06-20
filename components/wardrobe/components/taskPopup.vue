<template>
  <PopupBox title="title_34.png" @clickClose="clickClose">
    <div class="cardsList position-relative w-100 flex-column align-center">
      <PublicCard v-for="(task,taskIndex) in list" size="3" :key="taskIndex" class="rowCard align-center flex position-relative margin-row-center line-height-1">
        <div class="desc flex-column justify-between h-100 overflow-hidden">
          <p class="p1 flex">{{task.text}}<span v-if="!noNeedStatusMap.includes(taskIndex)" class="span1 text-indent-left text-indent-right">（{{task.now_num}}/{{task.need_num}}）</span></p>
          <p class="p2 flex align-center">冒险次数+1<span v-if="taskIndex==0" class="pSpan">&nbsp;系统自动派发，无需手动领取</span></p>
          <p v-if="taskIndex==0" class="p3">目前已消费钻石：{{task.now_num}}</p>
          <p v-if="taskIndex==1" class="p4 text-wrap">购买礼包、会员（含超值兑换中兑换会员）、活力卡不计入充值</p>
        </div>
        <PublicButton v-if="taskIndex!=0" :disabled="[2]" :hasRight="task.has_right" class="cardBtn flex-shrink-0" @click="receive(task,taskIndex)">
          {{special[task.id]?.[task.has_right]||common[task.has_right]}}</PublicButton>
      </PublicCard>
    </div>
  </PopupBox>
</template>

<script>
import { getPageData } from '@/api'
import { recharge } from '@/utils/toApp'
import visibilityMixin from '@/mixins/visibilityMixin'

export default {
  mixins: [visibilityMixin],
  data() {
    return {
      noNeedStatusMap: Object.freeze([0]),
      common: Object.freeze({ 0: '未完成', 1: '领取', 2: '已领取' }),
      special: Object.freeze({ 2: { 0: '去完成', 1: '领取', 2: '已领取' } }),
      list: [
        { id: 1, text: '每消费300钻石', num_text: '开启次数+1', desc: '冒险次数+1', nums: 1, need_num: 300, now_num: 0, has_right: 0 },
        { id: 2, text: '每日完成任意一笔钻石充值', num_text: '冒险次数+1', desc: '', nums: 1, need_num: 1, now_num: 0, has_right: 0 },
        // { id: 3, text: '每日登录活动页面', num_text: '冒险次数+1', desc: '', nums: 1, need_num: 1, now_num: 0, has_right: 0 },
        { id: 4, text: '每日5位好友为我助力', num_text: '冒险次数+1', desc: '', nums: 1, need_num: 5, now_num: 0, has_right: 0 },
        { id: 5, text: '每日进行3次符石寻宝', num_text: '冒险次数+1', desc: '', nums: 1, need_num: 3, now_num: 0, has_right: 0 }
      ]
    }
  },
  async created() {
    this.getPageData()
  },
  methods: {
    async receive(task, index) {
      if (task.id == 2 && task.has_right == 0) {
        this.addVisibilityListen(this.createVisibilityFn({ showFn: this.getPageData }))
        return recharge()
      }
      if (task.has_right == 0) return
      const res = await getPageData({ type: 'magic_closet_task_award', mark: task.id })
      this.$toast(res.errmsg)
      if (res.errno) return
      this.list[index].has_right = 2
      this.$emit('update')
    },
    async getPageData() {
      const res = await getPageData({ type: 'magic_closet_task_list' })
      if (res.errno) return this.$toast(res.errmsg)
      this.list = res.data
    },
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
.cardsList{
  .rowCard{
    margin-bottom: 12px;
    padding: 31px 25px 31px 40px;
    &:last-child{
      margin-bottom: 0;
    }
    &:nth-child(1) {
      padding-top: 22px;
      padding-bottom: 22px;
    }
    &:nth-child(2) {
      padding-top: 16px;
      padding-bottom: 16px;
    }
    .desc{
      flex: 1 1 auto;
      .p1{
        font-size: 25px;
        color: #fff;
      }
      .p2{
        color: #ffef85;
        font-size: 22px;
        .pSpan{
          font-weight: 500;
          font-size: 20px;
          color: #85FEFF;
        }
      }
      .p3{
        font-weight: 500;
        font-size: 20px;
        color: #85FEFF;
      }
      .p4{
        font-weight: 500;
        font-size: 20px;
        color: #85FEFF;
      }
    }
    .cardBtn{
      margin-left: auto;
      width: 126px;
      height: 66px;
      font-size: 28px;
    }
  }
}
</style>
