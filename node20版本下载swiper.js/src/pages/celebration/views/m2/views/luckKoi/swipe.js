export default {
  bind: function(el, binding) {
    let startX, startY, endX, endY
    el.addEventListener('touchstart', function(event) {
      event.preventDefault() // 阻止默认行为
      startX = event.touches[0].clientX
      startY = event.touches[0].clientY
    })
    el.addEventListener('touchend', function(event) {
      event.preventDefault()
      endX = event.changedTouches[0].clientX
      endY = event.changedTouches[0].clientY
      const diffX = endX - startX
      const diffY = endY - startY
      const absDiffX = Math.abs(diffX)
      const absDiffY = Math.abs(diffY)
      if (absDiffX > absDiffY) {
        // 横向滑动
        if (diffX > 0) {
          // 右滑
          binding.value('right', absDiffX)
        } else {
          // 左滑
          binding.value('left', absDiffX)
        }
      } else {
        // 纵向滑动
        if (diffY > 0) {
          // 下滑
          binding.value('down', absDiffY)
        } else {
          // 上滑
          binding.value('up', absDiffY)
        }
      }
    })
  }
}
