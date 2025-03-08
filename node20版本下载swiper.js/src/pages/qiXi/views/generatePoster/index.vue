<template>
  <!--如果需要拖拽 接受closeDrag方法即可 @closeDrag="closeDrag-->
  <div class="generatePoster">
    <div class="photoContainer position-relative">
      <img :src="IconPath('mk4_1.png')" class="photoContainerTitleIcon position-absolute position-row-center pointer-none" data-html2canvas-ignore />
      <img :src="IconPath('mk4_2.png')" class="playRulesButton position-absolute" data-html2canvas-ignore @click="showPlayRulesPopup = true" />
      <!--以下为拖拽调试代码 请勿删除-->
      <!--<button @click.stop="testDrag(1)" style="margin-right: 20px">挪动花</button>-->
      <!--<button @click.stop="testDrag(2)" style="margin-right: 20px">挪动鸽子</button>-->
      <!--<button @click.stop="testDrag(3)" style="margin-right: 20px">挪动纸鹤</button>-->
      <!--<button @click.stop="testDrag(4)" style="margin-right: 20px">挪动情话</button>-->
      <!--如果需要拖拽 接受closeDrag方法即可 @closeDrag="closeDrag-->
      <photoBox ref="photoBox" v-bind="photoBoxData" :data-html2canvas-ignore="picture && true" @bindUser="bindUser" @productSuccess="productSuccess" />
      <img :src="IconPath('back_2.png')" class="bottomIcon position-row-center position-absolute pointer-none" data-html2canvas-ignore />
      <div class="shareButton" data-html2canvas-ignore><div class="shareButtonMain" @click.stop="shareImage"></div></div>
    </div>
    <!--如果需要拖拽 接受readyDrag方法即可 @readyDrag="readyDrag"-->
    <TasksList v-bind="tasksListData" @checkEquip="checkEquip" @receiveTitleOrMic="receiveTitleOrMic" @receiveLoveWords="receiveLoveWords" @receiveCommonAward="receiveCommonAward" @update="getPageData" />
    <!--绑定好友弹框-->
    <BindFriendPopup v-if="showBindFriendPopup" v-bind="bindFriendPopupData" @update="getPageData" @clickClose="showBindFriendPopup = false" />
    <!--输入情话弹框-->
    <InputLoveStoryPopup v-if="showInputLoveStoryPopup" :loveWords="love_words" @update="getPageData" @clickClose="showInputLoveStoryPopup = false" />
    <!--领取奖励弹框 只有头饰和称号需要-->
    <ReceiveAwardPopup v-if="showReceiveAwardPopup" v-bind="receiveAwardPopupData" @update="getPageData" @clickClose="showReceiveAwardPopup = false" />
    <!--拍照弹框-->
    <TakePicturesPopup v-if="showTakePicturesPopup" :picture="picture" @clickClose="closeTakePicturesPopup" />
    <!--玩法说明弹框-->
    <PlayRulesPopup v-if="showPlayRulesPopup" @clickClose="showPlayRulesPopup = false" />
    <!--恭喜获得弹框-->
    <CongratsGetPopup v-if="showCongratsGetPopup" :list="congratsGetPopupData" @clickClose="showCongratsGetPopup = false" />
  </div>
</template>

