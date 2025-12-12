import { cvContent } from './cv-content.js';

const LANG_KEY = 'borealytics_lang';
const AUTH_KEY = 'cv_authenticated';
const DEFAULT_LANG = 'en';

// Valid tokens - in production, this will be validated via API
const VALID_TOKENS = [
    'demo-2024',
    'test-token',
    'cv-preview'
];

// Get current language
function getLang() {
    return localStorage.getItem(LANG_KEY) || DEFAULT_LANG;
}

// Set language
function setLang(lang) {
    localStorage.setItem(LANG_KEY, lang);
    updateContent();
    updateLangToggle();
}

// Check if user is authenticated
function isAuthenticated() {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
}

// Authenticate user with token
function authenticate(token) {
    if (VALID_TOKENS.includes(token.trim())) {
        sessionStorage.setItem(AUTH_KEY, 'true');
        return true;
    }
    return false;
}

// Logout user
function logout() {
    sessionStorage.removeItem(AUTH_KEY);
    showAuthModal();
}

// Show authentication modal
function showAuthModal() {
    const modal = document.getElementById('auth-modal');
    const content = document.getElementById('cv-content');
    if (modal && content) {
        modal.classList.remove('hidden');
        content.classList.add('hidden');
    }
}

// Hide authentication modal
function hideAuthModal() {
    const modal = document.getElementById('auth-modal');
    const content = document.getElementById('cv-content');
    if (modal && content) {
        modal.classList.add('hidden');
        content.classList.remove('hidden');
    }
}

// Handle authentication form submission
function handleAuth(event) {
    event.preventDefault();
    const input = document.getElementById('token-input');
    const errorMsg = document.getElementById('auth-error');
    const token = input.value;

    if (authenticate(token)) {
        hideAuthModal();
        input.value = '';
        if (errorMsg) errorMsg.classList.add('hidden');
    } else {
        if (errorMsg) {
            errorMsg.classList.remove('hidden');
            input.classList.add('error');
            setTimeout(() => {
                input.classList.remove('error');
            }, 500);
        }
    }
}

// Update all content based on current language
function updateContent() {
    const lang = getLang();
    const content = cvContent[lang];

    // Update meta tags
    document.title = content.meta.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = content.meta.description;

    // Update header
    updateElement('cv-name', content.header.name);
    updateElement('cv-title', content.header.title);
    updateElement('cv-tagline', content.header.tagline);

    // Update contact
    updateElement('contact-title', content.contact.title);
    updateElement('contact-email', content.contact.email);
    updateElement('contact-phone', content.contact.phone);
    updateElement('contact-location', content.contact.location);
    updateElement('contact-linkedin', content.contact.linkedin);

    // Update about
    updateElement('about-title', content.about.title);
    updateElement('about-text', content.about.text);

    // Update skills
    updateElement('skills-title', content.skills.title);
    renderSkills(content.skills);

    // Update education
    updateElement('education-title', content.education.title);
    renderEducation(content.education.items);

    // Update experience
    updateElement('experience-title', content.experience.title);
    renderExperience(content.experience.items);

    // Update footer
    updateElement('footer-copyright', content.footer.copyright);
    updateElement('footer-tagline', content.footer.tagline);

    // Update auth modal
    updateElement('auth-title', content.auth.title);
    updateElement('auth-subtitle', content.auth.subtitle);
    updateElement('auth-button', content.auth.button);
    updateElement('auth-error', content.auth.error);
    const tokenInput = document.getElementById('token-input');
    if (tokenInput) tokenInput.placeholder = content.auth.placeholder;

    // Update logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) logoutBtn.textContent = content.auth.logout;
}

// Helper to update element text content
function updateElement(id, text) {
    const element = document.getElementById(id);
    if (element) element.textContent = text;
}

