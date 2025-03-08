const musicName = document.querySelector('.music-name')
const artistName = document.querySelector('.artist-name')
const img = document.querySelector('.music-img img')
const imgBox = document.querySelector('.music-img')
const music = document.querySelector('#music')
const playPauseBtn = document.querySelector('.play-pause-btn')
const currTime = document.querySelector('.current-time')
const ttlTime = document.querySelector('.total-time')
const progressArea = document.querySelector('.progress-area')
const progressBar = document.querySelector('.progress-bar')
const fastRewind = document.querySelector('.fast_rewind')
const fastForward = document.querySelector('.fast_forward')
const progressPoint = document.querySelector('.progress-point')

let musicIndex = 1
let isMoving = false

window.addEventListener('load', () => {
  loadMusic(musicIndex)
})

function loadMusic() {
  musicName.innerHTML = allMusic[musicIndex - 1].name
  artistName.innerHTML = allMusic[musicIndex - 1].artist
  img.src = allMusic[musicIndex - 1].img
  music.src = allMusic[musicIndex - 1].src
}

playPauseBtn.addEventListener('click', () => {
  if (playPauseBtn.classList.contains('play')) {
    pauseMusic()
  } else {
    playMusic()
  }
})

function playMusic() {
  playPauseBtn.classList.replace('pause', 'play')
  playPauseBtn.querySelector('.material-icons').innerHTML = 'pause'
  if (!imgBox.classList.contains('rotate')) {
    imgBox.classList.add('rotate')
  }
  imgBox.style.animationPlayState = 'running'
  music.play()
}

function pauseMusic() {
  playPauseBtn.classList.replace('play', 'pause')
  playPauseBtn.querySelector('.material-icons').innerHTML = 'play_arrow'
  imgBox.style.animationPlayState = 'paused'
  music.pause()
}

function switchMusic() {
  imgBox.classList.remove('rotate')
  loadMusic(musicIndex)
  void imgBox.offsetWidth
  requestAnimationFrame(() => {
    if (playPauseBtn.classList.contains('play')) playMusic()
    progressPoint.style.left = '0px'
    progressBar.style.width = '0px'
  })
}

function formateMusicTime(sec) {
  let min = Math.floor(sec / 60)
  let secound = Math.floor(sec % 60)
  return `${min}:${secound < 10 ? `0${secound}` : secound}`
}

music.addEventListener('timeupdate', e => {
  const currentTime = e.target.currentTime
  currTime.innerHTML = formateMusicTime(currentTime)
  if (!e.target.duration) return
  progressBar.style.width = `${(currentTime / e.target.duration) * 100}%`
  if (isMoving) return
  progressPoint.style.left = `${
    (currentTime / e.target.duration) * progressArea.clientWidth
  }px`
})

music.addEventListener('loadedmetadata', () => {
  const duration = music.duration
  ttlTime.innerHTML = formateMusicTime(duration)
})

music.addEventListener('ended', () => {
  getNextIndex()
  switchMusic()
})

progressArea.addEventListener('click', e => {
  jumpTo(e.offsetX)
  progressPoint.style.left = `${e.offsetX}px`
})

fastRewind.addEventListener('click', () => {
  const lastIndex = musicIndex - 1
  musicIndex = lastIndex < 1 ? allMusic.length : lastIndex
  switchMusic()
})

fastForward.addEventListener('click', () => {
  getNextIndex()
  switchMusic()
})

function getNextIndex() {
  musicIndex = musicIndex + 1 > allMusic.length ? 1 : musicIndex + 1
}

function jumpTo(distance) {
  const progressWidth = progressArea.clientWidth
  const songDuration = music.duration
  music.currentTime = (distance / progressWidth) * songDuration
}

progressPoint.addEventListener('click', e => {
  e.preventDefault()
  e.stopPropagation()
})

progressPoint.addEventListener('mousedown', e => {
  e.preventDefault()
  e.stopPropagation()
  isMoving = true
  window.addEventListener('mousemove', pointMove)
  window.addEventListener('mouseup', () => {
    e.preventDefault()
    e.stopPropagation()
    isMoving = false
    window.removeEventListener('mousemove', pointMove)
    jumpTo(progressPoint.offsetLeft)
  })
})

function pointMove(e) {
  e.preventDefault()
  e.stopPropagation()
  const progressRect = progressArea.getBoundingClientRect()
  if (e.pageX - progressRect.left <= 0) {
    progressPoint.style.left = '0px'
  } else if (e.pageX - progressRect.left >= progressArea.clientWidth) {
    progressPoint.style.left = `${progressArea.clientWidth}px`
  } else {
    progressPoint.style.left = `${e.pageX - progressRect.left}px`
  }
}
