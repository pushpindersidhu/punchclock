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
    <div class="flex flex-row w-full my-2">
        <Icon icon="mdi:account-circle"
            class="w-10 h-10 text-zinc-500 rounded-full bg-zinc-100 dark:text-zinc-400" />
        <div class="flex flex-col mx-2">
            <div class="flex flex-row items-center">
                <span class="text-sm font-semibold text-zinc-700 dark:text-gray-200 hover:text-accent-500 cursor-pointer">
                    {{ "Sidhu" }}
                </span>
                <span class="mx-2 text-xs text-zinc-500 dark:text-gray-400">
                    {{ timestamp }}
                </span>
            </div>
            <p class="text-sm text-gray-700 dark:text-gray-200 bg-gray-100 w-fit rounded-xl rounded-tl-none p-2">
                {{ message.text }}
            </p>
        </div>

    </div>
</template>
