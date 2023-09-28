<script setup lang="ts">
import { defineProps } from "vue";
import { Icon } from "@iconify/vue";

defineProps(['icon', 'tooltip', 'onClick']);
</script>

<template>
    <div @click="onClick()"
        class="group relative mx-auto my-2 flex h-12 w-12 cursor-pointer items-center justify-center rounded-3xl bg-zinc-50 text-accent-400 shadow-lg transition-all duration-200 ease-linear hover:rounded-xl hover:bg-accent-400 hover:text-white dark:bg-zinc-800 dark:hover:bg-accent-400">
        <Icon :icon="icon" />
        <span
            class="absolute left-14 m-2 w-auto min-w-max origin-left scale-0 select-none rounded-md bg-zinc-50 py-2 px-4 text-xs font-bold text-zinc-600 shadow-md transition-all group-hover:scale-100 dark:bg-zinc-800 dark:text-zinc-300">
            {{ tooltip }}
        </span>
    </div>
</template>
