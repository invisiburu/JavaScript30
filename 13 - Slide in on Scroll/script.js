const observer = new IntersectionObserver(
  (entries, observer) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('active')
      } else {
        entry.target.classList.remove('active')
      }
    }
  },
  { threshold: 0.5 }
)

document.querySelectorAll('.slide-in').forEach((img) => observer.observe(img))
