<script setup lang="ts">
import { defineProps } from 'vue'
defineProps({
    text: String,
    className: String,
    clickHandler: Function
});

</script>

<template>
    <button @click="clickHandler ? clickHandler() : null"
        :class="className ? className : 'my-6 w-full cursor-pointer rounded-lg bg-accent-500 hover:bg-accent-600 py-3 px-6 text-sm text-zinc-900 outline-none dark:bg-accent-500 dark:text-zinc-900 hover:dark:bg-accent-600'">
        {{ text }}
    </button>
</template>