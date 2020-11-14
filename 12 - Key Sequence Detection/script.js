const seq = []
const secretCode = 'wesbos'
document.addEventListener('keydown', e => {
  console.log(e.key)
  seq.push(e.key)
  if (seq.length > secretCode.length) seq.shift()
  if (seq.join('') === secretCode) console.log('DING DING!') || cornify_add()
  console.log(seq)
})
