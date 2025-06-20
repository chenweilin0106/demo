<template>
  <div class="tasksList flex align-center justify-between flex-wrap" data-html2canvas-ignore>
    <div v-for="(row,rIndex) in showList" :key="rIndex" :class="`row_${rIndex}`" class="row flex justify-between w-100 flex-no-wrap">
      <div v-for="({card,cardClass},tIndex) in row" :key="tIndex" class="card position-relative flex-shrink-0 flex-column align-center justify-between" :class="`card_${cardClass}`">
        <div class="awards w-100 flex justify-center align-center" :class="card.id_list&&card.has_right>=2?'pointer-none':''">
          <div v-for="(award,aIndex) in card.id_list||card.item_list||[card]" :key="aIndex" class="award position-relative flex align-center justify-center" @click.stop="($event)=>$emit('check',card.type,award)">
            <div v-if="card.show_text" class="diamondPriceLabel flex justify-center align-center position-absolute radius-999 pointer-none line-height-1">{{card.show_text}}<img :src="IconPath('zs_42_32.png')" class="diamond" /></div>
            <lazy-component class="w-100 h-100 awardIcon position-relative">
              <PublicImg :imgName="award.icon||equipIdToNameMap[award]" :imgType="card.type" />
            </lazy-component>
            <img v-if="card.id_list" :src="IconPath(config.select_info[`uid_${card.type}_id`]==award?'mk4_20_1.png':'mk4_20.png')" class="checkBtn position-absolute" :class="config.select_info[`uid_${card.type}_id`]==award?'active':''" />
            <PublicButton v-if="card.item_list&&+card.has_right>1" :hasRight="buttonClassMap[award.has_right]" class="button multiple position-absolute" @click.stop="($event)=>onClickTaskBtn({...card,itemId: award.id})">
              {{buttonTextMap[award.has_right]}}
            </PublicButton>
          </div>
        </div>
        <div class="name line-height-1 position-absolute position-row-center">{{card.name}}</div>
        <div class="nums line-height-1 position-absolute position-row-center">{{numberLimit(intimacy(),card.max_intimacy)}}/{{card.max_intimacy}}</div>
        <PublicButton v-if="!(card.item_list&&+card.has_right>1)" :disabled="[0]" :hasRight="buttonClassMap[card.has_right]" class="button" @click.stop="($event)=>onClickTaskBtn(card)">
          {{buttonTextMap[card.has_right]}}
        </PublicButton>
      </div>
    </div>
  </div>
</template>

<script>
import { getPageData } from '@/api'
import { numberLimit } from '@/utils/tool'

export default {
  props: ['config'],
  inject: ['equipIdToNameMap', 'typeToToast', 'needConfirmPopup', 'intimacy'],
  data() {
    return {
      orderList: Object.freeze([
        [{ id: 1, cardClass: '1', card: {} }, { id: 2, cardClass: '1', card: {} }, { id: 3, cardClass: '2', card: {} }],
        [{ id: 4, cardClass: '1', card: {} }, { id: 5, cardClass: '3', card: {} }],
        [{ id: 6, cardClass: '4', card: {} }, { id: 7, cardClass: '2', card: {} }]
      ]), // todo 格式化任务列表 id-任务goods_id cardClass-卡片样式 card-任务数据
      buttonTextMap: Object.freeze({ 0: '未完成', 1: '领取', 2: '添加', 3: '卸下' }), // 按钮文本映射
      buttonClassMap: Object.freeze({ 0: 0, 1: 1, 2: 10, 3: 9 }) // todo 按钮样式映射
    }
  },
  computed: {
    showList() {
      return this.orderList.map(row => row.map((item) => {
        const task = this.config.task_list.find(task => task.goods_id === item.id)
        return { ...item, card: task }
      }))
    }
  },
  methods: {
    numberLimit,
    /**
     * 点击任务按钮
     * @param {Object} param
     * @param {number} param.has_right 0: 未完成 1: 领取 2: 添加 3: 卸下
     * @param {number} param.goods_id 任务id
     * @param {number} param.id id 装扮id
     * @param {string} param.type 类型
     * @param {string} param.name 名称
     */
    async onClickTaskBtn ({ has_right, goods_id, id, type, name, icon, id_list, item_list, itemId }) {
      if (has_right == 1) {
        if (name == '自定义情话素材') return this.$emit('openInputPopup')
        if (id_list && !this.config.select_info[`uid_${type}_id`]) return this.$toast(`请选择想要的${this.typeToToast[type]}`)
        if (this.needConfirmPopup.includes(goods_id)) return this.$emit('openConfirmPopup', { icon, type, id: this.config.select_info[`uid_${type}_id`], name, goods_id, has_right }) // 打开领取奖励弹框
        const res = await this.taskApi(goods_id, has_right, id)
        if (res.errno) return this.$toast(res.errmsg)
        this.$emit('openReceivePopup', res.data.award)
        this.$emit('update')
      } else {
        // 添加，卸下处理
        if (!this.config.pair_status) return this.$toast('快去绑定好友吧！') // 没有绑定无法添加头饰或者称号
        const mark = id_list ? this.config.select_info[`uid_${type}_id`] : item_list ? itemId : id
        const hasRight = item_list ? item_list.find(item => item.id === itemId).has_right : has_right
        const res = await this.taskApi(goods_id, hasRight, mark)
        this.$toast(res.errmsg)
        if (res.errno) return
        this.$emit('update')
        if (!this.config.supportDrag) return
        if (!this.config.supportDragId.includes(goods_id)) return
        if (has_right == 2) {
          this.$emit('readyDrag', { goods_id, award_id: itemId })
        } else {
          this.$emit('closeDrag')
        }
      }
    },
    /**
     * 奖励领取，添加，卸下接口
     * @param {number} goods_id 任务id
     * @param {0 | 1 | 2 | 3} has_right 0-未完成 1-领取 2-添加 3-卸下
     * @param {number} id 奖励id
     * @returns {Promise}
     */
    taskApi(goods_id, has_right, id) {
      return getPageData({ type: 'lovename_award_rev', 'mark[goods_id]': goods_id, 'mark[action_type]': has_right, 'mark[id]': id })
    }
  }
}
</script>

