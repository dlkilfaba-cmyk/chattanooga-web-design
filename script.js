/* script.js – Portfolio interactivity */

// ── Year in footer ──────────────────────────────────────────────
document.getElementById('year').textContent = new Date().getFullYear();

// ── Mobile nav toggle ───────────────────────────────────────────
const toggle = document.querySelector('.nav__toggle');
const navLinks = document.querySelector('.nav__links');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ── Contact form – simple client-side feedback ──────────────────
const form = document.getElementById('contactForm');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    btn.textContent = '✅ Message Sent!';
    btn.disabled = true;
    btn.style.opacity = '0.8';

    setTimeout(() => {
      btn.textContent = originalText;
      btn.disabled = false;
      btn.style.opacity = '';
      form.reset();
    }, 3000);
  });
}

// ── Staggered fade-in animation ──────────────────────────────────
// Elements remain visible by default. Animation class is additive —
// it plays over the already-rendered content, so no opacity:0 flash.
document.querySelectorAll(
  '.project-card, .service-card'
).forEach((el, i) => {
  el.style.animationDelay = (i * 0.08) + 's';
  el.classList.add('animate-in');
});
