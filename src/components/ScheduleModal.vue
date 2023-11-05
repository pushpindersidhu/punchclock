<script setup lang="ts">
import { PropType } from 'vue';


interface Schedule {
    id: string;
    uid: string;
    name: string;
    start: Date;
    end: Date;
}

defineProps({
    schedule: {
        type: Object as PropType<Schedule>,
        required: true,
    },
    onStartChange: {
        type: Function as PropType<(e: Event) => void>,
        required: true,
    },
    onEndChange: {
        type: Function as PropType<(e: Event) => void>,
        required: true,
    },
});

</script>


<template>
    <div class="absolute top-0 left-0 w-full h-full bg-black/75 z-50 flex items-center justify-center"
        @click="$emit('close')">
        <div class="bg-white dark:bg-zinc-900 rounded-lg shadow-lg max-w-md w-full p-4" @click.stop>
            <h1 class="text-xl font-semibold text-gray-800 dark:text-zinc-100 text-center mt-8">{{ schedule.name }}</h1>

            <div class="flex flex-row items-center justify-center m-2">
                <span class="px-4 py-2 text-md font-semibold text-zinc-600">{{
                    schedule.start.toLocaleDateString('en-US', {
                        weekday: "long",
                        day: 'numeric',
                        month: 'long',
                    })
                }}</span>
            </div>
            <div class="flex flex-row items-center justify-center m-2">
                <label class="w-12 text-md m-4 font-semibold text-gray-800 dark:text-zinc-100">Start</label>
                <input type="time" class="px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-800" :value="schedule.start.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
                        " @input="onStartChange" step="60" />
            </div>
            <div class="flex flex-row items-center justify-center m-2">
                <label class="w-12 text-md m-4 font-semibold text-gray-800 dark:text-zinc-100">End</label>
                <input type="time" class="px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-800"
                    :value="schedule.end.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })"
                    @input="onEndChange" step="60" />
            </div>

            <div class="flex flex-row items-center justify-center w-full mt-8">
                <button
                    class="m-2 px-4 py-2 rounded-md dark:border-zinc-800 bg-red-500 text-white font-semibold hover:bg-red-600 w-full"
                    @click="$emit('close')">
                    Cancel
                </button>
                <button
                    class="m-2 px-4 py-2 rounded-md dark:border-zinc-800 bg-green-500 text-white font-semibold hover:bg-green-600 w-full"
                    @click="$emit('save')">
                    Save
                </button>
            </div>
        </div>
    </div>
</template>