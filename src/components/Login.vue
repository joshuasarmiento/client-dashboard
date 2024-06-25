<!-- src/components/Login.vue -->
<template>
    <ReusableCard 
        title="Login" 
        description="Fill out the form."
    > 
        <AuthLoginForm />
    </ReusableCard>
</template>

<script setup lang="ts">
import AuthLoginForm from "@/components/authForm/authLogin.vue";
import ReusableCard from "@/components/reusable/reusableCard.vue";
</script>
