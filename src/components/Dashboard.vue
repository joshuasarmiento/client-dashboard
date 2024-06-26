<!-- src/components/Dashboard.vue -->
<template>
<div>
    <div v-if="loading">
        Loading user data...
    </div>
    
    <template v-else-if="user">
        <section class="container flex items-center justify-center min-h-screen mx-auto">
            <h1 class="font-bold text-4xl">Hello {{ user.name }}!</h1>
        </section>
    </template>

    <Toaster/>
</div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import { useToast } from '@/components/ui/toast/use-toast'
import { Toaster } from '@/components/ui/toast'
const { toast } = useToast()

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
      } catch (err: any) {
          let errorMessage = err.response.data.message;

          toast({
            variant: "destructive",
            title: 'Error fetching user data',
            description: errorMessage,
        });
      } finally {
          loading.value = false;
      }
  }
});
</script>