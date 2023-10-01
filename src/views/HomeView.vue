<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue';
import { RouterView } from 'vue-router';
</script>

<template>
    <div class="flex flex-row h-full w-full overflow-hidden">
        <Sidebar />
        <RouterView />
    </div>
</template>