class VirtualScroll {
    constructor(options) {
        // 基础配置
        this.container = options.container;
        this.totalItems = options.totalItems || 1000;
        this.itemWidth = options.itemWidth || 110;
        this.visibleItems = options.visibleItems || 10;
        this.buffer = options.buffer || 5;
        this.renderCallback = options.renderCallback || this.defaultRenderCallback;
        this.debug = options.debug || false;

        // 元素池管理
        this.elementPool = [];
        this.renderedItems = new Map();
        
        // 滚动相关计算
        this.containerWidth = window.innerWidth;
        this.actualVisibleItems = Math.ceil(this.containerWidth / this.itemWidth);
        this.maxItems = this.actualVisibleItems + (this.buffer * 2);
        
        // 使用三倍总宽度作为虚拟滚动宽度
        this.totalWidth = this.totalItems * this.itemWidth;
        this.virtualScrollWidth = this.totalWidth * 3;
        
        // 初始位置设置在中间区域
        this.currentScrollLeft = this.totalWidth;
        this.lastScrollLeft = this.currentScrollLeft;
        
        // 性能优化
        this.rafId = null;
        this.isScrolling = false;
        this.scrollTimeout = null;
        this.lastRenderRange = { start: 0, end: 0 };
        
        // 检查passive支持
        this.passiveSupported = this.checkPassiveSupported();
        
        // 绑定方法的this指向
        this.handleScroll = this.handleScroll.bind(this);
        this.handleResize = this.handleResize.bind(this);
        
        this.init();
    }

    // 检查是否支持passive事件监听
    checkPassiveSupported() {
        let passiveSupported = false;
        
        try {
            const options = {
                get passive() {
                    passiveSupported = true;
                    return false;
                }
            };
            
            window.addEventListener('test', null, options);
            window.removeEventListener('test', null, options);
        } catch (err) {
            passiveSupported = false;
        }
        
        return passiveSupported;
    }

    init() {
        // 设置容器样式
        this.container.style.position = 'relative';
        this.container.style.width = `${this.virtualScrollWidth}px`;
        
        // 添加事件监听，根据浏览器支持情况使用passive
        const scrollOptions = this.passiveSupported ? { passive: true } : false;
        this.container.parentElement.addEventListener('scroll', this.handleScroll, scrollOptions);
        
        // resize事件不需要passive
        window.addEventListener('resize', this.handleResize);
        
        // 初始渲染
        this.render();
        
        // 设置初始滚动位置到中间，确保可以双向滚动
        this.container.parentElement.scrollLeft = this.currentScrollLeft;
    }

    handleResize() {
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
        
        this.rafId = requestAnimationFrame(() => {
            this.containerWidth = window.innerWidth;
            this.actualVisibleItems = Math.ceil(this.containerWidth / this.itemWidth);
            this.maxItems = this.actualVisibleItems + (this.buffer * 2);
            this.render();
        });
    }

    handleScroll(e) {
        if (this.isScrolling) return;
        this.isScrolling = true;
        
        const scrollLeft = e.target.scrollLeft;
        const containerWidth = e.target.clientWidth;
        
        // 如果滚动位置变化不大，不触发更新
        if (Math.abs(scrollLeft - this.lastScrollLeft) < this.itemWidth / 2) {
            this.isScrolling = false;
            return;
        }
        
        this.lastScrollLeft = scrollLeft;
        this.currentScrollLeft = scrollLeft;
        
        // 检查是否需要重置位置
        let needsPositionReset = false;
        let newScrollLeft = scrollLeft;
        
        // 修改重置逻辑，增加缓冲区
        const resetBuffer = this.itemWidth * this.buffer;
        if (scrollLeft <= resetBuffer) {
            newScrollLeft = this.totalWidth;
            needsPositionReset = true;
        } else if (scrollLeft >= this.virtualScrollWidth - containerWidth - resetBuffer) {
            newScrollLeft = this.totalWidth * 2;
            needsPositionReset = true;
        }
        
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
        
        this.rafId = requestAnimationFrame(() => {
            if (needsPositionReset) {
                this.currentScrollLeft = newScrollLeft;
                this.container.parentElement.scrollLeft = newScrollLeft;
            }
            this.render();
            this.isScrolling = false;
        });
    }

