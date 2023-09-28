<script setup lang="ts">
import SidebarItem from './SidebarItem.vue';
import ChatIcon from './icons/ChatIcon.vue';


</script>

<template>
    <div class="z-20 flex h-full w-16 shrink-0 flex-col dark:bg-zinc-950 border-r-[1px] dark:border-zinc-800">
        <SidebarItem :icon="ChatIcon" tooltip="Chat" class="text-accent-500" />
    </div>
</template>
