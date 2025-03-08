<template>
  <!-- 弹框 -->
  <ThemeDialog
    class="dialog"
    :isShow="showDialog"
    dialogMark="bagFull"
    :titleIconObj="{ bagFull: 'title_16.png' }"
    @closeDialog="showDialog = false"
  >
    <div class="DialogBag">
      <div class="tips">符石背包已达上限</div>
      <div class="icon"></div>
      <div class="tit" v-if="type == 1">
        你的符石背包已满，请将任意技能升级至50级，开启符石寻宝分解符石
      </div>
      <div class="tit" v-if="type == 2">你的符石背包已满，请先分解符石</div>
      <div class="btns">
        <div class="leftBtn" @click="showDialog = false">取消</div>
        <div class="rightBtn" v-if="type == 1" @click="skiptoskill">
          技能升级
        </div>
        <div class="rightBtn" v-if="type == 2" @click="skiptostone">
          分解符石
        </div>
      </div>
    </div>
  </ThemeDialog>
</template>

<script>
import ThemeDialog from '../../../components/Dialog/ThemeDialog'
/**
 * @name ThemeDialog
 * @description: 满背包组件
 *
 * @prop {String} dialogMark 弹框标识（如果没有传就标识不要标题图片）
 * @prop {Object} titleIconObj 标题图标对象
 */
export default {
  name: 'bagFull',
  components: { ThemeDialog },
  props: {
    type: {
      type: Number,
      default: 1
    },
    dialogMark: {},
    titleIconObj: {}
  },
  data() {
    return {
      showDialog: false
    }
  }
}
</script>

<style scoped lang="scss">
// 弹框样式
.ThemeDialog {
  width: 608px;
  overflow: visible;
  background-color: transparent !important;
  display: flex;
  flex-direction: column;
  align-items: center;
  ::v-deep .van-dialog__content {
    background-color: #c59ce8;
    border-radius: 24px;
  }
  .content {
    width: 500px;
    height: 330px;
    background: linear-gradient(180deg, #8360c3, #b75059);
    border-radius: 20px;
    border: 4px solid #eee1ff;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    .tit1 {
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      margin-top: 48px;

      i {
        font-size: 34px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffe84d;
      }
    }

    .tit2 {
      margin-top: 16px;
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;

      i {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #a0f7ff;
      }
    }

    .btns {
      margin-top: 41px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 372px;

      .leftBtn,
      .rightBtn {
        width: 172px;
        height: 72px;
        background: linear-gradient(0deg, #cae7ff, #ffffff);
        border: 2px solid #ffffff;
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
        color: #a9792c;
      }
    }

    .checkBox {
      margin-top: 17px;
      display: flex;
      align-items: center;
      div {
        flex-shrink: 0;
      }

      .circle {
        width: 50px;
        height: 48px;
        background-image: url('../../../assets/tk_8.png');
        background-size: 100% 100%;
        margin-right: 1px;
      }

      .circle2 {
        background-image: url('../../../assets/tk_9.png');
      }

      .tit3 {
        margin-top: 7px;
        font-size: 26px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
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
      height: 33px;
      font-size: 34px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #fff17f;
      white-space: nowrap;
    }
    .icon {
      width: 139px;
      height: 140px;
      background-image: url('../../../assets/tk_19.png');
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
}
</style>
