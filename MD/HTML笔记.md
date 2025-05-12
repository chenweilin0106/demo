1. ```html
   APP内嵌浏览器中，ios机型中，需要视频自动静音播放
   APP内嵌H5，ios视频自动全屏播放问题：https://juejin.cn/post/7063666949959450654searchId=20230713100423CE3EB3DFB7BE535351C0#comment；
   <!-- video配置 autoplay：自动播放;muted：静音;loop：循环;playsinline，webkit-playsinline：禁止全;crossorigin：跨域-->
   <video class="testVideo" src="http://h5.dev.dandanvoice.com/vue/test/car_jdy.mp4" autoplay muted loop playsinline webkit-playsinline crossorigin="anonymous"></video>
   <!-- 配置好后需要APP前端开发允许播放 -->
   ```
   
2. ```html
   <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
   ```


3. APP内嵌H5，ios视频自动全屏播放问题：https://juejin.cn/post/7063666949959450654?searchId=20230713100423CE3EB3DFB7BE535351C0#comment；
4. html中video标签：https://juejin.cn/post/7061908288027230216?searchId=20230713100423CE3EB3DFB7BE535351C0
5. 