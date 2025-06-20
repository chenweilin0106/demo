<template>
  <div class="person position-relative">
    <template v-if="animation">
      <div v-for="(item) in showArr.filter(item=>item.animation)" class="animationBox" :key="`an_${item.component_id}_${item.material_id}`" :style="{zIndex:item.zIndex+1}">
        <PublicImg v-if="eyes" ref="eyes" :imgName="item.animation" loop="1" @animOnFinished="eyesFinished" />
      </div>
    </template>
    <img v-for="(item) in showArr" :key="`${item.component_id}_${item.material_id}`" crossorigin="anonymous" :src="IconPath(item.source_file)"  :style="{zIndex:item.zIndex}" class="common" />
  </div>
</template>

<script>
export default {
  name: 'personVue',
  props: {
    config: { type: Array },
    animation: { type: Boolean, default: false }, // 是否启用动画
    eyes: { type: Boolean, default: false } // 是否启用眼睛动画
  },
  data() {
    return {
      showArr: [], // 渲染列表
      timer: null, // 眼睛动画定时器
      splitIconList: Object.freeze({
        '1_5': [{ component_id: 1, material_id: '1_5_1', original_id: '1_5', source_file: 'mrscnv_001_1.png', zIndex: 610 }], // 默认 女 面容 左侧头发
        '2_16': [{ component_id: 2, material_id: '2_16_1', original_id: '2_16', source_file: 'fzscnv_002_1.png', zIndex: 620 }], // 少女心事  女 套装 左手
        '2_14': [{ component_id: 2, material_id: '2_14_1', original_id: '2_14', source_file: 'fzscnv_004_1.png', zIndex: 290 }], // 烟雨罗裙 女 套装 裙摆
        '1_42': [{ component_id: 1, material_id: '1_42_1', original_id: '1_42', source_file: 'mrscnan_006_1.png', zIndex: 610 }], // 精灵王子 男 面容 左侧头发
        '2_54': [{ component_id: 2, material_id: '2_54_1', original_id: '2_54', source_file: 'fzscnv_005_1.png', zIndex: 290 }], // 落樱轻纱 女 套装 裙摆
        '2_51': [{ component_id: 2, material_id: '2_51_1', original_id: '2_51', source_file: 'fzscnv_007_2.png', zIndex: 610 }], // 浅色百褶裙 女 下装 小包
        '2_49': [{ component_id: 2, material_id: '2_49_1', original_id: '2_49', source_file: 'fzscnan_006_1.png', zIndex: 290 }], // 优雅绅士 男 套装 披风
        '1_84': [{ component_id: 1, material_id: '1_84_1', original_id: '1_84', source_file: 'mrscnv_008_1.png', zIndex: 610 }], // 森系少女 女 面容 双马尾
        '1_86': [{ component_id: 1, material_id: '1_86_1', original_id: '1_86', source_file: 'mrscnv_010_1.png', zIndex: 610 }], // 优雅银辉 女 面容 左侧头发
        '2_94': [{ component_id: 2, material_id: '2_94_1', original_id: '2_94', source_file: 'fzscnv_t_010_1.png', zIndex: 290 }], // 幽夜星裙 女 套装 裙摆
        '1_119': [{ component_id: 1, material_id: '1_119_1', original_id: '1_119', source_file: 'mrscnv_014_1.png', zIndex: 610 }], // 墨韵仙姿 女 面容 两侧头发
        '2_124': [{ component_id: 2, material_id: '2_124_1', original_id: '2_124', source_file: 'fzscnv_t_013_1.png', zIndex: 290 }] // 童话悠蓝 女 套装 裙摆
      }), // 部分装备分图片展示 比如头部中的头发 头部在服装背后 但是部分头发在服装前面
      whiteList: Object.freeze(['0', '1', '2', '3', '5']), // 白名单 component_id 参与person组件渲染
      blacklist: Object.freeze(['5_29', '5_30', '5_145', '5_144']), // 黑名单 component_id_material_id 不参与person组件渲染
      defaultZIndexMap: Object.freeze({
        0: 300, // 通用身体
        1: 500, // 面容
        '1,9': 500, // 面容+头部配饰
        '3,4': 600, // 套装
        3: 600, // 上衣
        4: 550, // 下衣
        5: 400, // 鞋袜
        8: 200, // 背部配饰
        9: 700, // 头部配饰
        11: 800, // 其他配饰
        12: 180, // 尾巴配饰
        13: 285 // 金辉逸彩（男-特有）/日月辉光（女-特有）
      }), // 默认zIndex key: part_type value: zIndex
      customMap: Object.freeze({
        // '5_64': 800, // 小熊 其他配饰
        '5_75': 900, // 女 蝴蝶翩翩 前景配饰
        '5_69': 900, // 男 蝴蝶翩翩 前景配饰
        '5_114': 160, // 狮子 其他配饰
        '5_142': 160 // 紫韵花环 其他配饰
      }) // 自定义/配饰 zIndex 'component_id'_'material_id'
    }
  },
  computed: {
  },
  watch: {
    config: {
      deep: true,
      immediate: true,
      handler(newVal, oldVal) {
        let res = []
        for (let i = 0; i < newVal.length; i++) {
          const item = newVal[i]
          const str = `${item.component_id}_${item.material_id}`
          // 检查是否在白名单中且不在黑名单中或者在自定义map中
          if ((this.whiteList.includes(String(item.component_id)) && !this.blacklist.includes(str)) || this.customMap[str]) {
            // 确定z-index：首先检查例外情况，然后使用part_type的默认值
            const zIndex = this.customMap[str] || this.defaultZIndexMap[item.part_type]
            res.push({ ...item, zIndex })
            const splitRes = this.splitIconList[str]
            if (splitRes) res.push(...splitRes) // 如果需要添加特殊项
          }
        }
        this.formatZIndex(res)
        clearTimeout(this.timer)
        this.timer = null
        this.showArr = res
        this.$nextTick(() => {
          if (this.eyes && this.$refs.eyes[0]?.svga_data) this.$refs.eyes[0].svga_data.startAnimation()
        })
      }
    }
  },
  methods: {
    formatZIndex(res) {
      res.forEach(item => {
        let splitComponents = []
        if (item.component_id == 3) {
          if (item.dress_type == 2) {
            const needComponent = res.find(item => item.part_type == '4' || item.part_type == '3,4')
            splitComponents = res.filter(item => item.original_id == `${item.component_id}_${item.material_id}`)
            item.zIndex = needComponent.zIndex + 1
            if (splitComponents.length) splitComponents.forEach(component => { component.zIndex = needComponent.zIndex + 1 })
          }
        }
      })
    },
    eyesFinished() {
      this.$refs.eyes[0].svga_data.stepToFrame(0, false)
      this.timer = setTimeout(() => {
        this.$refs.eyes[0].svga_data.startAnimation()
        clearTimeout(this.timer)
        this.timer = null
      }, 3000)
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer)
    this.timer = null
  }
}
</script>

<style lang="scss" scoped>
.person{
  width: 685px;
  height: 885px;
  .animationBox{
    position: absolute;
    width: 685px;
    height: 885px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .common{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
  }
  .noBlock{
    display: none;
  }
}
</style>
