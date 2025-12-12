# CV Access Management

This file contains information about accessing the password-protected CV page.

## Password

The CV page is protected by a single password: **`boreal`**

## How It Works

1. Navigate to: `http://localhost:5173/cv.html` (or `https://borealytics.com/cv.html` in production)
2. Enter the password: `boreal`
3. Click "Accéder au profil" to view the CV
4. The authentication persists in the browser session (until tab is closed)

## Changing the Password

To change the password:

1. Open `/src/cv.js`
2. Find line 7: `const CORRECT_PASSWORD = 'boreal';`
3. Change `'boreal'` to your desired password
4. Save the file

Example:
```javascript
const CORRECT_PASSWORD = 'mynewpassword';
```

## Future: Token-Based Access

When integrating with the ERP backend, you can implement token-based access:

1. **Generate unique tokens** for each client/lead in the ERP
2. **Store tokens** in PostgreSQL database
3. **Validate via API** instead of client-side password check
4. **Track access** - log when each client views the CV

This will provide:
- Individual access control per client
- Ability to revoke access
- Analytics on CV views
- Professional client management

## Security Note

The current implementation uses **client-side password validation**. This is suitable for:
- Preventing casual access
- Sharing with professional contacts
- Quick deployment without backend

However, it is **not cryptographically secure**. Someone with technical knowledge could bypass it by viewing the source code.

For production use with sensitive data, consider implementing server-side authentication via the ERP backend.

## Bilingual Support

The CV page supports French and English:
- Default language: French
- Language preference is saved in localStorage
- All content translates automatically

To change the default language:
1. Open `/src/cv.js`
2. Find line 5: `const DEFAULT_LANG = 'fr';`
3. Change to `'en'` for English default
