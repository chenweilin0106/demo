# scrollAlignTo 函数 demo（开发中）

打开方式：直接双击打开 `index.html`。

## 文件说明
- `scrollAlignTo.js`：函数本体（挂载到 `window.scrollAlignTo`）
- `app.js`：demo 页面逻辑与场景构建
- `index.html`：页面入口

## scrollAlignTo(options) 说明
- `direction`：`'h' | 'v'`
- `align`：`'start' | 'center' | 'end'`
- `behavior`：`'smooth' | 'auto'`
- `offset`：额外偏移（px，支持字符串）
- `clamp`：是否限制在 `[0, maxScroll]`
- `ignoreContainerPadding`（默认 true）：按容器 content 区对齐；关闭后按 padding 区对齐
- `ignoreElementMargin`（默认 true）：关闭后把子元素 margin 纳入对齐盒
- `ignoreElementBorder`（默认 true）：关闭后按子元素 border box 对齐；开启时按 padding box 对齐
- `debug`：返回中间量（demo 会打印到页面）

## 设计要点
- `getBoundingClientRect()` 是**视口坐标系**，且返回的是元素 **border box**（含 content+padding+border，不含 margin，包含 `width/height`）。
- `scrollTo({ left/top })` 需要的是**内容坐标系**；因此必须把 rect 差值加回 `container.scrollLeft/Top`，否则二次滚动会漂。
- 容器 padding、子元素 margin、子元素 border 都可能造成“对齐偏移”，所以函数提供开关，明确对齐基准。

## 建议测试用例（覆盖你这次踩坑）
1) 把 `containerPaddingStart=16`、`containerPaddingEnd=32`（不对称）
2) 把 `elementMarginStart=10`、`elementMarginEnd=4`（不对称）
3) 把 `elementBorderStart=6`、`elementBorderEnd=2`（不对称）
4) 分别测试：
   - `align=start/center/end`
   - `direction=h/v`
   - 三个 ignore 开关开/关组合
   - 点“滚动两次（验证稳定）”看第二次是否漂

## 已知限制
- 如果元素或容器存在复杂 `transform`（尤其 rotate），rect 的外接矩形与 border/padding 的几何关系会变得复杂；demo 主要覆盖常规布局。
- 如果容器启用了 `scroll-snap-type`，最终落点可能会被吸附到 snap 点，和计算值不完全一致。
- 嵌套滚动容器（需要沿父链滚动）不在本 demo 覆盖范围。

参考：`D:\Project\demo\MD\dom-scroll-metrics.md`
