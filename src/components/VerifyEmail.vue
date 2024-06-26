<template>
    <div>
        <h2>Email Verification</h2>
        <p v-if="loading">
            Verifying your email...
        </p>
        <p v-else-if="verified">
            Your email has been successfully verified! You can now 
            <router-link to="/login">login</router-link>.
        </p>
        <p v-else-if="error">
            {{ error }}
        </p>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const route = useRoute();
const authStore = useAuthStore();

const loading = ref(true);
const verified = ref(false);
const error = ref('');

onMounted(async () => {
const token = route.query.token as string;
if (!token) {
    error.value = 'Invalid verification link';
    loading.value = false;
    return;
}

try {
    await authStore.verifyEmail(token);
    verified.value = true;
} catch (err: any) {
    error.value = err.response?.data?.message || 'Failed to verify email';
} finally {
    loading.value = false;
}
});
</script>
