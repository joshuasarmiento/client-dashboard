<!-- src/App.vue -->
<template>
  <div id="app " class="">
    <nav v-if="isAuthenticated">
      <Header/>
    </nav>
    <!-- <nav v-else>
      <router-link to="/login">Login</router-link> |
      <router-link to="/signup">Signup</router-link>
    </nav> -->
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from './stores/auth';
import Header from '@/components/dashboard/Header.vue'

const router = useRouter();
const authStore = useAuthStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);
const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>