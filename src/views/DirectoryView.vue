<script setup lang="ts">
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import { useEmployeeStore } from '../stores/employee';

const employeeStore = useEmployeeStore();

const fetchUrl = 'https://randomuser.me/api/?results=10';

const employees = ref([]);

const fetchEmployees = async () => {
    const response = await fetch(fetchUrl);
    const data = await response.json();
    employees.value = data.results;
};
fetchEmployees();

</script>

<template>
    <div class="w-full h-full p-8 overflow-scroll">
        <div class="flex flex-row items-center justify-between">
            <h1 class="text-xl font-semibold">Directory</h1>
            <button class="bg-accent-500 text-white text-md px-4 py-2 rounded-lg" @click="fetchEmployees">
                <Icon icon="ic:baseline-add" class="inline-block w-4 h-4 mr-2" />
                Add Employee
            </button>
        </div>

        <div class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 lg:gap-8 gap-4 mt-8">
            <div v-for="emp in employees" class="bg-gray-100 p-8 flex flex-col items-center justify-center rounded-2xl">
                <img :src="emp.picture.large" :alt="emp.name" class="w-40 h-40 rounded-full">
                <p class="mt-4">
                    {{ emp.name.first }} {{ emp.name.last }}
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