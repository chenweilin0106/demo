1. window.location.href 赋值为 vue/normal/game2048/index.html 和 /vue/normal/game2048/index.html 的区别
   - vue/normal/game2048/index.html
     类型: 相对路径
     解析方式: 浏览器会将其解析为相对于当前页面的路径。
     示例:
     当前页面 URL: https://example.com/current/page
     解析结果: https://example.com/current/vue/normal/game2048/index.html

   - /vue/normal/game2048/index.html
     类型: 绝对路径
     解析方式: 浏览器会将其解析为相对于网站根目录的路径。
     示例:
     当前页面 URL: https://example.com/current/page
     解析结果: https://example.com/vue/normal/game2048/index.html
     总结
     相对路径: 基于当前页面的路径进行解析。
     绝对路径: 基于网站根目录进行解析。

2. H5监听页面显示隐藏 <https://juejin.cn/post/7092343227759968292>；

3. ```vue
   过滤回车，空格，限制字数
   <template>
       <textarea v-model="text" @keydown="handleKeyDown" @input="handleInput" />
       <div class="fontNum">{{ pointLength }}/{{ maxFontNum }}字</div>
     </PopupBox>
   </template>
   
   <script>
   export default {
     data() {
       return {
         maxFontNum: Object.freeze(30), // 最大字数限制
         text: '', // 输入框内容
         lastText: '' // 上一次输入的内容 用于替换超出字数限制后的内容
       }
     },
     computed: {
       // 设置表情为2字数
       pointLength() {
         let len = 0
         for (let i = 0; i < this.text.length; ) {
           const point = this.text.codePointAt(i)
           len += point > 0xffff ? 2 : 1
           i += point > 0xffff ? 2 : 1
         }
         return len
       }
     },
     methods: {
       handleKeyDown(e) {
         if (e.key === 'Enter' || e.keyCode == 13) e.preventDefault()
       },
       handleInput() {
         this.text = this.text.replace(/\s+/g, '') // 删除空格
         this.text = this.text.replace(/[\r\n]/g, '') // 删除回车换行符
         if (this.pointLength > this.maxFontNum) {
           this.text = this.lastText // 如果表情数量超过最大字数，就将输入的内容设置为上一次的内容
         } else {
           this.lastText = this.text // 如果表情数量没有超过10个，就更新上一次的内容
         }
       }
     }
   }
   </script>
   ```

4. ```vue
   将组件挂载到body上
   <template>
     <transition name="fade" appear>
       <div class="popupOverly position-fixed flex align-center justify-center" @click.self="$emit('close')" @touchmove.prevent.stop>
           <div class="popupContent position-relative" @touchmove.prevent.stop>
             <img v-if="title" :src="IconPath(title)" class="titleIcon block margin-row-center" />
             <slot></slot>
           </div>
       </div>
     </transition>
   </template>
   
   <script>
   export default {
     mounted() {
       document.body.appendChild(this.$el) // 将弹窗挂载到body上 避免父级有transform属性导致弹窗fixed属性失效
     }
   }
   </script>
   ```
   
5. ```js
   // 手动触发audio的timeupdate事件 用于手动更改audio的currentTime后，不触发timeupdate事件，所以手动触发
   const timeUpdateEvent = new Event('timeupdate')
   music.dispatchEvent(timeUpdateEvent)
   ```

6. ```js
   /**
    * vue2 clickOutside.js
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
         console.log('add event listener')
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
         console.log('remove event listener')
         document.removeEventListener('click', globalClickEvent)
       }
     }
   }
   ```

7. ```js
   滚动居中（可以使用smoothscroll-polyfill加强兼容）
   scrollCenter() {
     this.$nextTick(() => {
       if (!this.$refs.active) return
       const offset = this.$refs.active[0].offsetLeft // 计算元素相对于父容器的偏移量
       const centerPosition = this.$refs.dateList.offsetWidth / 2 // 计算父容器的中心位置
       const scrollPosition = offset - centerPosition + (this.$refs.active[0].offsetWidth / 2) // 计算滚动位置，使元素居中
       this.$refs.dateList.scrollTo({ left: scrollPosition, behavior: 'smooth' }) // 滚动父容器
     })
   },
   ```


