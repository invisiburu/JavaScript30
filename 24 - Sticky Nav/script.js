const navEl = document.querySelector('nav')
const headerEl = document.querySelector('header')

const io = new IntersectionObserver(
  ([navEntry], observer) => {
    console.log(navEntry)
    if (!navEntry.isIntersecting) {
      navEl.classList.add('fixed-nav')
    } else {
      navEl.classList.remove('fixed-nav')
    }
  },
)

io.observe(headerEl)
