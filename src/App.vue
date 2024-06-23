<!-- src/App.vue -->
<template>
  <div id="app">
    <nav v-if="isAuthenticated">
      <router-link to="/dashboard">Dashboard</router-link> |
      <a href="#" @click.prevent="handleLogout">Logout</a>
    </nav>
    <nav v-else>
      <router-link to="/login">Login</router-link> |
      <router-link to="/signup">Signup</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from './stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>