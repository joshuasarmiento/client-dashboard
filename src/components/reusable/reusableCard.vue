<template>
    <section class="container flex items-center justify-center min-h-screen mx-auto">
        <Card class="w-[350px]">
            <CardHeader>
                <CardTitle>{{ title }}</CardTitle>
                <CardDescription>{{ description }}</CardDescription>
            </CardHeader>
            <CardContent>
                <slot/>
            </CardContent>
        </Card>
    </section>
</template>

<script setup lang="ts">
import {
    Card,
    CardContent,
    CardDescription,
    //   CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

defineProps<{
  title?: string
  description?: string
}>()
</script>
