<template>
  <PopupBox :title="'mk1_title_12.png'" @clickClose="clickClose">
    <div class="rules-text-popup">
      <ul>
        <li><span></span>规定时间内累计充值满5000可领取一枚橙色【神运</li>
        <li>符石】</li>
        <li><span></span>充值每满1000可随机抽取一个神运六件套符石</li>
        <li><span></span>神运说明及神运六件套符石单次抽取概率公示如下：</li>
      </ul>
    </div>
    <div class="awardsItem" v-for="(item) in awardsList" :key="item.id">
      <img class="awardsImg" :src="IconPath(item.icon)" />
      <div class="awardsName">
        <span>{{item.name}}</span>
        <div class="awardsLevel">Lv.{{item.level}}</div>
      </div>
      <div class="awardsText" v-html="config == 3 ? item.text2 : item.text1"></div>
      <img v-if="item.prob" :src="IconPath(item.prob)" class="awardsProb position-absolute" />
    </div>
  </PopupBox>
</template>

<script>
export default {
  name: 'rulesPopup',
  props: ['config'],
  components: {},
  data() {
    return {
      awardsList: [
        { id: 1, icon: 'sy.png', name: '神运', level: 1, text1: '镶嵌在【任意技能】上，升级该技能时有\n21%概率额外提供1%成功率', text2: '镶嵌在【任意技能】上，升级该技能时有\n21%概率额外提供2点经验值' },
        { id: 2, icon: 'sy_ti.png', name: '神运·踢', level: 1, text1: '镶嵌在【佛山无影脚】上，升级该技能时\n有21%概率额外提供1%成功率', text2: '镶嵌在【佛山无影脚】上，升级该技能时\n有21%概率额外提供2点经验值', prob: 'tk_63.png' },
        { id: 3, icon: 'sy_m.png', name: '神运·么', level: 1, text1: '镶嵌在【唇齿相依】上，升级该技能时有\n21%概率额外提供1%成功率', text2: '镶嵌在【唇齿相依】上，升级该技能时有\n21%概率额外提供2点经验值', prob: 'tk_63.png' },
        { id: 4, icon: 'sy_s.png', name: '神运·锁', level: 1, text1: '镶嵌在【画地为牢】上，升级该技能时有\n21%概率额外提供1%成功率', text2: '镶嵌在【画地为牢】上，升级该技能时有\n21%概率额外提供2点经验值', prob: 'tk_64.png' },
        { id: 5, icon: 'sy_zhu.png', name: '神运·猪', level: 1, text1: '镶嵌在【斗转星移】上，升级该技能时有\n21%概率额外提供1%成功率', text2: '镶嵌在【斗转星移】上，升级该技能时有\n21%概率额外提供2点经验值', prob: 'tk_64.png' },
        { id: 6, icon: 'sy_t.png', name: '神运·弹', level: 1, text1: '镶嵌在【一阳指】上，升级该技能时有21%\n概率额外提供1%成功率', text2: '镶嵌在【一阳指】上，升级该技能时有21%\n概率额外提供2点经验值', prob: 'tk_64.png' },
        { id: 7, icon: 'sy_zhua.png', name: '神运·抓', level: 1, text1: '镶嵌在【春风得意】上，升级该技能时有\n21%概率额外提供1%成功率', text2: '镶嵌在【春风得意】上，升级该技能时有\n21%概率额外提供2点经验值', prob: 'tk_64.png' }
      ]
    }
  },
  created() {},
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
.img1{
  width: 555px;
  height: 566px;
  background: url('@/pages/yearCelebration/assets/tk_39.png') no-repeat left top/100% 100%;
  margin: 10px auto 10px auto;
}
.img2{
  width: 555px;
  height: 565px;
  background: url('@/pages/yearCelebration/assets/tk_40.png') no-repeat left top/100% 100%;
  margin: 10px auto 10px auto;
}
.awardsItem{
  width: 563px;
  height: 124px;
  background: rgba(96, 51, 198, 0.4);
  border-radius: 62px;
  margin: 10px auto 0 auto;
  position: relative;
  .awardsImg{
    width: 120px;
    height: 120px;
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  .awardsName{
    font-weight: 500;
    font-size: 26px;
    color: #FFED75;
    line-height: 36px;
    position: absolute;
    left: 130px;
    top: 20px;
    .awardsLevel{
      background: #674BC3;
      border-radius: 15px;
      padding: 0px 14px;
      font-weight: 400;
      font-size: 22px;
      color: #C5B2FF;
      line-height: 36px;
      position: absolute;
      right: -80px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .awardsText{
    font-weight: 400;
    font-size: 22px;
    color: #E0CFFF;
    line-height: 30px;
    white-space: pre-wrap;
    position: absolute;
    left: 130px;
    bottom: 10px;
  }
  .awardsProb{
    top: 0;
    right: 3px;
    width: 68px;
    height: 30px;
  }
}
</style>
