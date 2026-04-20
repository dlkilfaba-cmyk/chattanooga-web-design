/* script.js – Portfolio interactivity */

document.addEventListener('DOMContentLoaded', () => {

// ── Year in footer ──────────────────────────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

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

// ── Contact form – Formspree submission ─────────────────────
const form = document.getElementById('contactForm');

if (form) {
  form.addEventListener('submit', (e) => {
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    btn.textContent = '⏳ Sending...';
    btn.disabled = true;
    
    // Let form submit naturally to Formspree
    setTimeout(() => {
      btn.textContent = '✅ Message Sent!';
      btn.style.opacity = '0.8';
    }, 500);
  });
}

// ── Project cards: subtle stagger on load ─────────────────────
document.querySelectorAll('.project-card').forEach((el, i) => {
  el.style.animationDelay = (i * 0.08) + 's';
  el.classList.add('animate-in');
});

// ── Service cards: scroll-in with stagger (see html.js-animations in CSS) ──
const serviceCards = document.querySelectorAll('#services .service-card');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canScrollAnimate =
  serviceCards.length && !reduceMotion && 'IntersectionObserver' in window;

if (canScrollAnimate) {
  document.documentElement.classList.add('js-animations');
  serviceCards.forEach((card, i) => {
    card.style.setProperty('--service-stagger', `${i * 0.11}s`);
  });
  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('service-card--visible');
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -32px 0px' }
  );
  serviceCards.forEach((card) => io.observe(card));
}

}); // end DOMContentLoaded
