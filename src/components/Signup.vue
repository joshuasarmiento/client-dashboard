<template>
<form @submit.prevent="handleSubmit">
    <h2>Sign Up</h2>
    <div>
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="name" required>
    </div>
    <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
    </div>
    <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
    </div>
    <button type="submit">Sign Up</button>
    <p v-if="error">{{ error }}</p>
</form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const authStore = useAuthStore();
const router = useRouter();

const loading = ref(false);
const error = ref('');

const handleSubmit = async () => {
    loading.value = true;
    error.value = '';
    try {
        await authStore.signup(email.value, password.value, name.value);
        router.push({ path: '/dashboard', replace: true });
    } catch (err) {
        console.error('Signup failed:', err);
        error.value = 'Signup failed. Please try again.';
    } finally {
        loading.value = false;
    }
};
</script>
