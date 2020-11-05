const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

/**
 * @typedef {Object} City
 * @property {string} city
 * @property {string} growth_from_2000_to_2013
 * @property {number} latitude
 * @property {number} longitude
 * @property {string} population
 * @property {string} rank
 * @property {string} state
 */

/** @type {City[]} */
let cities
fetch(endpoint)
  .then(response => response.json())
  .then(citiesJson => cities = citiesJson)

const suggestionsNode = document.querySelector('.suggestions')
const emptySuggestionsItems = Array.from(suggestionsNode.children)

/** @param {HTMLElement[]} newNodes */
function replaceSuggestions (newNodes) {
  while (suggestionsNode.firstChild) suggestionsNode.firstChild.remove()
  for (const item of newNodes) suggestionsNode.appendChild(item)
}

function formatNumber (string) {
  return new Intl.NumberFormat().format(string)
}

/**
 * @param {string} string
 * @param {City[]} cities
 * @returns {City[]}
 */
function findCities (string, cities) {
  return cities.filter(el => {
    const str = `${el.city.toLowerCase()}${el.state.toLowerCase()}`
    return ~str.indexOf(string)
  })
}

/**
 * @param {City[]} cities
 * @param {string} hlPart
 * @returns {City[]}
 */
function citiesToListItems (cities, hlPart) {
  const re = new RegExp(`${hlPart}`, 'ig')
  return cities.map(el => {
    const li = document.createElement('li')

    const nameSpan = document.createElement('span')
    nameSpan.classList.add('name')
    nameSpan.innerHTML = `${el.city}, ${el.state}`.replace(re, `<span class="hl">$&</span>`)
    li.appendChild(nameSpan)

    const popSpan = document.createElement('span')
    popSpan.classList.add('population')
    popSpan.innerText = formatNumber(el.population)
    li.appendChild(popSpan)

    return li
  })
}

/** @param {Event} event */
function lookup (event) {
  /** @type {HTMLInputElement} */
  const el = event.target
  const val = el.value

  if (!val) return replaceSuggestions(emptySuggestionsItems)

  const foundCities = findCities(val, cities)
  const listItems = citiesToListItems(foundCities, val)

  if (!listItems.length) return replaceSuggestions(emptySuggestionsItems)

  replaceSuggestions(listItems)
}

document.querySelector('input').addEventListener('input', lookup)
