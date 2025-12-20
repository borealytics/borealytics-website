import { cvContent } from './cv-content.js';

const AUTH_KEY = 'cv_authenticated';
const LANG_KEY = 'borealytics_lang';
const DEFAULT_LANG = 'fr';
const CORRECT_PASSWORD = 'boreal';

// Get current language
function getLang() {
  return localStorage.getItem(LANG_KEY) || DEFAULT_LANG;
}

// Set language
function setLang(lang) {
  localStorage.setItem(LANG_KEY, lang);
  updateContent();
}

// Check if user is authenticated
function isAuthenticated() {
  return sessionStorage.getItem(AUTH_KEY) === 'true';
}

// Authenticate user with password
function authenticate(password) {
  if (password.toLowerCase() === CORRECT_PASSWORD) {
    sessionStorage.setItem(AUTH_KEY, 'true');
    return true;
  }
  return false;
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
  const password = input.value;

  if (authenticate(password)) {
    hideAuthModal();
    input.value = '';
    if (errorMsg) errorMsg.classList.add('hidden');
  } else {
    if (errorMsg) {
      const lang = getLang();
      const content = cvContent[lang];
      errorMsg.textContent = content.auth.error;
      errorMsg.classList.remove('hidden');
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

  // Update auth modal
  updateElement('auth-title', content.auth.title);
  updateElement('auth-subtitle', content.auth.subtitle);
  updateElement('auth-label', content.auth.label);
  updateElement('auth-button', content.auth.button);
  const tokenInput = document.getElementById('token-input');
  if (tokenInput) tokenInput.placeholder = content.auth.placeholder;

  // Update header
  updateElement('header-badge', content.header.badge);
  updateElement('header-name', content.header.name);
  updateElement('header-title', content.header.title);
  updateElement('header-subtitle', content.header.subtitle);
  updateElement('header-tagline', content.header.tagline);

  // Update contact
  updateElement('contact-email', content.contact.email);
  updateElement('contact-phone', content.contact.phone);
  updateElement('contact-location', content.contact.location);
  updateElement('contact-linkedin', content.contact.linkedin);

  // Update contact links
  const emailLink = document.getElementById('contact-email-link');
  if (emailLink) emailLink.href = `mailto:${content.contact.email}`;
  const phoneLink = document.getElementById('contact-phone-link');
  if (phoneLink) phoneLink.href = `tel:+1${content.contact.phone.replace(/\D/g, '')}`;
  const linkedinLink = document.getElementById('contact-linkedin-link');
  if (linkedinLink) linkedinLink.href = `https://${content.contact.linkedin}`;

  // Update summary (Profil)
  updateElement('summary-title', 'Profil');
  const summaryText = document.getElementById('summary-text');
  if (summaryText) {
    // Format text with strong tags for BI and Lean/Six Sigma to match cv.jsx
    const formattedText = content.summary.text
      .replace(/BI \(SQL, Tableau\)/g, '<strong>BI (SQL, Tableau)</strong>')
      .replace(/\(Lean, Six Sigma\)/g, '<strong>(Lean, Six Sigma)</strong>');
    summaryText.innerHTML = formattedText;
  }

  // Update download button
  const downloadBtn = document.getElementById('download-cv-btn');
  const downloadText = document.getElementById('download-cv-text');
  if (downloadText) {
    downloadText.textContent = lang === 'en' ? 'Download CV (PDF)' : 'Télécharger CV (PDF)';
  }

  // Update skills
  updateElement('skills-title', content.skills.title);
  renderSkills(content.skills);

  // Update education
  updateElement('education-title', content.education.title);
  renderEducation(content.education.items);

  // Update experience (title is now in the card, so we don't update it separately)
  renderExperience(content.experience.items);

  // Update footer
  updateElement('footer-copyright', content.footer.copyright);
  updateElement('footer-tagline', content.footer.tagline);
}

// Helper to update element text content
function updateElement(id, text) {
  const element = document.getElementById(id);
  if (element) element.textContent = text;
}

// Render skills section
function renderSkills(skills) {
  // Digital & Data skills
  const digitalContainer = document.getElementById('skills-digital');
  if (digitalContainer) {
    digitalContainer.innerHTML = `
      <h4 class="font-semibold mb-2 text-boreal-text">${skills.digital.title}</h4>
      <div class="flex flex-wrap gap-2">
        ${skills.digital.items.map(skill => `
          <span class="px-3 py-1 rounded-md text-xs font-medium border bg-boreal-bg text-boreal-text-light border-black/10">
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
      <h4 class="font-semibold mb-2 text-boreal-text">${skills.operations.title}</h4>
      <div class="flex flex-wrap gap-2">
        ${skills.operations.items.map(skill => `
          <span class="px-3 py-1 rounded-md text-xs font-medium border bg-boreal-bg text-boreal-text-light border-black/10">
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
      <h4 class="font-semibold mb-2 text-boreal-text">${skills.certifications.title}</h4>
      <ul class="space-y-2">
        ${skills.certifications.items.map(cert => `
          <li class="flex items-center gap-2 text-sm text-boreal-text-light">
            <svg class="w-4 h-4 text-boreal-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            ${cert}
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
        <div class="text-sm font-bold text-boreal-text">${item.degree}</div>
        <div class="text-xs text-boreal-text-light">${item.school}${item.period ? ` (${item.period})` : ''}</div>
      </div>
    `).join('');
  }
}

// Render experience section
function renderExperience(items) {
  const container = document.getElementById('experience-items');
  if (container) {
    // Update the title in the card
    const titleElement = document.querySelector('#experience-title span');
    if (titleElement) {
      const lang = getLang();
      const content = cvContent[lang];
      titleElement.textContent = content.experience.title;
    }

    container.innerHTML = items.map(item => {
      const borderClass = item.featured
        ? 'border-l-4 border-l-boreal-secondary'
        : item.compact
          ? 'border-l-4 border-l-black/10'
          : 'border-l-4 border-l-black/15';

      const opacityClass = item.compact ? 'opacity-90' : '';

      const iconClass = item.featured
        ? 'text-boreal-secondary'
        : 'text-boreal-text-light';

      const listGapClass = item.compact ? 'gap-2' : 'gap-3';
      const listSpaceClass = item.compact ? 'space-y-2' : 'space-y-3';

      return `
        <div class="rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow mb-8 bg-boreal-surface ${borderClass} ${opacityClass}">
          <div class="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
            <div>
              <h4 class="text-lg font-bold text-boreal-text">${item.position}</h4>
              <div class="font-medium text-boreal-secondary">${item.company}</div>
            </div>
            <div class="text-sm font-medium px-3 py-1 rounded-full mt-2 sm:mt-0 inline-block bg-boreal-bg text-boreal-text-light">
              ${item.period}
            </div>
          </div>

          ${item.description ? `<p class="text-sm mb-4 italic text-boreal-text-light">${item.description}</p>` : ''}

          <ul class="${listSpaceClass}">
            ${item.highlights.map(highlight => `
              <li class="flex items-start ${listGapClass}">
                ${item.compact
          ? `<span class="w-1.5 h-1.5 rounded-full mt-1.5 bg-boreal-text-light"></span>`
          : `<svg class="w-5 h-5 shrink-0 mt-0.5 ${iconClass}" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>`
        }
                <span class="text-sm ${item.compact ? 'text-boreal-text-light' : 'text-boreal-text'}">
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

// Generate PDF from CV content
function generatePDF() {
  const cvContent = document.getElementById('cv-content');
  if (!cvContent) {
    console.error('CV content not found');
    return;
  }

  // Get current language for filename
  const lang = getLang();
  const filename = lang === 'en'
    ? 'CV_Ludovic_Asselin.pdf'
    : 'CV_Ludovic_Asselin.pdf';

  // Configure PDF options
  const options = {
    margin: [10, 10, 10, 10],
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,
      useCORS: true,
      logging: false,
      letterRendering: true
    },
    jsPDF: {
      unit: 'mm',
      format: 'a4',
      orientation: 'portrait',
      compress: true
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };

  // Show loading state
  const downloadBtn = document.getElementById('download-cv-btn');
  const originalText = downloadBtn?.querySelector('#download-cv-text')?.textContent;
  if (downloadBtn && originalText) {
    downloadBtn.disabled = true;
    downloadBtn.querySelector('#download-cv-text').textContent = lang === 'en' ? 'Generating...' : 'Génération...';
  }

  // Generate PDF
  html2pdf()
    .set(options)
    .from(cvContent)
    .save()
    .then(() => {
      // Restore button state
      if (downloadBtn && originalText) {
        downloadBtn.disabled = false;
        downloadBtn.querySelector('#download-cv-text').textContent = originalText;
      }
    })
    .catch((error) => {
      console.error('Error generating PDF:', error);
      // Restore button state on error
      if (downloadBtn && originalText) {
        downloadBtn.disabled = false;
        downloadBtn.querySelector('#download-cv-text').textContent = originalText;
      }
      alert(lang === 'en'
        ? 'Error generating PDF. Please try again.'
        : 'Erreur lors de la génération du PDF. Veuillez réessayer.');
    });
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

  // Setup download PDF button
  const downloadBtn = document.getElementById('download-cv-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      generatePDF();
    });
  }

  // Initial content update
  updateContent();
});
