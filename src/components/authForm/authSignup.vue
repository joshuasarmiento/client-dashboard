<!-- src/components/Signup.vue -->
<template>
    <form @submit.prevent="onSubmit">
    <div class="grid gap-2">
        <div class="grid grid-cols-2 gap-4">
            <FormField v-slot="{ field, errors }" name="name">
                <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Enter your name" v-model="name" v-bind="field" />
                    </FormControl>
                    <FormMessage v-if="errors.length" class="text-xs text-red-400"> {{ errors[0] }} </FormMessage>    
                </FormItem>
            </FormField>
            <FormField v-slot="{ field, errors }" name="email">
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input type="email" placeholder="m@example.com" v-model="email" v-bind="field" />
                    </FormControl>
                    <FormMessage v-if="errors.length" class="text-xs text-red-400"> {{ errors[0] }} </FormMessage>    
                </FormItem>
            </FormField>
        </div>
        <FormField v-slot="{ field, errors }" name="password">
            <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                    <Input type="password" placeholder="Password" v-model="password" v-bind="field" />
                </FormControl>
                <FormMessage v-if="errors.length" class="text-xs text-red-400"> {{ errors[0] }} </FormMessage>    
            </FormItem>
        </FormField>
        <FormField v-slot="{ field, errors }" name="confirmPassword">
            <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                    <div class="relative">
                        <FormControl>
                        <Input 
                            :type="showPassword ? 'text' : 'password'" 
                            placeholder="Confirm Password" 
                            v-model="confirmPassword" 
                            v-bind="field" 
                        />
                        </FormControl>
                        <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon" 
                            class="absolute right-0 top-0 h-full px-3 py-2"
                            @click="togglePasswordVisibility"
                            >
                            <EyeIcon v-if="showPassword" class="h-4 w-4" />
                            <EyeOffIcon v-else class="h-4 w-4" />
                        </Button>
                    </div>
                <FormMessage v-if="errors.length" class="text-xs text-red-400"> {{ errors[0] }} </FormMessage>    
            </FormItem>
        </FormField>
    </div>
        <div class="py-3 text-sm">
            <p>Have an account already?
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
                Create an account
            </Button>
        </div>
        <p class="px-4 my-4 text-center text-xs text-muted-foreground">
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
import { Loader2, EyeIcon, EyeOffIcon  } from 'lucide-vue-next'
import { useToast } from '@/components/ui/toast/use-toast'
import { Toaster } from '@/components/ui/toast'
const { toast } = useToast()

const name = ref('');
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const confirmPassword = ref('');
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
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = toTypedSchema(z.object({
    name: z.string().describe('Your username'),
    email: z.string().email(),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Password must be at least 6 characters')
    }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
}))

const form = useForm({
    validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async () => {
    loading.value = true;
    error.value = '';
    try {
        const response = await authStore.signup(email.value, password.value, name.value);
        if (response.status === 'User Created') {
            toast({
                variant: "default",
                title: 'Signup successful!',
                description: 'Please check your email for verification.',
            });
            
            form.resetForm();

            setTimeout(() => {
                router.push({ path: '/login', replace: true });
            }, 5000);
        }
    } catch (err: any) {
        let errorMessage = err.response.data.message || 'An unexpected error occurred.';
        toast({
            variant: "destructive",
            title: 'Signup failed.',
            description: errorMessage,
        });
        console.error('Signup error:', error);
    } finally {
        loading.value = false;
    }
})

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
}
</script>