8. ```js
   /**
    * 获取url参数
    * @returns {Object}
    */
   export function getUrlData() {
     return window.location.search
       .slice(1)
       .split('&')
       .reduce((pre, cur) => {
         pre[cur.split('=')[0]] = cur.split('=')[1]
         return pre
       }, {})
   }
   ```

9. ```js
   /**
    * 图片转base64
    * @param url 网络图片url或者本地图片使用require('@/assent/img.jpg')
    * @returns {Promise}
    */
   export const imgToBase64 = (url) => {
     return new Promise((resolve, reject) => {
       const image = new Image()
       image.src = url
       image.crossOrigin = 'Anonymous' // 解决图片跨域
       image.onload = () => {
         const canvas = document.createElement('canvas')
         canvas.width = image.naturalWidth // 使用 naturalWidth 为了保证图片的清晰度
         canvas.height = image.naturalHeight
         canvas.style.width = `${canvas.width / window.devicePixelRatio}px`
         canvas.style.height = `${canvas.height / window.devicePixelRatio}px`
         const ctx = canvas.getContext('2d')
         if (!ctx) return null
         ctx.drawImage(image, 0, 0)
         const base64 = canvas.toDataURL('image/png')
         return resolve(base64)
       }
       image.onerror = (err) => {
         return reject(err)
       }
     })
   }
   ```

10. 可以使用Object.freezn冻结json动画数据，不做响应式处理；不在data中定义，直接往this上添加变量，同样是不进行响应式处理；

11. 使用scrollTop将列表滚动到某一元素，列表必须要开启定位，offsetTop是距离最近定位元素的距离；

12. vue中，svga文件无法使用本地路径，因为没有对应的loader；所以一般使用线上地址；

13. ```js
    export function _throttle(fn, delay = 200) {
      let canUse = true
      // 设置一个触发开关
      return function () {
        // 如果为true，就触发技能，否则就不能触发
        if (canUse) {
          fn.apply(this, arguments)
          // 触发技能后，关闭开关
          canUse = false
          // 在delay秒后打开开关
          setTimeout(() => (canUse = true), delay)
        } else {
          console.log('手速过快')
        }
      }
    }
    ```

14. vue2中，使用v-html加载元素时，如果使用类名加载样式，需要加上深度选择器；

15. vue中，数据过多，页面更新可能出现延迟，或者不更新；目前推测是数据过多，或者vue本身没监听到这个数据得变化；解决方案是dom上加一个key，改变key强制让vue更新；vue监听到key变化后会重新更新页面；https://juejin.cn/post/6844904054766698509；

16. vue项目断点：https://blog.csdn.net/qq_45024094/article/details/134964140；

17. 监听动画结束： <https://blog.csdn.net/xuquanxi1079/article/details/106056691>；

18. ```vue
    移动端长按：https://blog.csdn.net/sunny123x/article/details/107002521；
    <template>
      <div @touchstart="touchStart" @touchend="touchEnd" @touchcancel="touchEnd">
        长按测试
      </div>
    </template>
    
    <script>
    // @touchstart 是一个触摸事件，它在用户开始触摸屏幕时触发。这个事件通常用于移动设备，如智能手机和平板电脑。
    // @touchend：当手指从触摸屏幕上离开时触发。也就是说，当用户结束触摸操作时，会触发这个事件。
    // @touchcancel：当触摸过程被系统取消时触发。例如，当有一个系统警告、电话呼入、或者用户打开控制中心等情况时，正在进行的触摸操作会被取消，此时就会触发touchcancel事件。
    // 在你的长按事件中，@touchend和@touchcancel都绑定了touchEnd方法，用于清除设置的定时器。这是因为无论是用户主动结束触摸，还是系统取消触摸，你都需要清除定时器，以防止长按事件被错误地触发。
    export default {
      data() {
        return {
          timer: null
        }
      },
      methods: {
        touchStart() {
          this.timer = setTimeout(() => {
            alert('长按事件触发');
          }, 1000); // 长按时间超过1000ms，则执行处理函数
        },
        touchEnd() {
          clearTimeout(this.timer); // 手指离开时清除定时器
        }
      }
    }
    </script>
    ```

