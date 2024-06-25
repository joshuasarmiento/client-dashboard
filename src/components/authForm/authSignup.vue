<!-- src/components/Signup.vue -->
<template>
    <form @submit.prevent="onSubmit">
        <FormField v-slot="{ field }" name="name">
            <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                    <Input type="text" placeholder="Enter Name" v-model="name" v-bind="field" />
                </FormControl>
                <!-- <FormMessage/> -->
            </FormItem>
        </FormField>
        <FormField v-slot="{ field }" name="email">
            <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                    <Input type="email" placeholder="Email Address" v-model="email" v-bind="field" />
                </FormControl>
                <!-- <FormMessage/> -->
            </FormItem>
        </FormField>
        <FormField v-slot="{ field }" name="password">
            <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                    <Input type="password" placeholder="Password" v-model="password" v-bind="field" />
                </FormControl>
                <!-- <FormMessage/> -->
            </FormItem>
        </FormField>
        <div class="py-3 text-sm">
            <p>Already have an account?
                <router-link to="/login">
                    <span class="underline -px-3 font-semibold underline-offset-4 hover:text-primary">Login</span>
                </router-link>
            </p>
        </div>
        <div v-if="loading">
            <Button disabled class="w-full">
                <Loader2 class="w-4 h-4 mr-2 animate-spin" />
                Please wait
            </Button>
        </div>
        <div v-else>
            <Button type="submit" class="w-full">
                Signup
            </Button>
        </div>
        <p class="px-4 my-4 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our
            <a href="/terms" class="underline underline-offset-4 hover:text-primary">
                Terms of Service
            </a>
            and
            <a href="/privacy" class="underline underline-offset-4 hover:text-primary">
                Privacy Policy
            </a>
            .
        </p>
    </form>
    <Toaster />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-vue-next'
import { useToast } from '@/components/ui/toast/use-toast'
import { Toaster } from '@/components/ui/toast'
const { toast } = useToast()

const name = ref('');
const email = ref('');
const password = ref('');
const authStore = useAuthStore();
const router = useRouter();

const loading = ref(false);
const error = ref('');


import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    // FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = toTypedSchema(z.object({
    name: z.string().describe('Your username'),
    email: z.string().email(),
    password: z.string().min(6)
}))

const form = useForm({
    validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async () => {
    loading.value = true;
    error.value = '';
    try {
        await authStore.signup(email.value, password.value, name.value);
        router.push({ path: '/dashboard', replace: true });
    } catch (err) {
        toast({
            variant: "destructive",
            title: 'Signup failed.',
            description: `${err}`,
        });
        console.error('Signup failed:', err);
    } finally {
        loading.value = false;
    }
})
</script>