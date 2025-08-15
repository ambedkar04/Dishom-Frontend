// API utility functions for authentication and HTTP requests

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";
const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || "10000", 10);

interface ApiResponse<T = any> {
  data?: T;
  error?: any;
  status: number;
}

interface AuthTokens {
  access: string;
  refresh: string;
}

interface User {
  id: number;
  full_name: string;
  mobile_number: string;
  email: string;
  date_joined: string;
}

interface RegisterData {
  full_name: string;
  mobile_number: string;
  email?: string;
  password: string;
  confirm_password: string;
}

interface LoginData {
  mobile_number: string;
  password: string;
}

// Get stored tokens
export const getTokens = (): AuthTokens | null => {
  const accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  if (accessToken && refreshToken) {
    return {
      access: accessToken,
      refresh: refreshToken,
    };
  }

  return null;
};

// Get stored user
export const getUser = (): User | null => {
  const userStr = localStorage.getItem("user");
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
  return null;
};

// Store authentication data
export const storeAuthData = (tokens: AuthTokens, user: User): void => {
  localStorage.setItem("access_token", tokens.access);
  localStorage.setItem("refresh_token", tokens.refresh);
  localStorage.setItem("user", JSON.stringify(user));
};

// Clear authentication data
export const clearAuthData = (): void => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return getTokens() !== null;
};

// Make authenticated API request
export const apiRequest = async <T = any>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> => {
  const tokens = getTokens();

  const config: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  // Add authorization header if tokens exist
  if (tokens) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${tokens.access}`,
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    return {
      data: response.ok ? data : undefined,
      error: response.ok ? undefined : data,
      status: response.status,
    };
  } catch (error) {
    return {
      error: "Network error occurred",
      status: 0,
    };
  }
};

// Register user
export const registerUser = async (
  userData: RegisterData
): Promise<
  ApiResponse<{
    message: string;
    user: User;
    tokens: AuthTokens;
  }>
> => {
  return apiRequest("/auth/register/", {
    method: "POST",
    body: JSON.stringify(userData),
  });
};

// Update user profile
export const updateUserProfile = async (
  userData: any
): Promise<ApiResponse<any>> => {
  return apiRequest("/auth/profile/update/", {
    method: "PATCH",
    body: JSON.stringify(userData),
  });
};

// Login user
export const loginUser = async (
  credentials: LoginData
): Promise<
  ApiResponse<{
    message: string;
    user: User;
    tokens: AuthTokens;
  }>
> => {
  return apiRequest("/auth/login/", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
};

// Logout user (client-side only for now)
export const logoutUser = (): void => {
  clearAuthData();
  // Optionally redirect to home page
  window.location.href = "/";
};

export type { User, AuthTokens, RegisterData, LoginData, ApiResponse };