19. 老虎机动画制作 https://juejin.cn/post/6986453616517185567#heading-8；

20. ```js
    页面懒加载
    const el = document.querySelector('.test-box')
    console.log(el)
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        // 如果元素在视口中
        if (entry.isIntersecting) {
          console.log('元素进入视口')
          // 加载元素内容
          this.show = true
          // loadContent(entry.target)
          // 停止观察该元素
          // observer.unobserve(entry.target)
        } else {
          console.log('元素离开视口')
          this.show = false
        }
      })
    })
    observer.observe(el)
    // polyfill
    // https://github.com/GoogleChromeLabs/intersection-observer/blob/main/README.md
    // 懒加载组件参考
    // https://juejin.cn/post/7204661393500602423
    ```

21. .browserslistrc 文件，兼容版本大于 18，会额外生产文件；
22. ```js
    // 滚动（经典滚动加载列表）
    // clientHeight：可视高度 scrollTop：已滚动的高度：scrollHeight：可滚动的高度 100：安全距离 提前触发
    handleScroll() {
      const content = this.$refs.scrollDiv // 获取到包含内容的元素
      if (content.clientHeight + content.scrollTop >= content.scrollHeight - 100) {
        console.log('下拉触发')
        if (this.isNextPage === true) {
          this.getData()
        }
      }
    }
    ```


23. websocket简单demo：https://blog.csdn.net/m0_37943716/article/details/141205858；

24. ```js
    /**
     * 在指定的时间执行回调函数
     *
     * @param {Object} options - 参数对象
     * @param {number} options.targetHour - 要执行回调的目标小时（0-23），必传
     * @param {number} [options.targetMinute=0] - 要执行回调的目标分钟（0-59），默认为0
     * @param {number} [options.targetSecond=0] - 要执行回调的目标秒（0-59），默认为0
     * @param {Function} options.callback - 在目标时间执行的回调函数，必传
     * @returns {number | null} - 返回定时器的 id，如果目标时间已经过去了，则返回 null
     */
    executeAtTime({ targetHour, targetMinute = 0, targetSecond = 0, callback }) {
      if (typeof targetHour !== 'number' || targetHour < 0 || targetHour > 23) return console.log('targetHour 必须是 0 到 23 之间的数字')
      if (typeof callback !== 'function') throw new Error('callback 必须是一个函数')
      if (typeof targetMinute !== 'number' || targetMinute < 0 || targetMinute > 59) return console.log('targetMinute 必须是 0 到 59 之间的数字')
      if (typeof targetSecond !== 'number' || targetSecond < 0 || targetSecond > 59) return console.log('targetSecond 必须是 0 到 59 之间的数字')
      const now = new Date()
      let targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), targetHour, targetMinute, targetSecond)
      if (targetTime - now < 0) targetTime.setDate(targetTime.getDate() + 1) // 如果目标时间已经过去，则将目标时间设置为第二天的同一时间
      const diff = targetTime - now
      let timer = setTimeout(() => { callback(); clearTimeout(timer) }, diff) // 设置定时器
      this.$once('hook:beforeDestroy', () => { clearTimeout(timer); timer = null }) // 在组件销毁时清除定时器
    }
    
    // 示例用法：
    created() {
      this.executeAtTime({ targetHour: 23, targetMinute: 59, targetSecond: 59, callback: this.getPageData })
    }
    ```
    
