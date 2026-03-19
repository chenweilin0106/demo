/* global scrollAlignTo */

function $(sel) {
  return document.querySelector(sel)
}

function toNumber(value, fallback = 0) {
  if (typeof value === 'number') return Number.isFinite(value) ? value : fallback
  const n = parseFloat(String(value))
  return Number.isFinite(n) ? n : fallback
}

function setText(el, text) {
  if (!el) return
  el.textContent = text
}

function buildItems(container, direction) {
  container.innerHTML = ''

  const count = 24
  for (let i = 0; i < count; i++) {
    const item = document.createElement('div')
    item.className = 'item'
    item.dataset.index = String(i)
    item.textContent = `item ${i}`

    // 做点尺寸变化，覆盖不同宽高
    if (direction === 'h') {
      const w = 60 + (i % 5) * 18
      item.style.width = `${w}px`
      item.style.height = '56px'
      item.style.display = 'inline-flex'
    } else {
      const h = 44 + (i % 5) * 14
      item.style.height = `${h}px`
      item.style.width = '160px'
      item.style.display = 'flex'
    }

    container.appendChild(item)
  }
}

function applyDemoLayout(direction) {
  const container = $('#container')
  container.classList.toggle('horizontal', direction === 'h')
  container.classList.toggle('vertical', direction === 'v')

  buildItems(container, direction)
  updateTargetOptions()
}

function updateTargetOptions() {
  const sel = $('#targetIndex')
  const items = [...document.querySelectorAll('#container .item')]
  const old = sel.value
  sel.innerHTML = ''
  for (const it of items) {
    const opt = document.createElement('option')
    opt.value = it.dataset.index
    opt.textContent = it.dataset.index
    sel.appendChild(opt)
  }
  if (old) sel.value = old
}

function readOptions() {
  return {
    direction: $('#direction').value,
    align: $('#align').value,
    behavior: $('#behavior').value,
    offset: $('#offset').value,
    clamp: $('#clamp').checked,
    ignoreContainerPadding: $('#ignoreContainerPadding').checked,
    ignoreElementMargin: $('#ignoreElementMargin').checked,
    ignoreElementBorder: $('#ignoreElementBorder').checked,
    debug: $('#debug').checked,
    apply: true
  }
}

function applyBoxStyles() {
  const direction = $('#direction').value
  const container = $('#container')
  const items = [...document.querySelectorAll('#container .item')]

  const containerPaddingStart = toNumber($('#containerPaddingStart').value, 0)
  const containerPaddingEnd = toNumber($('#containerPaddingEnd').value, 0)
  const containerBorderStart = toNumber($('#containerBorderStart').value, 0)
  const containerBorderEnd = toNumber($('#containerBorderEnd').value, 0)

  const elementMarginStart = toNumber($('#elementMarginStart').value, 0)
  const elementMarginEnd = toNumber($('#elementMarginEnd').value, 0)
  const elementBorderStart = toNumber($('#elementBorderStart').value, 0)
  const elementBorderEnd = toNumber($('#elementBorderEnd').value, 0)

  // 容器
  container.style.padding = '0px'
  container.style.border = '0px solid #ff4d4f'

  if (direction === 'h') {
    container.style.paddingLeft = `${containerPaddingStart}px`
    container.style.paddingRight = `${containerPaddingEnd}px`
    container.style.borderLeftWidth = `${containerBorderStart}px`
    container.style.borderRightWidth = `${containerBorderEnd}px`
  } else {
    container.style.paddingTop = `${containerPaddingStart}px`
    container.style.paddingBottom = `${containerPaddingEnd}px`
    container.style.borderTopWidth = `${containerBorderStart}px`
    container.style.borderBottomWidth = `${containerBorderEnd}px`
  }

  // 子元素（所有 item 统一应用，方便观察）
  for (const el of items) {
    el.style.margin = '0px'
    el.style.border = '0px solid #1677ff'

    if (direction === 'h') {
      el.style.marginLeft = `${elementMarginStart}px`
      el.style.marginRight = `${elementMarginEnd}px`
      el.style.borderLeftWidth = `${elementBorderStart}px`
      el.style.borderRightWidth = `${elementBorderEnd}px`
    } else {
      el.style.marginTop = `${elementMarginStart}px`
      el.style.marginBottom = `${elementMarginEnd}px`
      el.style.borderTopWidth = `${elementBorderStart}px`
      el.style.borderBottomWidth = `${elementBorderEnd}px`
    }
  }

  setText($('#styleInfo'), `已应用样式：container(padding ${containerPaddingStart}/${containerPaddingEnd}, border ${containerBorderStart}/${containerBorderEnd}) | item(margin ${elementMarginStart}/${elementMarginEnd}, border ${elementBorderStart}/${elementBorderEnd})`)
}

