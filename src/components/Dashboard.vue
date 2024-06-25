<!-- src/components/Dashboard.vue -->
<template>
<div>
    <div v-if="loading">Loading user data...</div>
    <template v-else-if="user">
        <section class="container flex items-center justify-center min-h-screen mx-auto">
            <h1 class="font-bold text-4xl">Hello {{ user.name }}!</h1>
        </section>
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

console.log(user.value)

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

const goToLogin = () => {
  authStore.logout();
  router.push('/login');
};
</script>