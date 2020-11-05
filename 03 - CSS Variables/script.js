/** @param {Event} e */
function updateCssVar (e) {
  /** @type {HTMLInputElement} */
  const el = e.target
  const root = document.documentElement
  root.style.setProperty(`--${el.name}`, el.value + (el.dataset.sizing || ''))
}

document.querySelectorAll('input').forEach(el => el.addEventListener('input', updateCssVar))
