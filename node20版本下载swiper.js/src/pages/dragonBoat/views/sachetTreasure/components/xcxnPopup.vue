<template>
  <div class="compo">
    <PopupBox :title="'title_11.png'" @clickClose="clickClose">
      <div class="topTip1">{{pool_level!=show_pool_level?'预览':'当前'}}:&ensp;<i>LV.{{show_pool_level}}</i></div>
      <div class="topTip2">可获得以下奖励之一</div>
      <div class="rewardsArea">
        <div class="exIcon" v-for="(item) in rewards[show_pool_level]" :key="item.id">
          <div class="eIcon">
            <PublicImg :imgName="item.icon"></PublicImg>
          </div>
          <div class="eText">{{item.text}}</div>
          <img class="eRightMark" v-if="item.rightMark" :src="IconPath(item.rightMark)" />
          <div class="eRbMark" v-if="item.rbMark">{{item.rbMark}}</div>
          <div class="eIsLock" v-if="item.isLock"></div>
          <img class="eLeftMark" v-if="item.leftMark" :src="IconPath(item.leftMark)" />
        </div>
      </div>
      <div class="rulesBg">
        <div class="rules-text-popup">
          <ul>
            <li><span></span>【征服者】：佛山无影脚技能基础命中增加10%，</li>
            <li>基础闪避增加10%（最多获取15天，达到上限时其</li>
            <li>概率转移至【黄金藏宝图】上）</li>
            <li><span></span>卓越符石礼包按照以下概率：</li>
            <li>绿色符石：47%、蓝色符石：30%、</li>
            <li>紫色符石：15%、橙色符石：8%</li>
          </ul>
        </div>
      </div>
      <div class="leftArrowDiv" v-if="leftArrow<show_pool_level" @click="show_pool_level--"></div>
      <div class="righArrowDiv" v-if="righArrow>show_pool_level" @click="show_pool_level++"></div>
    </PopupBox>
  </div>
</template>

