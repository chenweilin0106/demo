# stroke-dashoffset 详解

## 1. 基本概念

`stroke-dashoffset` 是SVG中用于控制虚线模式偏移量的属性，它决定了虚线模式从哪个位置开始绘制。

### 1.1 核心理解

- **不是**路径的起始位置
- **是**虚线模式的偏移量
- 控制虚线模式在路径上的起始点

### 1.2 基本语法

```svg
stroke-dashoffset="偏移量"
```

## 2. 工作原理

### 2.1 偏移方向

- **正值**：向左偏移（虚线模式向前移动）
- **负值**：向右偏移（虚线模式向后移动）

### 2.2 偏移计算

```
实际显示 = 原始虚线模式 + 偏移量
```

## 3. 详细示例分析

### 3.1 基础示例

```svg
<path d="M 50 50 L 250 50"  <!-- 路径长度：200px -->
      stroke-dasharray="200"  <!-- 模式：200px实线,200px空白 -->
      stroke-dashoffset="150" />
```

**分析过程**：

1. 原始模式：200px实线 + 200px空白
2. 路径长度：200px
3. 偏移量：150px（向左偏移）
4. 结果：从第150px位置开始绘制
5. 实线部分：200 - 150 = 50px
6. 空白部分：200 - 50 = 150px

### 3.2 不同偏移值的效果

#### offset = 0

```svg
stroke-dasharray="200" stroke-dashoffset="0"
```

- 结果：200px实线（整条路径）

#### offset = 50

```svg
stroke-dasharray="200" stroke-dashoffset="50"
```

- 结果：150px实线 + 50px空白

#### offset = 100

```svg
stroke-dasharray="200" stroke-dashoffset="100"
```

- 结果：100px实线 + 100px空白

#### offset = 150

```svg
stroke-dasharray="200" stroke-dashoffset="150"
```

- 结果：50px实线 + 150px空白

#### offset = 200

```svg
stroke-dasharray="200" stroke-dashoffset="200"
```

- 结果：0px实线 + 200px空白（完全空白）

## 4. 数学公式

### 4.1 实线长度计算

```
实线长度 = max(0, 虚线模式实线长度 - 偏移量)
```

### 4.2 空白长度计算

```
空白长度 = 路径长度 - 实线长度
```

### 4.3 特殊情况

- 当偏移量 ≥ 虚线模式实线长度时，实线长度为0
- 当偏移量 < 0时，会从虚线模式的后面部分开始

## 5. 可视化理解

### 5.1 原始虚线模式

```
[====200px实线====][====200px空白====]
```

### 5.2 应用不同偏移量

#### offset = 0

```
[====200px实线====][====200px空白====]
路径：              [====200px路径====]
结果：              [====200px实线====]
```

#### offset = 50

```
[====200px实线====][====200px空白====]
偏移：        ↑50px
路径：              [====200px路径====]
结果：              [==150px实线==][50px空白]
```

#### offset = 150

```
[====200px实线====][====200px空白====]
偏移：            ↑150px
路径：              [====200px路径====]
结果：              [50px实线][150px空白]
```

## 6. 实际应用场景

### 6.1 进度条实现

```svg
<!-- 背景圆环 -->
<circle r="50" 
        stroke-dasharray="314" 
        stroke-dashoffset="0" 
        stroke="gray" />

<!-- 进度圆环 -->
<circle r="50" 
        stroke-dasharray="314" 
        stroke-dashoffset="157" 
        stroke="blue" />
```

### 6.2 加载动画

```svg
<path stroke-dasharray="100,50" 
      stroke-dashoffset="0">
  <animate attributeName="stroke-dashoffset" 
           values="0;-150;0" 
           dur="2s" 
           repeatCount="indefinite" />
</path>
```

### 6.3 描边动画

```svg
<path stroke-dasharray="1000" 
      stroke-dashoffset="1000">
  <animate attributeName="stroke-dashoffset" 
           values="1000;0" 
           dur="3s" 
           fill="freeze" />
</path>
```

## 7. 动画效果

### 7.1 流动效果

```css
.flowing-dash {
  stroke-dasharray: 20, 10;
  animation: flow 2s linear infinite;
}

@keyframes flow {
  to {
    stroke-dashoffset: -30;
  }
}
```

### 7.2 描边效果

```css
.stroke-drawing {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: draw 3s ease-in-out forwards;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}
```

### 7.3 进度效果

```css
.progress-bar {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: progress 2s ease-out forwards;
}

@keyframes progress {
  to {
    stroke-dashoffset: 30; /* 70%进度 */
  }
}
```

## 8. 常见误区

### 8.1 误区1：offset是路径起始位置

**错误理解**：stroke-dashoffset="50" 表示从路径的第50px开始绘制
**正确理解**：stroke-dashoffset="50" 表示虚线模式向左偏移50px

### 8.2 误区2：offset只能控制实线部分

**错误理解**：offset只影响实线的显示
**正确理解**：offset影响整个虚线模式的起始位置

### 8.3 误区3：offset值不能超过路径长度

**错误理解**：offset值应该小于等于路径长度
**正确理解**：offset值可以任意大小，但效果会循环

## 9. 最佳实践

### 9.1 动画设计

- 使用负值创建向前流动的效果
- 使用正值创建向后流动的效果
- 考虑动画的流畅性和性能

### 9.2 进度条设计

- 使用offset控制进度百分比
- 确保offset值与进度值成比例
- 考虑用户体验和视觉反馈

### 9.3 性能优化

- 避免过于频繁的offset变化
- 使用CSS动画而非JavaScript动画
- 考虑硬件加速

## 10. 调试技巧

### 10.1 可视化调试

```svg
<!-- 添加背景线帮助调试 -->
<path d="M 0 0 L 200 0" stroke="lightgray" stroke-width="1"/>
<path d="M 0 0 L 200 0" stroke="red" stroke-width="4" 
      stroke-dasharray="200" stroke-dashoffset="50"/>
```

### 10.2 数值验证

- 计算预期的实线长度
- 验证空白部分长度
- 检查动画的起始和结束值

### 10.3 浏览器兼容性测试

- 测试不同浏览器的表现
- 检查动画性能
- 验证视觉效果一致性

## 11. 总结

`stroke-dashoffset` 是SVG中控制虚线模式偏移的关键属性：

### 核心要点

1. **偏移量**：控制虚线模式的起始位置
2. **方向性**：正值向左，负值向右
3. **数学关系**：实线长度 = max(0, 模式实线长度 - 偏移量)
4. **动画应用**：广泛用于进度条、描边动画、流动效果

### 应用价值

- **进度指示**：精确控制进度显示
- **动画效果**：创建流畅的视觉动画
- **用户体验**：提供直观的交互反馈
- **设计灵活性**：实现复杂的视觉效果

掌握 `stroke-dashoffset` 的工作原理和应用技巧，能够大大提升SVG动画和交互效果的质量。
