<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { Ref, onMounted, ref } from 'vue';
import { firebaseDb } from '../firebase';

const date = new Date();

const weekStart = new Date(date.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1)));
const weekEnd = new Date(date.setDate(date.getDate() - date.getDay() + 7));

console.log(weekStart, weekEnd);

const schedule: any = ref([]);

const employees: Ref<Employee[]> = ref([]);

onMounted(async () => {
    const empSnapshot = await getDocs(collection(firebaseDb, "employees"));
    employees.value = empSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    } as Employee));

    const q = query(collection(firebaseDb, "schedule"), where("start", ">=", weekStart), where("start", "<=", weekEnd), orderBy("start"));
    const scheduleSnapshot = await getDocs(q);

    const data = scheduleSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));

    console.log(data);

    employees.value.forEach((emp) => {
        const empSchedule = data.filter((s) => s.uid === emp.uid);

        schedule.value.push({
            name: emp.name,
            schedule: empSchedule.map((s) => ({
                open: s.start.toDate().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                close: s.end.toDate().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                day: s.start.toDate().toLocaleDateString('en-US', { weekday: 'short' }),
            })),
        });
    });

    console.log(schedule.value);
});

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
                <span class="text-sm font-semibold text-accent-500 mx-4 flex flex-row items-center justify-center">{{
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
                                    <td class="p-4 whitespace-nowrap text-sm text-gray-800 text-center"
                                        v-for="d in s.schedule">
                                        <div class="px-1 py-1 rounded-r text-md border-l-2" :class="colors[i]">
                                            <div class="font-normal">{{ d.open }}</div>
                                            <div class="font-normal">{{ d.close }}</div>
                                        </div>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>