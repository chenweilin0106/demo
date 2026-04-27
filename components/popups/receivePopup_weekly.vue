<template>
  <PopupBox title="恭喜获得" size="1" @clickClose="clickClose">
    <slot name="listTop"></slot>
    <div class="list">
      <div v-for="(item, index) in config" :key="index" class="award flex-column align-center flex-shrink-0" :class="item.type == 'title' ? 'titleClass' : ''">
        <div class="icon position-relative">
          <div v-if="popupTypeName[item.type] || popupTypeName[item.id]" class="typeLabel line-height-1 flex align-center justify-center radius-999 position-absolute">{{ popupTypeName[item.type] || popupTypeName[item.id] }}</div>
          <PublicImg :imgName="item.icon" :imgType="item.type" />
        </div>
        <div class="text w-100 flex align-center justify-center line-height-1 text-nowrap">{{ formatName(item) }}</div>
      </div>
    </div>
    <slot name="listBottom"></slot>
    <div class="button" @click="clickConfirm">{{ buttonText }}</div>
  </PopupBox>
</template>

<script>
import { mapState } from 'vuex'
import { nowEquip } from '@/api'

export default {
  props: ['config'],
  data() {
    return {}
  },
  computed: {
    ...mapState(['typeToNameMap', 'nowEquipText', 'needNowEquipList']),
    // 是否装扮
    isEquip() {
      return this.config.length == 1 && this.needNowEquipList.includes(this.config[0].type)
    },
    // 按钮文案
    buttonText() {
      return this.isEquip ? `立即${this.nowEquipText[this.config[0].type]}` : '我知道了'
    },
    // 一些活动单独定制角标
    popupTypeName() {
      return { ...this.typeToNameMap }
    }
  },
  methods: {
    formatName(info) {
      if (info.type == 'vip') return `加赠天数+${info.nums}天`
      if (info.type == 'zxb') return `星愿券+${info.nums}`
      return this.$toShowText(info)
    },
    async clickConfirm() {
      if (this.isEquip) {
        const { type, tool_id = '', id = '' } = this.config[0]
        this.$toast((await nowEquip({ type, id: tool_id || id })).errmsg)
      }
      this.clickClose()
    },
    clickClose() {
      this.$emit('clickClose')
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .popupContent {
  .main {
    margin-top: 135px !important;
    .list {
      $itemHeight: 128px; /*图标高度*/
      $textHeight: 2 * 18 + 21px; /*文本距离图标位置 文字距离图标距离 * 2 + 文本高度*/
      $listTopPadding: 14px; /*列表顶部距离*/
      width: 100%;
      height: fit-content;
      min-height: calc($itemHeight + $textHeight); /*最小展示一行： 图标高度 + 文字高度*/
      max-height: calc(($itemHeight + $textHeight) * 3 + (($itemHeight + $textHeight) / 9) + $listTopPadding); /*最多展示三行： 图标高度 + 文字高度 +  1/6（图标高度 + 文字高度）*/
      overflow-y: scroll;
      overflow-x: hidden;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      align-content: start;
      padding: $listTopPadding 20px 0; /*列表顶部距离：给角标预留空间；列表左右距离：限制一行数量*/
      margin: 0 auto;
      .award {
        $borderWidth: 4px; /*边框粗细*/
        $radius: 12px; /*圆角*/
        $borderColor: #FFD782;
        $bgc: linear-gradient(0deg, #FFFFFF, #FFFFFF);
        $fontSize: 28px; /*文本字体大小*/
        $color: #FFFFFF;
        width: $itemHeight;
        margin: 0 8px;
        &.titleClass {
          width: 186px;
        }
        .icon {
          width: 100%;
          height: $itemHeight;
          border-radius: $radius + $borderWidth;
          border: $borderWidth solid $borderColor;
          background: $bgc;
          // box-shadow: inset 0 0 5px 1px #c266d9;
        }
        .text {
          width: 100%;
          height: $textHeight;
          font-size: $fontSize;
          color: $color;
        }
      }
    }
    .typeLabel {
      z-index: 1;
      transform: translateY(-50%);
      top: 0;
      right: -8px; /*角标距离右边距离*/
      padding: 0 8px;
      height: 28px;
      background: #ED739A; /*角标背景色*/
      font-weight: 500;
      font-size: 18px; /*角标字体大小*/
      color: #ffffff; /*角标字体颜色*/
    }
    .button {
      margin: 32px auto 0;
      $width: 320px;
      $height: 72px;
      $border: 2px;
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 1;
      white-space: nowrap;
      font-size: 32px;
      font-weight: 400;
      width: $width + $border * 2;
      height: $height + $border * 2;
      color: #A9792C;
      border: $border solid transparent;
      border-radius: 99999px;
      -webkit-background-clip: padding-box, border-box;
      -webkit-background-origin: padding-box, border-box;
      background-image: linear-gradient(0deg, #fff5b0, #ffffff), linear-gradient(#fff, #fff);
    }
  }
}
</style>
