<template>
    <ReusableCard 
        title="Signup" 
        description="Fill out the form."
    > 
        <AUthSignupFOrm />
    </ReusableCard>
</template>

<script setup lang="ts">
import AUthSignupFOrm from '@/components/authForm/authSignup.vue'
import ReusableCard from "@/components/reusable/reusableCard.vue";
</script>
