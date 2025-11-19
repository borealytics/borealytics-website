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
          <div class="card-icon">✦</div>
          <h3>${val.title}</h3>
          <p>${val.desc}</p>
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
    });
  }
});
