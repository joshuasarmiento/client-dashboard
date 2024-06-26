import { defineStore } from 'pinia';
import axios from 'axios';

interface User {
  id: number;
  email: string;
  name: string | null;
  isVerified: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthChecked: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    token: localStorage.getItem('token'),
    isAuthChecked: false,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user?.isVerified,
    isEmailVerified: (state) => !!state.user?.isVerified,
  },
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await axios.post('http://localhost:3001/api/auth/login', { email, password });
        this.setUserAndToken(response.data.user, response.data.token);
      } catch (error) {
        throw error;
      }
    },
    async signup(email: string, password: string, name: string) {
      try {
        const response = await axios.post('http://localhost:3001/api/auth/signup', { email, password, name });
        return response.data;      
      } catch (error) {
        throw error;
      }
    },
    async verifyEmail(token: string) {
      try {
        const response = await axios.post('http://localhost:3001/api/auth/verify-email', { token });
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    async fetchUser() {
      try {
        const response = await axios.get('http://localhost:3001/api/auth/me', {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.user = response.data.user;
        this.isAuthChecked = true;
      } catch (error) {
        this.logout();
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      this.isAuthChecked = false;
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    },
    setUserAndToken(user: User, token: string) {
        this.user = user;
        this.token = token;
        localStorage.setItem('token', token);
        // this.fetchUser();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        this.isAuthChecked = true;
    },
    async checkAuth() {
      if (this.token && !this.isAuthChecked) {
        try {
          await this.fetchUser();
        } catch (error) {
          console.error('Failed to fetch user:', error);
        }
      }
    },
  },
});