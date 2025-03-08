// 判断当前设备环境
const isMobile = (function() {
    const result = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    return () => result
})()

// 工具函数
const utils = {
    clamp: (value, min, max) => Math.min(Math.max(value, min), max), // 限制数值在指定范围内
    getEventObject: e => isMobile() ? e.touches[0] : e // 获取事件对象
}

// 存储拖拽父元素
const parentElements = new WeakMap()

// 清理事件监听
function removeEventListeners(el) {
    
    const { __dragStart } = el
    if (__dragStart) {
        if (isMobile()) {
            el.removeEventListener('touchstart', __dragStart)
        } else {
            el.removeEventListener('mousedown', __dragStart)
        }
        el.__dragStart = null
    }
}

function drag(el, binding) {
    const { value = {} } = binding
    const { 
        enable = true, 
        parentSelector, // 选择器 .box #box
        zIndex = 1,
        onDragStart,
        onDragEnd,
        onDragMove,
        direction = 'both' // horizontal-水平 vertical-垂直 both-自由
    } = value

    let parentEl = document.querySelector(parentSelector) || document.body
    let dragElements = parentElements.get(parentEl) || [];
    if (!dragElements.includes(el)) {
        dragElements.push(el);
        parentElements.set(parentEl, dragElements);
    }
    if (!parentEl.style.position) parentEl.classList.add('position-relative')
    parentEl.style.transform = 'translateZ(0)'

    // 缓存常用值
    const cache = { halfWidth: el.offsetWidth / 2, halfHeight: el.offsetHeight / 2, parentRect: parentEl.getBoundingClientRect() }

    
    let isDragging = enable
    let startX = 0
    let startY = 0
    let initialX = 0
    let initialY = 0
    
    // 边界检查函数
    function checkBoundary(x, y) {
        return {
            x: utils.clamp(x, cache.halfWidth, cache.parentRect.width - cache.halfWidth),
            y: utils.clamp(y, cache.halfHeight, cache.parentRect.height - cache.halfHeight)
        }
    }

    // 更新元素位置
    function updatePosition(x, y) {
        requestAnimationFrame(() => {
            const pos = checkBoundary(x, y)
            if (direction !== 'vertical') el.style.left = (pos.x - cache.halfWidth) + 'px'
            if (direction !== 'horizontal') el.style.top = (pos.y - cache.halfHeight) + 'px'
            onDragMove?.(pos)
        })
    }

    // 开始拖拽
    function handleStart(e) {
        if (!isDragging) return
        e.preventDefault()
        e.stopPropagation()

        el.classList.add('position-absolute', 'is-dragging')
        el.style.zIndex = zIndex

        const event = utils.getEventObject(e)

        
        startX = event.clientX - cache.parentRect.left
        startY = event.clientY - cache.parentRect.top
        initialX = el.offsetLeft + cache.halfWidth
        initialY = el.offsetTop + cache.halfHeight

        onDragStart?.({ x: startX, y: startY })
        
        if (isMobile()) {
            parentEl.addEventListener('touchmove', handleMove)
            parentEl.addEventListener('touchend', handleEnd)
        } else {
            parentEl.addEventListener('mousemove', handleMove)
            parentEl.addEventListener('mouseup', handleEnd)
        }
    }
    
    // 拖拽中
    function handleMove(e) {
        if (!isDragging) return
        e.preventDefault()
        e.stopPropagation()
        
        const event = utils.getEventObject(e)
        const deltaX = event.clientX - cache.parentRect.left - startX
        const deltaY = event.clientY - cache.parentRect.top - startY
        
        updatePosition(initialX + deltaX, initialY + deltaY)
    }
    
    // 结束拖拽
    function handleEnd(e) {
        e.preventDefault()
        e.stopPropagation()

        isDragging = false
        el.classList.remove('is-dragging')
        
        if (isMobile()) {
            parentEl.removeEventListener('touchmove', handleMove)
            parentEl.removeEventListener('touchend', handleEnd)
        } else {
            parentEl.removeEventListener('mousemove', handleMove)
            parentEl.removeEventListener('mouseup', handleEnd)
        }
        
        onDragEnd?.({ x: el.offsetLeft + cache.halfWidth, y: el.offsetTop + cache.halfHeight })
    }
    
    // 移除事件监听
    removeEventListeners(el)
    
    // 添加新的事件监听
    if (isMobile()) {
        el.addEventListener('touchstart', handleStart)
    } else {
        el.addEventListener('mousedown', handleStart)
    }
    el.__dragStart = handleStart
}

export default {
    bind(el, binding) { drag(el, binding) },
    update(el, binding) { drag(el, binding) },
    unbind(el, binding) {
        const { value: { parentSelector } = {} } = binding
        const parentEl = document.querySelector(parentSelector) || document.body
        let dragElements = parentElements.get(parentEl)
        if (dragElements) {
            dragElements = dragElements.filter(item => item !== el)
            if (dragElements.length === 0) {
                parentElements.delete(parentEl)
            } else {
                parentElements.set(parentEl, dragElements)
            }
        }
        removeEventListeners(el)
        el.__dragStart = null
    }
}