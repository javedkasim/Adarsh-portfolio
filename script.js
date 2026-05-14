// === Year ===
document.getElementById('yr').textContent = new Date().getFullYear();

// === Mobile sidebar toggle ===
const toggle = document.getElementById('mobileToggle');
const sidebar = document.getElementById('sidebar');
toggle.addEventListener('click', () => {
  toggle.classList.toggle('open');
  sidebar.classList.toggle('open');
});

// === Nav active state + close on click (mobile) ===
const navLinks = document.querySelectorAll('.nav-menu a');
const sections = [...document.querySelectorAll('main section[id]')];

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    sidebar.classList.remove('open');
    toggle.classList.remove('open');
  });
});

window.addEventListener('scroll', () => {
  let cur = '';
  const y = window.scrollY + 140;
  sections.forEach(s => { if (y >= s.offsetTop) cur = s.id; });
  navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + cur));
});

// === Reveal sections + skill bars ===
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      e.target.querySelectorAll('.skill').forEach(s => s.classList.add('in-view'));
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.section').forEach(s => io.observe(s));

// === Typed text effect ===
(() => {
  const el = document.getElementById('typed');
  if (!el) return;
  const words = ['Video Editor', 'Cinematic Storyteller', 'Motion Designer', 'Color Grader', 'Reel Specialist'];
  let wi = 0, ci = 0, deleting = false;
  const tick = () => {
    const w = words[wi];
    el.textContent = deleting ? w.slice(0, --ci) : w.slice(0, ++ci);
    let delay = deleting ? 50 : 110;
    if (!deleting && ci === w.length) { delay = 1600; deleting = true; }
    else if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; delay = 300; }
    setTimeout(tick, delay);
  };
  tick();
})();

// === Portfolio filter ===
const filterBtns = document.querySelectorAll('#filters button');
const cards = document.querySelectorAll('#portGrid .port');
filterBtns.forEach(b => {
  b.addEventListener('click', () => {
    filterBtns.forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    const f = b.dataset.f;
    cards.forEach(c => c.classList.toggle('hidden', !(f === 'all' || c.dataset.cat === f)));
  });
});

// === Contact form ===
const form = document.getElementById('contactForm');
form?.addEventListener('submit', e => {
  e.preventDefault();
  const msg = document.getElementById('formMsg');
  msg.textContent = 'Sending…';
  setTimeout(() => {
    msg.textContent = '✓ Message sent. I\'ll get back within 24h.';
    form.reset();
  }, 700);
});