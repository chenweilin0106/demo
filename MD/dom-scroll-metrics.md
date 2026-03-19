# DOM 滚动与尺寸/坐标 API 速查（offset/client/scroll/rect）

> 适用场景：滚动容器（横向/纵向）里把某个子元素滚到指定位置（居中/贴边/露出），并解释为什么会出现“偏移”。
> 
> 背景案例：`src/layout/index.vue` 里横向滚动容器 `winnersList`，最初用工具方法 `scrollCenter` 发现有偏移；进一步定位到**父容器 padding**、**子元素 margin**等盒模型因素；后来改为手写计算，使用 `getBoundingClientRect()` + `scrollLeft` 解决“二次滚动不一致”。

---

## 1. 先建立 3 个概念

### 1.1 盒模型（不含 margin）
- **content box**：内容区
- **padding box**：content + padding
- **border box**：padding box + border
- **margin**：在 border 外面，**任何 `offset/client/scroll*` 都不会自动把 margin 算进去**（要自己用 `getComputedStyle` 取）。

### 1.2 “滚动坐标”的参考系（scrollLeft/Top）
对一个可滚动元素 `container`：
- `container.scrollLeft`：**内容**向左滚出去的距离（单位 px），参考的是**内容区域的左边缘**。
- `container.scrollTo({ left })`：`left` 是一个**绝对目标值**（不是增量）。
- `container.scrollBy({ left })`：`left` 是增量。

> 记忆：`scroll*` 永远跟“内容有没有溢出、滚出去多少”有关。

### 1.3 `getBoundingClientRect()` 的参考系（视口 viewport）
- `el.getBoundingClientRect()` 返回的 `left/top/right/bottom` 都是相对**视口**（viewport）的坐标。
- 页面滚动、容器滚动都会让元素在视口中的位置变化，所以 rect 的值会变。

> 关键点：rect 是“你屏幕上看到的坐标”；scrollLeft 是“内容滚动的坐标”。两者不是同一个坐标系。

---

## 2. 尺寸 API：offset / client / scroll（width/height）

下面都以“宽度”为例（高度同理）。

### 2.1 `offsetWidth`
- 含：`content + padding + border + 竖向滚动条(若占宽)`
- 不含：`margin`
- 特点：通常是整数（不同浏览器可能有取整差异）。

### 2.2 `clientWidth`
- 含：`content + padding`
- 不含：`border`、`滚动条(通常不算)`、`margin`
- 相关：`clientLeft/clientTop` 是 **border 的厚度**（常用来拿 `borderLeftWidth`）。

### 2.3 `scrollWidth`
- 含：**内容总宽度**（包括溢出看不见的部分）
- 常用：判断是否需要滚动：`scrollWidth > clientWidth`

### 2.4 一张速查表（宽度）
| 属性 | 包含 content | padding | border | scrollbar | margin | 用途 |
|---|---:|---:|---:|---:|---:|---|
| `clientWidth` | ✓ | ✓ | ✗ | ✗(通常) | ✗ | 可视内容宽度（含 padding） |
| `offsetWidth` | ✓ | ✓ | ✓ | ✓(若占位) | ✗ | 盒子的“外观宽度”（border box） |
| `scrollWidth` | ✓(总内容) | ✓(可能) | ✗ | ✗ | ✗ | 内容总宽度（含溢出部分） |

> 注：`scrollWidth` 是否包含 padding 在不同场景下容易困惑；实际开发中更推荐用 rect 或 `clientWidth` 做可视区，用 `scrollWidth` 做总内容，避免依赖“是否包含 padding”的边界行为。

---

## 3. 坐标 API：offset / client / scroll / rect（left/top）

### 3.1 `scrollLeft` / `scrollTop`
- **滚动容器的内容坐标**。
- `scrollLeft=0` 表示内容最左边刚好贴着容器可视区域左侧（更准确说：贴着容器内容区左侧）。

### 3.2 `offsetLeft` / `offsetTop`
- 相对 `offsetParent` 的坐标（通常是最近的定位祖先元素）。
- 受布局影响大：`position`、`transform`、table、flex/grid 以及某些 CSS 可能改变 `offsetParent`。

> 经验：要计算“元素在某个滚动容器里的位置”，`offsetLeft` 能用但要处理 offsetParent 链；在复杂布局里更容易踩坑。

### 3.3 `clientLeft` / `clientTop`
- 对元素自身来说：一般等于 **border-left / border-top 的厚度**。
- 在滚动计算里常用于把“border”影响扣掉（如果你用的是 rect 差值）。

### 3.4 `getBoundingClientRect()`
- 相对视口的矩形。
- 优点：直观、能反映 transform 后的位置、能拿到小数像素。
- 缺点：它不是内容坐标；如果你最终要用 `scrollTo({ left })`，通常需要把 rect 信息“转换”到 scrollLeft 的坐标系。

---

## 4. 计算“滚到指定位置”的通用套路

目标：把 `el` 滚到 `container` 的某个位置（例如贴左、居中、留出固定间距等）。

