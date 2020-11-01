function getHand (type = '') {
  const el = document.querySelector(`.hand.${type}-hand`)
  if (!(el instanceof HTMLElement)) return null
  return el
}

/** @param {HTMLElement} hand */
function applyHandRotate (hand, val) {
  if (val === 0) {
    function fixRotateBackGlitch () {
      const tr = hand.style.transition
      hand.style.transition = 'none'
      setTimeout(() => hand.style.transform = `rotate(0deg)`, 100)
      setTimeout(() => {
        hand.style.transition = tr
        hand.removeEventListener('transitionend', fixRotateBackGlitch)
      }, 150)
    }
    val = 360
    hand.addEventListener('transitionend', fixRotateBackGlitch)
  }
  hand.style.transform = `rotate(${val}deg)`
}

const sHand = getHand('second')
const mHand = getHand('min')
const hHand = getHand('hour')

const mHandOffsetFactor = 1 / 365 * 6
const hHandOffsetFactor = 1 / 365 * 30

function tick () {
  const d = new Date()

  const sDeg = d.getSeconds() * 6
  const mDeg = d.getMinutes() * 6
  const hDeg = (d.getHours() % 12) * 30

  applyHandRotate(sHand, sDeg)
  applyHandRotate(mHand, mDeg + sDeg * mHandOffsetFactor)
  applyHandRotate(hHand, hDeg + mDeg * hHandOffsetFactor)
}

tick()
setInterval(tick, 1000);
