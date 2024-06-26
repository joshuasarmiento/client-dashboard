<template>
  <div id="app " class="">
    <nav v-if="isAuthenticated">
      <Header/>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from './stores/auth';
import Header from '@/components/dashboard/Header.vue'
const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
</script>