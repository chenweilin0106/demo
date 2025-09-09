# SVG文本居中和描边属性详解

## 概述

本文档详细介绍了SVG中实现文本居中和文字描边的相关属性，基于实际代码示例进行说明。

## 文本居中属性

### 1. text-anchor

**作用**: 控制文本在水平方向上的对齐方式

**可选值**:

- `start` (默认): 文本从指定点开始
- `middle`: 文本以指定点为中心
- `end`: 文本在指定点结束

**示例**:

```html
<text x="50%" y="50%" text-anchor="middle">居中的文本</text>
```

### 2. dominant-baseline

**作用**: 控制文本在垂直方向上的对齐方式

**常用值**:

- `central`: 文本以指定点为中心（垂直居中）
- `middle`: 文本基线在指定点
- `hanging`: 文本悬挂基线在指定点
- `text-before-edge`: 文本前边缘在指定点
- `text-after-edge`: 文本后边缘在指定点

**示例**:

```html
<text x="50%" y="50%" dominant-baseline="central">垂直居中的文本</text>
```

### 3. 完美居中组合

```html
<text 
  x="50%" 
  y="50%" 
  text-anchor="middle" 
  dominant-baseline="central"
>
  完美居中的文本
</text>
```

## 文字描边属性

### 1. stroke

**作用**: 设置描边颜色

**语法**:

```html
<text stroke="颜色值">文本</text>
```

**示例**:

```html
<!-- 纯色描边 -->
<text stroke="red">红色描边</text>

<!-- 渐变描边 -->
<text stroke="url(#gradientId)">渐变描边</text>
```

### 2. stroke-width

**作用**: 设置描边宽度

**语法**:

```html
<text stroke-width="数值">文本</text>
```

**示例**:

```html
<text stroke-width="8">粗描边文本</text>
```

### 3. stroke-linejoin

**作用**: 控制描边线条连接处的形状

**可选值**:

- `miter` (默认): 尖角连接
- `round`: 圆角连接
- `bevel`: 斜角连接

**示例**:

```html
<text stroke-linejoin="round">圆角描边</text>
```

### 4. stroke-opacity

**作用**: 设置描边透明度

**取值范围**: 0-1

**示例**:

```html
<text stroke-opacity="0.5">半透明描边</text>
```

### 5. paint-order（需要测试兼容性）

**作用**: 控制描边和填充的绘制顺序

**常用值**:

- `normal`: 先填充后描边
- `stroke`: 先描边后填充

**示例**:

```html
<text paint-order="stroke">描边在前的文本</text>
```

## 实际应用示例

### 方案一：单层描边

```html
<text
  x="50%"
  y="50%"
  dominant-baseline="central"
  text-anchor="middle"
  font-size="100"
  stroke="url(#textGradient)"
  stroke-width="8"
  paint-order="stroke"
  stroke-opacity="0.5"
>
  TEXT
</text>
```

### 方案二：双层描边（推荐）

```html
<!-- 描边层 -->
<text
  x="50%"
  y="50%"
  dominant-baseline="central"
  text-anchor="middle"
  font-size="100"
  stroke="url(#textGradient)"
  stroke-width="8"
  stroke-linejoin="round"
>
  TEXT
</text>

<!-- 填充层 -->
<text
  x="50%"
  y="50%"
  font-size="100"
  dominant-baseline="central"
  text-anchor="middle"
>
  TEXT
</text>
```

## 渐变描边设置

### 定义渐变

```html
<defs>
  <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
    <stop offset="0%" style="stop-color: #ff6b6b; stop-opacity: 1" />
    <stop offset="50%" style="stop-color: #45b7d1; stop-opacity: 1" />
    <stop offset="100%" style="stop-color: #85c71c; stop-opacity: 1" />
  </linearGradient>
</defs>
```

### 使用渐变描边

```html
<text stroke="url(#textGradient)">渐变描边文本</text>
```

## 最佳实践

1. **文本居中**: 同时使用 `text-anchor="middle"` 和 `dominant-baseline="central"`
2. **描边效果**: 推荐使用双层方案，先绘制描边再绘制填充
3. **渐变描边**: 在 `<defs>` 中定义渐变，通过 `url(#id)` 引用
4. **描边圆角**: 使用 `stroke-linejoin="round"` 让描边更美观
5. **绘制顺序**: 使用 `paint-order="stroke"` 确保描边在填充下方

## 注意事项

- SVG文本的坐标系统以文本基线为基准
- 百分比坐标相对于SVG的viewBox
- 描边宽度会影响文本的实际占用空间
- 渐变描边需要先定义渐变，再通过ID引用
