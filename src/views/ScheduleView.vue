<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useEmployeeStore } from '../stores/employee';

const date = new Date();

const weekStart = new Date(date.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1)));
const weekEnd = new Date(date.setDate(date.getDate() - date.getDay() + 7));

console.log(weekStart, weekEnd);

const employees = useEmployeeStore();
const schedule = [
    {
        name: 'Bob',
        schedule: [
            {
                "open": "08:00",
                "close": "17:00",
                "day": "Mon"
            },
            {
                "open": "08:00",
                "close": "17:00",
                "day": "Tue"
            },
            {
                "open": "08:00",
                "close": "17:00",
                "day": "Wed"
            },
            {
                "open": "08:00",
                "close": "17:00",
                "day": "Thu"
            },
            {
                "open": "08:00",
                "close": "17:00",
                "day": "Fri"
            },
            {
                "open": "08:00",
                "close": "17:00",
                "day": "Sat"
            },
            {
                "open": "08:00",
                "close": "17:00",
                "day": "Sun"
            }
        ]
    },
    {
        name: 'Alice',
        schedule: [
            {
                "open": "08:00",
                "close": "17:00",
                "day": "Mon"
            },
            {
                "open": "08:00",
                "close": "17:00",
                "day": "Tue"
            },
            {
                "open": "08:00",
                "close": "17:00",
                "day": "Wed"
            },
            {
                "open": "08:00",
                "close": "17:00",
                "day": "Thu"
            },
            {
                "open": "08:00",
                "close": "17:00",
                "day": "Fri"
            },
            {
                "open": "08:00",
                "close": "17:00",
                "day": "Sat"
            },
            {
                "open": "08:00",
                "close": "17:00",
                "day": "Sun"
            }
        ]
    },
    {
        name: 'John',
        schedule: [
            {
                "open": "08:00",
                "close": "17:00",
                "day": "Mon"
            },
            {
                "open": "08:00",
                "close": "17:00",
                "day": "Tue"
            },
            {
                "open": "08:00",
                "close": "17:00",
                "day": "Wed"
            },
            {
                "open": "08:00",
                "close": "17:00",
                "day": "Thu"
            },
            {
                "open": "08:00",
                "close": "17:00",
                "day": "Fri"
            },
            {
                "open": "08:00",
                "close": "17:00",
                "day": "Sat"
            },
            {
                "open": "08:00",
                "close": "17:00",
                "day": "Sun"
            }
        ]
    },
];

employees.fetchEmployees();

const formattedWeekStart = weekStart.toLocaleDateString('en-US', {
    weekday: "short",
    day: 'numeric',
    month: 'short',
});

const formattedWeekEnd = weekEnd.toLocaleDateString('en-US', {
    weekday: "short",
    day: 'numeric',
    month: 'short',
});


const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const colors = [
    "border-blue-500 bg-blue-100",
    "border-red-500 bg-red-100",
    "border-green-500 bg-green-100",
    "border-yellow-500 bg-yellow-100",
    "border-indigo-500 bg-indigo-100",
    "border-purple-500 bg-purple-100",
    "border-pink-500 bg-pink-100",
    "border-slate-500 bg-slate-100",
    "border-sky-500 bg-sky-100",
]
</script>

<template>
    <div class="w-full p-8 overflow-x-scroll">
        <div class="flex flex-row h-16 items-center justify-cente w-full">
            <div class="dark:text-white font-bold text-sm mr-8">Schedule</div>

            <div
                class="dark:text-white flex flex-row items-center justify-center p-3 bg-zinc-200/50 dark:bg-zinc-900/50 rounded-lg">
                <Icon icon="material-symbols:arrow-back-ios-new-rounded"
                    class="w-4 h-4 cursor-pointer hover:text-accent-500" />
                <span class="text-sm font-semibold text-accent-400 mx-4 flex flex-row items-center justify-center">{{
                    formattedWeekStart }} - {{ formattedWeekEnd }}
                    <Icon icon="mdi:calendar-month" class="w-4 h-4 ml-2" />
                </span>
                <Icon icon="material-symbols:arrow-forward-ios-rounded"
                    class="w-4 h-4 cursor-pointer hover:text-accent-500" />
            </div>
        </div>

        <div class="flex flex-col mt-8">
            <div class="-m-1.5 overflow-x-auto">
                <div class="p-1.5 min-w-full inline-block align-middle">
                    <div class="border rounded-lg overflow-hidden dark:border-gray-700">
                        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead class="bg-zinc-100 dark:bg-zinc-900 h-16">
                                <tr>
                                    <th scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase dark:text-gray-400">
                                        Employees</th>
                                    <th scope="col"
                                        class="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase dark:text-gray-400"
                                        v-for="
                                        day in weekdays" :key="day">
                                        {{ day }}</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                                <tr v-for="s, i in schedule" class="h-24">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                        <span class="px-2 py-1 rounded-sm border-l-4" :class="colors[i]">
                                            {{ s.name }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center"
                                        v-for="d in s.schedule">
                                        <span class="px-3 py-2 rounded-full text-md" :class="colors[i]">
                                            {{ d.open }} - {{ d.close }}
                                        </span>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <!-- <table class="h-auto w-full table-fixed border-[1px] border-collapse rounded-md">
            <thead class="h-16 bg-gray-100">
                <tr>
                    <th
                        class="text-zinc-900 dark:text-zinc-300 text-center font-semibold text-sm rounded-md py-2 border-[1px]">
                        Employees
                    </th>
                    <th class="text-zinc-900 dark:text-zinc-300 text-center font-semibold text-sm rounded-md py-2 border-[1px]"
                        v-for="day in weekdays" :key="day">
                        {{ day }}
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="s in schedule" class="h-16 my-4">
                    <td
                        class="text-zinc-900 dark:text-zinc-300 text-center font-semibold text-sm rounded-md py-2 border-[1px]">
                        {{ s.name }}
                    </td>
                    <td class="text-zinc-900 dark:text-zinc-300 text-center font-semibold text-sm rounded-md py-2 border-[1px]"
                        v-for="i in s.schedule">
                        {{ i.open }} - {{ i.close }}
                    </td>
                </tr>
            </tbody>
        </table> -->


















        <!-- <div class="h-full w-full flex flex-row overflow-auto">

            <div class="flex flex-col grow p-1 gap-2">
                <div class="text-zinc-900 dark:text-zinc-300 flex justify-start font-semibold text-sm rounded-md py-2">
                    Members
                </div>
                <div class="text-white flex items-center justify-start h-16 font-semibold text-sm" v-for="e in employees">
                    <Icon icon="clarity:employee-solid" class="w-6 h-6 mr-3 rounded-full" />
                    {{ e }}
                </div>
            </div>

            <div class="flex flex-col grow p-1 gap-2" v-for="d in data">
                <div class="text-zinc-900 dark:text-zinc-300 flex justify-center font-semibold text-sm rounded-md py-2">
                    <div class="text-3xl font-normal text-zinc-50">{{ d.date }}</div>
                    <div class="flex flex-col text-xs font-normal items-start justify-center ml-3 text-zinc-300">
                        Oct
                        <div>
                            {{ d.weekday }}
                        </div>
                    </div>
                </div>
                <div class="text-white flex flex-col items-center justify-center h-16 text-sm font-semibold bg-zinc-900/75 rounded-md"
                    v-for="e in d.employees">
                    {{ e.name }}
                    <div class="text-xs font-normal dark:text-zinc-200">
                        {{ e.schedule.start }} -
                        {{ e.schedule.end }}
                    </div>
                </div>
            </div>

        </div> -->
    </div>
</template>