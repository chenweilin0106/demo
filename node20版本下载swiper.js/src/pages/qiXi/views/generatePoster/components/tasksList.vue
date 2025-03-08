<template>
  <div class="tasksList flex align-center justify-between flex-wrap" data-html2canvas-ignore>
    <template v-for="task in task_list">
      <div
        v-if="!task.item_list && task.goods_id != 8"
        :key="task.goods_id"
        class="normalContainer flex-column align-center justify-between position-relative"
      >
        <lazy-component v-if="!task.id_list" class="commonAwardBox position-relative flex align-center justify-center">
          <div v-if="task.show_text" class="priceLabel flex align-center justify-center line-height-100 position-absolute">{{ task.show_text }}<img :src="IconPath('zs_27_20.png')" class="diamond" /></div>
          <PublicImg :class="task.type" :img-name="task.icon" :imgType="task.type" />
        </lazy-component>
        <!--二选一-->
        <div v-else :class="task.type == 'title' ? 'largeAwardsList' : 'middleAwardsList'" class="w-100 flex align-center justify-between">
          <div
            v-for="id in task?.id_list"
            :key="id"
            :class="task.type == 'title' ? 'largeAwardBox' : 'middleAwardBox'"
            class="position-relative flex align-center justify-center"
            @click.stop="checkEquip(task.type, id)"
          >
            <lazy-component class="w-100 h-100">
              <PublicImg :class="task.type" :imgName="equipIdToNameMap[id]" :imgType="task.type" />
              <!--<PublicSvga v-else :class="task.type" :svga-name="equipIdToNameMap[id]" :user-avatar="$store.state.user_icon" />-->
            </lazy-component>
            <img v-if="checkedForm[task.type] == id" :src="IconPath('mk4_19.png')" class="checkButton position-absolute" />
            <img v-else :src="IconPath('mk4_20.png')" class="checkButton position-absolute" />
          </div>
        </div>
        <div class="taskAwardName flex align-center justify-center line-height-100 text-nowrap">{{ task.name }}</div>
        <div class="taskAwardNumber flex align-center justify-center line-height-100 text-nowrap">{{ task.intimacy }}/{{ task.max_intimacy }}</div>
        <div
          :class="buttonClassMap[task.has_right]"
          class="taskAwardButton flex align-center justify-center line-height-100 text-nowrap"
          @click.stop="clickTaskButton(task)"
        >
          {{ buttonTextMap[task.has_right] }}
        </div>
      </div>
      <!--多选多 每个装扮单独按钮-->
      <div v-else-if="task.item_list" :key="task.goods_id" class="multipleContainer flex-column align-center justify-between position-relative">
        <div class="multipleAwardsList flex align-center justify-between w-100 flex-1">
          <div v-for="item in task.item_list" :key="item.id" class="multipleAward h-100 flex-column align-center justify-between">
            <div class="multipleAwardIcon">
              <img :src="IconPath(item.icon)" class="width-auto h-100" />
            </div>
            <!--todo 当奖励状态为已领取 显示该按钮 2：添加 3：卸下-->
            <div
              v-if="!noReceive(task.has_right)"
              :class="buttonClassMap[item.has_right]"
              class="taskAwardButton multipleAwardButton flex align-center justify-center line-height-100 text-nowrap"
              @click.stop="clickMultipleTaskButton(item, task.goods_id)"
            >
              {{ buttonTextMap[item.has_right] }}
            </div>
          </div>
        </div>
        <div class="multipleText flex-column align-center position-absolute justify-between position-row-center">
          <div class="multipleText-name flex align-center justify-center line-height-100 text-nowrap">{{ task.name }}</div>
          <div class="multipleText-number flex align-center justify-center line-height-100 text-nowrap">
            {{ task.intimacy }}/{{ task.max_intimacy }}
          </div>
        </div>
        <!--todo 当奖励状态为未完成，领取，显示该按钮 0：未完成 1：领取-->
        <div
          v-if="noReceive(task.has_right)"
          :class="buttonClassMap[task.has_right]"
          class="taskAwardButton noReceive margin-row-center flex align-center justify-center line-height-100 text-nowrap"
          @click.stop="clickTaskButton(task)"
        >
          {{ buttonTextMap[task.has_right] }}
        </div>
      </div>
      <!--&lt;!&ndash;戒指特殊样式&ndash;&gt;-->
      <!--<div v-else :key="task.goods_id" class="specialContainer position-relative margin-row-center flex-column align-center justify-between">-->
      <!--  <lazy-component class="specialAwardIcon flex align-center justify-center position-relative">-->
      <!--    <div class="priceLabel flex align-center justify-center line-height-100 position-absolute">-->
      <!--      {{ task.text }}<img :src="IconPath('zs_27_20.png')" />-->
      <!--    </div>-->
      <!--    <PublicImg :img-name="equipIdToNameMap[task.type]" />-->
      <!--  </lazy-component>-->
      <!--  <div class="specialAwardName taskAwardName line-height-100 text-nowrap flex justify-center align-center">{{ task.name }}</div>-->
      <!--  <div class="specialAwardNumber taskAwardNumber line-height-100 text-nowrap flex align-center justify-center">-->
      <!--    {{ task.intimacy }}/{{ task.max_intimacy }}-->
      <!--  </div>-->
      <!--  <div-->
      <!--    :class="buttonClassMap[task.has_right]"-->
      <!--    class="specialAwardButton taskAwardButton flex justify-center align-center line-height-100"-->
      <!--    @click.stop="clickTaskButton(task)"-->
      <!--  >-->
      <!--    {{ buttonTextMap[task.has_right] }}-->
      <!--  </div>-->
      <!--  &lt;!&ndash;<img :src="IconPath('back_4.png')" class="leftIcon pointer-none position-absolute" />&ndash;&gt;-->
      <!--  &lt;!&ndash;<img :src="IconPath('back_5.png')" class="rightIcon pointer-none position-absolute" />&ndash;&gt;-->
      <!--</div>-->
    </template>
  </div>
