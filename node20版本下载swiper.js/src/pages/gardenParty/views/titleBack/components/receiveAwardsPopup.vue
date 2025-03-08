<template>
  <div class="component">
    <van-popup
      v-model="isShowPo"
      :close-on-click-overlay="false"
      @click-overlay="clickClose"
    >
      <PopupBox class="popup-content" title="title_7.png" balloon="true">
        <div class="main">
          <div class="rewardsListDiv">
          <div :class="['rewardItem', item.type == 'title' ? 'special' : 'other']" v-for="(item, index) in configReceiveAwardsPopup" :key="index">
            <div class="itemIcon">
              <PublicJson v-if="item.type=='title'" :jsonName="item.icon"></PublicJson>
              <PublicSvga class="iconSvga" v-else-if="item.type=='mic'" :svgaName="item.icon.replace('.svga', '')" :userAvatar="$store.state.user_icon" />
              <img v-else :src="IconPath(item.icon)" />
            </div>
            <div class="name">{{ item.text }}</div>
          </div>
          </div>
          <div class="btn" @click="btnCk"></div>
        </div>
      </PopupBox>
    </van-popup>
  </div>
</template>

<script>
import PublicJson from '@/pages/gardenParty/components/PublicJson.vue'
import PublicSvga from '@/pages/gardenParty/components/PublicSvga.vue'
import { nowEquip } from '@/pages/gardenParty/api/index.js'

export default {
  name: 'receiveAwards',
  props: ['configReceiveAwardsPopup'],
  components: {
    PublicJson,
    PublicSvga
  },
  data() {
    return {
      isShowPo: true
    }
  },
  created() {},
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    /**
     * 关闭弹窗
     */
    clickClose() {
      this.$emit('clickClose')
    },
    /**
     * 立即装扮/我知道了
     */
    btnCk() {
      console.log(this.configReceiveAwardsPopup)
      nowEquip({ type: this.configReceiveAwardsPopup[0].type, id: this.configReceiveAwardsPopup[0].id }).then((res) => {
        if (res.errno == 0) {
          console.log('已装扮')
          this.$toast(res.errmsg)
          this.clickClose()
        } else {
          this.$toast(res.errmsg)
          this.clickClose()
        }
      })
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
      // height: 600px;
      color: #fff;
      padding: 80px 20px 60px 20px;
      .bigTip{
        text-align: center;
        margin-bottom: 10px;
      }
      .rewardsListDiv {
        width: 450px;
        margin: 0 auto;
        min-height: 300px;
        max-height: 600px;
        overflow-y: scroll;
        overflow-x: hidden;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-flow: row wrap;
        .rewardItem {
          height: 180px;
          position: relative;
          &.special {
            width: 230px;
            .itemIcon {
              width: 218px;
              height: 128px;
              background: #fefaef;
              border-radius: 12px;
              border: 4px solid #FFD0E7;
              display: flex;
              justify-content: center;
              align-items: center;
              img {
                width: 210px;
                height: 96px;
              }
            }
          }
          &.other {
            width: 140px;
            .itemIcon {
              width: 128px;
              height: 128px;
              background: #fefaef;
              border-radius: 12px;
              border: 4px solid #FFD0E7;
              display: flex;
              justify-content: center;
              align-items: center;
              .iconSvga{
                width: 120px;
                height: 120px;
              }
              img {
                width: 120px;
                height: 120px;
              }
            }
          }
          .name {
            white-space: nowrap;
            height: 25px;
            font-size: 26px;
            position: absolute;
            left: 50%;
            transform: translate(-50%);
            top: 140px;
          }
        }
      }
      .btn {
        width: 320px;
        height: 72px;
        background: linear-gradient(0deg, #FFF9D1, #FFFFFF);
        border-radius: 36px;
        border: 2px solid #FFFFFF;
        margin: 10px auto 0px auto;
        font-size: 32px;
        color: #A9792C;
        line-height: 70px;
        text-align: center;
        &::after {
          content: '立即装扮';
        }
      }
    }
  }
}
</style>
