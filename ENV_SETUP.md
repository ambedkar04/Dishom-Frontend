# Environment Setup Guide

This guide explains how to set up environment variables for the BioCure frontend application.

## Quick Start

1. **Copy the example file**:

   ```bash
   cp .env.example .env
   ```

2. **Update the values** in `.env` file according to your local setup.

## Environment Variables

### Required Variables

| Variable            | Description          | Default                     |
| ------------------- | -------------------- | --------------------------- |
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:8000/api` |
| `VITE_APP_NAME`     | Application name     | `BioCure`                   |

### Optional Variables

| Variable                | Description            | Default       |
| ----------------------- | ---------------------- | ------------- |
| `VITE_NODE_ENV`         | Environment mode       | `development` |
| `VITE_ENABLE_DEBUG`     | Enable debug mode      | `true`        |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth client ID | (empty)       |
| `VITE_FACEBOOK_APP_ID`  | Facebook app ID        | (empty)       |

## Usage in Code

Access environment variables in your React components using:

```javascript
const apiUrl = import.meta.env.VITE_API_BASE_URL;
const appName = import.meta.env.VITE_APP_NAME;
```

## Development vs Production

- **Development**: Use `.env` file
- **Production**: Set environment variables in your hosting platform

## Security Notes

- Never commit `.env` files to version control
- Always use `.env.example` as a template for new developers
- Keep sensitive keys secure and rotate them regularly

## Troubleshooting

If environment variables are not loading:

1. Restart the development server
2. Check that variable names start with `VITE_`
3. Verify the `.env` file is in the frontend root directory
