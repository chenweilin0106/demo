<template>
  <div class="generatePoster" @click="closeDrag">
    <div ref="needTopDivRef"></div>
    <div class="photoContainer position-relative">
      <img :src="IconPath('title_7.png')" class="titleIcon position-absolute position-row-center pointer-none" data-html2canvas-ignore />
      <img :src="IconPath('back_3.png')" data-html2canvas-ignore class="leftLeaf position-absolute pointer-none" />
      <img :src="IconPath('back_4.png')" data-html2canvas-ignore class="rightLeaf position-absolute pointer-none" />
      <img :src="IconPath('mk4_1.png')" class="ruleBtn position-absolute" data-html2canvas-ignore @click="isShowRulesPopup=true" />
      <img v-if="isShowSpecialInfo" :src="IconPath('mk4_2.png')" class="giftBtn position-absolute" data-html2canvas-ignore @click="openGiftPopup" />
      <!--以下为拖拽调试代码 请勿删除-->
      <!--<button @click.stop="testDrag(1)" style="margin-right: 20px">挪动花</button>-->
      <!--<button @click.stop="testDrag(2)" style="margin-right: 20px">挪动鸽子</button>-->
      <!--<button @click.stop="testDrag(3)" style="margin-right: 20px">挪动纸鹤</button>-->
      <!--<button @click.stop="testDrag(4)" style="margin-right: 20px">挪动情话</button>-->
      <photoBox ref="photoBox" :config="configPhotoBox" :data-html2canvas-ignore="picture" @bind="bind" @productSuccess="productSuccess" @closeDrag="closeDrag"  />
      <img :src="IconPath('back_2.png')" class="bottomIcon position-row-center position-absolute pointer-none" data-html2canvas-ignore />
      <div class="shareButton" data-html2canvas-ignore><div class="shareButtonMain" @click.stop="shareImage"></div></div>
    </div>
    <TasksList :config="configTasksList" @check="(type,id)=>select_info[`uid_${type}_id`]=id" @openConfirmPopup="openConfirmPopup" @openInputPopup="isShowInputPopup=true" @openReceivePopup="openReceivePopup" @update="getPageData" @readyDrag="readyDrag" />
    <!--绑定好友弹框-->
    <BindPopup v-if="isShowBindPopup" :config="configBindPopup" @update="getPageData" @clickClose="isShowBindPopup=false" />
    <!--输入情话弹框-->
    <InputPopup v-if="isShowInputPopup" :config="love_words" @update="getPageData" @clickClose="isShowInputPopup=false" />
    <!--确认弹框 只有头饰和称号需要-->
    <ConfirmPopup v-if="isShowConfirmPopup" :config="configConfirmPopup" @update="getPageData" @clickClose="isShowConfirmPopup=false" />
    <!--拍照弹框-->
    <PicturesPopup v-if="isShowPicturesPopup" :config="picture" @clickClose="isShowPicturesPopup=false;picture=null" />
    <!--规则说明弹框-->
    <RulesPopup v-if="isShowRulesPopup" @clickClose="isShowRulesPopup=false" />
    <!--恭喜获得弹框-->
    <ReceivePopup v-if="isShowReceivePopup" :config="configReceivePopup" @clickClose="isShowReceivePopup=false" />
    <!--专属礼弹框-->
    <GiftPopup v-if="isShowGiftPopup" :config="configGiftPopup" @update="special_info={};intimacy+=999" @clickClose="isShowGiftPopup=false" />
  </div>
</template>

<script>
import { _throttle, getStorage, setStorage } from '@/utils/tool'
import { getPageData } from '@/api'
import photoBox from './components/photoBox'
import TasksList from './components/tasksList.vue'
import ReceivePopup from './popups/receivePopup.vue'
import RulesPopup from './popups/rulesPopup.vue'
import BindPopup from './popups/bindPopup.vue'
import InputPopup from './popups/inputPopup.vue'
import ConfirmPopup from './popups/confirmPopup.vue'
import PicturesPopup from './popups/picturesPopup.vue'
import GiftPopup from './popups/giftPopup.vue'