<script>
import { _throttle } from '@/utils/tool'
import { getPageData } from '@/api'
import photoBox from './components/photoBox'
import TasksList from './components/tasksList.vue'
const TakePicturesPopup = () => import('./popups/takePicturesPopup.vue')
const CongratsGetPopup = () => import('@/pages/qiXi/components/congratsGetPopup.vue')
const PlayRulesPopup = () => import('./popups/playRulesPopup.vue')
const ReceiveAwardPopup = () => import('./popups/receiveAwardPopup.vue')
const InputLoveStoryPopup = () => import('./popups/inputLoveStoryPopup.vue')
const BindFriendPopup = () => import('./popups/bindFriendPopup.vue')
export default {
  name: 'generatePoster',
  components: { photoBox, TasksList, BindFriendPopup, InputLoveStoryPopup, ReceiveAwardPopup, PlayRulesPopup, CongratsGetPopup, TakePicturesPopup },
  provide: function() {
    return { equipIdToNameMap: this.equipIdToNameMap }
  },
  data() {
    return {
      is_sign_in: false, // 是否首次
      user_icon: '', // 用户头像
      pair_status: false, // 绑定状态
      love_words: [
        '你的名字，是我读过最短的情诗',
        '有你的陪伴，我的心才完整',
        '和你在一起，每一天都是浪漫',
        '你的笑容是我最美的风景',
        '你是我生命里最重要的存在',
        '爱上你，是我这辈子最正确的选择',
        '白茶清风无别事，我在等风又等你',
        '情长纸短，还吻你万千',
        '在月色与雪色之间，你是第三种绝色',
        '你是年少的欢喜，这句话反过来也是你',
        '就借着月光，再与你对望',
        '白茶清欢无别事，我在等风也等你',
        '假装看不见，余光千百遍',
        '被爱总是值得记录的',
        '重要的人安安稳稳放心上',
        '我喜欢你，不是情话，是心里话',
        '永远沉溺于温柔和让步',
        '最好的人就在身边',
        '我爱你有开始，但是没有结束',
        '爱没有定义，你与我同在就好',
        '始于心动，陷于温柔，有且仅有一个你',
        '俩人心，一世情，白头普，山海约',
        '愿得一人心，白首不相离',
        '结发为夫妻，恩爱俩不疑',
        '海上月是天上月，眼前人是心上人',
        '落俗不可避免，浪漫至死不渝',
        '望你珍重，吻你千万',
        '就算风散了冰雪，想念也会留存下来',
        '鸿是江边鸟，你是心上人',
        '风很温柔，花很浪漫，你很特别',
        '希望这份爱意撑过每个四季',
        '南方有嘉木，北方有相思',
        '喜欢是棋逢对手，爱好似甘拜下风',
        '此心安处，是有你的地方',
        '公开偏爱是爱一个人的基础',
        '我们相爱一生，一生还是太短',
        '我们涉身浪潮与爱。',
        '等我把愚勇熬成温柔',
        '倘若我双手合十的愿望里有你呢',
        '外面风大，和我回家',
        '遇见你花光了我所有的运气'
      ], // 情话数据
      my_words: '', // 我的情话
      intimacy: 0, // 亲密度
      pair_info: [
        { id: '0', username: '虚位以待', profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png' }
        // { id: '20013', username: '20013', profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png' }
      ], // 绑定信息
      select_info: {
        // uid_mic_id: '',
        uid_title_id: '',
        // tuid_mic_id: '',
        tuid_title_id: ''
      }, // 头饰称号选择信息
      equip_info: {
        // 1: true,
        // 2: true,
        // 3: true,
        // 4: true,
        // 5: '5146',
        // 6: 's1',
        // 7: true
      }, // 装饰信息
      task_list: [
        { goods_id: 1, name: '背景素材', id: 0, type: 'lover_award_pri_type', icon: 'bjsc_120_120.png', nums: 0, intimacy: 0, max_intimacy: 99, has_right: 0 },
        { goods_id: 2, name: '主页特效+5天', id: 25, type: 'costume', icon: 'cqhh_120_120.png', nums: 5, intimacy: 0, max_intimacy: 9999, has_right: 0 },
        { goods_id: 3, name: '头饰+5天', id: 106, type: 'mic', icon: 'ts_gfsh_02.svga', nums: 5, intimacy: 0, max_intimacy: 20520, has_right: 0 },
        { goods_id: 4, name: '自定义情话素材', id: 0, type: 'lover_award_pri_type', icon: 'zdyqhsc_120_120.png', nums: 0, intimacy: 0, max_intimacy: 39999, has_right: 0 },
        { goods_id: 5, name: '永久称号二选一', id: 0, id_list: [5147, 5148], type: 'title', icon: '', nums: 0, intimacy: 0, max_intimacy: 52000, has_right: 0 },
        {
          goods_id: 6,
          name: '人物素材二选一',
          id: 0,
          item_list: [
            { id: 's1', name: '人物素材一', icon: 'rwsc1_120_120.png', has_right: 2 },
            { id: 's2', name: '人物素材二', icon: 'rwsc2_120_120.png', has_right: 2 }],
          select_type: 1,
          type: 'lover_award_pri_type',
          icon: '',
          nums: 0,
          intimacy: 0,
          max_intimacy: 66666,
          has_right: 0
        },
        { goods_id: 7, name: '情有独钟戒指+1', id: 17, type: 'ring', icon: 'jz_qydz.svga', nums: 1, show_text: '价值15999', intimacy: 0, max_intimacy: 99999, has_right: 0 }
      ], // 任务列表
      showTakePicturesPopup: false, // 保存图片弹框显隐
      congratsGetPopupData: [], // 恭喜获得弹框数据
      showCongratsGetPopup: false, // 恭喜获得弹框显隐
      showPlayRulesPopup: false, // 玩法说明弹框显隐
      receiveAwardPopupData: {}, // 领取奖励弹框数据 只有头饰和称号需要
      showReceiveAwardPopup: false, // 领取奖励弹框显隐
      showInputLoveStoryPopup: false, // 输入情话弹框显隐
      showBindFriendPopup: false, // 绑定好友弹框显隐
      bindFriendPopupData: {}, // 绑定好友弹框数据
      isPhoto: false, // 是否正在拍照中
      currentDragEl: {}, // 拖拽的当前元素
      checkedForm: { mic: '', title: '' }, // 单选表单 有单选按钮的n选1
      equipIdToNameMap: Object.freeze({
        106: 'ts_gfsh_02.svga', // 2024七夕活动头饰不需要2选1，所以只需要一个头饰即可
        5147: 'ch_yssa',
        5148: 'ch_says',
        ring: 'jz_fhyf.svga'
      }), // 装扮id对应的素材name映射
      typeToText: Object.freeze({ title: '称号', mic: '头饰' }), // 类型文本映射 用于确认领取弹框 任务列表
      picture: null // 生成的照片
    }
  },
  computed: {
    // 拍照组件数据
    photoBoxData() {
      return { currentDragEl: this.currentDragEl, pair_info: this.pair_info, intimacy: this.intimacy, equip_info: this.equip_info, isPhoto: this.isPhoto, select_info: this.select_info, my_words: this.my_words }
    },
    // 人物列表数据
    tasksListData() {
      return { pair_status: this.pair_status, task_list: this.task_list, checkedForm: this.checkedForm, select_info: this.select_info, typeToText: this.typeToText }
    }
  },
  async created() {
    await this.getPageData()
    this.receiveAwardPopupData = { typeToText: this.typeToText }
    this.$store.commit('getUserIcon', this.user_icon)
    if (this.is_sign_in) this.showPlayRulesPopup = true
  },
  methods: {
    /**
     * 准备拖拽
     * @param {number} id 拖拽奖励id
     * @param {number} goodsId 任务id
     */
    // readyDrag(id, goodsId) {
    //   this.closeDrag()
    //   this.$nextTick(() => {
    //     if (id == 4) {
    //       this.$set(this.equip_info, id, true) // 多选1
    //     } else {
    //       this.$set(this.equip_info, goodsId, [...(this.equip_info[goodsId] || []), id]) // 多选多
    //     }
    //     this.currentDragEl = { id }
    //     this.$nextTick(() => {
    //       this.$refs.photoBox.startDrag()
    //     })
    //   })
    // },
    /**
     * 素材、声波、戒指领取成功 恭喜获得弹框
     */
    receiveCommonAward(param) {
      this.congratsGetPopupData = param.item_list || [param]
      this.showCongratsGetPopup = true
    },
    // 领取情话 打开输入情话弹框
    receiveLoveWords() {
      this.showInputLoveStoryPopup = true
    },
    // 绑定好友
    async bindUser() {
      const res = await getPageData({ type: 'lovename_pair_info' })
      if (res.errno) return this.$toast(res.errmsg)
      if (res.data.status == 2) {
        this.$toast('绑定成功')
        return this.getPageData()
      }
      this.bindFriendPopupData = res.data
      this.showBindFriendPopup = true
    },
    /**
     * 领取称号，头饰
     */
    receiveTitleOrMic(param) {
      this.receiveAwardPopupData.award = param
      this.showReceiveAwardPopup = true
    },
    /**
     * @description 选择头饰，称号
     * @param {string} type 类型
     * @param {number} id id
     */
    checkEquip(type, id) {
      this.checkedForm[type] = id
    },
    // 清除拖拽
    // closeDrag() {
    //   console.log('closeDrag')
    //   this.$refs.photoBox.endDrag()
    //   this.currentDragEl = {}
    // },
    /**
     * 生成海报成功
     * @param {base64} imgFile 图片文件
     */
    productSuccess(imgFile) {
      this.$toast.clear()
      this.isPhoto = false
      this.picture = imgFile
      this.showTakePicturesPopup = true
    },
    // 关闭保存图片弹框
    closeTakePicturesPopup() {
      this.showTakePicturesPopup = false
      this.picture = null
    },
    // 拍照弹框
    shareImage: _throttle(function () {
      if (!this.pair_status) return this.$toast('快去绑定好友吧!')
      this.$thinking.track('WebClick', { element: '保存', module: '浪漫约定' }) // todo module:模块名 element:看埋点文档
      this.isPhoto = true
      // this.closeDrag()
      this.$nextTick(() => {
        this.$refs.photoBox.productImage()
      })
    }, 1000),
    // 处理数据，将边框素材n选1(没有id_list字段，有item_list字段，页面上的区别是没有勾选按钮)或者n选n的装扮已装扮的id放到equip_info中
    processingData() {
      const arr = this.task_list.filter((task) => task.item_list && task.has_right == 2) // 过滤出n选n的奖励 并且已领取
      arr.forEach((el) => {
        const res = []
        el.item_list.forEach((item) => {
          if (item.has_right == 3) res.push(item.id) // 3：卸下 说明已装扮
        })
        if (res.length) this.$set(this.equip_info, el.goods_id, res)
      })
    },
    async getPageData() {
      const res = await getPageData({ type: 'tab', mark: 'm4' })
      if (res.errno) return this.$toast(res.errmsg)
      Object.assign(this, res.data)
      // this.checkedForm.mic = this.select_info.uid_mic_id // 不需勾选按钮时请注释
      this.checkedForm.title = this.select_info.uid_title_id
      this.processingData()
    }
  }
}
</script>

<style scoped lang="scss">
.generatePoster {
  margin-top: 70px;
  position: relative;
  z-index: 4;
  .photoContainer {
    width: 750px;
    //padding-top: 57px;
    /*todo 标题*/
    .photoContainerTitleIcon {
      top: -158px;
      width: 372px;
      height: 198px;
    }
    /*todo 玩法说明按钮*/
    .playRulesButton {
      z-index: 2;
      top: -136px;
      right: 0;
      width: 69px;
      height: 185px;
    }
  }
  .shareButton {
    position: relative;
    z-index: 2;
    margin-top: 196px - 328;
    margin-bottom: -28px;
    margin-left: 176px;
    width: 407px;
    height: 328px;
    background: url('@/pages/qiXi/assets/mk4_3.png') no-repeat left top/100% 100%;
    padding-top: 50px;
    .shareButtonMain {
      margin: 0 auto;
      //margin-left: 160px;
      width: 170px;
      height: 170px;
      border-radius: 50%;
      //background-color: #fff;
    }
  }
  .bottomIcon {
    top: 757px;
    z-index: -1;
    width: 750px;
    height: 424px;
  }
}
</style>
