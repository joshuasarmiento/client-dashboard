import { defineStore } from 'pinia';
import axios from 'axios';

interface User {
  id: number;
  email: string;
  name: string | null;
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
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
        this.setUserAndToken(response.data.user, response.data.token);
      } catch (error) {
        throw error;
      }
    },
    async signup(email: string, password: string, name: string) {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/signup', { email, password, name });
        this.setUserAndToken(response.data.user, response.data.token);
      } catch (error) {
        throw error;
      }
    },
    async fetchUser() {
      try {
        const response = await axios.get('http://localhost:3000/api/auth/me', {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.user = response.data.user;
      } catch (error) {
        this.logout();
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    },
    setUserAndToken(user: User, token: string) {
        this.user = user;
        this.token = token;
        localStorage.setItem('token', token);
        // this.fetchUser();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
  },
});