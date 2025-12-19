import { getContactService } from './contact-service.js';
import { content } from './content.js';

export class ContactFormHandler {
    constructor(formElement) {
        this.form = formElement;
        this.submitButton = formElement.querySelector('button[type="submit"]');
        this.originalButtonText = this.submitButton.textContent;
        this.contactService = getContactService();
        this.currentLang = document.documentElement.lang || 'en';

        this.init();
    }

    init() {
        // Add real-time validation
        this.form.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => this.clearFieldError(field));
        });

        // Handle form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Get translations
        const t = content[this.currentLang].contact;

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = t.errors.required;
        }

        // Email validation
        if (fieldName === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = t.errors.invalidEmail;
            }
        }

        // Phone validation (if provided)
        if (fieldName === 'phone' && value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 10) {
                isValid = false;
                errorMessage = t.errors.invalidPhone;
            }
        }

        // Message length validation
        if (fieldName === 'message' && value && value.length < 10) {
            isValid = false;
            errorMessage = t.errors.messageTooShort;
        }

        this.setFieldValidation(field, isValid, errorMessage);
        return isValid;
    }

    setFieldValidation(field, isValid, errorMessage = '') {
        const wrapper = field.closest('.form-group');
        if (!wrapper) return;

        // Remove existing error
        const existingError = wrapper.querySelector('.field-error');
        if (existingError) existingError.remove();

        // Update field state
        field.classList.remove('field-valid', 'field-invalid');

        if (field.value.trim()) {
            if (isValid) {
                field.classList.add('field-valid');
            } else {
                field.classList.add('field-invalid');

                // Add error message
                const errorDiv = document.createElement('div');
                errorDiv.className = 'field-error';
                errorDiv.textContent = errorMessage;
                wrapper.appendChild(errorDiv);
            }
        }
    }

    clearFieldError(field) {
        const wrapper = field.closest('.form-group');
        if (!wrapper) return;

        const errorDiv = wrapper.querySelector('.field-error');
        if (errorDiv) errorDiv.remove();

        field.classList.remove('field-invalid');
    }

    validateForm() {
        let isValid = true;
        const fields = this.form.querySelectorAll('input[required], textarea[required], select[required]');

        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    async handleSubmit(e) {
        e.preventDefault();

        // Check honeypot (anti-spam)
        const honeypot = this.form.querySelector('input[name="honeypot"]');
        if (honeypot && honeypot.value) {
            // Bot detected, silently fail
            this.showMessage('success');
            this.form.reset();
            return;
        }

        // Validate form
        if (!this.validateForm()) {
            this.showMessage('error', content[this.currentLang].contact.errors.validation);
            return;
        }

        // Disable submit button and show loading state
        this.setSubmitState('loading');

        // Collect form data
        const formData = {
            name: this.form.querySelector('[name="name"]').value.trim(),
            email: this.form.querySelector('[name="email"]').value.trim(),
            phone: this.form.querySelector('[name="phone"]')?.value.trim() || '',
            company: this.form.querySelector('[name="company"]')?.value.trim() || '',
            subject: this.form.querySelector('[name="subject"]')?.value || '',
            message: this.form.querySelector('[name="message"]').value.trim()
        };

        try {
            const result = await this.contactService.submitForm(formData);

            if (result.success) {
                this.showMessage('success');
                this.form.reset();

                // Clear all validation states
                this.form.querySelectorAll('.field-valid, .field-invalid').forEach(field => {
                    field.classList.remove('field-valid', 'field-invalid');
                });
            } else {
                throw new Error(result.message || 'Submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showMessage('error', error.message);
        } finally {
            this.setSubmitState('idle');
        }
    }

    setSubmitState(state) {
        const t = content[this.currentLang].contact;

        switch (state) {
            case 'loading':
                this.submitButton.disabled = true;
                this.submitButton.classList.add('btn-loading');
                this.submitButton.innerHTML = `
          <span class="spinner"></span>
          ${t.sending}
        `;
                break;

            case 'idle':
            default:
                this.submitButton.disabled = false;
                this.submitButton.classList.remove('btn-loading');
                this.submitButton.textContent = this.originalButtonText;
                break;
        }
    }

    showMessage(type, customMessage = null) {
        const t = content[this.currentLang].contact;

        // Remove existing messages
        const existingMessage = this.form.querySelector('.form-message');
        if (existingMessage) existingMessage.remove();

        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message form-message-${type}`;

        if (type === 'success') {
            messageDiv.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z" fill="currentColor"/>
        </svg>
        <span>${customMessage || t.success}</span>
      `;
        } else {
            messageDiv.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z" fill="currentColor"/>
        </svg>
        <span>${customMessage || t.errors.generic}</span>
      `;
        }

        // Insert message before submit button
        this.submitButton.parentElement.insertBefore(messageDiv, this.submitButton);

        // Auto-remove success message after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                if (messageDiv.parentElement) {
                    messageDiv.remove();
                }
            }, 5000);
        }
    }

    updateLanguage(lang) {
        this.currentLang = lang;
        this.originalButtonText = this.submitButton.textContent;
    }
}
