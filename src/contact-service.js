/**
 * Contact Form Service Layer
 * 
 * This architecture allows easy migration from Web3Forms to a custom backend
 * by simply changing which service class is instantiated.
 */

// Abstract base class
class ContactService {
    async submitForm(formData) {
        throw new Error('submitForm must be implemented by subclass');
    }
}

// Web3Forms implementation (currently active)
class Web3FormsService extends ContactService {
    constructor(accessKey) {
        super();
        this.accessKey = accessKey;
        this.endpoint = 'https://api.web3forms.com/submit';
    }

    async submitForm(formData) {
        const payload = {
            access_key: this.accessKey,
            name: formData.name,
            email: formData.email,
            phone: formData.phone || '',
            company: formData.company || '',
            subject: formData.subject || 'Contact Form Submission',
            message: formData.message,
            // Web3Forms will use this as the email subject
            from_name: formData.name,
            // Add custom fields for better organization
            _subject: `[Borealytics] ${formData.subject || 'Nouveau message'}`,
            _template: 'table',
            _captcha: false
        };

        const response = await fetch(this.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to submit form');
        }

        return await response.json();
    }
}

// Custom backend implementation (ready for future use)
// Uncomment and configure when ready to migrate
/*
class CustomBackendService extends ContactService {
  constructor() {
    super();
    this.endpoint = '/api/contact';
  }

  async submitForm(formData) {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to submit form');
    }

    return await response.json();
  }
}
*/

// Factory function to get the appropriate service
export function getContactService() {
    // Check if custom backend is enabled via environment variable
    const useCustomBackend = import.meta.env.VITE_USE_CUSTOM_BACKEND === 'true';

    if (useCustomBackend) {
        // Uncomment when ready to use custom backend
        // return new CustomBackendService();
        console.warn('Custom backend requested but not yet configured. Using Web3Forms.');
    }

    // Default to Web3Forms
    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY;

    if (!accessKey) {
        throw new Error('Web3Forms access key not configured. Please set VITE_WEB3FORMS_KEY in your .env file.');
    }

    return new Web3FormsService(accessKey);
}

// Export for testing purposes
export { ContactService, Web3FormsService };
