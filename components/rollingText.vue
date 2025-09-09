<template>
  <div class="v-rolling-text" @animationend="handleAnimationEnd">
    <div v-for="(_, idx) in targetValue" :key="idx" class="v-rolling-text-item" :class="[`v-rolling-text-item--${direction}`]" :style="getRootStyle(idx)">
      <div class="v-rolling-text-item__box" :class="{ 'v-rolling-text-item__box--animate': rolling }">
        <div v-for="(figure) in getFigureArrForItem(idx)" :key="figure.guid" class="v-rolling-text-item__item">
          {{ figure.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 滚动文本
 *
 * @example
 * <rollingText :targetValue="[{ id: 1, value: '1' }, { id: 2, value: '2' }, { id: 3, value: '3' }, { id: 4, value: '4' }, { id: 5, value: '5' }]" @end="handleEnd" />
 */
export default {
  name: 'RollingText',
  props: {
    targetValue: {
      type: Array,
      default: () => [
        { id: 8, value: '8' },
        { id: 8, value: '8' },
        { id: 8, value: '8' },
        { id: 8, value: '8' },
        { id: 8, value: '8' }
      ]
    } // 目标数字
  },
  data() {
    return {
      duration: Object.freeze(2), // 滚动持续时间
      autoStart: Object.freeze(false), // 是否自动开始
      direction: Object.freeze('down'), // 滚动方向 down-向下 up-向上
      playOrder: Object.freeze('ltr'), // 播放顺序 ltr-从左到右 rtl-从右到左 random-随机
      defaultStartValue: Object.freeze([
        { id: 0, value: '0' },
        { id: 0, value: '0' },
        { id: 0, value: '0' },
        { id: 0, value: '0' },
        { id: 0, value: '0' }
      ]), // 默认起始值
      startValue: [], // 起始
      baseDelay: Object.freeze(0.3), // 基础延迟
      circleNum: Object.freeze(1), // 循环次数
      rolling: false, // 是否在滚动中
      itemHeight: Object.freeze(0), // 数字项高度（自动获取）
      pendingEndEvents: 0, // 等待结束的动画数量
      contentItems: Object.freeze([
        { id: 0, value: '0' },
        { id: 1, value: '1' },
        { id: 2, value: '2' },
        { id: 3, value: '3' },
        { id: 4, value: '4' },
        { id: 5, value: '5' },
        { id: 6, value: '6' },
        { id: 7, value: '7' },
        { id: 8, value: '8' },
        { id: 9, value: '9' }
      ]) // 内容项
    }
  },
  created() {
    this.startValue = this.deepClone(this.defaultStartValue)
  },
  computed: {
    figureArrCache() {
      const cache = new Array(this.targetValue.length)
      for (let i = 0; i < this.targetValue.length; i++) {
        const startObj = this.startValue[i]
        const targetObj = this.targetValue[i]
        const startIndex = this.contentItems.findIndex(item => item.id === startObj.id)
        const targetIndex = this.contentItems.findIndex(item => item.id === targetObj.id)
        if (startIndex === -1 || targetIndex === -1) {
          console.error('[RollingText] 起始值或目标值不在内容池中', startObj, targetObj)
          cache[i] = []
          continue
        }
        const result = []
        // 1. 从起始索引到数组末尾
        for (let idx = startIndex; idx < this.contentItems.length; idx++) {
          result.push(this.cloneAndAddItem(idx))
        }
        // 2. 完整循环 circleNum 次
        for (let c = 0; c < this.circleNum; c++) {
          for (let idx = 0; idx < this.contentItems.length; idx++) {
            result.push(this.cloneAndAddItem(idx))
          }
        }
        // 3. 从数组开始到目标索引
        for (let idx = 0; idx <= targetIndex; idx++) {
          result.push(this.cloneAndAddItem(idx))
        }
        cache[i] = result
      }

      return cache
    }
  },
  mounted() {
    this.calculateItemsHeight()
  },
  methods: {
    /**
     * 克隆并添加唯一标识
     * @param {number} idx - 索引
     * @returns {Object} - 克隆后的对象
     */
    cloneAndAddItem(idx) {
      const clone = this.deepClone(this.contentItems[idx])
      clone.guid = this.guid()
      return clone
    },
    /**
     * 开始滚动
     */
    start() {
      console.log('start，startValue：', this.startValue, 'targetValue', this.targetValue)
      if (this.startValue.length !== this.targetValue.length) return console.error('[RollingText] startValue和targetValue长度不一致，请确保长度一致') // 验证长度是否匹配
      if (this.rolling) return console.log('滚动中') // 如果正在执行动画，不做任何处理
      this.pendingEndEvents = this.targetValue.length // 设置等待结束的动画数量
      console.log('滚动开始')
      this.rolling = true
    },
    /**
     * 重置滚动
     */
    reset() {
      // 如果正在执行动画，不做任何处理
      if (this.rolling) return console.log('滚动中')
      console.log('重置滚动')
      this.startValue = this.deepClone(this.defaultStartValue)
      // if (this.autoStart) requestAnimationFrame(() => this.start())
    },
    /**
     * 处理动画结束事件
     * @param {Event} event - 动画结束事件
     */
    handleAnimationEnd(event) {
      // 确保事件是来自滚动容器的动画
      if (event.target.classList.contains('v-rolling-text-item__box--animate')) {
        this.pendingEndEvents--
        // 当所有动画都结束时，重置rolling状态
        if (this.pendingEndEvents <= 0) {
          console.log('滚动结束')
          this.pendingEndEvents = 0
          this.startValue = this.deepClone(this.targetValue)
          requestAnimationFrame(() => (this.rolling = false))
          this.$emit('end', this.targetValue)
        }
      }
    },
    /**
     * 获取数字项的数字数组
     * @param {number} idx - 索引
     * @returns {Array} - 数字数组
     */
    getFigureArrForItem(idx) {
      const figureArr = this.figureArrCache[idx] || []
      return this.direction === 'down' ? figureArr.slice().reverse() : figureArr
    },
    /**
     * 获取延迟时间
     * @param {number} i - 索引
     * @returns {number} - 延迟时间（秒）
     */
    getDelay(i) {
      if (this.playOrder === 'ltr') return +(this.baseDelay * i).toFixed(2)
      if (this.playOrder === 'rtl') return +(this.baseDelay * (this.targetValue.length - 1 - i)).toFixed(2)
      if (this.playOrder === 'random') return +(this.baseDelay + this.baseDelay * Math.random()).toFixed(2)
    },
    /**
     * 计算数字项高度
     */
    calculateItemsHeight() {
      const firstItem = this.$el.querySelector('.v-rolling-text-item__item')
      if (!firstItem) return console.log('未获取到高度')
      this.itemHeight = Object.freeze(firstItem.getBoundingClientRect().height.toFixed(2))
    },
    /**
     * 设置根元素样式
     * @param {number} idx - 索引
     * @returns {Object} - 样式对象
     */
    getRootStyle(idx) {
      const figureArr = this.figureArrCache[idx] || []
      const translateValue = `${(-(figureArr.length - 1) * this.itemHeight).toFixed(2)}px`
      return { height: `${this.itemHeight}px`, '--v-translate': translateValue, '--v-duration': `${this.duration}s`, '--v-delay': `${this.getDelay(idx)}s` }
    },
    /**
     * 深度克隆，支持对象和数组
     * @param {any} value - 要克隆的值
     * @returns {any} - 克隆后的值
     */
    deepClone(value) {
      // null、undefined或原始类型直接返回
      if (value === null || typeof value !== 'object') {
        return value
      }
      // 数组类型
      if (this.getType(value) === 'Array') {
        return value.map(item => this.deepClone(item))
      }
      // 对象类型
      if (this.getType(value) === 'Object') {
        const result = {}
        Object.keys(value).forEach(key => {
          result[key] = this.deepClone(value[key])
        })
        return result
      }
      // 其他类型如Date、RegExp等直接返回新实例
      return value
    },
    /**
     * 获取类型
     * @returns {'Array' | 'Object' | 'String' | 'Number' | 'Boolean' | 'Function' | 'Null' | 'Undefined'}
     */
    getType(value) {
      return Object.prototype.toString.call(value).slice(8, -1) // 结果首字符大写
    },
    /**
     * 生成唯一标识
     * @returns {string} - 唯一标识
     */
    guid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
          const string = (Math.random() * 16) | 0
          const v = c == 'x' ? string : (string & 0x3) | 0x8
          return v.toString(16)
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.v-rolling-text {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 400px;
}

.v-rolling-text-item {
  margin: 0 20px; /* 这里是gap，可直接修改 */
  width: fit-content; /* 这里是itemWidth，可直接修改 */
  border-radius: 20px;
  background: skyblue;
  overflow: hidden;
}

/* .v-rolling-text-item:last-child {
  margin-right: 0;
} */

.v-rolling-text-item__box {
  overflow: hidden;
  transform: translateZ(0);
  will-change: transform;
}

.v-rolling-text-item__box--animate {
  animation: v-rolling-animation var(--v-duration) ease-in-out var(--v-delay);
  animation-iteration-count: 1;
  animation-fill-mode: both;
}

.v-rolling-text-item__item {
  height: 100px; /* 固定高度 */
  font-size: 100px;
  color: #323233;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}

.v-rolling-text-item--down .v-rolling-text-item__box {
  transform: translateY(var(--v-translate)) translateZ(0);
}

.v-rolling-text-item--down .v-rolling-text-item__box--animate {
  animation-name: v-down;
}

.v-rolling-text-item--up .v-rolling-text-item__box--animate {
  animation-name: v-up;
}

@keyframes v-down {
  0% {
    transform: translateY(var(--v-translate)) translateZ(0);
  }
  90% {
    transform: translateY(20px) translateZ(0);
  }
  100% {
    transform: translateY(0) translateZ(0);
  }
}

@keyframes v-up {
  0% {
    transform: translateY(0) translateZ(0);
  }
  90% {
    transform: translateY(calc(var(--v-translate) - 20px)) translateZ(0);
  }
  100% {
    transform: translateY(var(--v-translate)) translateZ(0);
  }
}
</style>
