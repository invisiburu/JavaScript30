/** @type {HTMLVideoElement} */
const player = document.querySelector('video')
/** @type {HTMLDivElement} */
const playerWrp = document.querySelector('.player')
/** @type {HTMLDivElement} */
const progressBar = document.querySelector('div.progress')
/** @type {HTMLDivElement} */
const progressBarFilled = document.querySelector('div.progress__filled')
/** @type {HTMLButtonElement} */
const toggleBtn = document.querySelector('button.player__button.toggle')
/** @type {HTMLInputElement} */
const volumeRange = document.querySelector('input.player__slider[name=volume]')
/** @type {HTMLInputElement} */
const playbackRateRange = document.querySelector('input.player__slider[name=playbackRate]')
/** @type {HTMLButtonElement[]} */
const skipBtns = document.querySelectorAll('button.player__button[data-skip]')

function togglePlay () {
  if (player.paused) {
    player.play()
    toggleBtn.innerText = '⏸'
  } else {
    player.pause()
    toggleBtn.innerText = '►'
  }
}

function changePlaybackRate () {
  const rate = playbackRateRange.valueAsNumber
  player.playbackRate = rate
}

function changeVolume () {
  const volume = volumeRange.valueAsNumber
  player.volume = volume
}

/** @param {Event} e */
function skipSeconds (e) {
  /** @type {HTMLButtonElement} */
  const btn = e.target
  const amount = Number(btn.dataset.skip)
  player.currentTime += amount
  updateProgressBarFilled()
}

function updateProgressBarFilled (progress) {
  progress = progress || ((player.currentTime / player.duration) * 100)
  progressBarFilled.style.flexBasis = `${progress || 0}%`
}

/** @param {MouseEvent} event */
let progressFactor = 1
function fastForward (event) {
  progressFactor = event.offsetX / progressBar.clientWidth
  player.currentTime = player.duration * progressFactor
  updateProgressBarFilled(progressFactor * 100)
}

function enableFastForward () {
  stopTicking()
  playerWrp.addEventListener('mousemove', fastForward)
  document.addEventListener('mouseup', () => {
    playerWrp.removeEventListener('mousemove', fastForward)
    startTicking()
  })
}

function tick () {
  updateProgressBarFilled()
}

let tickerId
function startTicking () { tickerId = setInterval(() => { tick() }, 500) }
function stopTicking () { clearInterval(tickerId) }

document.addEventListener('keydown', e => e.code === 'Space' && togglePlay())
toggleBtn.addEventListener('click', () => togglePlay())
playbackRateRange.addEventListener('input', () => changePlaybackRate())
volumeRange.addEventListener('input', () => changeVolume())
skipBtns.forEach(el => el.addEventListener('click', skipSeconds))
progressBar.addEventListener('mousedown', enableFastForward)
progressBar.addEventListener('click', fastForward)

updateProgressBarFilled(0)
startTicking()
