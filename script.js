const navbar = document.querySelector('.navbar')
const navLinks = [...document.querySelectorAll('.nav-link')]
const sections = [...document.querySelectorAll('main section[id], header[id]')]
const reveals = document.querySelectorAll('.reveal')

const updateNavigation = () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20)
  let current = 'home'
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 180) current = section.id
  })
  navLinks.forEach(link => {
    const target = link.getAttribute('href').slice(1)
    link.classList.toggle('active', target === current || (target === 'help' && current === 'help'))
  })
}

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return
    entry.target.classList.add('visible')
    revealObserver.unobserve(entry.target)
  })
}, { threshold: 0.12, rootMargin: '0px 0px -40px' })

reveals.forEach(element => revealObserver.observe(element))
window.addEventListener('scroll', updateNavigation, { passive: true })
updateNavigation()
