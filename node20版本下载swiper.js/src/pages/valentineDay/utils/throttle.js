import Vue from 'vue'

// 自定义节流
const throttle = Vue.directive('throttle', {
  inserted: function (el, binding) {
    const [fn, event, time, ...args] = binding.value
    console.log(args, '参数值')
    let timer
    el.addEventListener(event, () => {
      if (timer) return console.log('手速太快')
      fn.apply(this, args)
      timer = setTimeout(() => {
        timer = null
      }, time)
    })
  }
})

export default { throttle }

// <!-- v-throttle 传递三个参数，[方法名字，触发方式，节流时间] -->
// <el-button v-throttle="[searchcs,'click',5000]">节流</el-button>
