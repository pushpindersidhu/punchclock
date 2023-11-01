import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { firebaseDb } from "../firebase";
import { collection, getDocs, query } from "firebase/firestore";

export const useScheduleStore = defineStore("schedule", () => {
    const schedules: Ref<any[]> = ref([]);

    async function fetchSchedule() {
        try {
            const q = query(collection(firebaseDb, "schedule"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                schedules.value.push(doc.data());
            });
            console.log(schedules.value);
        } catch (err) {
            console.error(err);
        }
    }

    return {
        schedules,
        fetchSchedule,
    };
});
