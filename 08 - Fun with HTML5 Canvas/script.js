const { canvas, context } = initCanvas()
let prevX = 0
let prevY = 0

function initCanvas () {
  /** @type {HTMLCanvasElement} */
  const canvas = document.querySelector('#draw')
  const context = canvas.getContext('2d')
  canvas.height = window.innerHeight
  canvas.width = window.innerWidth
  context.lineCap = 'round'
  context.lineJoin = 'round'
  // context.globalCompositeOperation = 'multiply';
  return { canvas, context }
}

/** @param {MouseEvent} e */
function startDraw (e) {
  prevX = e.clientX
  prevY = e.clientY
  canvas.addEventListener('mousemove', draw)
}

/** @param {MouseEvent} e */
function draw (e) {
  const x = e.clientX
  const y = e.clientY
  drawLine(prevX, prevY, x, y)
  prevX = x
  prevY = y
}

function stopDraw () {
  canvas.removeEventListener('mousemove', draw)
}

function drawLine (fromX, fromY, toX, toY) {
  context.beginPath()
  context.moveTo(fromX, fromY)
  context.lineTo(toX, toY)
  context.lineWidth = getLineWidth()
  context.strokeStyle = getLineColor()
  context.stroke()
}

let width = 100, incr = -1;
function getLineWidth () {
  width += incr
  if (width === 1) incr = 1
  else if (width === 100) incr = -1
  return width
}

let hue = 0
function getLineColor () {
  hue = (hue + 1) % 360
  return `hsl(${hue}, 100%, 50%)`
}

canvas.addEventListener('mousedown', startDraw)
canvas.addEventListener('mouseup', stopDraw)
canvas.addEventListener('mouseout', stopDraw)
