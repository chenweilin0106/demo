<template>
  <div class="layoutPage">
    <img :src="IconPath('banner.png')" class="banner block" />
    <img :src="IconPath('mk3_1.png')" class="updateGift position-absolute" @click="showGiftPopup = true" />
    <div class="topArea position-relative">
      <div class="tabs margin-row-center flex align-center" :class="viewId == 1 ? 'tabs_1' : 'tabs_2'">
        <div class="tab flex-1 h-100" @click.stop="switchView(1)">补给任务</div>
        <div class="tab flex-1 h-100" @click.stop="switchView(2)">繁荣部落</div>
      </div>
    </div>
    <Task v-if="viewId == 1" @getUpdateGift="getUpdateGift" />
    <Tribe v-else @postHead="postHead" />
    <!-- 底部文本 -->
    <div class="bottomText">活动由本公司组织并提供奖品<br>与苹果公司无关</div>
    <GiftPopup v-if="showGiftPopup" :hasRight="giftPopupData" @clickClose="showGiftPopup = false" @update="giftPopupData = false" />
  </div>
</template>

<script>
import Task from '@/views/task'
import { getNowFormatDate, getUrlData } from '@/utils/tool'
const Tribe = () => import('@/views/tribe')
const GiftPopup = () => import('@/popups/giftPopup')
export default {
  name: 'layoutPage',
  provide: function () {
    return {
      getLocalKey: this.getLocalKey,
      needNowEquipList: ['title', 'car', 'mic', 'chat_bubble', 'voice', 'chat_bubble_pub', 'costume'],
      nowEquipText: { title: '佩戴', car: '装备', mic: '装扮', chat_bubble: '装扮', chat_bubble_pub: '装扮', costume: '装扮', voice: '装扮' },
      typeToNameMap: { costume: '主页特效', chat_bubble_pub: '公屏气泡', chat_bubble: '私聊气泡', world_msg_skins: '世界消息皮肤' },
      getAppData: this.getAppData, // 返回APP参数
      getUserAvatar: this.getUserAvatar // 返回用户头像
    }
  },
  data() {
    return {
      viewId: 1,
      appData: { uid: '', access_token: '', referal_source: '' }, // 地址栏参数
      showGiftPopup: false,
      giftPopupData: false,
      user_icon: '' // 用户头像
    }
  },
  async created() {
    Object.assign(this.appData, getUrlData())
    this.$thinking.quick('autoTrack', { referal_source: this.referal_source }) // 数数页面浏览埋点
  },
  components: { GiftPopup, Task, Tribe },
  methods: {
    postHead(head) {
      this.user_icon = head
    },
    getUpdateGift(param) {
      this.giftPopupData = param
    },
    switchView(view) {
      if (view == this.viewId) return
      this.viewId = view
      this.$thinking.track('WebClick', { element: '模块选择', module: view == 1 ? '补给任务' : '繁荣部落' }) // 数数点击埋点
    },
    /**
     * 使用provide获取APP参数
     */
    getAppData() {
      return this.appData
    },
    /**
     * 使用provide获取用户头像
     */
    getUserAvatar() {
      return this.user_icon
    },
    /**
     * 弹出规则说明弹框 数数埋点
     */
    clickRuleBtn() {
      this.showRulePopup = true
    },
    getLocalKey() {
      return `hordeAdventure_${this.appData.uid}_${getNowFormatDate()}_buy`
    }
  }
}
</script>

<style scoped lang="scss">
.layoutPage {
  position: relative;
  z-index: 1;
  background-color: #7153B4;
  .banner {
    width: 100%;
    height: 632px;
    margin-bottom: -250px;
  }
  .updateGift {
    z-index: 2;
    top: 313px;
    right: 0;
    width: 164px;
    height: 173px;
  }
  .topArea {
    //z-index: 1;
    width: 750px;
    height: 439px;
    background: url('@/assets/back_1.png') no-repeat left top/100% 100%;
    padding-top: 124px;
    .tabs {
      width: 551px;
      height: 85px;
      color: transparent;
      &.tabs_1 {
        background: url('@/assets/tab_1.png') no-repeat left top/100% 100%;
      }
      &.tabs_2 {
        background: url('@/assets/tab_1_1.png') no-repeat left top/100% 100%;
      }
    }
  }
  .ruleBtn {
    top: 343px;
    right: 21px;
    width: 155px;
    height: 155px;
  }
  .bottomText {
    position: relative;
    z-index: 1;
    width: 750px;
    height: 299px;
    background: url('@/assets/back_4.png') no-repeat left top/100% 100%;
    margin-top: -120px;
    padding-top: 162px;
    text-align: center;
    font-weight: 500;
    font-size: 28px;
    color: #CAB6FA;
    line-height: 40px;
  }
}
</style>
