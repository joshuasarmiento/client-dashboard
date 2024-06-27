<script setup lang="ts">
import { CircleUser, Home, Menu, Package2, Search, ShoppingCart } from 'lucide-vue-next'

// import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
}
</script>

<template>
  <Tabs default-value="dashboard">
    <div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div class="hidden border-r bg-muted/40 md:block">
        <div class="flex h-full max-h-screen flex-col gap-2">
          <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <a href="/" class="flex items-center gap-2 font-semibold">
              <Package2 class="h-6 w-6" />
              <span class="">Vue Auth</span>
            </a>
          </div>
          <div class="flex-1">
            <nav class="">
              <TabsList class="grid gap-2 justify-start px-2 text-sm font-medium lg:px-4 ">
                <TabsTrigger value="dashboard" class="w-full flex items-start justify-start">
                  <span class="flex items-center gap-3">
                    <Home class="h-4 w-4" />
                    Dashboard
                  </span>
                </TabsTrigger>
                <TabsTrigger value="orders" class="flex items-start justify-start">
                  <span class="flex items-center gap-3">
                    <ShoppingCart class="h-4 w-4" />
                    Orders
                  </span>
                </TabsTrigger>
              </TabsList>
            </nav>
          </div>
          <div class="mt-auto p-4">
            <Button size="sm" class="w-full" @click="handleLogout">
              Logout
            </Button>
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger as-child>
              <Button variant="outline" size="icon" class="shrink-0 md:hidden">
                <Menu class="h-5 w-5" />
                <span class="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" class="flex flex-col">
              <nav class="grid gap-2 text-lg font-medium">
                <router-link to="/dashboard" class="flex items-center gap-2 text-lg font-semibold">
                  <Package2 class="h-6 w-6" />
                  <span class="text-sm">Vue Auth</span>
                </router-link>
                <TabsList class="grid gap-2 justify-start px-2 text-sm font-medium lg:px-4 -ml-5 mt-4">
                  <TabsTrigger value="dashboard" class="w-full flex items-start justify-start">
                    <span class="flex items-center gap-3">
                      <Home class="h-6 w-6" />
                      Dashboard
                    </span>
                  </TabsTrigger>
                  <TabsTrigger value="orders" class="flex items-start justify-start">
                    <span class="flex items-center gap-3">
                      <ShoppingCart class="h-6 w-6" />
                      Orders
                    </span>
                  </TabsTrigger>
                </TabsList>
              </nav>
              <div class="mt-auto">
                <Button size="sm" class="w-full" @click="handleLogout">
                  Logout
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          <div class="w-full flex-1">
            <form>
              <div class="relative">
                <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search products..."
                  class="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3" />
              </div>
            </form>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="secondary" size="icon" class="rounded-full">
                <CircleUser class="h-5 w-5" />
                <span class="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem @click="handleLogout">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <TabsContent value="dashboard">
            <div class="flex items-center">
              <h1 class="text-lg font-semibold md:text-2xl">
                Dashboard
              </h1>
            </div>
            <div class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
              <div class="flex flex-col items-center gap-1 text-center">
                <h3 class="text-2xl font-bold tracking-tight">
                  You have no products
                </h3>
                <p class="text-sm text-muted-foreground">
                  You can start selling as soon as you add a product.
                </p>
                <Button class="mt-4">
                  Add Product
                </Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="orders">
            <div class="flex items-center">
              <h1 class="text-lg font-semibold md:text-2xl">
                Orders
              </h1>
            </div>
            <div class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
              <div class="flex flex-col items-center gap-1 text-center">
                <h3 class="text-2xl font-bold tracking-tight">
                  No orders available
                </h3>
                <p class="text-sm text-muted-foreground">
                  Your orders will appear here once placed.
                </p>
                <Button class="mt-4">
                  View Products
                </Button>
              </div>
            </div>
          </TabsContent>
        </main>
      </div>
    </div>
  </Tabs>
</template>