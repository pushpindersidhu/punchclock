<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { addDoc, collection, doc, getDocs, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore';
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

const dates: Ref<Date[]> = ref([]);

watch(week, () => {
    dates.value = [];
    const date = new Date(week.value.start);
    while (date <= week.value.end) {
        dates.value.push(new Date(date));
        date.setDate(date.getDate() + 1);
    }
}, { immediate: true, deep: true });

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
        const unsubscribe = onSnapshot(q, (scheduleSnapshot) => {
            const data = scheduleSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            schedule.value = [];
            employees.value.forEach((emp) => {
                const empSchedule = data.filter((s) => s.uid === emp.uid).sort((a, b) => a.start.toDate().getTime() - b.start.toDate().getTime());
                schedule.value.push({
                    name: emp.name,
                    uid: emp.uid,
                    schedule: dates.value.map((d) => {
                        const s = empSchedule.find((s) => s.start.toDate().getDate() === d.getDate());
                        return {
                            id: s?.id,
                            uid: s?.uid,
                            name: s?.name,
                            date: d,
                            start: s ? s.start.toDate() : null,
                            end: s ? s.end.toDate() : null,
                        };
                    })
                });
            });

            console.log(schedule.value);
        });

        return () => unsubscribe();
    },
    { immediate: true, deep: true });


const colors = [
    "border-blue-500 bg-blue-50",
    "border-red-500 bg-red-50",
    "border-green-500 bg-green-50",
    "border-yellow-500 bg-yellow-50",
    "border-pink-500 bg-pink-50",
    "border-indigo-500 bg-indigo-50",
    "border-purple-500 bg-purple-50",
    "border-slate-500 bg-slate-50",
    "border-sky-500 bg-sky-50",
]

const selectedSchedule: Ref<{
    id: string,
    uid: string,
    name: string,
    date: Date,
    start: Date,
    end: Date,
} | null> = ref(null);

const openModal = (schedule: any) => {
    if (!schedule.start) {
        schedule.start = schedule.date;
        schedule.end = schedule.date;
    }
    selectedSchedule.value = schedule;
}

const saveSchedule = async () => {
    if (!selectedSchedule.value) return;

    if (selectedSchedule.value.start > selectedSchedule.value.end) return alert("Start time cannot be after end time");

    if (!selectedSchedule.value.id) {
        const docRef = await addDoc(collection(firebaseDb, "schedule"), {
            uid: selectedSchedule.value.uid,
            name: selectedSchedule.value.name,
            start: selectedSchedule.value.start,
            end: selectedSchedule.value.end,
        });

        console.log("Document created: ", docRef);
    } else {
        const docRef = doc(firebaseDb, "schedule", selectedSchedule.value.id);
        console.log("start", selectedSchedule.value.start);
        console.log("end", selectedSchedule.value.end);
        await updateDoc(docRef, {
            start: selectedSchedule.value.start,
            end: selectedSchedule.value.end,
        });

        console.log("Document updated: ", docRef);
    }

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
                    class="w-4 h-4 cursor-pointer hover:text-accent-500 select-none" @click="prevWeek" />
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
                <Icon icon="material-symbols:arrow-forward-ios-rounded" class="w-4 h-4 cursor-pointer hover:text-accent-500 select-none"
                    @click="nextWeek" />
            </div>
        </div>

        <div class="flex flex-col mt-8">
            <div class="-m-1.5 overflow-x-auto">
                <div class="p-1.5 min-w-full inline-block align-middle">
                    <div class="border rounded-lg overflow-hidden dark:border-gray-700">
                        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead class="bg-zinc-50 dark:bg-zinc-900 h-16">
                                <tr>
                                    <th scope="col"
                                        class="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase dark:text-gray-400">
                                        Employees</th>
                                    <th scope="col"
                                        class="px-6 py-3 text-center text-xs font-medium text-gray-600 uppercase dark:text-gray-400"
                                        v-for="
                                        date in dates" :key="date.getDate()">
                                        <div class="flex flex-row items-center justify-center">
                                            <div class="text-3xl font-normal">
                                                {{ date.getDate() }}
                                            </div>

                                            <div class="flex flex-col items-center justify-center ml-2">
                                                <div class="text-xs font-semibold">
                                                    {{ date.toLocaleDateString('en-US', { month: 'short' }) }}
                                                </div>
                                                <div class="text-xs font-semibold">
                                                    {{ date.toLocaleDateString('en-US', { weekday: 'short' }) }}
                                                </div>
                                            </div>
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                                <tr v-for="empSchedule, i in schedule" class="h-24">
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                                        <span class="px-2 py-1 rounded-sm border-l-4" :class="colors[i]">
                                            {{ empSchedule.name }}
                                        </span>
                                    </td>
                                    <td class="p-4 whitespace-nowrap text-sm text-gray-800 text-center"
                                        v-for="daySchedule in empSchedule.schedule">
                                        <div class="px-1 py-1 rounded-r text-md border-l-2 cursor-pointer hover:scale-105 transition dark:bg-opacity-10 dark:text-zinc-300 h-12 flex items-center justify-center flex-col"
                                            :class="colors[i]"
                                            @click="openModal({ ...daySchedule, uid: empSchedule.uid, name: empSchedule.name })">
                                            <div class="font-normal" v-if="daySchedule.start">{{
                                                daySchedule.start.toLocaleTimeString('en-US', {
                                                    hour:
                                                        '2-digit', minute: '2-digit'
                                                }) }}</div>
                                            <div class="font-normal" v-if="daySchedule.end">{{
                                                daySchedule.end.toLocaleTimeString('en-US', {
                                                    hour:
                                                        '2-digit', minute: '2-digit'
                                                }) }}</div>

                                            <div v-else>Off</div>
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