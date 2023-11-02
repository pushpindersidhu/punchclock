<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useEmployeeStore } from '../stores/employee';
import { RouterLink } from 'vue-router';

const employeeStore = useEmployeeStore();
</script>

<template>
    <div class="w-full h-full p-8 overflow-scroll">
        <div class="flex flex-row items-center justify-between">
            <h1 class="text-xl font-semibold">Directory</h1>
            <RouterLink class="bg-accent-500 text-white text-md px-4 py-2 rounded-lg" to="employees/add">
                <Icon icon="ic:baseline-add" class="inline-block w-4 h-4 mr-2" />
                Add Employee
            </RouterLink>
        </div>
        <div class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 lg:gap-8 gap-4 mt-8">
            <div v-for="emp in employeeStore.employees" class="bg-gray-100 p-8 flex flex-col items-center justify-center rounded-2xl">
                <img :src="emp.photo" :alt="emp.name" class="w-40 h-40 rounded-full object-cover" v-if="emp.photo">
                <Icon icon="material-symbols:person" class="w-40 h-40 rounded-full bg-white text-zinc-200 p-8" v-else />
                <p class="mt-4">
                    {{ emp.name }}
                </p>

                <a class="mt-2 text-sm text-gray-500 hover:text-gray-900 cursor-pointer text-ellipsis"
                    :href="'mailto:' + emp.email">
                    <Icon icon="ic:baseline-email" class="inline-block w-4 h-4 mr-2" />
                    {{ emp.email }}
                </a>

                <a class="mt-2 text-sm text-gray-500 hover:text-gray-900 cursor-pointer" :href="'tel:' + emp.phone">
                    <Icon icon="ic:baseline-phone" class="inline-block w-4 h-4 mr-2
                    " />
                    {{ emp.phone }}
                </a>
            </div>
        </div>
    </div>
</template>