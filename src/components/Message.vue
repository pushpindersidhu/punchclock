<script setup lang="ts">
import { defineProps } from 'vue'
import { Icon } from '@iconify/vue'
import MessageType from '../types/Message';

defineProps({
    message: {
        type: Object as () => MessageType,
        required: true,
    },
})

</script>

<template>
    <div class="flex flex-col w-full">
        <div class="flex flex-row items-center">
            <div class="flex flex-row items-center">
                <Icon icon="material-symbols:person" class="w-6 h-6 text-gray-500 dark:text-gray-400" />
                <span class="ml-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                    {{ message.uid }}
                </span>
            </div>
            <span class="ml-2 text-xs text-gray-500 dark:text-gray-400">
                {{ message.createdAt }}
            </span>
        </div>
        <div class="flex flex-row items-center">
            <p class="text-sm text-gray-700 dark:text-gray-200">
                {{ message.text }}
            </p>
        </div>
    </div>
</template>