function getTargetElement() {
  const index = $('#targetIndex').value
  return document.querySelector(`#container .item[data-index="${index}"]`)
}

function pretty(obj) {
  return JSON.stringify(obj, null, 2)
}

function waitForScrollEnd(container, axis, timeoutMs = 1500) {
  return new Promise(resolve => {
    const key = axis === 'x' ? 'scrollLeft' : 'scrollTop'
    let last = container[key]
    let stableCount = 0
    const start = Date.now()

    const timer = setInterval(() => {
      const now = container[key]
      if (Math.abs(now - last) < 0.5) stableCount += 1
      else stableCount = 0

      last = now
      if (stableCount >= 4 || Date.now() - start > timeoutMs) {
        clearInterval(timer)
        resolve()
      }
    }, 50)
  })
}

async function doScroll(times) {
  const container = $('#container')
  const target = getTargetElement()
  if (!target) return

  const options = readOptions()
  const result1 = scrollAlignTo(target, container, options)
  if (options.debug) setText($('#debugOut'), pretty(result1))
  setText($('#resultLine'), `调用完成：target=${result1.target.toFixed(2)} maxScroll=${result1.maxScroll.toFixed(2)} axis=${result1.axis}`)

  await waitForScrollEnd(container, result1.axis)

  if (times === 2) {
    const result2 = scrollAlignTo(target, container, options)
    await waitForScrollEnd(container, result2.axis)

    if (options.debug) {
      setText($('#debugOut2'), pretty(result2))
    }
    setText($('#resultLine2'), `第二次调用：target=${result2.target.toFixed(2)} maxScroll=${result2.maxScroll.toFixed(2)} axis=${result2.axis}`)
  } else {
    setText($('#debugOut2'), '')
    setText($('#resultLine2'), '')
  }
}

function resetScroll() {
  const container = $('#container')
  container.scrollTo({ left: 0, top: 0, behavior: 'auto' })
  setText($('#resultLine'), '已重置 scroll 位置')
  setText($('#resultLine2'), '')
  setText($('#debugOut'), '')
  setText($('#debugOut2'), '')
}

function randomPick() {
  const sel = $('#targetIndex')
  const opts = [...sel.querySelectorAll('option')]
  if (!opts.length) return
  const idx = Math.floor(Math.random() * opts.length)
  sel.value = opts[idx].value
}

function init() {
  // 默认开关：忽略父padding、忽略子margin、忽略子border
  $('#ignoreContainerPadding').checked = true
  $('#ignoreElementMargin').checked = true
  $('#ignoreElementBorder').checked = true

  // 默认值（可覆盖对称/不对称）
  $('#containerPaddingStart').value = '16'
  $('#containerPaddingEnd').value = '32'
  $('#containerBorderStart').value = '2'
  $('#containerBorderEnd').value = '8'

  $('#elementMarginStart').value = '10'
  $('#elementMarginEnd').value = '4'
  $('#elementBorderStart').value = '6'
  $('#elementBorderEnd').value = '2'

  applyDemoLayout($('#direction').value)
  applyBoxStyles()

  $('#direction').addEventListener('change', () => {
    applyDemoLayout($('#direction').value)
    applyBoxStyles()
    resetScroll()
  })

  $('#applyStyle').addEventListener('click', () => {
    applyBoxStyles()
    resetScroll()
  })

  $('#scrollOnce').addEventListener('click', () => doScroll(1))
  $('#scrollTwice').addEventListener('click', () => doScroll(2))
  $('#reset').addEventListener('click', resetScroll)
  $('#random').addEventListener('click', () => {
    randomPick()
    resetScroll()
  })
}

window.addEventListener('DOMContentLoaded', init)