    cleanupItems() {
        // 清理不可见区域的元素
        const visibleStart = Math.floor(this.currentScrollLeft / this.itemWidth) - this.buffer;
        const visibleEnd = Math.ceil((this.currentScrollLeft + this.containerWidth) / this.itemWidth) + this.buffer;
        
        this.renderedItems.forEach((item, index) => {
            if (index < visibleStart || index > visibleEnd) {
                if (item.parentElement) {
                    item.parentElement.removeChild(item);
                }
                this.elementPool.push(item);
                this.renderedItems.delete(index);
            }
        });
    }

    defaultRenderCallback(item, index) {
        item.textContent = `Item ${index + 1}`;
    }

    getOrCreateItem() {
        if (this.elementPool.length > 0) {
            const item = this.elementPool.pop();
            item.style.visibility = 'visible';
            return item;
        }
        const item = document.createElement('div');
        item.className = 'item';
        item.style.position = 'absolute';
        return item;
    }

    calculateRenderRange(scrollLeft, containerWidth) {
        // 计算理论上的起始和结束索引
        const theoreticalStart = Math.floor(scrollLeft / this.itemWidth);
        const theoreticalVisible = Math.ceil(containerWidth / this.itemWidth);
        
        const start = Math.max(0, theoreticalStart - this.buffer);
        const end = Math.min(
            theoreticalStart + theoreticalVisible + this.buffer,
            start + this.maxItems
        );
        
        return { start, end };
    }

    render() {
        const containerWidth = this.container.parentElement.clientWidth;
        const scrollLeft = this.currentScrollLeft;
        
        const { start: startIndex, end: endIndex } = this.calculateRenderRange(scrollLeft, containerWidth);
        
        if (startIndex === this.lastRenderRange.start && 
            endIndex === this.lastRenderRange.end &&
            Math.abs(scrollLeft - this.lastScrollLeft) < this.itemWidth / 2) {
            return;
        }
        
        const newItems = new Map();
        
        for (let i = startIndex; i < endIndex; i++) {
            // 计算显示索引
            const displayIndex = ((i % this.totalItems) + this.totalItems) % this.totalItems;
            
            // 计算元素的绝对位置
            const absolutePosition = i * this.itemWidth;
            
            let item = this.renderedItems.get(i);
            
            if (!item) {
                item = this.getOrCreateItem();
                item.style.left = `${absolutePosition}px`;
                this.renderCallback(item, displayIndex);
            } else if (item.getAttribute('data-index') !== displayIndex.toString()) {
                this.renderCallback(item, displayIndex);
            }
            
            // 只在必要时更新位置
            if (item.style.left !== `${absolutePosition}px`) {
                item.style.left = `${absolutePosition}px`;
            }
            
            item.setAttribute('data-index', displayIndex);
            newItems.set(i, item);
            
            if (!item.parentElement) {
                this.container.appendChild(item);
            }
        }
        
        // 清理不需要的元素
        this.renderedItems.forEach((item, index) => {
            if (!newItems.has(index)) {
                if (item.parentElement) {
                    item.parentElement.removeChild(item);
                }
                this.elementPool.push(item);
            }
        });
        
        this.renderedItems = newItems;
        this.lastRenderRange = { start: startIndex, end: endIndex };
        
        if (this.debug) {
            console.log(`Rendered items from ${startIndex} to ${endIndex}, display indices:`, 
                Array.from(newItems.values()).map(item => item.getAttribute('data-index')));
        }
    }

    destroy() {
        // 清理事件监听，需要保持和添加时相同的选项
        const scrollOptions = this.passiveSupported ? { passive: true } : false;
        this.container.parentElement.removeEventListener('scroll', this.handleScroll, scrollOptions);
        window.removeEventListener('resize', this.handleResize);
        
        // 清理定时器和动画帧
        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
        }
        if (this.rafId) {
            cancelAnimationFrame(this.rafId);
        }
        
        // 清理DOM和数据
        this.container.innerHTML = '';
        this.elementPool = [];
        this.renderedItems.clear();
    }
}

// 初始化虚拟滚动
document.addEventListener('DOMContentLoaded', () => {
    const scrollContent = document.getElementById('scrollContent');
    new VirtualScroll({
        container: scrollContent,
        totalItems: 100,
        itemWidth: 110,
        visibleItems: Math.ceil(window.innerWidth / 110),
        buffer: 5,
        debug: true, // 开启调试模式
        renderCallback: (item, index) => {
            item.textContent = `Item ${index + 1}`;
        }
    });
}); 