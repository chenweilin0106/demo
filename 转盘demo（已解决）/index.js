const arrow = document.querySelector('.arrow')
const arr = [
    { id: 1, name: 'A', deg: 60 },
    { id: 2, name: 'B', deg: 120 },
    { id: 3, name: 'C', deg: 180 },
    { id: 4, name: 'D', deg: 240 },
    { id: 5, name: 'E', deg: 300 },
    { id: 6, name: 'F', deg: 360 }
]
const rdm = 720
let diff = 0
arrow.addEventListener('click', () => {
    const randomID = Math.floor(Math.random() * 6 + 1)
    console.log(Math.floor(Math.random() * 6 + 1))
    const lotteryRes = arr.find(item => item.id == randomID).deg
    console.log(lotteryRes)
    const resDeg = lotteryRes + rdm + diff
    // arrow.style = 'pointer-events: none;'
    arrow.style.transform = `rotate(${resDeg}deg)`
    arrow.style.pointerEvents = 'none'
    diff = resDeg + (360 - lotteryRes)
})

arrow.addEventListener('transitionstart', () => {
    // console.log(123)
    // arrow.style = 'pointer-events: none;'
})

arrow,addEventListener('transitionend', () => {
    arrow.style.pointerEvents = 'auto'
})