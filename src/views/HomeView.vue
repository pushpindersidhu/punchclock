<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue';
import { RouterView } from 'vue-router';
</script>

<template>
    <div class="flex flex-row h-full w-full">
        <Sidebar />
        <RouterView />
    </div>
</template>