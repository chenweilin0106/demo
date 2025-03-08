<template>
  <PopupBox :title="'title_10.png'" :size="2" :isDown="true" @clickClose="clickClose">
    <div class="rewardsListDiv">
      <div :class="['rewardItem', (item.type == 'title') ? 'titleSp' : item.type == 'room_dec_suit' ? 'roomsuitSp' : 'other']" v-for="(item, index) in config" :key="index">
        <div class="itemIcon">
          <PublicImg :imgName="item.icon" :imgType="item.type"></PublicImg>
        </div>
        <div class="name">{{ item.text }}</div>
        <div class="priceMarkIcon" v-if="item.price_mark&&item.price_mark>0">
          {{item.price_mark}}<img :src="IconPath('zs_27_20.png')" />
        </div>
        <div class="markIcon" v-if="item.mark">{{item.mark}}</div>
        <div class="typeSpMark" v-if="typeSpMarkList[item.type]">{{typeSpMarkList[item.type]}}</div>
        <div class="awardsFree" v-if="item.is_give">赠</div>
        <div class="awardsDouble" v-if="item.is_double">双倍</div>
      </div>
    </div>
    <div class="btn" @click="btnCk">{{(config.length==1&&needNowEquipList.indexOf(config[0].type)!=-1)?`立即${nowEquipText[config[0].type]}`:'我知道了'}}</div>
  </PopupBox>
</template>

<script>
import { nowEquip } from '@/api/index.js'

export default {
  name: 'receiveAwards',
  props: ['config'],
  components: {},
  data() {
    return {
      needNowEquipList: ['title', 'car', 'mic', 'chat_bubble', 'chat_bubble_pub', 'voice'],
      nowEquipText: {
        title: '佩戴',
        car: '装备',
        mic: '装扮',
        chat_bubble: '装扮',
        chat_bubble_pub: '装扮',
        voice: '装扮'
      },
      typeSpMarkList: {
        chat_bubble_pub: '公屏气泡',
        chat_bubble: '聊天气泡',
        costume: '主页特效',
        world_msg_skins: '世界消息皮肤'
      },
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
     * 我知道了/立即装扮
     */
    btnCk() {
      if (this.config.length == 1 && this.needNowEquipList.indexOf(this.config[0].type) != -1) {
        nowEquip({ type: this.config[0].type, id: this.config[0].id }).then((res) => {
          if (res.errno == 0) {
            console.log('已装扮')
            this.$toast(res.errmsg)
            this.clickClose()
          } else {
            this.$toast(res.errmsg)
            this.clickClose()
          }
        })
      } else {
        this.clickClose()
      }
    }
  }
}
</script>

<style scoped lang="scss">
.rewardsListDiv {
  width: 100%;
  margin: 0 auto;
  min-height: 200px;
  max-height: 600px;
  padding: 10px 0 0 0;
  overflow: hidden scroll;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
  .rewardItem {
    height: 180px;
    position: relative;
    display: flex;
    justify-content: center;
    &.titleSp {
      width: 260px;
      .itemIcon {
        width: 218px;
        height: 128px;
      }
    }
    &.roomsuitSp{
      width: 156px;
      height: 252px;
      .itemIcon {
        width: 156px;
        height: 252px;
        border: none;
        border-radius: 0px;
      }
      .name{
        top: auto;
        bottom: -30px;
      }
    }
    &.other {
      width: 160px;
      .itemIcon {
        width: 128px;
        height: 128px;
      }
    }
    .itemIcon{
      background: #fefaef;
      border-radius: 12px;
      border: 4px solid #E06224;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .name {
      color: #fff;
      white-space: nowrap;
      height: 25px;
      font-size: 26px;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      top: 140px;
    }
    .priceMarkIcon{
      background: linear-gradient(-90deg, #75B9FF, #FF84F8);
      border-radius: 15px;
      font-weight: bold;
      font-size: 20px;
      color: #FFFFFF;
      padding: 2px 12px;
      position: absolute;
      right: 0;
      top: -10px;
      img{
        width: 27px;
        height: 20px;
      }
    }
    .markIcon{
      background: #DD6300;
      border-radius: 20px 19px 19px 0px;
      padding: 4px 12px;
      font-weight: 500;
      font-size: 22px;
      color: #FFED77;
      position: absolute;
      right: 0;
      top: -10px;
    }
    .typeSpMark{
      background: #9C65E1;
      border-radius: 20px;
      padding: 4px 12px;
      font-weight: 500;
      font-size: 22px;
      color: #fff;
      position: absolute;
      right: 0;
      top: -10px;
    }
    .awardsFree{
      background: #DD6300;
      border-radius: 14px 0px 17px 0px;
      font-weight: 500;
      font-size: 22px;
      color: #FFE491;
      padding: 3px 8px;
      position: absolute;
      left: 26px;
      top: 0px;
    }
    .awardsDouble{
      background: #FFF382;
      border-radius: 13px;
      font-weight: 500;
      font-size: 20px;
      color: #FF4C4B;
      padding: 3px 8px;
      position: absolute;
      left: 16px;
      top: -10px;
    }
  }
}
.btn {
  width: 320px;
  height: 72px;
  background: linear-gradient(0deg, #FFF9D1, #FFFFFF);
  border-radius: 36px;
  border: 3px solid #FFFFFF;
  margin: 10px auto 20px auto;
  font-size: 32px;
  color: #A9792C;
  line-height: 70px;
  text-align: center;
  overflow: hidden;
}
</style>
