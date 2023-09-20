<script setup lang="ts">
import DarkLightModeToggle from "./common/DarkLightModeToggle.vue";
import { RouterLink } from "vue-router";
</script>

<template>
    <nav
        class="h-16 flex justify-between items-center px-8 border-b-[1px] dark:border-zinc-800"
    >
        <h1 class="text-zinc-800 dark:text-zinc-100 text-sm font-bold">
            <RouterLink to="/"> Punch Clock </RouterLink>
        </h1>

        <div class="flex items-center justify-end">
            <DarkLightModeToggle />
            <span
                class="border-r-[1px] h-4 m-4 w-0 dark:border-zinc-600 border-zinc-300"
            ></span>
            <RouterLink
                class="bg-zinc-900 hover:bg-zinc-700 text-white px-3 py-2 rounded-md text-sm shadow-sm"
                to="/signin"
            >
                Sign In
            </RouterLink>
        </div>
    </nav>
</template>