25. ```vue
    // 内购/现金购买
    <template>
        <!--恭喜获得弹框-->
        <ReceivePopup v-if="isShowReceivePopup" :config="configReceivePopup" @clickClose="isShowReceivePopup=false" />
        <!--确认购买弹框-->
        <ConfirmBuyPopup v-if="isShowConfirmBuyPopup" :config="configConfirmBuyPopup" @confirmCashBuy="confirmCashBuy" @clickClose="isShowConfirmBuyPopup=false" />
        <!--选择支付方式弹框-->
        <ChoosePaymentPopup v-if="isShowChoosePaymentPopup" :config="configChoosePaymentPopup" @confirm="confirmPayment" @clickClose="isShowChoosePaymentPopup=false" />
    </template>
    
    <script>
    import { isIOS, appPay } from '@/utils/toApp'
    import { getPageData } from '@/api'
    import ChoosePaymentPopup from '@/components/choosePaymentPopup'
    import ReceivePopup from '@/components/ReceivePopup' 
    import ConfirmBuyPopup from '../popups/confirmBuyPopup.vue'
    /**
     * @typedef {Object} Goods 商品信息
     * @property {Object} goods_info - APP支付方法参数
     * @property {string|number} [id] - 商品id 当商品只有一个 后端不提供id
     * @property {number} [buy_times] - 商品当前已购买次数 用于后端跨天购买校验
     */
    // 示例：
    // 多个购买：@click="preBuy(goods,'inBuy')"  这里的goods结构一般是 {goods_info:{},id:1,buy_times:0}
    // 单个购买：@click="preBuy({goods_info,buy_times:0},'inBuy')" 单个购买后端不会提供id 如果有buy_times就传，没有就不传
    // 在api中封装接口时需要注意：使用...data展开获取所有参数，因为传入的是对象；如果不需要参数就不要接受参数；因为接口参数配置是空对象，那么传入也会是空对象，而空对象使用展开运算符会报错
    /**
     * 现金兑换
     * @returns {Promise}
     */
    // export const moneyExchange = (data) => {
    //  return request({ url: '/actserver/christmas-day/money-exchange', data: { ...data } })
    //}
    
    /**
     * 内购/轮询购买结果
     * @returns {Promise}
     */
    // export const pay = (data) => {
    //  return request({ url: '/actserver/christmas-day/pay-query', data: { ...data } })
    //}
    export default {
      data() {
        return {
          money: 0, // 现金余额
          buyTimers: [], // 购买定时器数组 [{ maxPollTimer: '', judgeBuySuccessTimer: '', id: '' }]
          buyToast: Object.freeze({ success: '成功购买', overTime: '购买失败，请稍后再试' }), // todo 购买提示配置 success:成功 overTime:超时/失败 不需要就传空字符串
          configChoosePaymentPopup: {}, // 选择支付方式弹窗数据
          isShowChoosePaymentPopup: false, // 选择支付方式弹窗
          isShowConfirmBuyPopup: false, // 是否显示确认购买弹窗
          configConfirmBuyPopup: {}, // 确认购买弹窗配置
          isShowReceivePopup: false, // 是否显示恭喜获得弹窗
          configReceivePopup: [] // 恭喜获得配置
        }
      },
      components: { ConfirmBuyPopup, ReceivePopup, ChoosePaymentPopup },
      methods: {
        /**
         * 购买礼包前置操作
         * @param {Goods} goods
         * @param {'inBuy'|'cashBuy'} buyType 购买类型 inBuy:内购 cashBuy:现金购买
         */
        preBuy(goods, buyType) {
          if (buyType == 'inBuy') return this.inBuy(goods)
          if (goods.has_right == 2) return this.$toast('今日购买次数不足')
          if (parseFloat(this.money) < goods.goods_info.price) return this.$toast('现金不足')
          this.configConfirmBuyPopup = goods
          this.isShowConfirmBuyPopup = true
        },
        /**
         * 现金购买
         * @param {Goods} goods
         */
        async confirmCashBuy(goods) {
          const res = await getPageData({ type: 'cash_buy', id: '' }) // todo 现金购买接口
          if (res.errno) return this.$toast(res.errmsg)
          if (this.isShowReceivePopup) this.isShowReceivePopup = false
          this.$nextTick(() => {
            this.configReceivePopup = res.data.awards // todo 需要注意接口返回数据格式
            this.isShowReceivePopup = true
          })
          this.$emit('update') // todo 更新数据
        },
        /**
         * 内购 前端不需要拦截支付 由校验支付接口统一校验
         * @param {Goods} goods
         */
        async inBuy(goods) {
          if (Object.values(goods.goods_info).includes('')) return this.$toast('购买失败，缺少购买信息')
          const cloneGoods = JSON.parse(JSON.stringify(goods))
          if (isIOS()) {
            const res = await this.payApi(cloneGoods)
            if (res) return
            appPay({ price: cloneGoods.goods_info.price, apple_id: cloneGoods.goods_info.apple_id, goods_type: cloneGoods.goods_info.goods_type, id: cloneGoods.goods_info.gift_id })
            this.judgeBuySuccess(cloneGoods)
          } else {
            this.configChoosePaymentPopup = cloneGoods
            this.isShowChoosePaymentPopup = true
          }
        },
        /**
         * 确认支付方式
         * @param {'wx'|'alipay'} pay_type 支付类型 wx:微信 alipay:支付宝
         * @param {Goods} goods
         */
        async confirmPayment(pay_type, goods) {
          const res = await this.payApi(goods)
          if (res) return
          appPay({ price: goods.goods_info.price, goods_type: goods.goods_info.goods_type, id: goods.goods_info.gift_id, pay_type })
          this.judgeBuySuccess(goods)
        },
        /**
         * 创建/获取购买定时器
         * @param {string|number} id 商品id 当商品只有一个时 可以自己定义传入
         * @return {Object} resTimer 定时器对象
         * @return {number|string} resTimer.id 商品id 用于区分定时器对象
         * @return {number} resTimer.maxPollTimer 最大轮询次数定时器
         * @return {number} resTimer.judgeBuySuccessTimer 判断购买成功定时器
         */
        getBuyTimer(id) {
          let resTimer = this.buyTimers.find((item) => item.id == id)
          if (resTimer) return resTimer
          resTimer = { maxPollTimer: null, judgeBuySuccessTimer: null, id }
          this.buyTimers.push(resTimer)
          return resTimer
        },
        /**
         * 关闭并清除购买定时器 用于购买成功或者购买失败后清除定时器对象
         * @param {string|number} id 商品id 当商品只有一个时 可以自己定义传入
         */
        offBuyTimer(id) {
          this.clearJudgeBuySuccessTimer(id)
          this.clearMaxPollTimer(id)
          this.buyTimers = this.buyTimers.filter((item) => item.id != id)
        },
        /**
         * 判断购买成功 轮询
         * @param {Goods} goods
         */
        judgeBuySuccess(goods) {
          const timerId = goods.id !== undefined ? goods.id : 'only' // 兼容商品只有一个后端不提供商品id 默认为only
          this.getBuyTimer(timerId).judgeBuySuccessTimer = setInterval(async () => {
            const res = await getPageData({ type: 'poll' }) // todo 轮询校验接口
            if (!res.errno) {
              this.offBuyTimer(timerId)
              if (this.isShowReceivePopup) this.isShowReceivePopup = false
              this.$nextTick(() => {
                this.configReceivePopup = res.data // todo 需要注意接口返回数据格式
                this.isShowReceivePopup = true
                if (this.buyToast.success) this.$toast(this.buyToast.success)
              })
              this.$emit('update') // todo 更新数据
            }
          }, 1000)
          this.getBuyTimer(timerId).maxPollTimer = setTimeout(() => {
            if (this.buyToast.overTime) this.$toast(this.buyToast.overTime)
            this.offBuyTimer(timerId)
          }, 120000)
        },
        /**
         * 清除最大轮询次数定时器
         * @param {string|number} id 定时器id 具体看getBuyTimer
         */
        clearMaxPollTimer(id) {
          const res = this.getBuyTimer(id)
          if (!res) return
          clearTimeout(res.maxPollTimer)
          res.maxPollTimer = null
        },
        /**
         * 清除判断购买成功定时器
         * @param {string|number} id 定时器id 具体看getBuyTimer
         */
        clearJudgeBuySuccessTimer(id) {
          const res = this.getBuyTimer(id)
          if (!res) return
          clearInterval(res.judgeBuySuccessTimer)
          res.judgeBuySuccessTimer = null
        },
        /**
         * 内购校验接口
         * @param {Goods} goods
         * @return {0|-1} 0:可购买 -1:不可购买
         */
        async payApi(goods) {
          const res = await getPageData({ type: 'payment' }) // todo 支付校验接口
          if (!res.errno) return 0
          this.$toast(res.errmsg)
          return -1
        },
        /**
         * 过滤参数 将source中对应params的参数过滤出来
         * @param {Object} params
         * @param {Object} source
         * @return {Object}
         */
        filterParams(params, source) {
          if (Object.keys(params).length === 0) return {}
          return Object.keys(params).reduce((acc, key) => {
            acc[key] = source.hasOwnProperty(key) ? source[key] : params[key]
            return acc
          }, {})
        }
      },
      beforeDestroy() {
        if (this.buyTimers.length) this.buyTimers.forEach((item) => this.offBuyTimer(item.id))
      }
    }
    </script>
    ```

