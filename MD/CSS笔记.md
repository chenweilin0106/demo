1. ```html
   层叠上下文
   
   box元素设置了 position: relative，而 .bottom 元素设置了 position: absolute 和 z-index: -1。为什么bottom元素会被放置在body 元素的后面吗？
   给box元素添加上z-index: 1;bottom元素为什么会在box元素的上面吗？
   给body元素添加上z-index: 1;bottom元素为什么会在body元素的上面吗？
   
   .box 元素：设置了 position: relative，但没有设置 z-index，因此它没有创建新的层叠上下文。
   .bottom 元素：设置了 position: absolute 和 z-index: -1，这意味着它会在全局文档的层叠上下文中进行堆叠。
   body 元素：没有设置 position 和 z-index，因此它也没有创建新的层叠上下文。
   
   解释
   全局文档的层叠上下文：
   
   当一个元素没有创建新的层叠上下文时，它会在全局文档的层叠上下文中进行堆叠。
   在你的代码中，.box 和 .bottom 元素都在全局文档的层叠上下文中。
   z-index: -1 的处理：
   
   .bottom 元素设置了 position: absolute 和 z-index: -1，这意味着它会被放置在全局文档的层叠上下文的背景层。
   由于 body 元素没有创建新的层叠上下文，.bottom 元素会被放置在 body 元素的后面。
   结论
   .box 元素：没有创建新的层叠上下文，因此 .bottom 元素在全局文档的层叠上下文中进行堆叠。
   .bottom 元素：由于 z-index: -1，它会被放置在 body 元素的后面。
   body 元素：没有创建新的层叠上下文，因此 .bottom 元素在全局文档的层叠上下文中进行堆叠。
   通过给 body 元素设置 position: relative 和 z-index，你创建了一个新的层叠上下文，这样 .bottom 元素会在 body 元素的层叠上下文中进行堆叠，而不是在全局文档的层叠上下文中。
   
   但是由于bottom元素是box的子元素，所以会被放到box的背景和边框后面进行渲染，也就是body的上层；但是这有个前提，html不能设置颜色，或者body的父元素不能设置颜色，如果设置颜色那么bottom就会被放到box的父元素下方；
   <!DOCTYPE html>
   <html lang="en">
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <title>Document</title>
     <style>
       * {
         margin: 0;
         padding: 0;
         box-sizing: border-box;
       }
       html {
         background-color: skyblue;
       }
       body {
         position: relative;
         z-index:1;
         background-color: pink;
       }
       .box {
         position: relative;
         width: 200px;
         height: 200px;
         background-color: red;
       }
       .bottom {
         position: absolute;
         z-index: -1;
         bottom: -50px;
         right: -50px;
         width: 100px;
         height: 100px;
         background-color: blue;
       }
     </style>
   </head>
   <body>
     <div class="box">
       <div class="bottom"></div>
     </div>
   </body
   </html>
   ```
   
2. ```css
   border-radius9999px原理
   1. `border-radius` 属性定义了元素的外边框的圆角半径。
   2. 当 `border-radius` 的值大于元素的高度或宽度的一半时，浏览器会自动将其限制为元素的高度或宽度的一半。
   3. 这意味着即使你设置一个非常大的值，实际应用的圆角半径也不会超过元素的高度或宽度的一半，从而使元素看起来像一个圆形或椭圆。
   
   /* 使元素变成一个圆形 */
   .circle {
     width: 100px;
     height: 100px;
     background-color: red;
     border-radius: 99999px; /* 实际应用的圆角半径为 50px */
   }
   
   /* 使元素变成一个椭圆形 */
   .ellipse {
     width: 150px;
     height: 100px;
     background-color: blue;
     border-radius: 99999px; /* 实际应用的圆角半径为 50px */
   }
   ```

3. IOS，软件盘弹框会让fixed元素失效的情况；一种解决方案是让页面高度始终保持设备高度，就是100vh；所以专门套一个元素，让改元素滚动；

4. ```scss
   // 去除滚动条宽度
   ::-webkit-scrollbar {
     display: none;
     width: 0;
     -webkit-overflow-scrolling: touch;
   }
   ```

5. ```
   IOS滚动上下回弹解决方案：
   1. 使用css：overscroll-behavior-y；https://blog.csdn.net/tiven_/article/details/135929284；此方案有兼容问题
   2. 使用第三方库：https://better-scroll.github.io/docs/zh-CN/；该方案相当于不使用原生滚动，使用js手写滚动；
   ```

