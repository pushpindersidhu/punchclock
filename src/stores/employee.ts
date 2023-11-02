import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { firebaseDb } from "../firebase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";

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

    async function addEmployee(employee: Employee) {
        try {
            const docRef = await addDoc(collection(firebaseDb, "employees"), {
                ...employee,
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (err) {
            console.error(err);
        }
    }

    fetchEmployees();

    return {
        employees,
        fetchEmployees,
        addEmployee,
    };
});