</template>

<script>
import { getPageData } from '@/api'
import { _throttle } from '@/utils/tool'
export default {
  props: ['task_list', 'checkedForm', 'select_info', 'pair_status', 'typeToText'],
  inject: ['equipIdToNameMap'],
  data() {
    return {
      buttonTextMap: Object.freeze({
        0: '未完成',
        1: '领取',
        2: '添加',
        3: '卸下'
      }), // 按钮文本映射
      buttonClassMap: Object.freeze({
        0: 'button-unFinish',
        1: 'button-receive',
        2: 'button-add',
        3: 'button-unload'
      }) // 按钮样式映射
    }
  },
  methods: {
    /**
     * 未完成或者领取
     * @param has_right {number} 0: 未完成 1: 领取
     * @returns {boolean}
     */
    noReceive(has_right) {
      return has_right == 0 || has_right == 1
    },
    /**
     * 点击多选多任务按钮
     * @param awardData {{has_right:number,id:number}} 奖励数据
     * @param awardData.has_right {number} 2: 添加 3: 卸下
     * @param awardData.id {number} 奖励id
     * @param goods_id {number} 任务id
     */
    clickMultipleTaskButton: _throttle(async function ({ has_right, id }, goods_id) {
      if (!this.pair_status) return this.$toast('快去绑定好友吧！') // 没有绑定无法添加
      const res = await this.handleAwardApi(goods_id, has_right, id)
      this.$toast(res.errmsg)
      if (res.errno) return
      this.$emit('update')
      if (goods_id == 6) return
      if (has_right == 2) {
        // this.$emit('readyDrag', id, goods_id) // id 当前装饰id goods_id 任务id
      } else {
        // this.$emit('closeDrag')
      }
    }, 1000),
    /**
     * 点击任务按钮
     * @param {{has_right:number,goods_id:number,id:number,type:string,name:string}} param
     * @param {number} param.has_right 0: 未完成 1: 领取 2: 添加 3: 卸下
     * @param {number} param.goods_id 任务id
     * @param {number} param.id id
     * @param {string} param.type 类型
     * @param {string} param.name 名称
     */
    clickTaskButton: _throttle(async function (param) {
      if (param.has_right == 0) return // 未完成
      const { has_right, goods_id, id, type, name, icon } = param
      if (has_right == 1) {
        // if (goods_id == 3 || goods_id == 5) { 老判断 写死第三个和第五个 头饰或者称号
        // 新判断 用type判断
        if (type == 'title' || type == 'mic') {
          // if (!this.checkedForm[type]) return this.$toast(`请选择想要的${goods_id == 3 ? '头饰' : '称号'}`) // 判断是否勾选
          if (param.id_list && !this.checkedForm[type]) return this.$toast(`请选择想要的${this.typeToText[type]}`) // 需要有id_list才判断是否勾选
          this.$emit('receiveTitleOrMic', { icon, type, id: this.checkedForm[type] || id, name: type == 'title' ? '永久称号' : name, goods_id, has_right }) // 打开领取奖励弹框 这里不需要发请求，使用本地数据
        } else if (goods_id == 4) {
          // 情话
          this.$emit('receiveLoveWords') // 打开输入情话弹框 不需要请求，随机得情话数据使用本地数据
        } else {
          // 时间素材 声波 边框素材 装饰素材
          const res = await this.handleAwardApi(goods_id, has_right, id)
          if (res.errno) return this.$toast(res.errmsg)
          console.log('人物素材领取')
          this.$emit('receiveCommonAward', res.data.award) // 领取成功
          this.$emit('update')
        }
      } else {
        // 添加，卸下处理
        if (!this.pair_status) return this.$toast('快去绑定好友吧！') // 没有绑定无法添加
        // const markId = goods_id == 3 || goods_id == 5 ? this.select_info[`uid_${type}_id`] : id // 老判断 写死第三个和第五个 头饰或者称号
        const markId = param.id_list ? this.select_info[`uid_${type}_id`] : id // 新判断 使用id_list字段判断是否有勾选按钮
        const res = await this.handleAwardApi(goods_id, has_right, markId)
        this.$toast(res.errmsg)
        if (res.errno) return
        this.$emit('update')
        if (goods_id != 4) return // 情话素材单独处理
        if (has_right == 2) {
          // this.$emit('readyDrag', goods_id) // 添加成功 情话需要拖拽
        } else {
          this.$emit('closeDrag')
        }
      }
    }, 1000),
    /**
     * 奖励领取，添加，卸下接口
     * @param {number} goods_id 任务id
     * @param {number} has_right 0: 未完成 1: 领取 2: 添加 3: 卸下
     * @param {number} id 奖励id
     * @returns {Promise}
     */
    handleAwardApi(goods_id, has_right, id) {
      return getPageData({ type: 'lovename_award_rev', 'mark[goods_id]': goods_id, 'mark[action_type]': has_right, 'mark[id]': id })
    },
    /**
     * 选择头饰，称号
     * @param type {string} 类型
     * @param id {number} id
     */
    checkEquip(type, id) {
      // console.log(type, id)
      if (this.select_info[`uid_${type}_id`]) return // 已选择
      this.$emit('checkEquip', type, id)
    }
  }
}
</script>