<style scoped lang="scss">
.tasksList {
  margin-bottom: 20px; /*todo 距离底部距离*/
  padding: 0 8px; /*todo 两边距离*/
  .card{
    padding: 42px 0 38px; /*todo*/
    height: 362px; /*todo*/
    background: no-repeat left top/100% 100%;
    .awards{
      padding: 0 19px; /*todo 奖励图标两边距离*/
    }
    $size: 130px; /*todo 奖励图标大小*/
    $border: 4px; /*todo 奖励图标边框宽度*/
    $radius: 20px; /*todo 奖励图标圆角*/
    .award{
      width: $size + 2 * $border;
      height: $size + 2 * $border;
      background: linear-gradient(180deg, #FFD5EB, #FFFFFF); /*todo 奖励图标背景*/
      border-radius: $radius;
      border: $border solid #F7AAD7; /*todo 奖励图标边框颜色*/
      margin-left: auto;
      .awardIcon{
        z-index: 1;
      }
      .checkBtn {
        z-index: 2;
        right: -8px;
        bottom: -5px;
        width: 53px;
        height: 53px;
      }
      &:first-child{
        margin-left: 0;
      }
    }
    .name{
      top: 195px; /*todo 奖励名字距离顶部距离*/
      font-size: 26px; /*todo 奖励名字字体大小*/
      color: #AE3278; /*todo 奖励名字字体颜色*/
    }
    .nums{
      bottom: 103px; /*todo 数量距离底部距离*/
      font-size: 24px; /*todo 数量字体大小*/
      color: #F83F85; /*todo 数量字体颜色*/
    }
    .button{
      width: 134px;
      height: 52px;
      font-size: 26px;
      &.multiple{
        bottom: -103px - $border; /*todo 距离奖励图标底部距离*/
        left: 50%;
        transform: translateY(100%) translateX(-50%);
      }
    }
    &.card_1{
      width: 202px; /*todo*/
      background-image: url("@/pages/valentineDay/assets/mk4_16.png");
    }
    &.card_2{
      width: 321px; /*todo*/
      background-image: url("@/pages/valentineDay/assets/mk4_17.png");
    }
    &.card_3{
      width: 527px; /*todo*/
      background-image: url("@/pages/valentineDay/assets/mk4_19.png");
      .award{
        width: 220px + 2 * $border;
        height: 130px + 2 * $border;
      }
    }
    &.card_4{
      width: 404px; /*todo*/
      background-image: url('@/pages/valentineDay/assets/mk4_18.png');
      .awards{
        padding: 0 58px;
        .award{
          width: 120px + 2 * $border;
          height: 120px + 2 * $border;
        }
      }
    }
  }
}
</style>
