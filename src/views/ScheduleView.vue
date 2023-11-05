<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { collection, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { Ref, onMounted, ref, watch } from 'vue';
import { firebaseDb } from '../firebase';
import ScheduleModal from '../components/ScheduleModal.vue';

const date = new Date();

const week: Ref<{ start: Date, end: Date }> = ref({
    start: new Date(date.setDate(date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1))),
    end: new Date(date.setDate(date.getDate() - date.getDay() + 7))
});

const nextWeek = () => {
    week.value = {
        start: new Date(week.value.start.setDate(week.value.start.getDate() + 7)),
        end: new Date(week.value.end.setDate(week.value.end.getDate() + 7))
    };
}

const prevWeek = () => {
    week.value = {
        start: new Date(week.value.start.setDate(week.value.start.getDate() - 7)),
        end: new Date(week.value.end.setDate(week.value.end.getDate() - 7))
    };
}

const schedule: any = ref([]);

const employees: Ref<Employee[]> = ref([]);

onMounted(async () => {
    const empSnapshot = await getDocs(collection(firebaseDb, "employees"));
    employees.value = empSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    } as Employee));
})

watch([week, employees],
    async () => {
        const q = query(collection(firebaseDb, "schedule"), where("start", ">=", week.value.start), where("start", "<=", week.value.end), orderBy("start"));
        const scheduleSnapshot = await getDocs(q);

        const data = scheduleSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));

        schedule.value = [];
        employees.value.forEach((emp) => {
            const empSchedule = data.filter((s) => s.uid === emp.uid);
            schedule.value.push({
                name: emp.name,
                uid: emp.uid,
                schedule: empSchedule.map((s) => ({
                    id: s.id,
                    start: s.start.toDate(),
                    end: s.end.toDate(),
                    day: s.start.toDate().toLocaleDateString('en-US', { weekday: 'short' }),
                })),
            });
        });
    }, { immediate: true, deep: true });


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

const selectedSchedule: Ref<{
    id: string,
    uid: string,
    name: string,
    start: Date,
    end: Date,
} | null> = ref(null);

const openModal = (schedule: any) => {
    selectedSchedule.value = schedule;
}

const saveSchedule = async () => {
    if (!selectedSchedule.value) return;

    const docRef = doc(firebaseDb, "schedule", selectedSchedule.value.id);
    await updateDoc(docRef, {
        start: selectedSchedule.value.start,
        end: selectedSchedule.value.end,
    });

    console.log("Document updated with ID: ", docRef.id);
    selectedSchedule.value = null;
}

const onStartChange = (e: Event) => {
    if (!selectedSchedule.value) return;

    const target = e.target as HTMLInputElement;

    selectedSchedule.value.start = new Date(`${week.value.start.toISOString().substring(0, 10)}T${target.value}:00`);
}

const onEndChange = (e: Event) => {
    if (!selectedSchedule.value) return;

    const target = e.target as HTMLInputElement;

    selectedSchedule.value.end = new Date(`${week.value.start.toISOString().substring(0, 10)}T${target.value}:00`);
}


</script>

<template>
    <div class="w-full p-8 overflow-x-scroll">
        <ScheduleModal v-if="selectedSchedule" :schedule="selectedSchedule" @close="selectedSchedule = null"
            @save="saveSchedule" :onStartChange="onStartChange" :onEndChange="onEndChange" />
        <div class="flex flex-row h-16 items-center justify-cente w-full">
            <div class="dark:text-white font-bold text-sm mr-8">Schedule</div>
            <div
                class="dark:text-white flex flex-row items-center justify-center p-3 bg-zinc-200/50 dark:bg-zinc-900/50 rounded-lg">
                <Icon icon="material-symbols:arrow-back-ios-new-rounded"
                    class="w-4 h-4 cursor-pointer hover:text-accent-500" @click="prevWeek" />
                <span class="text-sm font-semibold text-accent-500 mx-4 flex flex-row items-center justify-center">
                    {{
                        week.start.toLocaleDateString('en-US', {
                            weekday: "short",
                            day: 'numeric',
                            month: 'short',
                        }) }}
                    -
                    {{ week.end.toLocaleDateString('en-US', {
                        weekday: "short",
                        day: 'numeric',
                        month: 'short',
                    }) }}
                    <Icon icon="mdi:calendar-month" class="w-4 h-4 ml-2" />
                </span>
                <Icon icon="material-symbols:arrow-forward-ios-rounded" class="w-4 h-4 cursor-pointer hover:text-accent-500"
                    @click="nextWeek" />
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
                                        <div class="px-1 py-1 rounded-r text-md border-l-2 cursor-pointer hover:scale-105 transition"
                                            :class="colors[i]" @click="openModal({ ...d, uid: s.uid, name: s.name })">
                                            <div class="font-normal">{{ d.start.toLocaleTimeString('en-US', {
                                                hour:
                                                    '2-digit', minute: '2-digit'
                                            }) }}</div>
                                            <div class="font-normal">{{ d.end.toLocaleTimeString('en-US', {
                                                hour:
                                                    '2-digit', minute: '2-digit'
                                            }) }}</div>
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