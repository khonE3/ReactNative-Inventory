import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginCredentials, AuthResponse, User } from '../types';
import { jwtUtils } from './jwtUtils';

const TOKEN_KEY = 'inventory_auth_token';
const USER_KEY = 'inventory_user';
const USERS_KEY = 'inventory_users';

// Mock users database
const DEFAULT_USERS = [
  { id: 1, username: 'admin', password: '123456', role: 'admin' },
  { id: 2, username: 'user', password: '123456', role: 'user' },
  { id: 3, username: 'test', password: 'test123', role: 'user' },
];

export const mockAuthService = {
  async initializeUsers(): Promise<void> {
    try {
      const existingUsers = await AsyncStorage.getItem(USERS_KEY);
      if (!existingUsers) {
        await AsyncStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_USERS));
      }
    } catch (error) {
      console.error('Error initializing users:', error);
    }
  },

  async getUsers(): Promise<any[]> {
    try {
      const users = await AsyncStorage.getItem(USERS_KEY);
      return users ? JSON.parse(users) : DEFAULT_USERS;
    } catch (error) {
      console.error('Error getting users:', error);
      return DEFAULT_USERS;
    }
  },

  async register(username: string, password: string, role: string = 'user'): Promise<AuthResponse> {
    try {
      const users = await this.getUsers();
      
      // Check if username already exists
      const existingUser = users.find(u => u.username === username);
      if (existingUser) {
        throw new Error('ชื่อผู้ใช้นี้มีอยู่แล้ว');
      }

      // Create new user
      const newUser = {
        id: users.length + 1,
        username,
        password,
        role,
      };

      users.push(newUser);
      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));

      // Generate valid JWT token
      const token = await jwtUtils.createToken({
        userId: newUser.id,
        username: newUser.username,
        role: newUser.role
      });
      
      const user: User = {
        id: newUser.id,
        username: newUser.username,
        role: newUser.role,
      };

      // Store token and user data
      await AsyncStorage.setItem(TOKEN_KEY, token);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));

      return { token, user };
    } catch (error) {
      console.error('Mock Auth Register Error:', error);
      throw error;
    }
  },

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const users = await this.getUsers();
      
      // Find user
      const user = users.find(u => 
        u.username === credentials.username && 
        u.password === credentials.password
      );

      if (!user) {
        throw new Error('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
      }

      // Generate valid JWT token
      const token = await jwtUtils.createToken({
        userId: user.id,
        username: user.username,
        role: user.role
      });
      
      const userData: User = {
        id: user.id,
        username: user.username,
        role: user.role,
      };

      // Store token and user data
      await AsyncStorage.setItem(TOKEN_KEY, token);
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));

      return { token, user: userData };
    } catch (error) {
      console.error('Mock Auth Login Error:', error);
      throw error;
    }
  },

  async logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem(TOKEN_KEY);
      await AsyncStorage.removeItem(USER_KEY);
    } catch (error) {
      console.error('Mock Auth Logout Error:', error);
    }
  },

  async getToken(): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('Mock Auth Get Token Error:', error);
      return null;
    }
  },

  async getUser(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Mock Auth Get User Error:', error);
      return null;
    }
  },

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  },

  // Method to list all users (for debugging)
  async listAllUsers(): Promise<void> {
    const users = await this.getUsers();
    console.log('Available Mock Users:');
    users.forEach(user => {
      console.log(`- Username: ${user.username}, Password: ${user.password}, Role: ${user.role}`);
    });
  }
};