26. ```js
    // 生成唯一ID
    guid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
          const string = (Math.random() * 16) | 0
          const v = c == 'x' ? string : (string & 0x3) | 0x8
          return v.toString(16)
        }
      )
    }
    ```

27. ```js
    // 滑动指令
    
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
    
    import swipe from './swipe'
    directives: { swipe }
    <div v-swipe="(direction, distance) => fn(direction, distance)"></div>
    ```

28. ```js
    /**
     * @description: 获取最接近的时间
     * @param {number[]} thresholds 时间阈值
     * @param {Boolean} crossDay 是否跨天
     * @return {{time:number, index:number}} 返回最接近的时间和索引
     */
    getClosestTime(thresholds, crossDay = false) {
      const now = new Date()
      const currentMinutes = now.getHours() * 60 + now.getMinutes()
      const closestTime = thresholds.reduce((prev, curr) => {
        const prevMinutes = prev * 60
        const currMinutes = curr * 60
        const prevDiff = crossDay ? Math.min(Math.abs(prevMinutes - currentMinutes), 1440 - Math.abs(prevMinutes - currentMinutes)) : Math.abs(prevMinutes - currentMinutes)
        const currDiff = crossDay ? Math.min(Math.abs(currMinutes - currentMinutes), 1440 - Math.abs(currMinutes - currentMinutes)) : Math.abs(currMinutes - currentMinutes)
        return currDiff < prevDiff ? curr : prev
      })
      return { time: closestTime, index: thresholds.indexOf(closestTime) }
    }
    
    // 示例用法：
    this.startIndex = this.getClosestTime([0, 8, 14, 21]).index
    ```

