<script setup lang="ts">
import { RouterView } from "vue-router";
import Nav from "./components/Nav.vue";
</script>

<template>
    <div class="w-full h-screen dark:bg-zinc-950 flex flex-col">
        <header>
            <Nav />
        </header>

        <RouterView />
    </div>
</template>
