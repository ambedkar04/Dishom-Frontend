// Environment variable utilities

export const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key];
  if (value === undefined && defaultValue === undefined) {
    console.warn(`Environment variable ${key} is not defined`);
    return "";
  }
  return value || defaultValue || "";
};

export const getBooleanEnvVar = (
  key: string,
  defaultValue: boolean = false
): boolean => {
  const value = import.meta.env[key];
  if (value === undefined) return defaultValue;
  return value === "true";
};

export const getNumberEnvVar = (
  key: string,
  defaultValue: number = 0
): number => {
  const value = import.meta.env[key];
  if (value === undefined) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
};

// Predefined environment variables
export const ENV = {
  NODE_ENV: getEnvVar("VITE_NODE_ENV", "development"),
  API_BASE_URL: getEnvVar("VITE_API_BASE_URL", "http://localhost:8000/api"),
  API_TIMEOUT: getNumberEnvVar("VITE_API_TIMEOUT", 10000),
  APP_NAME: getEnvVar("VITE_APP_NAME", "BioCure"),
  APP_VERSION: getEnvVar("VITE_APP_VERSION", "1.0.0"),
  APP_DESCRIPTION: getEnvVar(
    "VITE_APP_DESCRIPTION",
    "BioCure Learning Platform"
  ),
  ENABLE_ANALYTICS: getBooleanEnvVar("VITE_ENABLE_ANALYTICS", false),
  ENABLE_DEBUG: getBooleanEnvVar("VITE_ENABLE_DEBUG", true),
  GOOGLE_CLIENT_ID: getEnvVar("VITE_GOOGLE_CLIENT_ID"),
  FACEBOOK_APP_ID: getEnvVar("VITE_FACEBOOK_APP_ID"),
  STRIPE_PUBLIC_KEY: getEnvVar("VITE_STRIPE_PUBLIC_KEY"),
  MAX_FILE_SIZE: getNumberEnvVar("VITE_MAX_FILE_SIZE", 10485760),
  ALLOWED_FILE_TYPES: getEnvVar(
    "VITE_ALLOWED_FILE_TYPES",
    "jpg,jpeg,png,pdf,doc,docx"
  ),
  DEFAULT_THEME: getEnvVar("VITE_DEFAULT_THEME", "light"),
  ENABLE_DARK_MODE: getBooleanEnvVar("VITE_ENABLE_DARK_MODE", true),
} as const;
