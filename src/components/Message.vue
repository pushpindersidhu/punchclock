<script setup lang="ts">
import { defineProps } from 'vue'
import { Icon } from '@iconify/vue'
import MessageType from '../types/Message';

const props = defineProps({
    message: {
        type: Object as () => MessageType,
        required: true,
    },
})

const { message } = props;

let timestamp = message.createdAt && new Date(message.createdAt.seconds * 1000).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
});

const today = new Date().toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
});

if (timestamp === today) {
    timestamp = new Date(message.createdAt.seconds * 1000).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    });
}

</script>

<template>
    <div class="flex flex-row w-full m-4">
        <Icon icon="material-symbols:person"
            class="w-10 h-10 text-zinc-500 rounded-full bg-zinc-100 dark:text-zinc-600 dark:bg-zinc-800 p-2" />
        <div class="flex flex-col mx-2">
            <div class="flex flex-row items-center">
                <span class="text-sm font-semibold text-zinc-700 dark:text-gray-200 hover:text-accent-500 cursor-pointer">
                    {{ message.username || "Anonymous" }}
                </span>
                <span class="mx-2 text-xs text-zinc-500 dark:text-gray-400 ">
                    {{ timestamp || "Just now" }}
                </span>
            </div>
            <p
                class="mt-1 text-sm text-gray-700 dark:text-gray-200 bg-gray-100 w-fit rounded-xl rounded-tl-none p-2 dark:bg-zinc-800 max-w-xl">
                {{ message.text }}
            </p>
        </div>

    </div>
</template>
