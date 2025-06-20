<template>
  <div class="back position-absolute">
    <img v-for="item in showArr" :key="item.id" crossorigin="anonymous" :src="IconPath(item.source_file)"  :style="{zIndex:item.zIndex}" class="common" />
  </div>
</template>

<script>
export default {
  name: 'backVue',
  props: ['config'],
  components: {},
  data() {
    return {
      showArr: [], // 渲染列表
      whiteList: Object.freeze(['4']), // 白名单 component_id 参与back组件渲染
      blacklist: Object.freeze([]), // 黑名单 component_id_material_id 不参与back组件渲染
      defaultZIndexMap: Object.freeze({
        2: 100 // 背景
      }), // 默认zIndex key: part_type value: zIndex
      customMap: Object.freeze({
        '5_29': 110, // 背景配饰 彩虹
        '5_30': 110, // 背景配饰 雨
        '5_144': 110, // 背景配饰 纸鸢逸趣
        '5_145': 110 // 背景配饰 冰晶逸韵
      }) // component_id_material_id
    }
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
          }
        }
        this.showArr = res
      }
    }
  },
  methods: {},
  beforeDestroy() {
  }
}
</script>

<style lang="scss" scoped>
.back{
  z-index: 1;
  width: 745px;
  height: 946px;
  top: 0;
  left: 0;
  .common{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
