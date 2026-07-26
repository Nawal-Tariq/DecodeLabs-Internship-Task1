// =========================================================
// Mobile nav toggle
// =========================================================
const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');

navToggle.addEventListener('click', () => {
  const isOpen = primaryNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

// Close mobile nav after a link is clicked
primaryNav.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 768) {
      primaryNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

// =========================================================
// Project filter (state management)
// =========================================================
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const emptyState = document.getElementById('emptyState');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => {
      b.classList.remove('is-active');
      b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('is-active');
    btn.setAttribute('aria-pressed', 'true');

    const filter = btn.dataset.filter;
    let visibleCount = 0;

    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.display = match ? '' : 'none';
      if (match) visibleCount++;
    });

    emptyState.hidden = visibleCount !== 0;
  });
});

// =========================================================
// Contact form validation
// =========================================================
const form = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

const fields = {
  name: { el: document.getElementById('name'), error: document.getElementById('nameError') },
  email: { el: document.getElementById('email'), error: document.getElementById('emailError') },
  message: { el: document.getElementById('message'), error: document.getElementById('messageError') },
};

function validateField(key) {
  const { el, error } = fields[key];
  let message = '';

  if (el.validity.valueMissing) {
    message = 'This field is required.';
  } else if (key === 'email' && el.validity.typeMismatch) {
    message = 'Enter a valid email address.';
  } else if (el.validity.tooShort) {
    message = `Please enter at least ${el.minLength} characters.`;
  }

  error.textContent = message;
  el.setAttribute('aria-invalid', message ? 'true' : 'false');
  return message === '';
}

Object.keys(fields).forEach(key => {
  fields[key].el.addEventListener('blur', () => validateField(key));
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  formSuccess.hidden = true;

  const allValid = Object.keys(fields)
    .map(validateField)
    .every(Boolean);

  if (allValid) {
    formSuccess.hidden = false;
    form.reset();
    Object.keys(fields).forEach(key => fields[key].el.removeAttribute('aria-invalid'));
  }
});

// =========================================================
// Footer year
// =========================================================
document.getElementById('year').textContent = new Date().getFullYear();