29. ```
    Vue2中使用cdn加速第三方库
    vue.config.js
    
    const cdn = {
      css: [
        // `${process.env.VUE_APP_OSS_PATH}activity/public/vue/node_modules/vant.min.css`,
        `${process.env.VUE_APP_OSS_PATH}activity/public/vue/node_modules/swiper.min.css`
      ],
      js: [
        `${process.env.VUE_APP_OSS_PATH}activity/public/vue/node_modules/vue.min.js`,
        `${process.env.VUE_APP_OSS_PATH}activity/public/vue/node_modules/vue-router.min.js`,
        `${process.env.VUE_APP_OSS_PATH}activity/public/vue/node_modules/vuex.min.js`,
        `${process.env.VUE_APP_OSS_PATH}activity/public/vue/node_modules/axios.min.js`,
        `${process.env.VUE_APP_OSS_PATH}activity/public/vue/node_modules/lottie.min.js`,
        `${process.env.VUE_APP_OSS_PATH}activity/public/vue/node_modules/thinkingdata.umd.min.js`,
        `${process.env.VUE_APP_OSS_PATH}activity/public/vue/node_modules/svga.min.js`,
        `${process.env.VUE_APP_OSS_PATH}activity/public/vue/node_modules/html2canvas.min.js`,
        `${process.env.VUE_APP_OSS_PATH}activity/public/vue/node_modules/swiper.min.js`
        // `${process.env.VUE_APP_OSS_PATH}activity/public/vue/node_modules/vant.min.js`
      ]
    }
    // 配置打包时使用CDN节点（加入externals外部扩展）， 忽略打包的第三方库
    // 左面放package.json中的扩展的名称,右面放项目依赖的名称(项目初始化要用的名称)
    const externals = {
      // 右侧key：vue, 表示遇到 import xxx from 'vue' 这类引入 'vue'的，不去 node_modules 中找，而是去找全局变量 Vue;左侧value：是第三方库导出的默认变量名；
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios',
      'lottie-web': 'lottie',
      'thinkingdata-browser': 'thinkingdata',
      svgaplayerweb: 'SVGA',
      html2canvas: 'html2canvas',
      swiper: 'Swiper'
      // vant: 'vant'
    }
    
    module.exports = {
      productionSourceMap: false,
      publicPath: isProd ? process.env.VUE_APP_CDN_PATH : '/',
      outputDir: `dist/${PAGE_NAME}`,
      chainWebpack(config) {
        if (isProd) {
          config.plugin('html').tap((args) => {
            args[0].cdn = cdn
            return args
          })
          // 视为一个外部库，而不将它打包进来
          config.externals(externals)
        }
      }
    }
    ```

    在第三方库源码中查找第三方库暴露出的默认变量名
    以vue2源码为例：

    /*!
     * Vue.js v2.6.14
     * (c) 2014-2021 Evan You
     * Released under the MIT License.
     */
        !function(e, t) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).**`Vue`** = t()
        }(this, function() {

    上方加粗的就是默认变量名

30. vue.config.js分包记录：https://juejin.cn/post/6844904103848443912；

    ```js
    // isProd 生产环境进行分包
    config.when(isProd, (config) => {
      config.optimization.splitChunks({
        chunks: 'all', // 对异步，同步都进行分包
        maxSize: 200000, // 最大分包大小
        cacheGroups: {
          libs: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10, // 优先级 先分入高优先级包
            chunks: 'initial' // only package third parties that are initially dependent
          },
          vantUI: {
            name: 'chunk-vantUI', // split vantUI into a single package
            priority: 15, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?vant(.*)/ // in order to adapt to cnpm
          }
        }
      })
    })
    ```

31. ```js
    // rem适配 蓝湖上配套使用rem单位 像素设置为100
    (function (doc, win) {
        var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            const screenWidth = clientWidth >= 1500 ? 1920 : 750;
            docEl.setAttribute('style','font-size:'+(100 * (clientWidth / screenWidth))+'px !important');
        };
        if (!doc.addEventListener) return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    })(document, window);
    ```

32. ```js
    // 切换浏览器指定标签：当该页面已经开启时，会切换至该页面
    // 需要切换到的页面
    window.name = 'home' // 设置标签页名称
    // 执行切换逻辑的页面
    window.open('index.html', "home"); // 第一个参数为目标地址 第二个为标签页name open 方法在异步事件中会有兼容问题导致无法打开
    ```

33. Vue2-keep-alive

    ```
    1.包裹缓存的组件或者路由后，该组件嵌套的子路由同样都会缓存
    2.使用include和exclude只会对配置的组件生效，不包括嵌套组件
    3.max设置的数量同样包括嵌套组件，A组件中有A1,A2，这样算3个组件而不是1个
    ```

    