### 4.1 用 rect + scrollLeft（推荐，思路清晰）
核心：
1) 先在 **视口坐标系**算出 `el` 相对 `container` 的偏移。
2) 再加上当前 `container.scrollLeft`，把偏移转换成 **内容坐标系**。
3) 再扣掉 padding/border/margin 这些“你希望对齐到哪里”的因素。

把元素左边缘对齐到容器内容区左边缘（考虑容器 border+padding、元素 margin）：
```js
const containerRect = container.getBoundingClientRect()
const elRect = el.getBoundingClientRect()

// 视口坐标差值：元素左边 - 容器左边
const deltaLeftInViewport = elRect.left - containerRect.left

// 转成内容坐标：加上当前 scrollLeft（否则二次滚动会不一致）
const elLeftInScrollContent = container.scrollLeft + deltaLeftInViewport

// 如果你要对齐“内容区左侧”，需要扣掉 border + padding + (元素自身 margin-left)
const containerStyle = getComputedStyle(container)
const elStyle = getComputedStyle(el)

const borderLeft = parseFloat(containerStyle.borderLeftWidth) || 0
const paddingLeft = parseFloat(containerStyle.paddingLeft) || 0
const marginLeft = parseFloat(elStyle.marginLeft) || 0

const targetScrollLeft = elLeftInScrollContent - (borderLeft + paddingLeft + marginLeft)
container.scrollTo({ left: Math.max(0, targetScrollLeft), behavior: 'smooth' })
```

为什么要 `+ container.scrollLeft`？
- `deltaLeftInViewport` 是“此刻屏幕上”的相对距离。
- 第一次滚动后，元素在视口里的位置变了，第二次再算 `deltaLeftInViewport` 就变了。
- 把它加回 `scrollLeft` 后，得到的是“元素在内容坐标系里的位置”，这样计算才稳定。

### 4.2 用 `offsetLeft`（能用，但要小心 offsetParent 链）
如果 `el` 的 `offsetParent` 就是 `container`（或你确认链路可控），可以：
```js
const targetScrollLeft = el.offsetLeft - container.clientLeft /*border*/
container.scrollTo({ left: targetScrollLeft })
```
但一旦 `offsetParent` 不是你想的那个，或者中间有定位/transform，结果就可能偏。

---

## 5. 为什么会“有偏移”（最常见的 6 类原因）

1) **容器有 `padding`**：你以为对齐到容器边缘，其实视觉上对齐点在 padding 内侧。
2) **元素有 `margin`**：大多数 API 不含 margin，视觉对齐经常“差一个 margin”。
3) **容器有 `border`**：rect 的 `left` 通常是 border box 的边缘；而 `scrollLeft` 参考的是内容区，混用会差一个 border。
4) **用了 viewport 坐标去当 scroll 坐标**：典型就是只用 rect 差值去 `scrollTo`，第一次可能“看似对”，第二次就漂。
5) **滚动条占位**：某些平台滚动条会吃掉可视区域宽度（影响 `clientWidth/offsetWidth`）。
6) **RTL / writing-mode / scroll-snap**：会导致 `scrollLeft` 方向/取值规则不直觉，或滚动被吸附到 snap 点。

---

## 6. 排查清单（5 分钟快速定位）

- 看容器：`overflow-x` 是否为 `auto/scroll`？是否是你以为的滚动容器？
- 看盒模型：容器 `padding/border`、元素 `margin` 是否非 0？
- 看坐标系：你最终用的是 `scrollTo/scrollLeft`（内容坐标）还是 rect（视口坐标）？中间有没有做转换？
- 看 DOM 时机：是否在 `this.$nextTick()` / `requestAnimationFrame` 后再测量？（避免还没渲染完成导致尺寸/位置为旧值）
- 看是否被 CSS 影响：`scroll-snap-type`、`scroll-behavior`、`transform`、`position: sticky`。

---

## 7. 结合本项目代码的“正确姿势”

你现在的实现思路是合理的：
- 用 `getBoundingClientRect()` 拿到元素与容器在视口中的相对距离；
- **加上 `container.scrollLeft`** 把差值转为内容坐标（解决二次滚动差异）；
- 再扣掉容器的 `borderLeft + paddingLeft` 与元素 `marginLeft`，避免视觉偏移。

对应的核心计算（概念版）：
```js
targetScrollLeft = 当前scrollLeft + (元素左 - 容器左) - (容器border+padding+元素margin)
```

如果未来需求从“贴左”变成“居中”，只需要把“对齐点”换成中心点即可（同样先把 rect 差值转内容坐标再算）。

---

## 8. 额外建议（少踩坑）

- 尽量在同一套坐标系里做完计算：
  - 要 `scrollTo` → 最终一定要落到 **scrollLeft/scrollTop** 这套内容坐标。
- margin 不属于任何盒子尺寸：只要你视觉上在意它，就要手动读出来算。
- 计算结果加上 `Math.max(0, ...)`（你已经做了）避免负数。

---

## 参考：常用属性一览

- 尺寸：`clientWidth/Height`、`offsetWidth/Height`、`scrollWidth/Height`
- 坐标：`scrollLeft/Top`、`clientLeft/Top`、`offsetLeft/Top`、`getBoundingClientRect()`
- 样式：`getComputedStyle(el).paddingLeft/borderLeftWidth/marginLeft`


