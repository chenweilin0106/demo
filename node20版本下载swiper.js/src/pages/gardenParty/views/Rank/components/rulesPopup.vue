<template>
  <div class="component">
    <van-popup
      v-model="isShowPo"
      :close-on-click-overlay="false"
      @click-overlay="clickClose"
    >
      <PopupBox class="popup-content" title="title_12.png" balloon="true">
        <div class="main">
          <div class="popupContent">
            <div class="titleDiv">
              <div class="rankText">第一名</div>
            </div>
            <div class="awardsDiv">
              <div class="awardItem" v-for="(item) in awardsList.slice(0,1)" :key="item.id"><PublicJson class="awardsIconJson" v-if="item.type=='chat_bubble'" :jsonName="item.icon"></PublicJson><img v-else :src="IconPath(item.icon)" /><div class="awardsText">{{item.text}}</div></div>
              <div class="awardItem" v-for="(item) in awardsList.slice(3,4)" :key="item.id"><PublicJson class="awardsIconJson" v-if="item.type=='chat_bubble'" :jsonName="item.icon"></PublicJson><img v-else :src="IconPath(item.icon)" /><div class="awardsText">{{item.text}}</div></div>
              <div class="awardItem" v-for="(item) in awardsList.slice(8,9)" :key="item.id"><PublicJson class="awardsIconJson" v-if="item.type=='chat_bubble'" :jsonName="item.icon"></PublicJson><img v-else :src="IconPath(item.icon)" /><div class="awardsText">{{item.text}}</div></div>
            </div>
            <div class="titleDiv">
              <div class="rankText">第二名</div>
            </div>
            <div class="awardsDiv">
              <div class="awardItem" v-for="(item) in awardsList.slice(1,2)" :key="item.id"><PublicJson class="awardsIconJson" v-if="item.type=='chat_bubble'" :jsonName="item.icon"></PublicJson><img v-else :src="IconPath(item.icon)" /><div class="awardsText">{{item.text}}</div></div>
              <div class="awardItem" v-for="(item) in awardsList.slice(4,5)" :key="item.id"><PublicJson class="awardsIconJson" v-if="item.type=='chat_bubble'" :jsonName="item.icon"></PublicJson><img v-else :src="IconPath(item.icon)" /><div class="awardsText">{{item.text}}</div></div>
              <div class="awardItem" v-for="(item) in awardsList.slice(9,10)" :key="item.id"><PublicJson class="awardsIconJson" v-if="item.type=='chat_bubble'" :jsonName="item.icon"></PublicJson><img v-else :src="IconPath(item.icon)" /><div class="awardsText">{{item.text}}</div></div>
            </div>
            <div class="titleDiv">
              <div class="rankText">第三名</div>
            </div>
            <div class="awardsDiv">
              <div class="awardItem" v-for="(item) in awardsList.slice(2,3)" :key="item.id"><PublicJson class="awardsIconJson" v-if="item.type=='chat_bubble'" :jsonName="item.icon"></PublicJson><img v-else :src="IconPath(item.icon)" /><div class="awardsText">{{item.text}}</div></div>
              <div class="awardItem" v-for="(item) in awardsList.slice(5,6)" :key="item.id"><PublicJson class="awardsIconJson" v-if="item.type=='chat_bubble'" :jsonName="item.icon"></PublicJson><img v-else :src="IconPath(item.icon)" /><div class="awardsText">{{item.text}}</div></div>
              <div class="awardItem" v-for="(item) in awardsList.slice(10,11)" :key="item.id"><PublicJson class="awardsIconJson" v-if="item.type=='chat_bubble'" :jsonName="item.icon"></PublicJson><img v-else :src="IconPath(item.icon)" /><div class="awardsText">{{item.text}}</div></div>
            </div>
            <div class="titleDiv">
              <div class="rankText">第四~六名</div>
              <div class="rankText">第六~十名</div>
              <div class="rankText">幸运奖</div>
            </div>
            <div class="awardsDiv">
              <div class="awardItem" v-for="(item) in awardsList.slice(6,7)" :key="item.id"><PublicJson class="awardsIconJson" v-if="item.type=='chat_bubble'" :jsonName="item.icon"></PublicJson><img v-else :src="IconPath(item.icon)" /><div class="awardsText">{{item.text}}</div></div>
              <div class="awardItem" v-for="(item) in awardsList.slice(7,8)" :key="item.id"><PublicJson class="awardsIconJson" v-if="item.type=='chat_bubble'" :jsonName="item.icon"></PublicJson><img v-else :src="IconPath(item.icon)" /><div class="awardsText">{{item.text}}</div></div>
              <div class="awardItem" v-for="(item) in awardsList.slice(11,12)" :key="item.id"><PublicJson class="awardsIconJson" v-if="item.type=='chat_bubble'" :jsonName="item.icon"></PublicJson><img v-else :src="IconPath(item.icon)" /><div class="awardsText">{{item.text}}</div></div>
            </div>
          </div>
        </div>
      </PopupBox>
    </van-popup>
  </div>