<style scoped lang="scss">
$nameFontColor: #6455F6; // 名字颜色
$numberFontColor: #EC6BFF; // 数量颜色
$containBg: rgba(231, 128, 161, 0.5); // 奖励图标边框
$awardIconBorder: #A3A6FF; // 奖励图标边框
$awardIconBgc: linear-gradient(180deg, #F5D3FF, #FFFFFF); // 奖励图标背景
.tasksList {
  z-index: 2;
  margin: 0 0 36px;
  padding: 0 10px 0;
  .normalContainer {
    //margin-bottom: 22px;
    width: fit-content;
    height: 358px;
    //border-radius: 20px;
    padding: 40px 0;
    //background-color: $containBg;
    background: url('@/pages/qiXi/assets/mk4_15.png') no-repeat left top/100% 100%;
    .commonAwardBox {
      margin: 0 30px;
      width: 138px;
      height: 138px;
      background: $awardIconBgc;
      border-radius: 24px;
      border: 4px solid $awardIconBorder;
      .priceLabel {
        z-index: 1;
        top: 0;
        right: -36px;
        transform: translateY(-50%);
        height: 34px;
        background: linear-gradient(-90deg, #75B9FF, #FF84F8);
        border-radius: 17px;
        font-weight: 500;
        font-size: 20px;
        color: #FFFFFF;
        padding: 0 10px;
        .diamond {
          width: 27px;
          height: auto;
        }
      }
      /*主页特效两边留白不够 手动缩放*/
      .costume {
        width: 90%;
        height: auto;
      }
    }
    .middleAwardsList {
      width: 310px;
      padding: 0 11px;
      .middleAwardBox {
        width: 138px;
        height: 138px;
        background: $awardIconBgc;
        border-radius: 24px;
        border: 4px solid $awardIconBorder;
      }
    }
    .largeAwardsList {
      width: 517px;
      padding: 0 14px;
      .largeAwardBox {
        width: 228px;
        height: 138px;
        background: $awardIconBgc;
        border-radius: 24px;
        border: 4px solid $awardIconBorder;
      }
    }
    /*特殊处理 背景图不同*/
    &:nth-child(3),
    &:nth-child(7){
      min-width: 317px;
      background: url('@/pages/qiXi/assets/mk4_16.png') no-repeat left top/100% 100%;
    }
    &:nth-child(5) {
      min-width: 523px;
      background: url('@/pages/qiXi/assets/mk4_17.png') no-repeat left top/100% 100%;
    }
  }
  .multipleContainer {
    padding: 12px;
    height: 358px;
    //border-radius: 20px;
    //background-color: $containBg;
    .multipleAward {
      .multipleAwardIcon {
        width: 128px;
        height: 128px;
        background: $awardIconBgc;
        border-radius: 24px;
        border: 4px solid $awardIconBorder;
        //margin-bottom: 100px;
      }
      .multipleAwardButton {
        margin-top: 100px;
        width: 114px;
        height: 44px;
      }
    }
    .multipleText {
      top: 180px;
      height: 68px;
      .multipleText-name {
        font-size: 26px;
        color: $nameFontColor;
      }
      .multipleText-number {
        font-size: 24px;
        color: $numberFontColor;
      }
    }
    .noReceive {
      //margin: 0 auto;
    }
    &:nth-child(6) {
      min-width: 400px;
      padding: 40px 61px;
      background: url('@/pages/qiXi/assets/mk4_18.png') no-repeat left top/100% 100%;
    }
  }
  //.specialContainer {
  //  margin-top: 11px;
  //  width: 485px;
  //  height: 375px;
  //  background: url('@/pages/520/assets/mk4_21.png') no-repeat left top/100% 100%;
  //  padding-top: 51px;
  //  padding-bottom: 43px;
  //  .leftIcon {
  //    top: 79px;
  //    left: -100px;
  //    width: 86px;
  //    height: 86px;
  //  }
  //  .rightIcon {
  //    top: 54px;
  //    right: -69px;
  //    width: 122px;
  //    height: 181px;
  //  }
  //  .specialAwardIcon {
  //    width: 138px;
  //    height: 138px;
  //    background: linear-gradient(180deg, #ffd7ec, #ffffff);
  //    border-radius: 24px;
  //    border: 4px solid #f598bb;
  //    .priceLabel {
  //      z-index: 1;
  //      top: -14px;
  //      right: -36px;
  //      width: 139px;
  //      height: 34px;
  //      background: linear-gradient(-90deg, #75b9ff, #ff84f8);
  //      border-radius: 17px;
  //      font-weight: 500;
  //      font-size: 20px;
  //      color: #ffffff;
  //      > img {
  //        width: 27px;
  //        height: 20px;
  //      }
  //    }
  //  }
  //  .specialAwardButton {
  //  }
  //}
  // 勾选按钮
  .checkButton {
    right: -6px;
    bottom: -4px;
    width: 53px;
    height: 53px;
  }
  // 名字
  .taskAwardName {
    width: 130px; // 设置宽度 防止文字过长导致样式错乱 当前数值是奖励图标容器的大小
    font-size: 26px;
    color: $nameFontColor;
  }
  // 数量
  .taskAwardNumber {
    width: 130px; // 设置宽度 防止文字过长导致样式错乱 当前数值是奖励图标容器的大小
    font-size: 24px;
    color: $numberFontColor;
  }
  // 按钮
  .taskAwardButton {
    width: 134px;
    height: 52px;
    font-size: 24px;
    border-radius: 26px;
    border: 2px solid #fff;
  }
  // 添加
  .button-receive {
    background: linear-gradient(0deg, #FFF9D1, #FFFFFF);
    color: #A9792C;
  }
  // 卸下
  .button-unFinish {
    background: linear-gradient(0deg, #CAE7FF, #FFFFFF);
    color: #4D7DDD;
  }
  // 添加
  .button-add {
    background: linear-gradient(0deg, #fec9ff, #ffffff);
    color: #dd4bab;
  }
  // 卸下
  .button-unload {
    background: linear-gradient(0deg, #d7bdff, #ffffff);
    color: #9447f3;
  }
}
</style>