6. 父元素使用transform属性后，如果子元素使用fixed固定定位，该固定定位会被转为absolute决定定位；目前遇到的场景是弹框；解决方案是不放到父元素下，从根本解决问题；应该也可以解决toast的问题；

7. `vue`样式穿透原理：https://juejin.cn/post/7353447472558063679；

8. ```css
   // css描边，使用字体阴影实现
   text-shadow: 1px 0 #f953e1, -1px 0 #f953e1, 0 1px #f953e1, 0 -1px #f953e1, 1px 1px #f953e1, -1px -1px #f953e1, 1px -1px #f953e1, -1px 1px #f953e1;
   ```

9. 展示用户输入的文本时，IOS上需要注意，展示元素要添加padding，因为IOS上表情占位较大，如果不加padding会导致表情显示不完整；

10. ```scss
    // 字体描边：https://zhuanlan.zhihu.com/p/634162662（不要和文字阴影一起使用，会有兼容性问题，在一些设备上描边属性会失效）；
    // -webkit-background-clip: text;在safari出现缝隙：https://stackoverflow.com/questions/46466089/weird-artifacts-on-safari-when-using-webkit-background-clip-webkit-text-fill
    <div class="text" data-text="1234567890"><div class="inner">1234567890</div></div>
    
    .text {
      $stroke: 2px;
      position: relative;
      z-index: 1;
      font-size: 30px;
      font-weight: 500;
      white-space: nowrap;
      line-height: 1;
      color: transparent;
      width: fit-content;
      overflow: hidden;
      text-align: center;
      margin: 0 auto; /*水平居中*/
        .inner{
          position: relative;
          z-index: 2;
          padding: $stroke; /*为描边预留位置 加上描边大小*/
          background-image: linear-gradient(white, white); /*字体颜色*/
          -webkit-background-clip: text; /*背景裁剪成字体*/
          background-repeat: no-repeat;
          border: 1px solid transparent;
          margin: -1px;
          overflow: hidden;
          white-space: nowrap;
          clip-path: inset($stroke)
        }
        &::before{
          content: attr(data-text);
          position: absolute;
          z-index: 1;
          top: -$stroke;
          left: -$stroke;
          right: -$stroke;
          bottom: -$stroke;
          padding: $stroke; /* 为描边预留位置 加上描边大小 防止描边被溢出隐藏 */
          padding: $stroke; /*保持与inner大小相同 方便定位*/
          -webkit-text-stroke: $stroke transparent; /*字体描边 为渐变背景占位 背景会覆盖在描边上*/
          background-image: linear-gradient(white, white); /*描边颜色*/
          -webkit-background-clip: text;
          background-repeat: no-repeat;
          box-sizing: border-box;
          border: 1px solid transparent;
          margin: -1px;
          overflow: hidden;
          white-space: nowrap;
          clip-path: inset($stroke)
          display: flex;
          align-items: center;
          justify-content: center;
        }
    }
    ```
    
11. flex 布局会导致该元素设置的文字溢出隐藏失效，需要设置固定宽度，但是有些场景不能用固定宽度，可以使用 max-width 或者 min-width 代替；

12. H5，输入框，文本域若加上user-select: none；在一些机型上，会导致光标出现，但是软键盘没有弹出；user-select: none;https://blog.csdn.net/weixin_44021417/article/details/88662955；

13. ```css
    pointer-events:none; // 让该元素点击事件穿透 兼容性良好
    ```

14. ```css
    // 不规则边框：web端可以使用点9图
    border-image-source: url(''); //边框路径
    border-image-slice: 10 3 13 2 fill; 上 右 下 左 背景是否沿用边框图片背景
    border-image-width: 10px 3px 13px 2px; // 边框粗细 把切割的部分作为粗细
    
    // 切割处缝隙修复
    &::after{
      content: '';
      position: absolute;
      width: 612px; // 拉伸处图片宽度
      top: 157px; // 切割位置 - 4px
      left: 50%;
      transform: translateX(-50%);
      bottom: 191px; // 切割位置 - 4px
      z-index: -1; /*todo 父元素不能使用z-index 否则伪元素将不能放置底部 如果弹框背后还有特殊遮盖 要注意层级 伪元素只能在弹框下1层*/
      background: url('@/pages/valentineDay/assets/tk_1_1.png') no-repeat left top/100% 100%; /*todo 如果有透明边框就让UI去掉 不然两个透明边框叠加会出现问题*/
    }
    ```
    
15. ```css
    text-indent: -0.5em; // 消除中文符号两边距离
    ```


