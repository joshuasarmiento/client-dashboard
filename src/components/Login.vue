<!-- src/components/Login.vue -->
<template>
<form @submit.prevent="handleSubmit">
    <h2>Login</h2>
    <div>
    <label for="email">Email:</label>
    <input type="email" id="email" v-model="email" required>
    </div>
    <div>
    <label for="password">Password:</label>
    <input type="password" id="password" v-model="password" required>
    </div>
    <button type="submit">Login</button>
</form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const authStore = useAuthStore();
const router = useRouter();

const handleSubmit = async () => {
try {
    await authStore.login(email.value, password.value);
    router.push('/dashboard');
} catch (error) {
    console.error('Login failed:', error);
    // Handle error (e.g., show error message)
}
};
</script>