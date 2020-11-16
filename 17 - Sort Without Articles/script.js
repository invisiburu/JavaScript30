const host = document.querySelector('#bands')
const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

const stripArticles = (str = '') => str.replace(/(^|\s)(the|a|an)\s/ig, '')
bands
  .map(str => ([stripArticles(str), str]))
  .sort(([strA], [strB]) => strA.localeCompare(strB))
  .forEach(([, str]) => {
    const li = document.createElement('li')
    li.innerText = str
    host.appendChild(li)
  })
