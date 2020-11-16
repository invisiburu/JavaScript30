/**
 * @typedef {object} Item
 * @property {string} text
 * @property {boolean} done
 */

/** @type {HTMLFormElement} */
const addItems = document.querySelector('.add-items');
/** @type {HTMLUListElement} */
const itemsList = document.querySelector('.plates');
/** @type {Item[]} */
const items = [];

const storageKey = 'items'

function loadItems () {
  const storedItems = localStorage.getItem(storageKey) || '[]'
  console.log(JSON.parse(storedItems))
  items.push(...JSON.parse(storedItems))
}

function saveItems () {
  localStorage.setItem(storageKey, JSON.stringify(items))
}


function addItem () {
  const text = addItems.elements.namedItem('item').value
  items.push({ text, done: false })
}

function renderItems () {
  while (itemsList.firstChild) itemsList.firstChild.remove()
  items.forEach((item, idx) => itemsList.appendChild(createLI(item, idx)))
}

/**
 * @param {Item} item
 * @param {number} idx
 */
function createLI (item, idx) {
  const li = document.createElement('li')
  const id = `item${idx}`

  const lbl = document.createElement('label')
  lbl.htmlFor = id
  lbl.innerText = item.text

  const cb = document.createElement('input')
  cb.type = 'checkbox'
  cb.id = id
  cb.checked = item.done
  cb.addEventListener('change', e => {
    items[idx].done = e.target.checked
    saveItems()
  })

  li.appendChild(cb)
  li.appendChild(lbl)
  return li
}

loadItems()
renderItems()
addItems.addEventListener('submit', e => {
  e.stopPropagation()
  e.preventDefault()
  addItem()
  saveItems()
  renderItems()
  addItems.elements.namedItem('item').value = ''
})
