const arrow = document.querySelector('.arrow')
const arr = [
    { id: 1, name: 'A', deg: 60 },
    { id: 2, name: 'B', deg: 120 },
    { id: 3, name: 'C', deg: 180 },
    { id: 4, name: 'D', deg: 240 },
    { id: 5, name: 'E', deg: 300 },
    { id: 6, name: 'F', deg: 360 }
]
const baseDeg = 1080 // 转盘基础角度
let lotteryRes = 0 // 中奖角度
arrow.addEventListener('click', () => {
    const randomID = Math.floor(Math.random() * 6 + 1)
    console.log('随机ID:', randomID)
    document.documentElement.style.setProperty('--startDeg', `${lotteryRes}deg`)
    const selectedItem = arr.find(item => item.id == randomID)
    let diff = Math.floor(Math.random() * 61) - 30 // 随机角度
    lotteryRes = selectedItem.deg + diff
    console.log('中奖角度:', lotteryRes)
    const resDeg = lotteryRes + baseDeg

    // 更新CSS变量控制转盘旋转角度
    document.documentElement.style.setProperty('--endDeg', `${resDeg}deg`)
    arrow.style.pointerEvents = 'none'
    arrow.classList.add('arrowAnimation')
})

arrow.addEventListener('animationstart', () => { })

arrow.addEventListener('animationend', () => {
    arrow.style.pointerEvents = 'auto'
    arrow.style.transform = `rotate(${lotteryRes}deg)`
    arrow.classList.remove('arrowAnimation')
})