<script setup lang="ts">
import { Ref, onBeforeUnmount, ref } from 'vue';
import { Icon } from '@iconify/vue';

const time = ref(new Date());

const interval = setInterval(() => {
    time.value = new Date();
}, 1000);

onBeforeUnmount(() => {
    clearInterval(interval);
});

const employees: Ref<Employee[]> = ref([]);

interface Employee {
    id: string;
    name: string;
    photo: string;
    start: string;
    end: string;
}

employees.value = [
    {
        id: '1',
        name: 'John Doe',
        photo: 'https://i.pravatar.cc/250',
        start: '09:00',
        end: '17:00',
    },
    {
        id: '2',
        name: 'Jane Smith',
        photo: 'https://i.pravatar.cc/250',
        start: '10:00',
        end: '18:00',
    },
    {
        id: '3',
        name: 'Alice Johnson',
        photo: 'https://i.pravatar.cc/250',
        start: '08:00',
        end: '16:00',
    },
    {
        id: '4',
        name: 'Bob Williams',
        photo: 'https://i.pravatar.cc/250',
        start: '11:00',
        end: '19:00',
    },
    {
        id: '5',
        name: 'Charlie Brown',
        photo: 'https://i.pravatar.cc/250',
        start: '09:30',
        end: '17:30',
    },
];

const weeklyHours = {
    'Mon': 8,
    'Tue': 8,
    'Wed': 8,
    'Thu': 8,
    'Fri': 8,
    'Sat': 0,
    'Sun': 0,
};

const maxHours = Math.max(...Object.values(weeklyHours));

</script>

<template>
    <div class="p-8 w-full h-full grid grid-cols-2 grid-rows-2 gap-5 bg-zinc-100">
        <div class="w-full h-full grow bg-white rounded-lg flex flex-col px-8 py-4">
            <div class="flex flex-row items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                <h3 class="text-md font-semibold text-zinc-600">Clock In</h3>
                <div class="flex flex-row items-center justify-end py-2 px-2 font-semibold text-sm text-zinc-600">
                    {{ time.toLocaleTimeString(
                        [],
                        { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }
                    ) }}
                </div>
            </div>

            <div class="flex flex-row items-center justify-evenly grow">
                <button
                    class="flex flex-col items-center justify-center bg-accent-500 hover:bg-accent-700 text-white font-semibold text-sm py-2 px-4 rounded-full w-32 h-32">
                    <Icon icon="ic:baseline-alarm" class="w-8 h-8" />
                    <span class="mt-2">Clock In</span>
                </button>

                <button
                    class="flex flex-col items-center justify-center bg-red-500 hover:bg-red-700 text-white font-semibold text-sm py-2 px-4 rounded-full w-32 h-32">
                    <Icon icon="ic:baseline-alarm-off" class="w-8 h-8" />
                    <span class="mt-2">Request Timeoff</span>
                </button>
            </div>
        </div>

        <div class="col-span-2 col-start-1 row-start-2 bg-white rounded-lg overflow-x-scroll">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="h-16">
                    <tr>
                        <th scope="col" class="w-24 px-6 py-4">
                        </th>
                        <th scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase dark:text-gray-400">
                            Employee</th>

                        <th scope="col"
                            class="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase dark:text-gray-400">
                            Start</th>
                        <th scope="col"
                            class="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase dark:text-gray-400">
                            End</th>
                        <th scope="col"
                            class="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase dark:text-gray-400">
                            Total Hours</th>
                        <th scope="col"
                            class="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase dark:text-gray-400">
                            Status</th>

                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr v-for="emp in employees" class="h-24">
                        <td class="w-24 px-6 py-4">
                            <img :src="emp.photo" class="h-12 w-12 rounded-full" />
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                            {{ emp.name }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center">
                            {{ emp.start }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center">
                            {{ emp.end }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center">
                            8
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                                :class="emp.start !== '10:00' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                                {{ emp.start !== '10:00' ? 'Working' : 'Not Working' }}
                            </span>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>

        <div class="col-start-2 row-start-1 bg-white rounded-lg px-8 py-4 flex flex-col">
            <div class="flex flex-row items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                <h3 class="text-md font-semibold text-zinc-600">Time Log</h3>
                <div class="flex flex-row items-center justify-end">
                    <button class="text-accent-500 hover:text-accent-700 font-semibold text-sm py-2 px-2">
                        Day
                    </button>
                    <div class="h-4 w-px bg-gray-300 mx-2"></div>
                    <button class="text-zinc-600 hover:text-accent-700 font-medium text-sm py-2 px-2">
                        Week
                    </button>
                </div>

            </div>

            <div class="grow">
                <div class="flex flex-col items-center w-full h-full bg-white py-4">
                    <div class="flex items-end flex-grow w-full mt-2 space-x-2 sm:space-x-3 h-32">
                        <div class="relative flex flex-col items-center flex-grow pb-5 group"
                            v-for="hours, day in weeklyHours">
                            <span class="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">{{ hours }}
                                Hrs</span>
                            <div class="relative flex justify-center w-6 bg-indigo-400 rounded-md m-4"
                                :style="{ height: `${hours / (maxHours + 4) * 150}px` }">
                            </div>
                            <span class="absolute bottom-0 text-xs font-bold text-zinc-600">{{ day }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex flex-row items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                <div class="text-md font-semibold text-zinc-600">
                    Total Hours
                </div>

                <div class="text-md font-semibold text-accent-600 mr-2">
                    40
                </div>
            </div>
        </div>
    </div>
</template> 
