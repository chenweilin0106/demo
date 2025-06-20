/**
 * 一个用于图片懒加载的 Vue 指令。
 *
 * 该指令使用 IntersectionObserver 观察元素，当元素进入视口时，替换图片的 src 属性以实现懒加载。
 *
 * 使用示例：
 *
 * <template>
 *   <img v-img-lazy data-src="path/to/image.jpg" />
 * </template>
 *
 * <script>
 * import imgLazy from './imgLazy'
 *
 * export default {
 *   directives: { imgLazy }
 * }
 * </script>
 */

/**
 * 一个 WeakMap，用于存储每个 root 元素的 IntersectionObserver 和计数器。
 */
const observerMap = new WeakMap()

/**
 * 创建一个 IntersectionObserver 并返回它。
 * 如果相同 root 的观察者已存在，则返回现有的观察者。
 *
 * @param {Object} options - IntersectionObserver 的选项。
 * @param {Element} [options.root] - 观察者的根元素。
 * @param {string} [options.rootMargin] - 根元素的 margin。
 * @param {number | number[]} [options.threshold] - 一个或多个阈值，当元素可见度达到阈值时触发回调。
 * @returns {IntersectionObserver} 创建的或现有的 IntersectionObserver。
 */
function createObserver(options) {
  const root = options.root || document
  if (!observerMap.has(root)) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target
          img.src = img.dataset.src
          observer.unobserve(img)
        }
      })
    }, options)
    observerMap.set(root, { observer, count: 0 })
  }
  return observerMap.get(root).observer
}

export default {
  /**
   * 当指令绑定到元素时调用。
   * 观察元素以实现图片懒加载。
   *
   * @param {Element} el - 指令绑定的元素。
   * @param {Object} binding - 绑定对象。
   * @param {Object} binding.value - IntersectionObserver 的选项。
   */
  inserted(el, binding) {
    const options = binding.value || {}
    const observer = createObserver(options)
    observer.observe(el)
    observerMap.get(options.root || document).count++
    el.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7' // 默认图片占位 防止布局抖动
  },

  /**
   * 当指令从元素解绑时调用。
   * 取消对元素的观察，并在没有元素被观察时清理观察者。
   *
   * @param {Element} el - 指令解绑的元素。
   * @param {Object} binding - 绑定对象。
   * @param {Object} binding.value - IntersectionObserver 的选项。
   */
  unbind(el, binding) {
    const options = binding.value || {}
    const root = options.root || document
    const observerData = observerMap.get(root)
    if (observerData) {
      observerData.observer.unobserve(el)
      observerData.count--
      if (observerData.count === 0) {
        observerMap.delete(root)
      }
    }
  }
}
