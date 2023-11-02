<script setup lang="ts">
defineProps(["value", "type", "placeholder", "class"]);

defineEmits(["update:value"]);
</script>

<template>
    <input
        :value="value"
        @input="
            $emit('update:value', ($event.target as HTMLInputElement).value)
        "
        :type="type"
        :placeholder="placeholder"
        spellcheck="false"
        autocomplete="off"
        class="my-3 w-full rounded-lg bg-white py-3 px-6 text-sm text-zinc-900 outline-none dark:bg-zinc-900/50 dark:text-zinc-100"
        :class="class"
    />
</template>
