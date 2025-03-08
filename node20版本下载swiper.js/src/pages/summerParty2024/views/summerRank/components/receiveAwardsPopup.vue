<template>
  <PopupBox :title="'title_9.png'" :size="'small'" @clickClose="clickClose">
    <div class="rewardsListDiv">
      <div :class="['rewardItem', item.type == 'title' ? 'title' : 'other']" v-for="(item, index) in config" :key="index">
        <div :class="['itemIcon']">
          <div class="iconBg">
            <PublicImg :imgName="item.icon" :imgType="item.type"></PublicImg>
          </div>
        </div>
        <div class="name">{{ item.text }}</div>
        <div class="markIcon" v-if="item.mark">{{item.mark}}</div>
        <div class="price" v-if="item.price_mark">{{item.price_mark}}<img :src="IconPath('zs_27_20.png')"/></div>
      </div>
    </div>
    <div class="btn" @click="btnCk">{{(config.length==1&&needNowEquipList.indexOf(config[0].type)!=-1)?`立即${nowEquipText[config[0].type]}`:'我知道了'}}</div>
  </PopupBox>
</template>

<script>
import { nowEquip } from '@/pages/summerParty2024/api/index.js'

export default {
  name: 'receiveAwards',
  props: ['config'],
  components: {},
  data() {
    return {
      isShowPo: true,
      needNowEquipList: ['title', 'car', 'mic', 'chat_bubble', 'voice', 'costume'],
      nowEquipText: {
        title: '佩戴',
        car: '装备',
        mic: '装扮',
        chat_bubble: '装扮',
        voice: '装扮',
        costume: '装扮'
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
      if (this.config.length == 1 && this.needNowEquipList.indexOf(this.config[0].type) != -1) {
        nowEquip({ type: this.config[0].type, id: this.config[0].tool_id }).then((res) => {
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
  min-height: 200px;
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
      width: 240px;
      .itemIcon {
        width: 218px;
        height: 128px;
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
    .markIcon{
      background: linear-gradient(90deg, #FE6C45, #FFA442);
      border-radius: 19px;
      padding: 5px 15px;
      font-size: 22px;
      color: #FFFFFF;
      text-align: center;
      position: absolute;
      right: 0px;
      top: -5px;
    }
    .price{
      background: linear-gradient(-90deg, #75B9FF, #FF84F8);
      border-radius: 19px;
      padding: 5px 15px;
      font-size: 22px;
      color: #FFFFFF;
      text-align: center;
      position: absolute;
      right: 0px;
      top: -5px;
      img{
        width: 27px;
        height: 20px;
      }
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
