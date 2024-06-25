<!-- src/components/Dashboard.vue -->
<template>
<div>
    <h1>Dashboard</h1>
    <div v-if="loading">Loading user data...</div>

    <template v-else-if="user">
        <p>Welcome, {{ user.name || user.email }}!</p>
        <button @click="handleLogout">Logout</button>
    </template>

    <div v-else>
        <p>Unable to load user data. Please try logging in again.</p>
        <button @click="goToLogin">Go to Login</button>
    </div>
</div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const loading = ref(true);
const user = computed(() => authStore.user);

onMounted(async () => {
  if (!authStore.isAuthenticated) {
      router.push('/login');
  } else {
      try {
          await authStore.fetchUser();
      } catch {
          console.log('Error fetching user data');
      } finally {
          loading.value = false;
      }
  }
});

const handleLogout = () => {
    authStore.logout();
    router.push('/login');
};

const goToLogin = () => {
  authStore.logout();
  router.push('/login');
};
</script>