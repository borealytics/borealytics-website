import { content } from './content.js';

const LANG_KEY = 'borealytics_lang';
const DEFAULT_LANG = 'en';

function getLang() {
  return localStorage.getItem(LANG_KEY) || DEFAULT_LANG;
}

function setLang(lang) {
  localStorage.setItem(LANG_KEY, lang);
  updateContent();
  updateLangToggle();
}

function updateContent() {
  const lang = getLang();
  const currentContent = content[lang];

  document.querySelectorAll('[data-i18n]').forEach(element => {
    const key = element.getAttribute('data-i18n');
    const keys = key.split('.');
    let value = currentContent;
    keys.forEach(k => {
      value = value[k];
    });

    if (value) {
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        element.placeholder = value;
      } else {
        element.textContent = value;
      }
    }
  });

  // Handle placeholder translations separately
  document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
    const key = element.getAttribute('data-i18n-placeholder');
    const keys = key.split('.');
    let value = currentContent;
    keys.forEach(k => {
      value = value[k];
    });

    if (value) {
      element.placeholder = value;
    }
  });

  // Handle Mission Points
  const missionList = document.getElementById('mission-points');
  if (missionList && currentContent.mission.points) {
    missionList.innerHTML = currentContent.mission.points
      .map((point, index) => `
        <div class="card">
          <div class="mission-icon">${index + 1}</div>
          <p>${point}</p>
        </div>
      `)
      .join('');
  }

  // Handle Values List
  const valuesList = document.getElementById('values-list');
  if (valuesList && currentContent.values.list) {
    valuesList.innerHTML = currentContent.values.list
      .map(val => `
        <div class="card value-card">
          <div class="value-header">
            <div class="card-icon" style="margin-bottom: 0;">✦</div>
            <h3 style="margin-bottom: 0;">${val.title}</h3>
          </div>
          <p>${val.desc}</p>
        </div>
      `)
      .join('');
  }

  // Handle Services List
  const servicesList = document.getElementById('services-list');
  if (servicesList && currentContent.services) {
    const icons = {
      strategy: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`, // Layers
      ai: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>`, // Chip
      bi: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg>`, // Pie Chart
      training: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10v6"></path><path d="M12 3L2 8l10 5 10-5-10-5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>` // Grad Cap
    };

    servicesList.innerHTML = currentContent.services.list
      .map(service => `
        <div class="service-card">
          <div class="service-icon">${icons[service.icon] || icons.strategy}</div>
          <h3>${service.title}</h3>
          <p>${service.desc}</p>
        </div>
      `)
      .join('');
  }

  // Update CTA Button Text
  const ctaBtn = document.querySelector('.hero .btn-primary');
  if (ctaBtn) {
    ctaBtn.textContent = lang === 'en' ? 'Get Started' : 'Commencer';
  }

  document.documentElement.lang = lang;
}

function updateLangToggle() {
  const lang = getLang();
  const toggleBtn = document.getElementById('lang-toggle');
  if (toggleBtn) {
    toggleBtn.textContent = lang === 'en' ? 'FR' : 'EN';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  updateContent();
  updateLangToggle();

  const toggleBtn = document.getElementById('lang-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentLang = getLang();
      const newLang = currentLang === 'en' ? 'fr' : 'en';
      setLang(newLang);

      // Update contact form language if it exists
      if (window.contactFormHandler) {
        window.contactFormHandler.updateLanguage(newLang);
      }
    });
  }

  // Initialize contact form if on contact page
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    import('./contact-form.js').then(module => {
      window.contactFormHandler = new module.ContactFormHandler(contactForm);
    }).catch(error => {
      console.error('Failed to load contact form:', error);
    });
  }

  // Intersection Observer for Fade-in Animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in-section');
    observer.observe(section);
  });
});

