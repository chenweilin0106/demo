<template>
  <PopupBox :title="'mk1_title_11.png'" :size="2" @clickClose="clickClose">
    <div class="rewardsListDiv">
      <div :class="['rewardItem', item.type == 'title' ? 'title' : 'other']" v-for="(item, index) in config" :key="index">
        <div :class="['itemIcon']">
          <div class="iconBg">
            <PublicImg :imgName="item.icon" :imgType="item.type"></PublicImg>
          </div>
        </div>
        <div class="name">{{ item.text }}</div>
        <div class="priceMarkIcon" v-if="item.show_price&&item.show_price>0">
          {{item.show_price}}<img :src="IconPath('zs_27_20.png')" />
        </div>
        <div class="typeSpMark" v-if="typeSpMarkList[item.type]">{{typeSpMarkList[item.type]}}</div>
      </div>
    </div>
    <div class="btn" @click="btnCk">{{(config.length==1&&nowEquipText[config[0].type])?`立即${nowEquipText[config[0].type]}`:'我知道了'}}</div>
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
      nowEquipText: {
        title: '佩戴',
        car: '装备',
        mic: '装扮',
        costume: '装扮',
        chat_bubble: '装扮',
        chat_bubble_pub: '装扮',
        voice: '装扮'
      },
      typeSpMarkList: {
        pst_privilege: '赠送权',
        costume: '主页特效',
        chat_bubble_pub: '公屏气泡',
        chat_bubble: '私聊气泡',
        world_msg_skins: '世界消息皮肤',
        CP_card: 'CP资料卡'
      }
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
      if (this.config.length == 1 && this.nowEquipText[this.config[0].type]) {
        nowEquip({ type: this.config[0].type, id: this.config[0].good_id || this.config[0].id }).then((res) => {
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
.topTipDiv{
  font-size: 26px;
  color: #FFFFFF;
  text-align: center;
  margin: 0px auto 10px auto;
}
.rewardsListDiv {
  width: 100%;
  margin: 0px auto 0 auto;
  min-height: 300px;
  max-height: 600px;
  overflow: hidden scroll;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: row wrap;
  .rewardItem {
    height: 180px;
    padding: 15px 0 0 0;
    position: relative;
    display: flex;
    justify-content: center;
    &.title {
      width: 260px;
      .itemIcon {
        width: 218px;
        height: 128px;
      }
    }
    &.other {
      width: 180px;
      .itemIcon {
        width: 128px;
        height: 128px;
      }
    }
    .itemIcon{
      background:  #FBE590;
      border-radius: 12px;
      padding: 4px;
      .iconBg{
        width: 100%;
        height: 100%;
        background: #fefaef;
        border-radius: 12px;
      }
    }
    .name {
      color: #fff;
      white-space: nowrap;
      height: 25px;
      font-size: 26px;
      position: absolute;
      left: 50%;
      transform: translate(-50%);
      bottom: 0px;
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
      height: 28px;
      position: absolute;
      right: 26px;
      top: 0px;
    }
    .markRebate{
      background: #40A6A9;
      border-radius: 14px;
      padding: 4px 10px;
      font-weight: 500;
      font-size: 18px;
      color: #FFFFFF;
      position: absolute;
      right: 10px;
      top: 0;
    }
    .typeSpMark{
      background: #2CB1A9;
      border-radius: 20px;
      padding: 4px 12px;
      font-weight: 500;
      font-size: 22px;
      color: #fff;
      position: absolute;
      right: 10px;
      top: 0;
    }
  }
}
.btn {
  width: 320px;
  height: 72px;
  background: linear-gradient(0deg, #FFF9D1, #FFFFFF);
  border-radius: 36px;
  border: 2px solid #FFFFFF;
  margin: 20px auto 20px auto;
  font-size: 32px;
  color: #A9792C;
  line-height: 70px;
  text-align: center;
}
</style>
