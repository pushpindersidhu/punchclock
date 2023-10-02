<script setup lang="ts">
import SidebarItem from './SidebarItem.vue';

</script>

<template>
    <div class="z-20 flex h-full w-16 shrink-0 flex-col bg-zinc-50 dark:bg-black">
        <SidebarItem icon="material-symbols:chat" tooltip="Chat" class="text-accent-500" link="/chat" />
        <SidebarItem icon="material-symbols:calendar-month-rounded" tooltip="Schedule" class="text-accent-500" link="/schedule" />
    </div>
</template>
