<template>
  <div class="DialogBag">
    <div class="tips">符石背包已达上限</div>
    <div class="icon"></div>
    <div class="tit" v-if="type == 1">
      你的符石背包已满，请将任意技能升级至50级，开启符石寻宝分解符石
    </div>
    <div class="tit" v-if="type == 2">你的符石背包已满，请先分解符石</div>
    <div class="btns">
      <div class="leftBtn" @click="$emit('cancel')">取消</div>
      <div class="rightBtn" v-if="type == 1" @click="$emit('skiptoskill')">
        技能升级
      </div>
      <div class="rightBtn" v-if="type == 2" @click="$emit('skiptostone')">
        分解符石
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @name DialogBag
 * @description: 符石背包已达上限

 * @prop {Object} awardData 奖励数据
 * @prop {String} btnText 按钮文案
 * @prop {String} awardName 奖励名字
 * @prop {Boolean} isMultiple 是否多个奖励
 * @slot 用于传入json动画
 */
export default {
  name: 'DialogBag',
  components: {},
  props: {
    awardData: {
      type: [Object, Array]
    },
    btnText: {
      type: String,
      default: '知道了'
    },
    awardName: {
      type: String,
      default: ''
    },
    isMultiple: {
      type: Boolean,
      default: false
    },
    type: {
      type: Number,
      default: 1
    }
  }
}
</script>

<style scoped lang="scss">
/**
    <div class="DialogBag">
        <div class="icon">
        </div>
        <div class="tit">你的符石背包已满，请先分解符石</div>
        <div class="btns">
            <div class="leftBtn">取消</div>
            <div class="rightBtn">分解符石</div>
        </div>
    </div>
    */
.DialogBag {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 610px;
  height: 560px;
  border-radius: 40px;
  background: linear-gradient(180deg, #8360c3, #b75059);
  .tips {
    margin-top: 76px;
    width: 283px;
    height: 33px;
    font-size: 34px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #fff17f;
  }
  .icon {
    width: 139px;
    height: 140px;
    background-image: url('../../assets/tk_19.png');
    background-size: 100% 100%;
    margin-top: 41px;
  }

  .tit {
    max-width: 514px;
    text-align: center;
    margin-top: 51px;
    height: 30px;
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
  }

  .btns {
    margin-top: 63px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 54px;

    .leftBtn,
    .rightBtn {
      width: 240px;
      height: 72px;
      background: linear-gradient(0deg, #cae7ff, #ffffff);
      border: 3px solid #ffffff;
      border-radius: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #4d7ddd;
    }

    .rightBtn {
      background: linear-gradient(0deg, #fff9d1, #ffffff);
      margin-left: 24px;
      color: #a9792c;
    }
  }
}
</style>
