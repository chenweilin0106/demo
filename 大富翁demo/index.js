const mark = document.querySelector('.mark')
const domArr = document.querySelectorAll('.item')
const dice = document.querySelector('.dice')
const roll = document.querySelector('.roll')
roll.style.display = 'none'
const start = document.querySelector('.start')
const reset = document.querySelector('.reset')
reset.style.display = 'none'

let currentPosition = 1
let isMoving = false
let rollResult = 0
let isStart = false
let isGameOver = false
const arr = createArr()

function createArr() {
  const arr = []
  for (let i = 1; i < 29; i++) {
    arr.push({ v: i, id: i })
  }
  return arr
}

setStartPosition()

function setStartPosition() {
  const startDom = domArr[currentPosition - 1]
  const width = startDom.offsetWidth
  const top = startDom.offsetTop
  const left = startDom.offsetLeft
  mark.style.left = left + width / 2 - mark.offsetWidth / 2 + 'px'
  mark.style.top = top + width / 2 - mark.offsetHeight / 2 + 'px'
}

domArr.forEach((el, index) => {
  el.innerHTML = arr[index].v
  el.id = arr[index].id
  setBgc(el)
})

function setBgc(el) {
  const r = Math.round(Math.random() * 256)
  const g = Math.round(Math.random() * 256)
  const b = Math.round(Math.random() * 256)
  el.style.background = 'rgb(' + r + ',' + g + ',' + b + ')'
}

function createMoveArr(moveNum) {
  const realMoveNum = currentPosition + moveNum > 28 ? 28 - currentPosition + 1 : moveNum
  const moveArr = []
  for (let i = 1; i <= realMoveNum; i++) {
    if (currentPosition + i == 29 ) {
      moveArr.push('item_1')
      isGameOver = true
     break
    }
    moveArr.push(`item_${currentPosition + i}`)
  }
  console.log(moveArr)
  readyMove(moveArr)
}

function readyMove(arr = []) {
  if (arr.length === 0) return
  if (isMoving) return
  isMoving = true
  let doms = arr.map((item) => document.querySelector(`.${item}`))
  let count = 0
  let timer = setInterval(() => {
    if (count === doms.length) {
      moveEnd()
      clearInterval(timer)
      doms = null
      return
    }
    moveMark(doms[count])
    count++
  }, 500);
}

function moveMark(dom) {
  const width = dom.offsetWidth
  const top = dom.offsetTop
  const left = dom.offsetLeft
  mark.style.left = left + width / 2 - mark.offsetWidth / 2 + 'px'
  mark.style.top = top + width / 2 - mark.offsetHeight / 2 + 'px'
}

function moveEnd () {
  isMoving = false
  currentPosition = rollResult + currentPosition > 28 ? 1 : rollResult + currentPosition
  if (isGameOver) {
    alert('游戏结束')
    reset.click()
  }
}

let isAnimating = false

start.addEventListener('click', () => {
  const res = confirm('是否开始游戏')
  if (!res) return
  isStart = true
  roll.style.display = 'block'
  start.style.display = 'none'
  reset.style.display = 'block'
})

reset.addEventListener('click', () => {
  const res = confirm('是否重新开始游戏')
  if (!res) return
  dice.className = 'dice'
  isStart = false
  setStartPosition()
  currentPosition = 1
  start.style.display = 'block'
  roll.style.display = 'none'
  reset.style.display = 'none'
})

roll.addEventListener('click', () => {
  if (!isStart) return alert('请先点击开始游戏')
  if (isGameOver) return reset.click()
  if (isAnimating) return
  isAnimating = true
  dice.className = 'dice'
  rollResult = Math.floor(Math.random() * 6) + 1
  void dice.offsetHeight
  dice.classList.add(`rotateClass_${rollResult}`)
})
dice.addEventListener('animationend', () => {
  isAnimating = false
  createMoveArr(rollResult)
})
