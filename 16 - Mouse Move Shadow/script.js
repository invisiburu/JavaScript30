const target = document.querySelector('h1')

const w = document.body.clientWidth
const h = document.body.clientHeight

console.dir(target)

/**
 * @param {MouseEvent} e
 */
function onMouseMove (e) {
  const { x, y } = e

  const mdX = w - x
  const mdY = h - y

  const mX = (x - mdX) * 0.2
  const mY = (y - mdY) * 0.2

  target.style.textShadow = `
    rgba(255, 0, 255, 0.7) ${mX}px ${mY}px 0,
    rgba(0, 255, 255, 0.7) ${-mX}px ${mY}px 0,
    rgba(0, 255, 0, 0.7) ${mY}px ${-mX}px 0,
    rgba(0, 0, 255, 0.7) ${-mY}px ${mX}px 0
  `
}

onMouseMove({ x: 0, y: 0 })
document.addEventListener('mousemove', onMouseMove)
