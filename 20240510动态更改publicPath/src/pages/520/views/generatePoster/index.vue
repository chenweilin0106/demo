<template>
  <div class="generatePoster" @click="closeDrag">
    <div class="photoContainer position-relative">
      <img :src="IconPath('mk4_3.png')" class="photoContainerTitleIcon position-absolute position-row-center pointer-none" data-html2canvas-ignore />
      <img :src="IconPath('mk4_1.png')" class="playRulesButton position-absolute" data-html2canvas-ignore @click="showPlayRulesPopup = true" />
      <!--<button @click.stop="testDrag(1)" style="margin-right: 20px">挪动花</button>-->
      <!--<button @click.stop="testDrag(2)" style="margin-right: 20px">挪动鸽子</button>-->
      <!--<button @click.stop="testDrag(3)" style="margin-right: 20px">挪动纸鹤</button>-->
      <!--<button @click.stop="testDrag(4)" style="margin-right: 20px">挪动情话</button>-->
      <photoBox
        ref="photoBox"
        v-bind="photoBoxData"
        :data-html2canvas-ignore="picture && true"
        @bindUser="showBindFriendPopup = true"
        @productSuccess="productSuccess"
        @closeDrag="closeDrag"
      />
      <div class="shareButton" data-html2canvas-ignore>
        <div class="shareButtonMain" @click.stop="shareImage"></div>
      </div>
    </div>
    <TasksList
      v-bind="tasksListData"
      @checkEquip="checkEquip"
      @receiveTitleOrMic="receiveTitleOrMic"
      @receiveLoveWords="receiveLoveWords"
      @receiveCommonAward="receiveCommonAward"
      @update="getPageData"
      @readyDrag="readyDrag"
    />
    <BindFriendPopup v-if="showBindFriendPopup" @update="getPageData" @clickClose="showBindFriendPopup = false" />
    <InputLoveStoryPopup
      v-if="showInputLoveStoryPopup"
      :loveWords="pageData.love_words"
      @update="getPageData"
      @clickClose="showInputLoveStoryPopup = false"
    />
    <ReceiveAwardPopup
      v-if="showReceiveAwardPopup"
      :receiveAwardPopupData="receiveAwardPopupData"
      :equipIdToNameMap="equipIdToNameMap"
      @update="getPageData"
      @clickClose="showReceiveAwardPopup = false"
    />
    <TakePicturesPopup v-if="showTakePicturesPopup" :picture="picture" @clickClose="closeTakePicturesPopup" />
    <PlayRulesPopup v-if="showPlayRulesPopup" @clickClose="showPlayRulesPopup = false" />
    <CongratsGetPopup v-if="showCongratsGetPopup" :list="congratsGetPopupData" @clickClose="showCongratsGetPopup = false" />
  </div>
</template>

<script>
import { _throttle } from '@/pages/520/utils/tool'
import { getPageData } from '../../api/index'
import { generatePoster } from '../../utils/pageData'
import photoBox from './components/photoBox' // 拍照容器
import TasksList from './components/tasksList.vue' // 任务列表
import getPageDataMixin from '@/pages/520/mixins/getPageDataMixin' // 获取页面数据mixin
const TakePicturesPopup = () => import('./components/takePicturesPopup.vue') // 保存图片弹框
const CongratsGetPopup = () => import('@/pages/520/components/congratsGetPopup.vue') // 恭喜获得弹框
const PlayRulesPopup = () => import('./components/playRulesPopup.vue') // 玩法说明弹框
const ReceiveAwardPopup = () => import('./components/receiveAwardPopup.vue') // 领取奖励弹框
const InputLoveStoryPopup = () => import('./components/inputLoveStoryPopup.vue') // 输入情话弹框
const BindFriendPopup = () => import('./components/bindFriendPopup.vue') // 绑定好友弹框

