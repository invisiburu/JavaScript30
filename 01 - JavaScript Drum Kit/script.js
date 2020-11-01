/** @typedef {{ keyEl: HTMLElement, audioEl: HTMLAudioElement }} DictEntry */

/** @returns {Object.<string, DictEntry>} */
function buildAudioDict () {
  const res = {}

  const keyElements = document.querySelectorAll('.key')
  for (const keyEl of keyElements) {
    const key = keyEl.getAttribute('data-key')
    const audioEl = document.querySelector(`audio[data-key="${key}"]`)
    if (audioEl instanceof HTMLAudioElement) res[key] = { keyEl, audioEl }
  }

  return res
}


const audioDict = buildAudioDict()
Object.values(audioDict)
  .forEach(({ keyEl }) => keyEl.addEventListener('transitionend', event => {
    if (event.propertyName !== 'transform') return
    /** @type {HTMLElement} */
    const element = event.target
    element.classList.remove('playing')
  }))

document.addEventListener('keydown', event => {
  const de = audioDict[event.which]
  if (!de) return
  de.keyEl.classList.add('playing')
  de.audioEl.currentTime = 0
  de.audioEl.play()
})