<script>
export default {
  name: 'xcxnPopup',
  props: ['pool_level'],
  components: {},
  data() {
    return {
      show_pool_level: 1,
      leftArrow: 1,
      righArrow: 2,
      rewards: {
        1: [
          { id: 11, icon: 'lhq_120_120.png', text: '靓号券+1', rightMark: 'tk_15.png' },
          { id: 12, icon: 'xyys_120_120.png', text: '钥匙+1', rightMark: 'tk_15.png' },
          { id: 13, icon: 'sjljslb_120_120.png', text: '随机绿晶石礼包', rightMark: 'tk_15.png', rbMark: '26~166个' },
          { id: 14, icon: 'cbt_120_120.png', text: '藏宝图+5', rightMark: 'tk_15.png' },
          { id: 15, icon: 'sjfs_120_120.png', text: '卓越符石礼包+1', leftMark: 'tk_13.png', isLock: true },
          { id: 16, icon: 'mzdm_120_120.png', text: '气泡+3天', leftMark: 'tk_13.png', isLock: true },
          { id: 17, icon: 'rhty_120_120.png', text: '座驾+3天', leftMark: 'tk_14.png', isLock: true },
          { id: 18, icon: 'hjcbt_120_120.png', text: '黄金藏宝图+1', leftMark: 'tk_14.png', isLock: true },
          { id: 19, icon: 'ch_zfz', text: '属性称号+3天', leftMark: 'tk_14.png', isLock: true }
        ],
        2: [
          { id: 21, icon: 'lhq_120_120.png', text: '靓号券+1', rightMark: 'tk_16.png' },
          { id: 22, icon: 'xyys_120_120.png', text: '钥匙+1', rightMark: 'tk_16.png' },
          { id: 23, icon: 'sjljslb_120_120.png', text: '随机绿晶石礼包', rightMark: 'tk_16.png', rbMark: '26~166个' },
          { id: 24, icon: 'cbt_120_120.png', text: '藏宝图+5', rightMark: 'tk_16.png' },
          { id: 25, icon: 'sjfs_120_120.png', text: '卓越符石礼包+1', rightMark: 'tk_17.png' },
          { id: 26, icon: 'mzdm_120_120.png', text: '气泡+3天', rightMark: 'tk_17.png' },
          { id: 27, icon: 'rhty_120_120.png', text: '座驾+3天', leftMark: 'tk_14.png', isLock: true },
          { id: 28, icon: 'hjcbt_120_120.png', text: '黄金藏宝图+1', leftMark: 'tk_14.png', isLock: true },
          { id: 29, icon: 'ch_zfz', text: '属性称号+3天', leftMark: 'tk_14.png', isLock: true }
        ],
        3: [
          { id: 31, icon: 'lhq_120_120.png', text: '靓号券+1', rightMark: 'tk_18.png' },
          { id: 32, icon: 'xyys_120_120.png', text: '钥匙+1', rightMark: 'tk_19.png' },
          { id: 33, icon: 'sjljslb_120_120.png', text: '随机绿晶石礼包', rightMark: 'tk_19.png', rbMark: '26~166个' },
          { id: 34, icon: 'cbt_120_120.png', text: '藏宝图+5', rightMark: 'tk_19.png' },
          { id: 35, icon: 'sjfs_120_120.png', text: '卓越符石礼包+1', rightMark: 'tk_19.png' },
          { id: 36, icon: 'mzdm_120_120.png', text: '气泡+3天', rightMark: 'tk_19.png' },
          { id: 37, icon: 'rhty_120_120.png', text: '座驾+3天', rightMark: 'tk_19.png' },
          { id: 38, icon: 'hjcbt_120_120.png', text: '黄金藏宝图+1', rightMark: 'tk_19.png' },
          { id: 39, icon: 'ch_zfz', text: '属性称号+3天', rightMark: 'tk_19.png' }
        ],
        4: [
          { id: 43, icon: 'sjljslb_120_120.png', text: '随机绿晶石礼包', rightMark: 'tk_20.png', rbMark: '26~166个' },
          { id: 44, icon: 'cbt_120_120.png', text: '藏宝图+5', rightMark: 'tk_20.png' },
          { id: 45, icon: 'sjfs_120_120.png', text: '卓越符石礼包+1', rightMark: 'tk_21.png' },
          { id: 46, icon: 'mzdm_120_120.png', text: '气泡+3天', rightMark: 'tk_22.png' },
          { id: 47, icon: 'rhty_120_120.png', text: '座驾+3天', rightMark: 'tk_22.png' },
          { id: 48, icon: 'hjcbt_120_120.png', text: '黄金藏宝图+1', rightMark: 'tk_22.png' },
          { id: 49, icon: 'ch_zfz', text: '属性称号+3天', rightMark: 'tk_22.png' }
        ],
        5: [
          { id: 55, icon: 'sjfs_120_120.png', text: '卓越符石礼包+1', rightMark: 'tk_22.png' },
          { id: 56, icon: 'mzdm_120_120.png', text: '气泡+3天', rightMark: 'tk_22.png' },
          { id: 57, icon: 'rhty_120_120.png', text: '座驾+3天', rightMark: 'tk_23.png' },
          { id: 58, icon: 'hjcbt_120_120.png', text: '黄金藏宝图+1', rightMark: 'tk_21.png' },
          { id: 59, icon: 'ch_zfz', text: '属性称号+3天', rightMark: 'tk_21.png' }
        ]
      }
    }
  },
  created() {
    this.show_pool_level = JSON.parse(JSON.stringify(Number(this.pool_level) || 1))
    // this.show_pool_level = 5
    this.leftArrow = JSON.parse(JSON.stringify(Number(this.pool_level)))
    this.righArrow = JSON.parse(JSON.stringify(Number(this.pool_level) >= 5 ? 5 : Number(this.pool_level) + 1))
  },
  mounted() {},
  computed: {},
  watch: {},
  methods: {
    /**
     * 关闭弹窗(必需)
     */
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
.compo{
  .topTip1{
    font-weight: 500;
    font-size: 28px;
    width: fit-content;
    background: #358E94;
    border-radius: 23px;
    padding: 5px 70px;
    margin: 0 auto;
    i{
      color: #FFF36E;
    }
  }
  .topTip2{
    font-weight: 400;
    font-size: 24px;
    text-align: center;
    margin: 20px auto 20px auto;
  }
  .rewardsArea{
    width: 600px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .exIcon{
      width: 130px;
      height: 130px;
      background: #FFFFFF;
      border-radius: 20px;
      border: 4px solid #FBE590;
      margin: 20px 20px 0 20px;
      position: relative;
      .eIcon{
        width: 110px;
        height: 110px;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: -5px;
      }
      .eText{
        width: 122px;
        height: 36px;
        background: #358E94;
        border-radius: 0 0 10px 10px;
        text-align: center;
        font-weight: 400;
        font-size: 16px;
        line-height: 36px;
        position: absolute;
        bottom: 0;
      }
      .eRightMark{
        width: 65px;
        height: 59px;
        position: absolute;
        right: -20px;
        top: -22px;
      }
      .eRbMark{
        background: #FBE590;
        border-radius: 22px 0px 0px 22px;
        font-size: 15px;
        line-height: 15px;
        color: #358E94;
        padding: 2px 5px;
        position: absolute;
        right: 0;
        bottom: 34px;
      }
      .eIsLock{
        width: 122px;
        height: 122px;
        background-color: rgba(0, 0, 0, 0.5);
        border-radius: 20px;
        position: absolute;
        left: 0;
        right: 0;
      }
      .eLeftMark{
        width: 80px;
        height: 30px;
        position: absolute;
        left: 0px;
        top: 0px;
      }
    }
  }
  .rulesBg{
    background: #CEB560;
    border-radius: 20px;
    margin: 20px 5px 0 5px;
  }
  .leftArrowDiv{
    width: 76px;
    height: 103px;
    background: url('@/pages/dragonBoat/assets/tk_11.png') no-repeat left top/100% 100%;
    position: absolute;
    left: -40px;
    top: 50%;
    transform: translateY(-50%);
  }
  .righArrowDiv{
    width: 76px;
    height: 103px;
    background: url('@/pages/dragonBoat/assets/tk_12.png') no-repeat left top/100% 100%;
    position: absolute;
    right: -40px;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
