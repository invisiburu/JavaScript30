const video = document.querySelector('video')
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
/** @type {HTMLDivElement} */
const strip = document.querySelector('.strip')
/** @type {HTMLAudioElement} */
const snap = document.querySelector('.snap')

let isInitialized = false

navigator.mediaDevices.getUserMedia({ video: true, audio: false })
  .then(stream => {
    video.srcObject = stream
    video.play()
  })
  .catch(err => {
    console.error("An error occurred: " + err)
  })

function takePhoto () {
  if (!isInitialized) return

  const dataUrl = canvas.toDataURL('image/png')
  appendToStrip(dataUrl)

  playSnapSound()
}

function appendToStrip (dataUrl) {
  const linkElement = document.createElement('a')
  linkElement.href = dataUrl
  linkElement.download = 'handsome'

  const imgElement = document.createElement('img')
  imgElement.src = dataUrl
  imgElement.alt = 'Handsome Man'

  linkElement.appendChild(imgElement)
  strip.appendChild(linkElement)
}

function playSnapSound () {
  snap.currentTime = 0
  snap.play()
}

function renderFrame () {
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
  let pixels = ctx.getImageData(0, 0, canvas.width, canvas.height)
  pixels = rgbSplit(pixels)
  ctx.putImageData(pixels, 0, 0)
}

// function redEffect (pixels) {
//   for (let i = 0; i < pixels.data.length; i += 4) {
//     pixels.data[i + 0] = pixels.data[i + 0] + 200; // RED
//     pixels.data[i + 1] = pixels.data[i + 1] - 50; // GREEN
//     pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // Blue
//   }
//   return pixels;
// }

function rgbSplit (pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0]; // RED
    pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
    pixels.data[i - 550] = pixels.data[i + 2]; // Blue
  }
  return pixels;
}

function initCanvas () {
  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
}

video.addEventListener('canplay', () => {
  if (isInitialized) return
  initCanvas()
  setInterval(renderFrame, 16)
  isInitialized = true
})