export default {
  name: 'generatePoster',
  components: { GiftPopup, PicturesPopup, ConfirmPopup, RulesPopup, ReceivePopup, photoBox, TasksList, BindPopup, InputPopup },
  provide: function() {
    return { equipIdToNameMap: this.equipIdToNameMap, equipIconMap: this.equipIconMap, typeToToast: this.typeToToast, needConfirmPopup: this.needConfirmPopup, pointName: this.pointName, isPhoto: () => this.isPhoto, intimacy: () => this.intimacy }
  },
  data() {
    return {
      special_info: {}, // 专属礼弹框数据 如果有数据就显示专属礼弹框 type 1-CP 2-密友 day 天数
      is_sign_in: false, // 是否首次
      user_icon: '', // 用户头像
      pair_status: false, // 绑定状态
      love_words: [], // 情话数据
      my_words: '', // 我的情话
      intimacy: 0, // 亲密度
      pair_info: [
        { id: '0', username: '虚位以待', profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png' }
        // { id: '20013', username: '20013', profile_image: 'https://cdn-image.dandan818.com/app/head/head_block_1.png' }
      ], // 绑定信息
      select_info: { uid_mic_id: '', uid_title_id: '', tuid_mic_id: '', tuid_title_id: '' }, // 头饰称号选择信息
      equip_info: {
        // 1: true,
        // 2: true,
        // 3: true,
        // 4: true,
        // 5: '5147',
        // 6: ['s1'],
        // 7: true
      }, // 装饰信息
      task_list: [
        { goods_id: 1, name: '时间素材', id: 0, type: 'lover_award_pri_type', icon: 'sjsc_120_120.png', nums: 0, intimacy: 0, max_intimacy: 99, has_right: 0 },
        { goods_id: 2, name: '声波+5天', id: 102, type: 'voice', icon: 'sb_thsk', nums: 5, intimacy: 0, max_intimacy: 9999, has_right: 0 },
        { goods_id: 3, name: '头饰+5天', id: 106, id_list: [103, 104], type: 'mic', icon: '', nums: 5, intimacy: 0, max_intimacy: 20520, has_right: 0 },
        { goods_id: 4, name: '自定义情话素材', id: 0, type: 'lover_award_pri_type', icon: 'zdyqhsc_120_120.png', nums: 0, intimacy: 0, max_intimacy: 39999, has_right: 0 },
        { goods_id: 5, name: '永久称号二选一', id: 0, id_list: [5244, 5243], type: 'title', icon: '', nums: 0, intimacy: 0, max_intimacy: 52000, has_right: 0 },
        { goods_id: 6, name: '人物素材二选一', id: 0, item_list: [{ id: 's1', name: '人物素材一', icon: 'rwsc01_120_120.png', has_right: 2 }, { id: 's2', name: '人物素材二', icon: 'rwsc02_120_120.png', has_right: 2 }], select_type: 1, type: 'lover_award_pri_type', icon: '', nums: 0, intimacy: 0, max_intimacy: 66666, has_right: 0 },
        { goods_id: 7, name: '绮恋虹光戒指+1', id: 17, type: 'ring', icon: 'jz_qlhg.svga', nums: 1, show_text: '13140', intimacy: 0, max_intimacy: 99999, has_right: 0 }
      ], // todo 任务列表
      isShowPicturesPopup: false, // 保存图片弹框显隐
      configReceivePopup: [], // 恭喜获得弹框数据
      isShowReceivePopup: false, // 恭喜获得弹框显隐
      isShowRulesPopup: false, // 玩法说明弹框显隐
      needConfirmPopup: Object.freeze([3, 5]), // todo 需要领取确认弹框的任务goods_id
      configConfirmPopup: {}, // 确认弹框数据 只有头饰和称号需要
      isShowConfirmPopup: false, // 领取奖励弹框显隐
      isShowInputPopup: false, // 输入情话弹框显隐
      isShowBindPopup: false, // 绑定好友弹框显隐
      configBindPopup: {}, // 绑定好友弹框数据
      isShowGiftPopup: false, // 专属礼弹框显隐
      configGiftPopup: {}, // 专属礼弹框数据
      isPhoto: false, // 是否正在拍照中
      picture: null, // 生成的照片
      currentDragEl: {}, // 拖拽的当前元素
      typeToToast: Object.freeze({ title: '称号', mic: '头饰' }), // todo id_list任务勾选toast文本映射
      equipIconMap: Object.freeze({ 'ts_adgb_blue.svga': 'mk4_7.png', 'ts_adgb_pink.svga': 'mk4_6.png', ch_tgmwt: 'mk4_21.png', ch_nbtgt: 'mk4_22.png', sb_thsk: 'mk4_8.png', ring: 'mk4_23.png' }), // todo 动画映射图片 拍照使用静态图片
      equipIdToNameMap: Object.freeze({ 103: 'ts_adgb_pink.svga', 104: 'ts_adgb_blue.svga', 5244: 'ch_tgmwt', 5243: 'ch_nbtgt', voice: 'sb_thsk', ring: 'jz_qlhg.svga' }), // todo id或者type隐射动画
      itemListIds: Object.freeze([6]), // todo item_list任务goods_id
      supportDragId: Object.freeze([]), // todo 支持拖拽的任务goods_id
      supportDrag: Object.freeze(false), // todo 是否支持拖拽
      pointName: Object.freeze('浪漫值') // todo 点数名称
    }
  },
  computed: {
    isShowSpecialInfo() {
      return Object.keys(this.special_info).length
    },
    // 拍照组件数据
    configPhotoBox() {
      return { supportDragId: this.supportDragId, currentDragEl: this.currentDragEl, pair_info: this.pair_info, equip_info: this.equip_info, my_words: this.my_words }
    },
    // 任务列表数据
    configTasksList() {
      return { pair_status: this.pair_status, task_list: this.task_list, select_info: this.select_info, supportDragId: this.supportDragId, supportDrag: this.supportDrag }
    }
  },
  async created() {
    await this.getPageData()
    if (this.is_sign_in) this.isShowRulesPopup = true
    this.isFirst()
  },
  mounted() {
    if (this.$route.query.scroll) {
      let targetDiv = this.$refs.needTopDivRef
      if (targetDiv) {
        targetDiv.scrollIntoView({
          behavior: 'instant',
          block: 'end'
        })
      } else {
        console.log('needTopDiv div not found')
      }
    }
  },
  methods: {
    // 是否打开专属礼弹框
    isFirst() {
      if (!this.isShowSpecialInfo) return
      if (!this.$store.state.uid) return
      const res = getStorage(`${this.$store.state.uid}_valentineDay_generatePoster_isFirst`)
      if (res !== null) return
      this.openGiftPopup()
      setStorage(`${this.$store.state.uid}_valentineDay_generatePoster_isFirst`, false)
    },
    // 打开专属礼弹框
    openGiftPopup() {
      this.configGiftPopup.pair_info = JSON.parse(JSON.stringify(this.pair_info))
      this.configGiftPopup.special_info = JSON.parse(JSON.stringify(this.special_info))
      if (this.isShowRulesPopup) this.configGiftPopup.isSon = true
      this.$nextTick(() => {
        this.isShowGiftPopup = true
      })
    },
    /**
     * 准备拖拽
     * @param {number} goods_id 任务goods_id
     * @param {string} award_id 多选奖励拖拽 item_list中的id
     */
    readyDrag({ goods_id, award_id }) {
      this.closeDrag()
      this.$nextTick(() => {
        if (this.itemListIds.includes(goods_id)) {
          this.$set(this.equip_info, goods_id, [...(this.equip_info[goods_id] || []), award_id]) // 多选
        } else {
          this.$set(this.equip_info, goods_id, true)
        }
        this.currentDragEl = { award_id }
        this.$nextTick(() => this.$refs.photoBox.startDrag())
      })
    },
    // 清除拖拽
    closeDrag() {
      if (!this.supportDrag) return
      this.$refs.photoBox.endDrag()
      this.currentDragEl = {}
    },
    // 素材、声波、戒指等领取成功打开恭喜获得弹框
    openReceivePopup(param) {
      this.configReceivePopup = param.item_list || [param]
      this.isShowReceivePopup = true
    },
    // 绑定好友
    async bind() {
      const res = await getPageData({ type: 'lovename_pair_info' })
      if (res.errno) return this.$toast(res.errmsg)
      if (res.data.status == 2) {
        this.$toast('绑定成功')
        await this.getPageData()
        this.isFirst()
        return
      }
      this.configBindPopup = res.data
      this.isShowBindPopup = true
    },
    // 确认领取称号，头饰
    openConfirmPopup(param) {
      this.configConfirmPopup = param
      this.isShowConfirmPopup = true
    },
    /**
     * 生成海报成功
     * @param {base64} imgFile 图片文件
     */
    productSuccess(imgFile) {
      this.$toast.clear()
      this.isPhoto = false
      this.picture = imgFile
      this.isShowPicturesPopup = true
    },
    // 拍照弹框
    shareImage: _throttle(function () {
      if (!this.pair_status) return this.$toast('快去绑定好友吧!')
      this.$thinking.track('WebClick', { element: '保存', module: '定格浪漫' }) // todo module:模块名 element:看埋点文档
      this.isPhoto = true
      this.closeDrag()
      this.$nextTick(() => {
        this.$refs.photoBox.productImage()
      })
    }, 1000),
    formatData() {
      const arr = this.task_list.filter((task) => task.item_list && task.has_right == 2) // 过滤出n选n/1的奖励 并且已领取
      arr.forEach((el) => {
        const res = []
        el.item_list.forEach((item) => { if (item.has_right == 3) res.push(item.id) }) // 3：卸下 说明已装扮
        if (res.length) this.$set(this.equip_info, el.goods_id, res) // 将已装扮的id存储到equip_info
      })
      const idListArr = this.task_list.filter(task => task.id_list && task.has_right == 3) // 筛选出id_list数组 并且卸下状态
      idListArr.forEach(item => { this.equip_info[item.goods_id] = { owner: this.select_info[`uid_${item.type}_id`], friend: this.select_info[`tuid_${item.type}_id`] } }) // 将已装扮道具信息替换到equip_info
    },
    async getPageData() {
      const res = await getPageData({ type: 'tab', mark: 'm4' })
      if (res.errno) return this.$toast(res.errmsg)
      Object.assign(this, res.data)
      this.formatData()
    }
  }
}
</script>

<style scoped lang="scss">
.generatePoster {
  margin-top: 165px;
  position: relative;
  z-index: 4;
  .photoContainer {
    /*todo 标题*/
    .titleIcon {
      top: -201px;
      width: 461px;
      height: 209px;
    }
    .leftLeaf {
      top: -175px;
      left: 0;
      width: 127px;
      height: 233px;
    }
    .rightLeaf {
      top: -195px;
      right: 30px;
      width: 208px;
      height: 197px;
    }
    /*todo 玩法说明按钮*/
    .ruleBtn {
      z-index: 2;
      top: -136px;
      right: 0;
      width: 69px;
      height: 185px;
    }
    .giftBtn{
      z-index: 2;
      top: 52px;
      right: 16px;
      width: 164px;
      height: 149px;
    }
  }
  .shareButton {
    position: relative;
    z-index: 2;
    margin-top: -105px;
    margin-bottom: -40px;
    margin-left: 176px;
    width: 407px;
    height: 328px;
    background: url('@/pages/valentineDay/assets/mk4_15.png') no-repeat left top/100% 100%;
    padding-top: 50px;
    .shareButtonMain {
      margin: 0 auto;
      width: 170px;
      height: 170px;
      border-radius: 50%;
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
