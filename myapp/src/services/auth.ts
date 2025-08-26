import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginCredentials, AuthResponse } from '../types';
import { mockAuthService } from './mockAuth';

const BACKEND_URL = 'http://localhost:3006';
const TOKEN_KEY = 'inventory_auth_token';
const USER_KEY = 'inventory_user';

// Use mock authentication by default (เพื่อให้ได้ valid JWT token)
const USE_MOCK_AUTH = true;

export const authService = {
  async initialize(): Promise<void> {
    if (USE_MOCK_AUTH) {
      await mockAuthService.initializeUsers();
      await mockAuthService.listAllUsers(); // Show available users in console
    }
  },

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    if (USE_MOCK_AUTH) {
      return await mockAuthService.login(credentials);
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Login failed');
      }

      const authResponse: AuthResponse = await response.json();
      
      // Store token and user data
      await AsyncStorage.setItem(TOKEN_KEY, authResponse.token);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(authResponse.user));
      
      return authResponse;
    } catch (error) {
      console.error('Auth Service Login Error:', error);
      throw error;
    }
  },

  async register(username: string, password: string, role: string = 'user'): Promise<AuthResponse> {
    if (USE_MOCK_AUTH) {
      return await mockAuthService.register(username, password, role);
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Registration failed');
      }

      const authResponse: AuthResponse = await response.json();
      
      // Store token and user data
      await AsyncStorage.setItem(TOKEN_KEY, authResponse.token);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(authResponse.user));
      
      return authResponse;
    } catch (error) {
      console.error('Auth Service Register Error:', error);
      throw error;
    }
  },

  async logout(): Promise<void> {
    if (USE_MOCK_AUTH) {
      return await mockAuthService.logout();
    }

    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
      await AsyncStorage.removeItem(USER_KEY);
    } catch (error) {
      console.error('Auth Service Logout Error:', error);
    }
  },

  async getToken(): Promise<string | null> {
    if (USE_MOCK_AUTH) {
      return await mockAuthService.getToken();
    }

    try {
      return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('Auth Service Get Token Error:', error);
      return null;
    }
  },

  async getUser() {
    if (USE_MOCK_AUTH) {
      return await mockAuthService.getUser();
    }

    try {
      const userData = await AsyncStorage.getItem(USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Auth Service Get User Error:', error);
      return null;
    }
  },

  async isAuthenticated(): Promise<boolean> {
    if (USE_MOCK_AUTH) {
      return await mockAuthService.isAuthenticated();
    }

    const token = await this.getToken();
    return !!token;
  }
};
