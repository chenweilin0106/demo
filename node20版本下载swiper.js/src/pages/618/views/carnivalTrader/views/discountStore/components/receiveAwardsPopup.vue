<template>
  <PopupBox :title="'title_7.png'" @clickClose="clickClose">
    <div class="rewardsListDiv">
      <div :class="['rewardItem', item.type == 'title' ? 'title' : 'other']" v-for="(item, index) in config" :key="index">
        <div :class="['itemIcon']">
          <div class="iconBg">
            <PublicImg :imgName="item.icon" :imgType="item.type"></PublicImg>
          </div>
        </div>
        <div class="name">{{ item.text }}</div>
        <div class="markIcon" v-if="item.mark">
          <PublicImg :imgName="item.mark"></PublicImg>
        </div>
      </div>
    </div>
    <div class="btn" @click="btnCk">{{(config.length==1&&$store.state.needNowEquipList.indexOf(config[0].type)!=-1)?`立即${$store.state.nowEquipText[config[0].type]}`:'我知道了'}}</div>
  </PopupBox>
</template>

<script>
import { nowEquip } from '@/pages/618/api/index.js'

export default {
  name: 'receiveAwards',
  props: ['config'],
  components: {},
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
     * 我知道了/立即装扮
     */
    btnCk() {
      if (this.config.length == 1 && this.$store.state.needNowEquipList.indexOf(this.config[0].type) != -1) {
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
    .markIcon{
      height: 28px;
      position: absolute;
      right: 26px;
      top: 0px;
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