export default {
  name: 'generatePoster',
  components: {
    photoBox,
    TasksList,
    BindFriendPopup,
    InputLoveStoryPopup,
    ReceiveAwardPopup,
    PlayRulesPopup,
    CongratsGetPopup,
    TakePicturesPopup
  },
  mixins: [getPageDataMixin],
  data() {
    return {
      showTakePicturesPopup: false, // 保存图片弹框显隐
      congratsGetPopupData: [], // 恭喜获得弹框数据
      showCongratsGetPopup: false, // 恭喜获得弹框显隐
      showPlayRulesPopup: false, // 玩法说明弹框显隐
      receiveAwardPopupData: {}, // 领取奖励弹框数据
      showReceiveAwardPopup: false, // 领取奖励弹框显隐
      showInputLoveStoryPopup: false, // 输入情话弹框显隐
      showBindFriendPopup: false, // 绑定好友弹框显隐
      isPhoto: false, // 是否正在拍照中
      currentDragEl: {},
      checkedForm: { mic: '', title: '' }, // 单选表单 头饰，称号选中的id
      equipIdToNameMap: Object.freeze({
        103: 'ts_aqwy_01',
        104: 'ts_aqwy_02',
        5124: 'ch_rl520_02',
        5125: 'ch_rl520_01',
        ring: 'jz_qydz.svga',
        voice: 'sb_tmbb'
      }), // 装扮id对应的素材name映射
      picture: null // 生成的照片
    }
  },
  computed: {
    // 拍照组件数据
    photoBoxData() {
      return {
        currentDragEl: this.currentDragEl,
        equipIdToNameMap: this.equipIdToNameMap,
        pair_info: this.pageData.pair_info,
        intimacy: this.pageData.intimacy,
        equip_info: this.equip_info,
        isPhoto: this.isPhoto,
        select_info: this.select_info,
        my_words: this.pageData.my_words
      }
    },
    tasksListData() {
      return {
        pair_status: this.pageData.pair_status,
        task_list: this.pageData.task_list,
        checkedForm: this.checkedForm,
        equipIdToNameMap: this.equipIdToNameMap,
        select_info: this.select_info
      }
    },
    task_list() {
      return this.pageData.task_list // 奖励列表
    },
    equip_info() {
      return this.pageData.equip_info // 已佩戴信息
    },
    select_info() {
      return this.pageData.select_info // 双方头饰称号领取信息
    }
  },
  async created() {
    this.pageData = generatePoster
    await this.getPageData()
    this.$store.commit('getUserIcon', this.pageData.user_icon)
    if (this.pageData.is_sign_in) this.showPlayRulesPopup = true
  },
  methods: {
    /**
     * 准备拖拽
     * @param {number} id 拖拽奖励id
     * @param {number} goodsId 任务id
     */
    readyDrag(id, goodsId) {
      this.closeDrag()
      this.$nextTick(() => {
        if (id == 4) {
          this.$set(this.pageData.equip_info, id, true) // 多选1
        } else {
          this.$set(this.pageData.equip_info, goodsId, [...(this.pageData.equip_info[goodsId] || []), id]) // 多选多
        }
        this.currentDragEl = { id }
        this.$nextTick(() => {
          this.$refs.photoBox.startDrag()
        })
      })
    },
    /**
     * 素材、声波、戒指领取成功 恭喜获得弹框
     * @param {{icon:string=,type:string,goods_id:number,item_list:array=,name:string}} param 奖励参数
     * @param {string} param.icon 图标
     * @param {string} param.type 物品类型
     * @param {number} param.goods_id 物品id
     * @param {array} param.item_list 物品列表
     * @param {string} param.name 物品名称
     */
    receiveCommonAward(param) {
      const { icon, type, goods_id, item_list } = param
      if (icon == '') param.icon = this.equipIdToNameMap[type]
      const arr = goods_id == 6 || goods_id == 7 ? item_list : [param]
      arr.forEach((item) => (item.text = item.name))
      this.congratsGetPopupData = arr
      this.showCongratsGetPopup = true
    },
    // 领取情话 打开输入情话弹框
    receiveLoveWords() {
      this.showInputLoveStoryPopup = true
    },
    /**
     * 领取称号，头饰
     * @param {{goods_id:number,id:number,name:string,type:string}} param 领取奖励参数
     * @param {number} param.goods_id 物品id
     * @param {number} param.id 物品id
     * @param {string} param.name 物品名称
     * @param {string} param.type 物品类型
     */
    receiveTitleOrMic(param) {
      this.receiveAwardPopupData = param
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
    closeDrag() {
      console.log('closeDrag')
      this.$refs.photoBox.endDrag()
      this.currentDragEl = {}
    },
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
      if (!this.pageData.pair_status) return this.$toast('快去绑定好友吧!')
      this.$thinking.track('WebClick', { element: '分享甜蜜', module: '独家记忆' })
      this.isPhoto = true
      this.closeDrag()
      this.$nextTick(() => {
        this.$refs.photoBox.productImage()
      })
    }, 1000),
    // 页面数据接口
    async getPageData() {
      const res = await getPageData({ type: 'tab', mark: 'm4' })
      if (res.errno) {
        this.$toast(res.errmsg)
      } else {
        this.pageData = res.data
      }
      this.checkedForm.mic = this.select_info.uid_mic_id
      this.checkedForm.title = this.select_info.uid_title_id
      this.processingData()
      console.log(this.pageData.equip_info)
    },
    // 处理数据，将边框素材2选1，装饰素材3选n的装扮情况放到equip_info中
    processingData() {
      const arr = this.pageData.task_list.filter((task) => task.item_list && task.has_right == 2) // 过滤出有2选1，3选n的任务 并且已领取
      arr.forEach((el) => {
        const res = []
        el.item_list.forEach((item) => {
          if (item.has_right == 3) res.push(item.id) // 3：卸下 说明已装扮
        })
        if (res.length) this.$set(this.pageData.equip_info, el.goods_id, res)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.generatePoster {
  margin-top: 145px;
  position: relative;
  z-index: 4;
  .photoContainer {
    width: 750px;
    height: 1225px;
    background: rgba(235, 127, 160, 0.3);
    border-radius: 47px;
    border: 4px solid rgba(255, 255, 255, 0.44);
    padding-top: 57px;
    .photoContainerTitleIcon {
      top: -135px;
      width: 731px;
      height: 179px;
    }
    .playRulesButton {
      z-index: 2;
      top: 213px;
      right: 0;
      width: 54px;
      height: 146px;
    }
  }
  .shareButton {
    margin: -47px auto -14px;
    padding-top: 50px;
    width: 505px;
    height: 208px;
    background: url('@/pages/520/assets/mk4_15.png') no-repeat left top/100% 100%;
    .shareButtonMain {
      margin: 0 auto;
      //margin-left: 160px;
      width: 340px;
      height: 110px;
      border-radius: 93px;
    }
  }
}
</style>
