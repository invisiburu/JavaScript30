

// document.addEventListener('keydown')
let lastCheckedElIdx
let isShift

/** @type {HTMLInputElement[]} */
const inputs = Array.from(document.querySelectorAll('input[type="checkbox"]'))

/** @param {Event} e */
function onCbChange (e) {
  /** @type {HTMLInputElement} */
  const el = e.target
  const idx = inputs.indexOf(el)
  if (isShift && typeof lastCheckedElIdx === 'number') {
    checkedElIdx = idx
    const inRangeEls = inputs.slice(lastCheckedElIdx, idx)
    inRangeEls.forEach(el => el.checked = true)
  } else {
    lastCheckedElIdx = idx
  }
}

inputs.forEach(e => e.addEventListener('change', onCbChange))

/** @param {KeyboardEvent} e */
function onKeyDown (e) {
  if (e.key === 'Shift') isShift = true
}

/** @param {KeyboardEvent} e */
function onKeyUp (e) {
  if (e.key === 'Shift') isShift = false
}

document.addEventListener('keydown', onKeyDown)
document.addEventListener('keyup', onKeyUp)
