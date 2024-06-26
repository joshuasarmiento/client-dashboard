<template>
  <div id="app " class="">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from './stores/auth';
const authStore = useAuthStore();
const isAuthenticated = computed(() => authStore.isAuthenticated);
</script>