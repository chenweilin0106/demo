;(function () {
  const typeTarget = document.getElementById('typeTarget')
  const sourceEl = document.getElementById('sourceText')
  const skipBtn = document.getElementById('skipBtn')

  if (!typeTarget || !sourceEl) return

  // 点击“跳过动画”：移除播放态，让文字立刻回到最终态（直接可见）
  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      typeTarget.classList.remove('is-prep')
      typeTarget.classList.remove('is-playing')
      skipBtn.disabled = true
    })
  }

  // 参考：/home/dcw220/projects/demo/components/js/tool.js 的 textLengthLimit
  // 目的：防止拆坏 ZWJ 表情、国旗、肤色修饰符等
  // 注意：不要用 split('') / Array.from 直接拆，这里用正则尽量保证“一个可见字形 = 一个数组元素”
  // eslint-disable-next-line no-misleading-character-class
  const RE_UNICODE =
    /\ud83c[\udffb-\udfff](?=\ud83c[\udffb-\udfff])|(?:[^\ud800-\udfff][\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff\u1ab0-\u1aff\u1dc0-\u1dff]?|[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff\u1ab0-\u1aff\u1dc0-\u1dff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff\u1ab0-\u1aff\u1dc0-\u1dff]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff\u1ab0-\u1aff\u1dc0-\u1dff]|\ud83c[\udffb-\udfff])?)*/g

  function splitUnicode(text) {
    // 统一换行符，避免 \r\n 在拆分时产生意外字符
    const str = String(text).replace(/\r\n?/g, '\n')
    return str.match(RE_UNICODE) || []
  }

  // 文本来源：index.html 里 type="text/plain" 的 script 节点
  const text = sourceEl.textContent.trim()
  const chars = splitUnicode(text)

  // 每个“字”的间隔（越小越快）
  const delayStepMs = 55
  const fragment = document.createDocumentFragment()
  let visibleIndex = 0

  for (let i = 0; i < chars.length; i++) {
    const ch = chars[i]
    if (ch === '\n') {
      // 换行用 <br> 保留排版；不计入 visibleIndex（不参与逐字动画序列）
      fragment.appendChild(document.createElement('br'))
      continue
    }

    const span = document.createElement('span')
    span.className = 'char'
    // 把延迟写到 style 变量里，CSS 用 animation-delay: var(--d) 控制顺序
    span.style.setProperty('--d', `${visibleIndex * delayStepMs}ms`)
    span.textContent = ch

    if (ch === ' ') span.classList.add('space')
    if (/^[,.;!?，。；！？、：:（）()【】\[\]「」《》<>…—-]$/.test(ch)) span.classList.add('punct')

    fragment.appendChild(span)
    visibleIndex++
  }

  typeTarget.textContent = ''
  typeTarget.appendChild(fragment)

  // 下一帧再加 class，确保初始样式先落地，动画能稳定触发（避免首帧就直接是最终态）
  requestAnimationFrame(() => {
    typeTarget.classList.remove('is-prep')
    typeTarget.classList.add('is-playing')
  })
})()
