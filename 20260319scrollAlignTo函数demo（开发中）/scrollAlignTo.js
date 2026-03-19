/* eslint-disable */
;(function () {
  function toNumber(value, fallback = 0) {
    if (typeof value === 'number') return Number.isFinite(value) ? value : fallback
    if (typeof value === 'string') {
      const n = parseFloat(value)
      return Number.isFinite(n) ? n : fallback
    }
    if (value == null) return fallback
    const n = Number(value)
    return Number.isFinite(n) ? n : fallback
  }

  function getAxis(direction) {
    const isHorizontal = direction !== 'v'
    return {
      isHorizontal,
      rectStart: isHorizontal ? 'left' : 'top',
      rectEnd: isHorizontal ? 'right' : 'bottom',
      rectSize: isHorizontal ? 'width' : 'height',
      scrollKey: isHorizontal ? 'scrollLeft' : 'scrollTop',
      clientSizeKey: isHorizontal ? 'clientWidth' : 'clientHeight',
      scrollSizeKey: isHorizontal ? 'scrollWidth' : 'scrollHeight',
      borderStartKey: isHorizontal ? 'borderLeftWidth' : 'borderTopWidth',
      borderEndKey: isHorizontal ? 'borderRightWidth' : 'borderBottomWidth',
      paddingStartKey: isHorizontal ? 'paddingLeft' : 'paddingTop',
      paddingEndKey: isHorizontal ? 'paddingRight' : 'paddingBottom',
      marginStartKey: isHorizontal ? 'marginLeft' : 'marginTop',
      marginEndKey: isHorizontal ? 'marginRight' : 'marginBottom'
    }
  }

  function readBoxNumbers(style, keys) {
    const out = {}
    for (const k of keys) out[k] = toNumber(style[k], 0)
    return out
  }

  function clampNumber(n, min, max) {
    if (!Number.isFinite(n)) return min
    if (!Number.isFinite(min) || !Number.isFinite(max)) return n
    return Math.max(min, Math.min(n, max))
  }

  /**
   * 将 element 滚动到 container 的指定对齐位置。
   *
   * 重要：函数内部使用 `getBoundingClientRect()`（视口坐标）并加上 `container.scrollLeft/Top` 转成内容坐标，避免二次滚动漂移。
   *
   * @param {Element} element 目标元素
   * @param {Element} container 滚动容器（不是 window）
   * @param {Object} options
   * @param {'h'|'v'} [options.direction='h'] 滚动方向
   * @param {'start'|'center'|'end'} [options.align='start'] 对齐位置
   * @param {'auto'|'smooth'} [options.behavior='smooth'] 滚动行为
   * @param {number|string} [options.offset=0] 额外偏移（px，可传字符串）
   * @param {boolean} [options.clamp=true] 是否限制在可滚动范围内
   * @param {boolean} [options.ignoreContainerPadding=true] 是否忽略容器 padding（即按 content 区对齐）
   * @param {boolean} [options.ignoreElementMargin=true] 是否忽略元素 margin
   * @param {boolean} [options.ignoreElementBorder=true] 是否忽略元素 border（按 padding box 对齐）
   * @param {boolean} [options.apply=true] 是否执行 scrollTo
   * @param {boolean} [options.debug=false] 是否返回更多中间量

   * @returns {{target:number,maxScroll:number,applied:boolean,axis:'x'|'y',details?:Object}}

   * @example
   * // 横向：滚到容器内容区居中（默认忽略父 padding、忽略子 margin/border）
   * scrollAlignTo(itemEl, listEl, { direction: 'h', align: 'center' })
   *
   * @example
   * // 纵向：贴顶对齐，并额外偏移 12px（常用于顶部留白）
   * scrollAlignTo(rowEl, panelEl, { direction: 'v', align: 'start', offset: 12, behavior: 'auto' })
   */
  function scrollAlignTo(element, container, options) {
    const opts = options || {}
    if (!element || !container) {
      return { target: 0, maxScroll: 0, applied: false, axis: 'x', details: { error: '请传入 element 与 container' } }
    }

    const direction = opts.direction === 'v' ? 'v' : 'h'
    const axis = getAxis(direction)

    const align = opts.align === 'center' || opts.align === 'end' ? opts.align : 'start'
    const behavior = opts.behavior === 'auto' ? 'auto' : 'smooth'
    const clampEnabled = opts.clamp !== false

    const ignoreContainerPadding = opts.ignoreContainerPadding !== false
    const ignoreElementMargin = opts.ignoreElementMargin !== false
    const ignoreElementBorder = opts.ignoreElementBorder !== false

    const offset = toNumber(opts.offset, 0)
    const apply = opts.apply !== false
    const debug = opts.debug === true

    const containerStyle = getComputedStyle(container)
    const elementStyle = getComputedStyle(element)

    const cBox = readBoxNumbers(containerStyle, [axis.borderStartKey, axis.borderEndKey, axis.paddingStartKey, axis.paddingEndKey])
    const eBox = readBoxNumbers(elementStyle, [axis.borderStartKey, axis.borderEndKey, axis.marginStartKey, axis.marginEndKey])

    const containerRect = container.getBoundingClientRect()
    const elementRect = element.getBoundingClientRect()

    const currentScroll = toNumber(container[axis.scrollKey], 0)
    const clientSize = toNumber(container[axis.clientSizeKey], 0)
    const scrollSize = toNumber(container[axis.scrollSizeKey], 0)

    // 以“容器 padding edge”为 0 的滚动坐标系：需要从 rect 差值里扣掉容器 border
    const elementBorderStartInScroll = currentScroll + (toNumber(elementRect[axis.rectStart], 0) - toNumber(containerRect[axis.rectStart], 0)) - cBox[axis.borderStartKey]
    const elementBorderSize = toNumber(elementRect[axis.rectSize], 0)
    const elementBorderEndInScroll = elementBorderStartInScroll + elementBorderSize

    // 根据开关构造元素用于对齐的盒子（默认：padding box，忽略 margin/border）
    let boxStart = elementBorderStartInScroll
    let boxEnd = elementBorderEndInScroll

    if (!ignoreElementMargin) {
      boxStart -= eBox[axis.marginStartKey]
      boxEnd += eBox[axis.marginEndKey]
    }

    if (ignoreElementBorder) {
      boxStart += eBox[axis.borderStartKey]
      boxEnd -= eBox[axis.borderEndKey]
      if (boxEnd < boxStart) boxEnd = boxStart
    }

    const boxCenter = (boxStart + boxEnd) / 2

    const elementAlignCoord = align === 'center' ? boxCenter : (align === 'end' ? boxEnd : boxStart)

    // 容器可视区域内的对齐点（同样以 padding edge 为 0）：
    // - ignoreContainerPadding=true  => 对齐到 content 区（start=paddingStart, end=clientSize-paddingEnd）
    // - ignoreContainerPadding=false => 对齐到 padding 区（start=0, end=clientSize）
    const viewStart = ignoreContainerPadding ? cBox[axis.paddingStartKey] : 0
    const viewEnd = ignoreContainerPadding ? (clientSize - cBox[axis.paddingEndKey]) : clientSize
    const viewCenter = (viewStart + viewEnd) / 2

    const containerAlignPoint = align === 'center' ? viewCenter : (align === 'end' ? viewEnd : viewStart)

    let target = elementAlignCoord - containerAlignPoint + offset

    const maxScroll = Math.max(0, scrollSize - clientSize)
    if (clampEnabled) target = clampNumber(target, 0, maxScroll)

    let applied = false
    if (apply) {
      try {
        container.scrollTo({ [axis.isHorizontal ? 'left' : 'top']: target, behavior })
        applied = true
      } catch (e) {
        // 兜底：部分环境不支持 behavior
        try {
          container.scrollTo({ [axis.isHorizontal ? 'left' : 'top']: target })
          applied = true
        } catch (_) {
          applied = false
        }
      }
    }

    const result = { target, maxScroll, applied, axis: axis.isHorizontal ? 'x' : 'y' }

    if (debug) {
      result.details = {
        options: {
          direction,
          align,
          behavior,
          offset,
          clamp: clampEnabled,
          ignoreContainerPadding,
          ignoreElementMargin,
          ignoreElementBorder,
          apply
        },
        container: {
          scroll: currentScroll,
          clientSize,
          scrollSize,
          rectStart: toNumber(containerRect[axis.rectStart], 0),
          rectSize: toNumber(containerRect[axis.rectSize], 0),
          borderStart: cBox[axis.borderStartKey],
          borderEnd: cBox[axis.borderEndKey],
          paddingStart: cBox[axis.paddingStartKey],
          paddingEnd: cBox[axis.paddingEndKey],
          viewStart,
          viewEnd,
          viewCenter,
          containerAlignPoint
        },
        element: {
          rectStart: toNumber(elementRect[axis.rectStart], 0),
          rectSize: elementBorderSize,
          marginStart: eBox[axis.marginStartKey],
          marginEnd: eBox[axis.marginEndKey],
          borderStart: eBox[axis.borderStartKey],
          borderEnd: eBox[axis.borderEndKey],
          elementBorderStartInScroll,
          elementBorderEndInScroll,
          boxStart,
          boxEnd,
          boxCenter,
          elementAlignCoord
        }
      }
    }

    return result
  }

  window.scrollAlignTo = scrollAlignTo
})()



