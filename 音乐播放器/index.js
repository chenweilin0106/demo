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
  progressBar.value = 0
  progressArea.style.backgroundSize = `${progressBar.value}% 100%`
  currTime.innerHTML = formateMusicTime(music.currentTime)
  void imgBox.offsetWidth
  requestAnimationFrame(() => {
    if (playPauseBtn.classList.contains('play')) playMusic()
  })
}

function formateMusicTime(sec) {
  let min = Math.floor(sec / 60)
  let secound = Math.floor(sec % 60)
  return `${min}:${secound < 10 ? `0${secound}` : secound}`
}

music.addEventListener('timeupdate', e => {
  console.log(e.target.currentTime)
  currTime.innerHTML = formateMusicTime(e.target.currentTime)
  let progressWidth = (e.target.currentTime / e.target.duration) * 100
  if (isNaN(progressWidth)) progressWidth = 0
  progressBar.value = progressWidth
  progressArea.style.backgroundSize = `${progressBar.value}% 100%`
})

music.addEventListener('loadedmetadata', () => {
  const duration = music.duration
  ttlTime.innerHTML = formateMusicTime(duration)
})

music.addEventListener('ended', () => {
  getNextIndex()
  switchMusic()
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

progressBar.addEventListener('input', e => {
  progressArea.style.backgroundSize = `${e.target.value}% 100%`
  music.currentTime = (e.target.value / 100) * music.duration
  // 手动触发 timeupdate 事件
  const timeUpdateEvent = new Event('timeupdate')
  music.dispatchEvent(timeUpdateEvent)
})
