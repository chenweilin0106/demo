<template>
  <out-box
    class="CrownYou"
    title="title_3.png"
    :flower="true"
    :petals-array="['petal-2']"
    :necklace="true"
  >
    <crown-box
      v-if="crownYouData.gender == 1"
      :reward-detail="crownYouData"
      type="woman"
      @receive-success="$emit('receive-success')"
    />

    <crown-box
      v-else-if="crownYouData.gender == 0"
      :reward-detail="crownYouData"
      type="man"
      @receive-success="$emit('receive-success')"
    />

    <div class="rule-text">
      <ul>
        <li>
          <span></span>向自己赠送的钻石{{
            crownYouData.gender == 0 ? '大金链' : '王冠'
          }}<i class="focus-color">不计算在内</i>
        </li>
        <li>
          <span></span>活动期间赠送钻石礼物双方可获得<i class="focus-color"
            >双倍经验值和双</i
          >
        </li>
        <li class="focus-color">倍基础魅力值，魅力值上限提高50%</li>
      </ul>
    </div>
  </out-box>
</template>

<script>
import CrownBox from './CrownBox.vue'
export default {
  name: 'CrownYou',
  components: { CrownBox },
  props: ['crownYouData']
}
</script>

<style scoped lang="scss">
.CrownYou {
  margin: 49px auto 104px;
  padding-top: 83px;
  height: 719px;
  ::v-deep .petal-2 {
    bottom: -7px;
    right: 9px;
  }

  .rule-text {
    margin-top: -5px;
    margin-left: 75px;
    width: 614px;
    line-height: 50px;

    span {
      top: 18px;
    }
  }
}
</style>