</template>

<script>
import PublicJson from '@/pages/gardenParty/components/PublicJson.vue'

export default {
  name: 'rulesPopup',
  props: [],
  components: {
    PublicJson
  },
  data() {
    return {
      pageLocation: undefined,
      isShowPo: true,
      awardsList: [
        { id: 1, type: 'chat_bubble', icon: 'qp_yhzy_sc', text: '气泡+3天', isLuck: false },
        { id: 2, type: 'chat_bubble', icon: 'qp_yhzy_sc', text: '气泡+2天', isLuck: false },
        { id: 3, type: 'chat_bubble', icon: 'qp_yhzy_sc', text: '气泡+1天', isLuck: false },
        { id: 4, type: 'tool', icon: 'hjcbt_120_120.png', text: '黄金藏宝图+1', isLuck: false },
        { id: 5, type: 'tool', icon: 'cbt_120_120.png', text: '藏宝图+5', isLuck: false },
        { id: 6, type: 'tool', icon: 'cbt_120_120.png', text: '藏宝图+3', isLuck: false },
        { id: 7, type: 'tool', icon: 'cbt_120_120.png', text: '藏宝图+2', isLuck: false },
        { id: 8, type: 'tool', icon: 'cbt_120_120.png', text: '藏宝图+1', isLuck: false },
        { id: 9, type: 'tool', icon: 'lhq_120_120.png', text: '靓号券+5', isLuck: false },
        { id: 10, type: 'tool', icon: 'lhq_120_120.png', text: '靓号券+3', isLuck: false },
        { id: 11, type: 'tool', icon: 'lhq_120_120.png', text: '靓号券+1', isLuck: false },
        { id: 12, type: 'tool', icon: 'yb_120_120.png', text: '元宝+20万', isLuck: true }
      ]
    }
  },
  created() {
    this.stopScroll()
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    /**
     * 关闭弹窗
     */
    clickClose() {
      this.autoScroll()
      this.$emit('clickClose')
    },
    /**
     * 阻止滚动条滚动
     */
    stopScroll() {
      // document.body.style.top = '0'
      // document.body.style.position = 'fixed'
      // document.body.style.height = '100%'
      document.body.style.width = '100%'
      // document.body.style.overflow = 'hidden'
      let scrollTop = window.scrollY
      this.pageLocation = scrollTop
      document.body.style.position = 'fixed'
      document.body.style.top = '-' + scrollTop + 'px'
    },
    /**
     * 恢复滚动条滚动
     */
    autoScroll() {
      // document.body.style.position = 'initial'
      // document.body.style.overflowY = 'auto'
      document.body.style.position = 'static'
      window.scrollTo(0, this.pageLocation)
    }
  }
}
</script>

<style scoped lang="scss">
.component{
  .van-popup {
    width: 100%;
    height: 100%;
    background-color: transparent;
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .popup-content {
    position: fixed;
    padding: 5px;
    pointer-events: auto;
    .main {
      width: 100%;
      font-size: 26px;
      color: #FFFFFF;
      padding: 60px 20px 60px 20px;
      .popupContent{
        width: 100%;
        max-height: 600px;
        overflow-y: scroll;
        .titleDiv{
          height: 42px;
          margin: 20px 0;
          display: flex;
          justify-content: space-around;
          .rankText{
            width: 150px;
            height: 42px;
            background: rgb(85, 50, 149,0.6);
            border-radius: 21px;
            text-align: center;
            line-height: 42px;
            white-space: nowrap;
          }
        }
        .awardsDiv{
          height: 160px;
          display: flex;
          justify-content: space-around;
          .awardItem{
            width: 128px;
            height: 128px;
            background: #FFFFFF;
            border-radius: 12px;
            border: 4px solid #FFD0E7;
            position: relative;
            .awardsIconJson{
              width: 120px;
              height: 120px;
            }
            img{
              width: 120px;
              height: 120px;
            }
            .awardsText{
              font-size: 22px;
              text-align: center;
              white-space: nowrap;
              position: absolute;
              left: 50%;
              transform: translateX(-50%);
              top: 130px;
            }
          }
        }
      }
    }
  }
}
</style>
