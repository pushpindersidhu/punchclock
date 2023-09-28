<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
    onclick: Function,
    tooltip: String
})
</script>

<template>
    <div onclick="onclick"
        className="group relative mx-auto my-2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-3xl text-accent-400 transition-all duration-200 ease-linear hover:rounded-xl hover:bg-accent-400 hover:text-gray-800 dark:bg-bunker-800 dark:hover:bg-accent-400">
        <slot />
        <span
            className="z-50 absolute m-2 w-auto min-w-max origin-top scale-0 top-8 select-none rounded-md bg-gray-50 py-2 px-4 text-xs font-bold text-bunker-600 shadow-md transition-all group-hover:scale-100 dark:bg-bunker-800 dark:text-gray-300">
            {{ tooltip }}
        </span>
    </div>
</template>