16. ```css
    以下是一个场景：father元素，相对定位；son元素,启用overflow: hidden；gSon元素，启用绝对定位；这三个宇元素是嵌套关系；
    gSon很明显是根据father元素定位的，因为son并没有定位属性；而如果gSon元素位置超出了son元素的可视范围；son元素设置了溢出隐藏，那么在son元素中的元素如果超出了范围就会隐藏超出部分；但是gSon却没有；
    
    这是因为 .son 元素的 overflow 属性被设置为 hidden，这意味着任何超出其边界的内容都应该被隐藏。然而，.gSon 元素的 position 属性被设置为 absolute，这使得它脱离了正常的文档流，并相对于最近的定位祖先（即具有 position 为 absolute、relative 或 fixed 的祖先）进行定位。
    
    在这种情况下，.gSon 的定位祖先是 .father，而不是 .son。因此，即使 .gSon 的部分内容超出了 .son 的边界，它仍然可见，因为它实际上是相对于 .father 定位的，而 .father 的 overflow 属性并未设置为 hidden。
    
    .father {
      position: relative;
    }
    .son {
      width: 600px;
      height: 1043px;
      overflow: hidden;
    }
    .gSon {
      position: absolute;
      top: 183px;
      left: -18px;
      width: 55px;
      height: 224px;
    }
    ```

17. css样式中，子元素定位父元素，当父元素有border时，top值设置为0，会从边框开始算。比如boder的width是4px，那这个是的top：0相当于没有边框时候的top：4；而有padding的情况则和原来保持一致；也就说border会影响position，padding不会；
18. 行盒截断的样式：https://www.bilibili.com/video/BV1HP411b7C6/?spm_id_from=333.1007.top_right_bar_window_history.content.click；
19. 渐变边框实现方案：https://juejin.cn/post/7017701121619656711?searchId=20240523162324F17FCDB4B7ED8724F32A；
20. 多层边框实现

    ```scss
    .popupContent {
        //-webkit-background-clip: padding-box, border-box, content-box;
        -webkit-background-clip: content-box, padding-box, border-box;
        //-webkit-background-origin: padding-box, border-box, content-box;
        -webkit-background-origin: content-box, padding-box, border-box;
        //background-image: -webkit-linear-gradient(#fff, #fff), -webkit-linear-gradient(#FFCE4A, #FFCE4A), -webkit-linear-gradient(180deg, #EE7A27, #FFBC52);
        background-image: -webkit-linear-gradient(-90deg, #EE7A27, #FFBC52), -webkit-linear-gradient(#fff, #fff), -webkit-linear-gradient(#FFCE4A, #FFCE4A);
        pointer-events: auto;
        $innerBorderWidth: 4px;
        padding: $innerBorderWidth;
        border: 6px solid transparent;
        .main {
           padding: 77 - $innerBorderWidth 0 36 - $innerBorderWidth - 3 0;
        }
    }
    ```

21. ```html
    伪元素动态content
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        .box {
          width: 100px;
          height: 100px;
        }
        .box::after {
          content: attr(count);
        }
      </style>
    </head>
    <body>
      <div class="box" count="0"></div>
      <script>
        const box = document.querySelector('.box');
        let count = 1;
        setInterval(() => {
          box.setAttribute('count', count++);
        }, 1000);
      </script>
    </body>
    </html>
    ```

22. `-webkit-linear-gradient` 和 `linear-gradient` 的主要差异总结


    1. **浏览器支持**：
       - `-webkit-linear-gradient`：用于旧版 WebKit 浏览器（如早期版本的 Chrome 和 Safari）。
       - `linear-gradient`：标准的 CSS3 渐变函数，适用于现代浏览器。
    2. **前缀要求**：
       - `-webkit-linear-gradient`：需要加上 `-webkit-` 前缀。
       - `linear-gradient`：不需要任何前缀。
    3. **语法差异**：
       - `-webkit-linear-gradient`：早期版本不支持方向关键字（如 `to bottom`），只能使用角度值。
       - `linear-gradient`：支持方向关键字和角度值。
    4. **默认方向**：
       - `-webkit-linear-gradient`：默认方向是从上到下（相当于 `180deg`）。
       - `linear-gradient`：默认方向是从上到下（相当于 `to bottom`）。
    5. **兼容性写法**：
       - 为了确保在所有浏览器中都能正确显示渐变背景，通常会同时使用带前缀和不带前缀的渐变函数。

