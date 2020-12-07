window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
// window.SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList

const recognition = new SpeechRecognition()
// const speechRecognitionList = new SpeechGrammarList()

// const colors = ['aqua', 'azure', 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral']
// const grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'
// speechRecognitionList.addFromString(grammar, 1)

// recognition.grammars = speechRecognitionList
// recognition.continuous = true
// recognition.lang = 'en-US'
recognition.interimResults = true
recognition.lang = 'en-US'
// recognition.maxAlternatives = 1

recognition.addEventListener('result', event => {
  const transcript = Array.from(event.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

  if (e.results[0].isFinal) {
    console.log('FINAL')
    // p = document.createElement('p');
    // words.appendChild(p);
  }
  console.log('result', transcript)
})

recognition.addEventListener('end', event => {
  // recognition.stop()
  // recognition.start()
  // recognition.start()
  console.log('end', event)
})

recognition.start()

// recognition.onresult = function (event) {
//   console.log(event)
// }

// setTimeout(() => {
//   console.log('START')
//   // recognition.start()
//   recognition.addEventListener('result', event => {
//     console.log(event)
//   })
//   recognition.addEventListener('end', recognition.start)
//   recognition.start()
// }, 1000)



// document.body.addEventListener('click', function () {
//   console.log('CLICK')
//   recognition.start()
// })


// document.body.addEventListener('load', event => {
//   console.log('load')
//   recognition.start()
// })

