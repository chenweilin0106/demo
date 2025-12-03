# SVG 虚线知识点详解

## 1. stroke-dasharray 基础概念

`stroke-dasharray` 是SVG中用于创建虚线效果的核心属性，它定义了线条的绘制模式。

### 1.1 基本语法

```svg
stroke-dasharray="实线长度,空白长度,实线长度,空白长度,..."
```

### 1.2 单值模式

```svg
stroke-dasharray="10"  <!-- 等同于 "10,10" -->
```

- 10px实线，10px空白，循环重复
- 适用于简单的等长虚线

### 1.3 双值模式

```svg
stroke-dasharray="10,5"   <!-- 10px实线，5px空白 -->
stroke-dasharray="20,10"  <!-- 20px实线，10px空白 -->
```

- 最常用的虚线模式
- 第一个值：实线长度
- 第二个值：空白长度

### 1.4 多值模式（复杂虚线）

```svg
stroke-dasharray="15,5,5,5"  <!-- 15px实线,5px空白,5px实线,5px空白 -->
stroke-dasharray="20,5,5,5"  <!-- 20px实线,5px空白,5px实线,5px空白 -->
```

- 创建长短交替的复杂虚线
- 模式会循环重复

## 2. 虚线模式与路径长度的关系

### 2.1 路径长度 = 虚线周期

```svg
<path d="M 0 0 L 220 0" stroke-dasharray="220" />
<!-- 结果：整条实线，无空白 -->
```

### 2.2 路径长度 < 虚线周期

```svg
<path d="M 0 0 L 100 0" stroke-dasharray="220" />
<!-- 结果：100px实线（路径被截断） -->
```

### 2.3 路径长度 > 虚线周期

```svg
<path d="M 0 0 L 500 0" stroke-dasharray="220" />
<!-- 结果：220px实线 + 220px空白 + 60px实线 -->
```

## 3. 常见虚线效果

### 3.1 基础虚线

```svg
stroke-dasharray="10,5"    <!-- 常规虚线 -->
stroke-dasharray="15,10"   <!-- 较长的虚线 -->
```

### 3.2 点线效果

```svg
stroke-dasharray="2,8"     <!-- 密集点线 -->
stroke-dasharray="1,9"     <!-- 更密集的点线 -->
```

### 3.3 点划线

```svg
stroke-dasharray="20,5,5,5"  <!-- 长线-点-长线-点 -->
stroke-dasharray="15,5,5,5"  <!-- 短线-点-短线-点 -->
```

### 3.4 双点划线

```svg
stroke-dasharray="20,5,5,5,5,5"  <!-- 长线-点-点-长线-点-点 -->
```

## 4. 实际应用场景

### 4.1 UI设计

- 按钮边框装饰
- 分割线
- 装饰性线条
- 表单边框

### 4.2 数据可视化

- 图表辅助线
- 网格线
- 趋势线
- 参考线

### 4.3 地图应用

- 道路线型
- 边界线
- 规划区域
- 交通路线

### 4.4 游戏开发

- 路径指示
- 特效线条
- 技能范围
- 移动轨迹

## 5. 性能优化建议

### 5.1 避免过度复杂的模式

```svg
<!-- 推荐：简单模式 -->
stroke-dasharray="10,5"

<!-- 避免：过于复杂的模式 -->
stroke-dasharray="1,2,3,4,5,6,7,8,9,10"
```

### 5.2 合理选择虚线长度

- 短虚线：适合精细装饰
- 长虚线：适合粗犷效果
- 点线：适合轻量级指示

## 6. 浏览器兼容性

### 6.1 支持情况

- Chrome: 完全支持
- Firefox: 完全支持
- Safari: 完全支持
- Edge: 完全支持
- IE: 9+支持

### 6.2 注意事项

- 某些老版本浏览器可能不支持多值模式
- 建议提供fallback方案

## 7. 最佳实践

### 7.1 设计原则

- 保持虚线模式的一致性
- 根据用途选择合适的虚线类型
- 考虑视觉层次和重要性

### 7.2 代码规范

```svg
<!-- 推荐：清晰的注释 -->
<path stroke-dasharray="10,5" />  <!-- 基础虚线 -->

<!-- 推荐：语义化的命名 -->
<path class="dashed-border" stroke-dasharray="5,3" />
```

### 7.3 响应式设计

- 使用相对单位或viewBox
- 考虑不同屏幕尺寸的显示效果
- 测试各种分辨率下的表现

## 8. 常见问题与解决方案

### 8.1 虚线不显示

**问题**：设置了stroke-dasharray但看不到虚线
**解决**：检查stroke属性是否设置，stroke-width是否足够

### 8.2 虚线太密集

**问题**：虚线看起来像实线
**解决**：增加空白长度，如`stroke-dasharray="2,8"`

### 8.3 虚线太稀疏

**问题**：虚线间隔太大
**解决**：减少空白长度，如`stroke-dasharray="10,2"`

### 8.4 复杂路径的虚线效果

**问题**：在复杂路径上虚线效果不理想
**解决**：考虑将复杂路径分解为多个简单路径

## 9. 进阶技巧

### 9.1 动态虚线

```css
.dynamic-dash {
  stroke-dasharray: 10, 5;
  animation: dash 2s linear infinite;
}

@keyframes dash {
  to {
    stroke-dashoffset: -15;
  }
}
```

### 9.2 渐变虚线

```svg
<defs>
  <linearGradient id="dashGradient">
    <stop offset="0%" stop-color="red"/>
    <stop offset="100%" stop-color="blue"/>
  </linearGradient>
</defs>
<path stroke="url(#dashGradient)" stroke-dasharray="10,5"/>
```

### 9.3 多层虚线效果

```svg
<path stroke="black" stroke-width="6" stroke-dasharray="10,5"/>
<path stroke="white" stroke-width="4" stroke-dasharray="10,5"/>
```

## 10. 总结

`stroke-dasharray` 是SVG中非常强大的属性，通过合理使用可以创建各种视觉效果：

- **简单虚线**：用于基础装饰和分割
- **复杂虚线**：用于特殊效果和强调
- **点线**：用于轻量级指示
- **点划线**：用于重要标记

掌握虚线的基本原理和应用技巧，能够大大提升SVG图形的视觉效果和用户体验。
