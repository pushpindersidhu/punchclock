<script setup lang="ts">
import { Icon } from "@iconify/vue";

import { useDark, useToggle } from "@vueuse/core";

const isDark = useDark();
const toggleDark = useToggle(isDark);
</script>

<template>
    <div
        @click="toggleDark()"
        class="w-11 h-7 border-zinc-300 rounded-full bg-gray-200 dark:bg-zinc-900 cursor-pointer relative p-1"
    >
    
        <div
            class="w-5 h-5 flex justify-center items-center text-zinc-900 dark:text-gray-300 dark:bg-zinc-950 p-1 rounded-full bg-white shadow-md absolute top-1 transition"
            :class="{ 'right-1': isDark, 'left-1': !isDark }"
        >
            <Icon icon="material-symbols:dark-mode" v-if="isDark" />
            <Icon icon="material-symbols:light-mode" v-else />
        </div>
    </div>
</template>
