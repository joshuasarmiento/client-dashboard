<template>
    <div>
        <form @submit.prevent="onSubmit">
            <FormField v-slot="{ field, errors }" name="email">
                <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input type="email" placeholder="Email Address" v-model="email" v-bind="field" />
                    </FormControl>
                    <FormMessage v-if="errors.length" class="text-xs text-red-400"> {{ errors[0] }} </FormMessage>    
                </FormItem>
            </FormField>
            <FormField v-slot="{ field, errors }" name="password">
                <FormItem>
                    <FormLabel>Password</FormLabel>
                    <div class="relative">
                        <FormControl>
                        <Input 
                            :type="showPassword ? 'text' : 'password'" 
                            placeholder="Password" 
                            v-model="password" 
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
            <div class="py-3 text-sm">
                <p>Don't have an account? 
                <router-link to="/signup"> 
                    <span class="underline -px-3 font-semibold underline-offset-4 hover:text-primary">Signup</span>    
                </router-link></p>
            </div>
            <div v-if="loading">
                <Button disabled class="w-full">
                    <Loader2 class="w-4 h-4 mr-2 animate-spin" />
                    Please wait
                </Button>
            </div>
            <div v-else>
                <Button type="submit" class="w-full">
                    Login
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
    </div>
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

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const authStore = useAuthStore();
const router = useRouter();
const loading = ref(false);

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
    email: z.string().email(),
    password: z.string().min(6)
}))

const form = useForm({
    validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async () => {
    loading.value = true;
    try {
        await authStore.login(email.value, password.value);
        router.push('/dashboard');
    } catch (err: any) {
        let errorMessage = err.response.data.message || 'An unexpected error occurred.';

        toast({
            variant: "destructive",
            title: 'Login failed',
            description: errorMessage,
        });
    } finally {
        loading.value = false;
    }
})

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
}
</script>