// Render skills section
function renderSkills(skills) {
    // Technical skills
    const techContainer = document.getElementById('skills-technical');
    if (techContainer) {
        techContainer.innerHTML = `
      <h4 class="font-semibold text-slate-900 mb-2">${skills.technical.title}</h4>
      <div class="flex flex-wrap gap-2">
        ${skills.technical.items.map(skill => `
          <span class="px-3 py-1 bg-cyan-50 text-cyan-700 rounded-md text-xs font-medium border border-cyan-200">
            ${skill}
          </span>
        `).join('')}
      </div>
    `;
    }

    // Management skills
    const mgmtContainer = document.getElementById('skills-management');
    if (mgmtContainer) {
        mgmtContainer.innerHTML = `
      <h4 class="font-semibold text-slate-900 mb-2">${skills.management.title}</h4>
      <div class="flex flex-wrap gap-2">
        ${skills.management.items.map(skill => `
          <span class="px-3 py-1 bg-slate-100 text-slate-700 rounded-md text-xs font-medium border border-slate-200">
            ${skill}
          </span>
        `).join('')}
      </div>
    `;
    }

    // Operations skills
    const opsContainer = document.getElementById('skills-operations');
    if (opsContainer) {
        opsContainer.innerHTML = `
      <h4 class="font-semibold text-slate-900 mb-2">${skills.operations.title}</h4>
      <div class="flex flex-wrap gap-2">
        ${skills.operations.items.map(skill => `
          <span class="px-3 py-1 bg-slate-100 text-slate-600 rounded-md text-xs font-medium border border-slate-200">
            ${skill}
          </span>
        `).join('')}
      </div>
    `;
    }

    // Certifications
    const certContainer = document.getElementById('skills-certifications');
    if (certContainer) {
        certContainer.innerHTML = `
      <h4 class="font-semibold text-slate-900 mb-2">${skills.certifications.title}</h4>
      <ul class="space-y-2">
        ${skills.certifications.items.map(cert => `
          <li class="flex items-center gap-2 text-sm text-slate-600">
            <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            ${cert.name}
          </li>
        `).join('')}
      </ul>
    `;
    }
}

// Render education section
function renderEducation(items) {
    const container = document.getElementById('education-items');
    if (container) {
        container.innerHTML = items.map(item => `
      <div>
        <div class="text-sm font-bold text-slate-800">${item.degree}</div>
        <div class="text-xs text-slate-500">${item.school}${item.period ? ` (${item.period})` : ''}</div>
      </div>
    `).join('');
    }
}

// Render experience section
function renderExperience(items) {
    const container = document.getElementById('experience-items');
    if (container) {
        container.innerHTML = items.map(item => {
            const borderColor = item.featured ? 'border-cyan-500' : item.compact ? 'border-slate-200' : 'border-slate-300';
            const opacity = item.compact ? 'opacity-90' : '';

            return `
        <div class="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow border-l-4 ${borderColor} ${opacity}">
          <div class="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
            <div>
              <h4 class="text-xl font-bold text-slate-900">${item.position}</h4>
              <div class="text-cyan-700 font-medium">${item.company}</div>
            </div>
            <div class="text-sm text-slate-500 font-medium bg-slate-100 px-3 py-1 rounded-full mt-2 sm:mt-0 inline-block">
              ${item.period}
            </div>
          </div>

          ${item.description ? `<p class="text-slate-600 text-sm mb-4 italic">${item.description}</p>` : ''}

          <ul class="space-y-${item.compact ? '2' : '3'}">
            ${item.highlights.map(highlight => `
              <li class="flex items-start gap-${item.compact ? '2' : '3'}">
                ${item.compact
                    ? '<span class="w-1.5 h-1.5 bg-slate-400 rounded-full mt-1.5"></span>'
                    : `<svg class="w-5 h-5 ${item.featured ? 'text-cyan-500' : 'text-slate-400'} shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>`
                }
                <span class="text-slate-${item.compact ? '600' : '700'} text-sm">
                  ${highlight.title ? `<strong>${highlight.title}:</strong> ` : ''}${highlight.text}
                </span>
              </li>
            `).join('')}
          </ul>
        </div>
      `;
        }).join('');
    }
}

// Update language toggle button
function updateLangToggle() {
    const lang = getLang();
    const toggleBtn = document.getElementById('lang-toggle');
    if (toggleBtn) {
        toggleBtn.textContent = lang === 'en' ? 'FR' : 'EN';
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check authentication
    if (!isAuthenticated()) {
        showAuthModal();
    } else {
        hideAuthModal();
    }

    // Setup auth form
    const authForm = document.getElementById('auth-form');
    if (authForm) {
        authForm.addEventListener('submit', handleAuth);
    }

    // Setup logout button
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    // Setup language toggle
    const toggleBtn = document.getElementById('lang-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const currentLang = getLang();
            const newLang = currentLang === 'en' ? 'fr' : 'en';
            setLang(newLang);
        });
    }

    // Initial content update
    updateContent();
    updateLangToggle();
});
