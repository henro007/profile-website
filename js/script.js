// 1. Theme toggle (saved in localStorage)
const root = document.documentElement;
const toggle = document.getElementById('theme-toggle');
if (localStorage.getItem('theme') === 'light') root.classList.add('light');
toggle.addEventListener('click', () => {
  root.classList.toggle('light');
  localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
});

// 2. Mobile menu
document.querySelector('.menu-btn').addEventListener('click', () =>
  document.querySelector('.nav-links').classList.toggle('open'));

// 3. Typing effect on the home page
const typed = document.getElementById('typed');
if (typed) {
  const roles = ['IT & Networks Professional', 'Telecom & VSAT Specialist', 'Azure Cloud Learner', 'Cybersecurity Student', 'Future Threat Hunter'];
  let r = 0, c = 0, del = false;
  (function tick() {
    const word = roles[r];
    typed.textContent = word.slice(0, c);
    c += del ? -1 : 1;
    if (!del && c > word.length) { del = true; return setTimeout(tick, 1200); }
    if (del && c < 0) { del = false; r = (r + 1) % roles.length; c = 0; }
    setTimeout(tick, del ? 40 : 90);
  })();
}

// 4. Scroll-reveal animation + animated skill bars
const io = new IntersectionObserver(entries => entries.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('show');
  e.target.querySelectorAll('.bar div').forEach(b => b.style.width = b.dataset.level + '%');
}), { threshold: .15 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// 5. Project filter buttons
const buttons = document.querySelectorAll('.filters button');
buttons.forEach(btn => btn.addEventListener('click', () => {
  buttons.forEach(b => b.classList.remove('on'));
  btn.classList.add('on');
  document.querySelectorAll('[data-cat]').forEach(card => {
    card.style.display = (btn.dataset.filter === 'all' || card.dataset.cat === btn.dataset.filter) ? '' : 'none';
  });
}));

// 6. Contact form validation
const form = document.getElementById('contact-form');
if (form) form.addEventListener('submit', e => {
  e.preventDefault();
  let ok = true;
  const rules = {
    name: v => v.trim().length >= 2 || 'Enter your name',
    email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Enter a valid email',
    message: v => v.trim().length >= 10 || 'Message must be at least 10 characters'
  };
  for (const id in rules) {
    const res = rules[id](form[id].value);
    document.getElementById(id + '-err').textContent = res === true ? '' : res;
    if (res !== true) ok = false;
  }
  document.getElementById('form-msg').textContent = ok ? 'Thanks! Your message has been validated.' : '';
  if (ok) form.reset();
});

// 7. Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// 8. Expertise accordion (click a card to expand / collapse)
document.querySelectorAll('.acc-btn').forEach(btn => btn.addEventListener('click', () => {
  const card = btn.closest('.acc');
  const open = card.classList.toggle('open');
  btn.setAttribute('aria-expanded', open);
  btn.querySelector('span').textContent = open ? '\u2212' : '+';
}));
