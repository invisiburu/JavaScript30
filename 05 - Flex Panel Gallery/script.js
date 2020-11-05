function onPanelClick (event) {
  /** @type {HTMLElement} */
  const el = event.target
  if (el.classList.contains('open')) return el.classList.remove('open')
  el.classList.add('open')
}

document.querySelectorAll('.panel').forEach(node => node.addEventListener('click', onPanelClick))
