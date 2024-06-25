<!-- src/components/Dashboard.vue -->
<template>
    <div class="border-b">
        <div class="flex h-16 items-center px-4">
            <MainNav class="mx-6" />
            <div class="ml-auto flex items-center space-x-4">
                <Search />
                <UserNav />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import MainNav from '@/components/dashboard/MainNav.vue'
import UserNav from '@/components/dashboard/UserNav.vue'
import Search from '@/components/dashboard/Search.vue'
</script>