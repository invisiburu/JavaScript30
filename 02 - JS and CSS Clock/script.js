function getHand (type = '') {
  const el = document.querySelector(`.hand.${type}-hand`)
  if (!(el instanceof HTMLElement)) return null
  el.style.transition = 'transform 100ms'
  el.style.transformOrigin = 'right center'
  return el
}

function getHandRotate (date = new Date(), handType = '') {
  switch (handType) {
    case 'h': return (date.getHours() % 12) * 12 + 90
    case 'm': return date.getMinutes() * 6 + 90
    case 's': return date.getSeconds() * 6 + 90
    case 'ms': return date.getMilliseconds() * 0.36 + 90
    default: return 0
  }
}

/** @param {HTMLElement} hand */
function applyHandRotate (hand, val) {
  if (!hand) return
  console.log(val)
  if (val === 90) {
    hand.style.transition = 'transform 0ms'
  }
  hand.style.transform = `rotate(${val}deg)`
}

const hHand = getHand('hour')
const mHand = getHand('min')
const sHand = getHand('second')

function tick () {
  const d = new Date()
  applyHandRotate(hHand, getHandRotate(d, 'h'))
  applyHandRotate(mHand, getHandRotate(d, 'm'))
  applyHandRotate(sHand, getHandRotate(d, 'ms'))
}

tick()
setInterval(tick, 100);
