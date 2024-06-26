<!-- src/components/Dashboard.vue -->
<template>
<div>
    <template v-if="loading">
        <div class="container flex items-center justify-center min-h-screen mx-auto">
            <Loader2 class="w-4 h-4 mr-2 animate-spin" />
        </div>
    </template>
    <template v-else-if="user">
        <SampleDashboard/>
    </template>
    <Toaster/>
</div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import { Loader2 } from 'lucide-vue-next'
import { useToast } from '@/components/ui/toast/use-toast'
import { Toaster } from '@/components/ui/toast'
// import Header from '@/components/dashboard/Header.vue'
import SampleDashboard from '@/components/dashboard/SampleDashboard.vue'
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
            variant: "error",
            title: 'Error fetching user data',
            description: errorMessage,
        });
      } finally {
          loading.value = false;
      }
  }
});
</script>