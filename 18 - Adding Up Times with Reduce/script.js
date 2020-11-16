const totalSeconds = Array.from(document.querySelectorAll('li'))
  .map(li => {
    const [m, s] = li.dataset.time.split(':')
    return m * 60 + Number(s)
  })
  .reduce((acc, cur) => acc + cur, 0)

const hours = Math.floor(totalSeconds / 3600)
const minutes = Math.floor(totalSeconds / 60) % 60
const seconds = totalSeconds % 60
console.log(hours, minutes, seconds)
