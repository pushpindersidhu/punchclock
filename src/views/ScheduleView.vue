<script setup lang="ts">
import { Icon } from '@iconify/vue';

const date = new Date();

// weekday date month
const formattedDate = date.toLocaleDateString('en-US', {
    weekday: "short",
    day: 'numeric',
    month: 'short',
});
</script>

<template>
    <div class="w-full">
        <div class="flex flex-row h-16 items-center justify-cente w-full p-8">
            <div class="dark:text-white font-bold text-sm mr-8">Schedule</div>

            <div class="dark:text-white flex flex-row items-center justify-center p-3 bg-zinc-900/50 rounded-lg">
                <Icon icon="material-symbols:arrow-back-ios-new-rounded"
                    class="w-4 h-4 cursor-pointer hover:text-accent-500" />
                <span class="text-sm font-semibold text-accent-400 mx-4 flex flex-row items-center justify-center">{{
                    formattedDate }}
                    <Icon icon="mdi:calendar-month" class="w-4 h-4 ml-2" />
                </span>
                <Icon icon="material-symbols:arrow-forward-ios-rounded"
                    class="w-4 h-4 cursor-pointer hover:text-accent-500" />
            </div>
        </div>
    </div>
</template>