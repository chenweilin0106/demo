<template>
  <div class="DialogPreview">
    <slot name="main">
      <!-- 头饰 声波 称号 小型预览 -->
      <div
        v-if="size === 'small'"
        :class="{ title_size: goods_type === 'title' }"
        class="small_box"
      >
        <div v-if="label" class="label flex_across">{{ label }}</div>
        <public-svga
          v-if="animateType === 'svga' && animateName"
          svgaName="animateName"
          :userAvatar="avatar"
        />
        <public-json
          v-else-if="animateType === 'json' && animateName"
          :jsonName="animateName"
        />
      </div>
      <!-- 主页特效 座驾 大型预览 -->
      <div
        v-else-if="size === 'big'"
        class="big_box"
        :style="{
          backgroundImage:
            backgroundImage &&
            'url(' + require(`../../assets/${backgroundImage}`) + ')'
        }"
      >
        <public-svga
          v-if="animateType === 'svga' && animateName"
          :svgaName="animateName"
        />
        <public-json
          v-else-if="animateType === 'json' && animateName"
          :jsonName="animateName"
        />
      </div>
    </slot>
    <slot name="text">
      <!-- 说明文本 -->
      <div class="preview-text">
        {{ text }}
      </div>
    </slot>
  </div>
</template>

<script>
/**
 * @name DialogPreview
 * @description: 预览弹框
 * @prop {Object} info 预览配置
 * @prop {String} info.size 预览大小 big/small
 * @prop {String} info.animateType 动画类型 svga/json
 * @prop {String} info.animateName 动画名称
 * @prop {String} info.text 说明文本
 * @prop {String} info.goods_type 物品类型
 * @prop {String} info.backgroundImage big 预览背景图
 * @prop {String} info.label 左上角label
 * @slot main 主要内容 目前就两种 特殊情况可以用插槽
 * @slot text 说明文本 可能出现两行或者三行
 */
import PublicSvga from '@/components/PublicSvga.vue'
import PublicJson from '@/components/PublicJson.vue'

export default {
  name: 'DialogPreview',
  components: { PublicSvga, PublicJson },
  props: {
    info: {
      type: Object,
      default: () => {
        return {
          size: 'small',
          animateType: '',
          animateName: '',
          text: '预览文本',
          goods_type: '',
          backgroundImage: '',
          label: 'label'
        }
      }
    }
  },
  computed: {
    label() {
      return this.info.label
    },
    backgroundImage() {
      return this.info.backgroundImage
    },
    avatar() {
      return this.$store.getters.user_icon
    },
    size() {
      return this.info.size
    },
    animateType() {
      return this.info.animateType
    },
    text() {
      return this.info.text
    },
    goods_type() {
      return this.info.goods_type
    },
    animateName() {
      return this.info.animateName
    }
  }
}
</script>

<style scoped lang="scss">
.DialogPreview {
  width: 100%;

  .big_box {
    margin: 0 auto;
    width: 213.5px;
    height: 370px;
    background: no-repeat left top/100%;
  }

  .small_box {
    position: relative;
    margin: 0 auto;
    width: 75.5px;
    height: 75.5px;
    border: 2px solid #8273cb;
    background: linear-gradient(180deg, #2d214d, #43358d);
    border-radius: 8px;

    //#ts_jjzy {
    //  ::v-deep .micAvatar_img {
    //    width: 60px;
    //    height: 60px;
    //  }
    //}
    //
    //#ts_ymml {
    //  ::v-deep .micAvatar_img {
    //    width: 60px;
    //    height: 60px;
    //  }
    //}
    .label {
      position: absolute;
      top: 0;
      right: 0;
      height: 12px;
      border-radius: 8px;
      > span {
        font-size: 12px;
        color: #fff;
        transform: scale(0.83);
      }
      > img {
        height: 100%;
      }
    }
  }

  .title_size {
    width: 94px !important;
    height: 64px !important;
  }

  .preview-text {
    margin-top: 10px;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
    white-space: nowrap;
  }
}
</style>
