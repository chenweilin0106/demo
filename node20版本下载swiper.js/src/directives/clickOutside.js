/**
 * clickOutside.js
 * 自定义指令，用于处理点击外部区域的事件
 * 示例
 * <div v-click-outside="handleClickOutside" @click.stop></div>
 * 注册 directives: { 'click-outside': clickOutside },
 * 如果要传值
 * <div v-click-outside="() => handleClickOutside(value)" @click.stop></div>
 */

// 存储使用该指令的元素及其绑定的事件处理器
const elements = new Map()

/**
 * 全局点击事件处理器
 * @param {Event} event - 点击事件对象
 */
function globalClickEvent(event) {
  elements.forEach((binding, el) => {
    // 如果点击事件发生在元素的外部，则触发绑定的事件处理器
    if (!(el === event.target || el.contains(event.target))) {
      binding.value(event)
    }
  })
}

export const clickOutside = {
  /**
   * 指令绑定时的钩子函数
   * @param {HTMLElement} el - 绑定指令的元素
   * @param {Object} binding - 包含指令相关信息的对象
   */
  bind(el, binding) {
    // 如果这是第一个使用该指令的元素，则添加全局点击事件监听器
    if (elements.size === 0) {
      document.addEventListener('click', globalClickEvent)
    }
    // 将元素及其绑定的事件处理器存储在 Map 中
    elements.set(el, binding)
  },
  /**
   * 指令解绑时的钩子函数
   * @param {HTMLElement} el - 解绑指令的元素
   */
  unbind(el) {
    // 从 Map 中删除元素及其绑定的事件处理器
    elements.delete(el)
    // 如果没有元素使用该指令，则移除全局点击事件监听器
    if (elements.size === 0) {
      document.removeEventListener('click', globalClickEvent)
    }
  }
}
