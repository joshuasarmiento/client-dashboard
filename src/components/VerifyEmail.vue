<template>
    <section class="container flex items-center justify-center min-h-screen mx-auto">
        <div v-if="loading" class="flex flex-row-reverse items-center ">
            <span>Verifying your email...</span>
            <Loader2 class="w-4 h-4 mr-2 animate-spin" />
        </div>
        <div v-else-if="verified">
            <div class="">
                <Card class="mx-auto p-10">
                    <CardContent>
                        <div class="flex flex-col items-center gap-4">
                            <CircleCheckBig class="h-14 w-14 text-green-700"/>
                            Your email has been successfully verified!
                            <Button class="w-full">
                                <router-link to="/login">Continue to Login</router-link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
        <div v-else-if="error">
            <div class="">
                <Card class="mx-auto p-10">
                    <CardContent>
                        <div class="flex flex-col items-center gap-4">
                            <MailWarning class="h-14 w-14 text-red-700"/>
                            {{ error }}
                            <Button variant="outline" class="w-full">
                                <router-link to="/signup">Try Again</router-link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { Button } from '@/components/ui/button';
import { CircleCheckBig, MailWarning, Loader2 } from 'lucide-vue-next'
import {
    Card,
    CardContent,
} from "@/components/ui/card";


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
