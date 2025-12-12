# CV Access Tokens

This file contains the valid access tokens for the password-protected CV page.

## Current Valid Tokens

- `demo-2024` - Demo token for testing
- `test-token` - Test token
- `cv-preview` - Preview token

## How to Add/Remove Tokens

1. Open `/src/cv.js`
2. Find the `VALID_TOKENS` array (around line 9)
3. Add or remove tokens from the array
4. Save the file - changes are immediate (no rebuild needed with Vite dev server)

Example:
```javascript
const VALID_TOKENS = [
  'demo-2024',
  'client-abc123',  // New token for Client ABC
  'lead-xyz789'     // New token for Lead XYZ
];
```

## Token Best Practices

- Use unique, hard-to-guess tokens for each client/lead
- Format suggestion: `{purpose}-{random}` (e.g., `client-a7b9c2d4`)
- Generate random tokens with: `openssl rand -hex 6` or online generator
- Keep this file updated when you add/remove tokens
- **IMPORTANT**: Never commit real client tokens to Git

## Future: API Integration

When integrating with the ERP backend:
1. Tokens will be stored in PostgreSQL database
2. Validation will happen via API call to `/api/cv-access/validate`
3. You'll be able to manage tokens from the ERP interface
4. Track who accessed the CV and when

## Sharing the CV

To share your CV with a client:
1. Generate a unique token (or use an existing one)
2. Add it to the `VALID_TOKENS` array in `/src/cv.js`
3. Send the client this link: `https://borealytics.com/cv.html`
4. Provide them with the token separately (email, message, etc.)
5. They enter the token to access your CV

## Security Note

This is **client-side protection** - it prevents casual access but is not cryptographically secure. Someone with technical knowledge could bypass it. For production use with sensitive data, consider implementing server-side authentication via the ERP backend.
