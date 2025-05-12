// 腾讯混元网站JavaScript功能

// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 初始化标签切换功能
    initTabSwitching();
    
    // 初始化滚动动画
    initScrollAnimations();
    
    // 初始化其他交互效果
    initInteractions();
});

// 标签切换功能
function initTabSwitching() {
    // 获取所有标签按钮
    const tabButtons = document.querySelectorAll('.tab-btn');
    // 获取所有标签内容区域
    const tabContents = document.querySelectorAll('.tab-content');
    
    // 为每个标签按钮添加点击事件
    tabButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // 移除所有按钮的活动状态
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // 隐藏所有内容区域
            tabContents.forEach(content => content.classList.remove('active'));
            
            // 激活当前点击的按钮
            button.classList.add('active');
            // 显示对应的内容区域
            tabContents[index].classList.add('active');
        });
    });
}

// 滚动动画
function initScrollAnimations() {
    // 获取所有需要添加动画的元素
    const animatedElements = document.querySelectorAll('.feature-card, .solution-content, .case-card');
    
    // 创建IntersectionObserver实例
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // 当元素进入视口时
            if (entry.isIntersecting) {
                // 添加显示动画类
                entry.target.classList.add('animate-in');
                // 元素显示后，不再观察
                observer.unobserve(entry.target);
            }
        });
    }, {
        // 设置元素多少比例进入视口时触发回调
        threshold: 0.1
    });
    
    // 开始观察所有元素
    animatedElements.forEach(element => {
        observer.observe(element);
        // 初始设置为隐藏状态
        element.classList.add('animate-hidden');
    });
}

// 其他交互效果
function initInteractions() {
    // 导航菜单悬停效果增强
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            if (!item.classList.contains('active')) {
                item.classList.add('hover-effect');
            }
        });
        
        item.addEventListener('mouseleave', () => {
            item.classList.remove('hover-effect');
        });
    });
    
    // 为CTA按钮添加脉动效果
    const ctaButtons = document.querySelectorAll('.cta .btn-primary');
    ctaButtons.forEach(button => {
        button.classList.add('pulse-effect');
    });
    
    // 页面滚动时固定导航栏效果优化
    let lastScrollTop = 0;
    let scrollTimer = null;
    let isScrolling = false;
    
    // 使用防抖来优化滚动处理
    window.addEventListener('scroll', () => {
        const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 如果还没有设置滚动状态，立即设置
        if (!isScrolling) {
            handleScrollState(currentScrollTop);
        }
        
        // 清除之前的计时器
        clearTimeout(scrollTimer);
        
        // 设置新的计时器，滚动结束后200ms再次检查状态
        scrollTimer = setTimeout(() => {
            handleScrollState(currentScrollTop);
            isScrolling = false;
        }, 200);
        
        lastScrollTop = currentScrollTop;
    });
    
    // 处理滚动状态
    function handleScrollState(currentScrollTop) {
        const header = document.querySelector('.header');
        isScrolling = true;
        
        // 增加滚动阈值，避免微小滚动触发状态变化
        if (currentScrollTop > 100) {
            header.classList.add('scrolled');
            
            // 只有在明显向下滚动且超过阈值时才添加scrolled-down
            if (currentScrollTop > lastScrollTop + 20 && currentScrollTop > 150) {
                header.classList.add('scrolled-down');
            } 
            // 只有在明显向上滚动时才移除scrolled-down
            else if (lastScrollTop > currentScrollTop + 20) {
                header.classList.remove('scrolled-down');
            }
        } else {
            // 回到顶部附近时，移除所有滚动状态
            header.classList.remove('scrolled');
            header.classList.remove('scrolled-down');
        }
    }
    
    // 为英雄区域添加视差滚动效果
    window.addEventListener('scroll', () => {
        const heroImage = document.querySelector('.hero-image');
        const scrollValue = window.pageYOffset;
        
        if (heroImage) {
            // 降低视差效果的倍率，使运动更加平滑
            heroImage.style.transform = `translateY(${scrollValue * 0.05}px)`;
        }
    });
} 