23. flex实现子元素平均分布

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style>
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }
            :root {
                --container-width: 472px; /* 容器宽度 */
                --item-width: 128px; /* 子元素宽度 */
                --n: 3; /* 每行显示的个数 */
                --gap: calc((var(--container-width) - var(--item-width) * var(--n)) / (var(--n) + 1)); /* 计算间距 */
            }
            .container {
                width: var(--container-width);
                background: #eee; /* 仅装饰 */
                margin: 50px auto; /* 仅装饰 */
                display: flex;
                flex-wrap: wrap;
                padding-bottom: var(--gap); /* 底部边距 仅装饰 */
            }
            .item {
                width: var(--item-width); /* 子元素宽度 */
                height: var(--item-width); /* 子元素高度 只为方便和宽度一致 仅装饰 */
                border: 1px solid #333; /* 边框 仅装饰 */
                margin: var(--gap) 0 0 var(--gap); /* 左的间距 上间距仅装饰 */
            }
            .item:nth-child(odd) {
                background: #046f4e;
            }
            .item:nth-child(even) {
                background: #d53b3b;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
            <div class="item"></div>
        </div>
    </body>
    </html>
    ```

24. `box-shadow` 是 CSS 中用于为元素添加阴影效果的属性。它可以创建一个或多个阴影，并且可以控制阴影的颜色、模糊程度、扩展范围等。

    #### 语法
    ```css
    box-shadow: h-offset v-offset blur spread color;
    ```

    #### 参数解释
    1. **h-offset**（水平偏移）：阴影相对于元素的水平偏移量。正值表示向右偏移，负值表示向左偏移。
    2. **v-offset**（垂直偏移）：阴影相对于元素的垂直偏移量。正值表示向下偏移，负值表示向上偏移。
    3. **blur**（模糊半径）：阴影的模糊半径。值越大，阴影越模糊。可选参数，默认值为 0。
    4. **spread**（扩展半径）：阴影的扩展半径。正值表示扩大阴影，负值表示收缩阴影。可选参数，默认值为 0。
    5. **color**（颜色）：阴影的颜色。可选参数，默认值为元素的文本颜色。

    #### 示例
    ```css
    /* 简单的阴影效果 */
    .simple-shadow {
        box-shadow: 10px 10px;
    }
    
    /* 带模糊效果的阴影 */
    .blur-shadow {
        box-shadow: 10px 10px 5px;
    }
    
    /* 带扩展效果的阴影 */
    .spread-shadow {
        box-shadow: 10px 10px 5px 2px;
    }
    
    /* 带颜色的阴影 */
    .color-shadow {
        box-shadow: 10px 10px 5px 2px rgba(0, 0, 0, 0.5);
    }
    
    /* 内阴影 */
    .inset-shadow {
        box-shadow: inset 10px 10px 5px 2px rgba(0, 0, 0, 0.5);
    }
    /* 常用白色描边阴影 */
    box-shadow: inset 0 0 3px 1px rgba(255, 255, 255, 0.96);
    ```

    通过组合这些参数，你可以创建各种不同的阴影效果，以增强网页元素的视觉效果。

25. ### CSS 渐变中的百分比位置笔记

    #### 基本概念
    - **百分比值**：表示颜色停止的位置，而不是颜色开始的位置。
    - **颜色停止点**：定义了颜色在渐变中的具体位置，从而创建出平滑的颜色过渡效果。

    #### 示例代码
    ```css
    background-image: linear-gradient(-69deg, #0BF6FC 30%, #087be9 30%, #087be9 70%, #0BF6FC 70%);
    ```

    #### 解释
    - `#0BF6FC 30%`：颜色 `#0BF6FC` 在渐变的 30% 位置停止。
    - `#087be9 30%`：颜色 `#087be9` 在渐变的 30% 位置开始。
    - `#087be9 70%`：颜色 `#087be9` 在渐变的 70% 位置停止。
    - `#0BF6FC 70%`：颜色 `#0BF6FC` 在渐变的 70% 位置开始。

    #### 可视化
    ```
    | 0%       | 30%       | 70%       | 100%      |
    | #0BF6FC  | #087be9   | #087be9   | #0BF6FC   |
    ```

    #### 详细说明
    1. 从 0% 到 30%，颜色从默认背景色渐变到 `#0BF6FC`。
    2. 在 30% 位置，颜色从 `#0BF6FC` 突然变为 `#087be9`。
    3. 从 30% 到 70%，颜色保持 `#087be9`。
    4. 在 70% 位置，颜色从 `#087be9` 突然变为 `#0BF6FC`。
    5. 从 70% 到 100%，颜色保持 `#0BF6FC`。

    #### 总结
    - 百分比值表示颜色停止的位置。
    - 颜色在这些位置之间平滑过渡或突然变化。
    - 使用多个颜色停止点可以创建复杂的渐变效果。

26. 条纹渐变

    ```CSS
    background-image: linear-gradient(45deg, #0bf6fd 25%, transparent 25%, transparent 50%, #0bf6fd 50%, #0bf6fd 75%, transparent 75%, transparent);
    background-size: 20px 20px;
    ```

27. 文本溢出（flex）

    ```html
    <ul class="con">
        <li class="wrap">
            <span class="title" title="CSS 测试标题，这是一个稍微有点长的标题，超出一行以后才会有title提示，标题是 实现优惠券的技巧 - 2021-03-26">CSS测试标题，这是一个稍微有点长的标题，超出一行以后才会有title提示，标题是 实现优惠券的技巧 - 2021-03-26</span>
        </li>
    </ul>
    ```

    ```css
    .con {
        font-size: 14px;
        color: #666;
        width: 600px;
        margin: 50px auto;
        border-radius: 8px;
        padding: 15px;
        overflow: hidden;
        resize: horizontal;
        box-shadow: 20px 20px 60px #bebebe,
            -20px -20px 60px #ffffff;
    }
    
    .wrap {
        position: relative;
        line-height: 2;
        height: 2em;
        padding: 0 10px;
        overflow: hidden;
        margin: 5px 0;
        background: #f5f5f5;
    }
    
    .title {
        display: block;
        position: relative;
        background: inherit;
        text-align: justify;
        height: 2em;
        overflow: hidden;
    }
    
    .title::before{
        content: attr(title);
        width: 100%;
        float: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #666;
    }
    ```

28. 黑暗模式：https://juejin.cn/post/7490602578011570202

29. 顶部安全区/底部安全区

    ```css
    /* meta标签需要添加 viewport-fit=cover 目前没有测试过 谨慎使用 */
    .safe-area-top {
      padding-top: constant(safe-area-inset-top);
      padding-top: env(safe-area-inset-top);
    }
    
    .safe-area-bottom {
      padding-bottom: constant(safe-area-inset-bottom);
      padding-bottom: env(safe-area-inset-bottom);
    }
    ```

30. 伪元素使用注意：

    ```scss
     // 伪元素使用边框时要注意：伪元素不继承 * 选择器的公共样式，所以需要加上box-sizing属性
    ::after {
        content: '';
        border: 1px solid #000;
    	box-sizing: border-box;
    }
    ```

31. [IOS，软键盘收回，可能会出现底部安全区域留白](https://cloud.tencent.com/developer/article/1484448?policyId=1004)；

32. IOS，H5上，透明边框可能会导致圆角失效；

33. IOS，H5，position: absolute;可能会和width: fit-content;冲突，导致width: fit-content失效。解决方案：position: absolute;之后就不需要使用width: fit-content;了；

34. 字体回退设置：

    ```css
    font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    ```

35. 优秀按钮模板

    ```scss
    <div class="apple-button">按钮</div>  
    /* 苹果风格的按钮 */
      .apple-button {
        margin: 50px;
        display: inline-block;
        padding: 12px 22px;
        border-radius: 30px;
        background: linear-gradient(to bottom, #42a1ec, #0070c9);
        color: white;
        font-size: 17px;
        font-weight: 400;
        text-align: center;
        cursor: pointer;
        border: none;
        outline: none;
        transition: all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1);
        position: relative;
        overflow: hidden;
      }
    
      .apple-button:hover {
        background: linear-gradient(to bottom, #2d92e8, #0068b8);
        transform: scale(1.02);
        box-shadow: 0 5px 15px rgba(0, 112, 201, 0.3);
      }
    
      .apple-button:active {
        transform: scale(0.98);
        background: linear-gradient(to bottom, #1b7fd1, #005ea3);
      }
    
      .apple-button::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 5px;
        height: 5px;
        background: rgba(255, 255, 255, 0.5);
        opacity: 0;
        border-radius: 100%;
        transform: scale(1, 1) translate(-50%, -50%);
        transform-origin: 50% 50%;
      }
    
      .apple-button:focus:not(:active)::after {
        animation: ripple 1s ease-out;
      }
    
      @keyframes ripple {
        0% {
          transform: scale(0, 0);
          opacity: 0.5;
        }
        100% {
          transform: scale(20, 20);
          opacity: 0;
        }
      }
    ```

    
