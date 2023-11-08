<script setup lang="ts">
import { Ref, onBeforeUnmount, ref } from 'vue';
import { Icon } from '@iconify/vue';
import { collection, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { firebaseDb } from '../firebase';

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
    uid: string;
    name: string;
    photo: string;
    email: string;
    phone: string;
    start: Date;
    end: Date;
}

const schedules: Ref = ref([]);
const startOfToday = new Date();
startOfToday.setHours(0, 0, 0);
const endOfToday = new Date();
endOfToday.setDate(endOfToday.getDate() + 1);
endOfToday.setHours(0, 0, 0);

console.log(startOfToday, endOfToday);

const q = query(collection(firebaseDb, 'schedule'), where('start', '>=', startOfToday), where('start', '<', endOfToday));
const unsubscibeSchedule = onSnapshot(q, async (snapshot) => {
    const empSnapshot = await getDocs(collection(firebaseDb, "employees"));
    employees.value = empSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    } as Employee));

    schedules.value = [];
    schedules.value = snapshot.docs.map((doc) => {
        const emp = employees.value.find((e) => e.uid === doc.data().uid);

        return {
            id: doc.id,
            ...doc.data(),
            name: emp?.name,
            photo: emp?.photo,
        };
    });

    console.log(schedules.value);
});

onBeforeUnmount(() => {
    unsubscibeSchedule();
});

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
    <div class="p-8 w-full h-full grid grid-cols-2 grid-rows-2 gap-5 bg-zinc-100 dark:bg-zinc-950">
        <div class="w-full h-full grow bg-white rounded-lg flex flex-col px-8 py-4 dark:bg-zinc-900">
            <div class="flex flex-row items-center justify-between border-b border-gray-200 dark:border-gray-600 pb-2">
                <h3 class="text-md font-semibold text-zinc-600 dark:text-zinc-300">Clock In</h3>
                <div
                    class="flex flex-row items-center justify-end py-2 px-2 font-semibold text-sm text-zinc-600 dark:text-zinc-300">
                    {{ time.toLocaleTimeString(
                        [],
                        { hour: '2-digit', minute: '2-digit', hour12: true }
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

        <div class="col-span-2 col-start-1 row-start-2 bg-white dark:bg-zinc-900 rounded-lg overflow-x-scroll">
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
                    <tr v-for="schedule in schedules" class="h-24">
                        <td class="w-24 px-6 py-4">
                            <img :src="schedule.photo" class="h-12 w-12 rounded-full" />
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-zinc-300">
                            {{ schedule.name }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center dark:text-zinc-300">
                            {{ schedule.start.toDate().toLocaleTimeString('en-US', {
                                hour: '2-digit', minute: '2-digit', hour12: true
                            })
                            }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center dark:text-zinc-300">
                            {{ schedule.end.toDate().toLocaleTimeString('en-US', {
                                hour: '2-digit', minute: '2-digit', hour12: true
                            })
                            }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center dark:text-zinc-300">
                            {{ schedule.end.toDate().getHours() - schedule.start.toDate().getHours() }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 text-center dark:text-zinc-300">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="new Date() > schedule.start.toDate() && new Date() < schedule.end.toDate()
                                ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                                {{ new Date() > schedule.start.toDate() && new Date() < schedule.end.toDate() ? 'Clocked In'
                                    : 'Clocked Out' }} </span>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>

        <div class="col-start-2 row-start-1 bg-white dark:bg-zinc-900 rounded-lg px-8 py-4 flex flex-col">
            <div class="flex flex-row items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-2">
                <h3 class="text-md font-semibold text-zinc-600 dark:text-zinc-300">Time Log</h3>
                <div class="flex flex-row items-center justify-end">
                    <button class="text-zinc-500 dark:text-zinc-400 font-semibold text-sm py-2 px-2">
                        Last Week
                    </button>
                </div>

            </div>

            <div class="grow">
                <div class="flex flex-col items-center w-full h-full bg-white dark:bg-zinc-900 py-4">
                    <div class="flex items-end flex-grow w-full mt-2 space-x-2 sm:space-x-3 h-32">
                        <div class="relative flex flex-col items-center flex-grow pb-5 group"
                            v-for="hours, day in weeklyHours">
                            <span class="absolute top-0 hidden -mt-6 text-xs font-bold group-hover:block">{{ hours }}
                                Hrs</span>
                            <div class="relative flex justify-center w-6 bg-accent-500 rounded-md m-4"
                                :style="{ height: `${hours / (maxHours + 4) * 150}px` }">
                            </div>
                            <span class="absolute bottom-0 text-xs font-bold text-zinc-600 dark:text-zinc-300">{{ day
                            }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex flex-row items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                <div class="text-md font-semibold text-zinc-600 dark:text-zinc-300">
                    Total Hours
                </div>

                <div class="text-md font-semibold text-accent-600 mr-2">
                    40
                </div>
            </div>
        </div>
    </div>
</template> 
