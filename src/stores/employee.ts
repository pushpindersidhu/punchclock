import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { firebaseDb } from "../firebase";
import { collection, getDocs, query } from "firebase/firestore";

export const useEmployeeStore = defineStore("employee", () => {
    const employees: Ref<any[]> = ref([]);

    async function fetchEmployees() {
        try {
            const q = query(collection(firebaseDb, "employees"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                employees.value.push(doc.data());
            });
            console.log(employees.value);
        } catch (err) {
            console.error(err);
        }
    }

    return {
        employees,
        fetchEmployees,
    };
});
