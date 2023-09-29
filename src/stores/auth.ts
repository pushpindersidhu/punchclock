import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    User,
    onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth } from "../firebase";

export const useAuthStore = defineStore("auth", () => {
    const user: Ref<User | null> = ref(firebaseAuth.currentUser);

    onAuthStateChanged(firebaseAuth, (u) => {
        user.value = u;
    });

    async function signIn(email: string, password: string) {
        try {
            const userCredential = await signInWithEmailAndPassword(
                firebaseAuth,
                email,
                password
            );
            user.value = userCredential.user;
        } catch (err) {
            console.error(err);
        }
    }

    async function signUp(email: string, password: string) {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                firebaseAuth,
                email,
                password
            );
            user.value = userCredential.user;
        } catch (err) {
            console.error(err);
        }
    }

    async function logout() {
        try {
            await signOut(firebaseAuth);
            user.value = null;
        } catch (err) {
            console.error(err);
        }
    }

    return {
        user,
        signIn,
        signUp,
        signOut: logout,
    };
});
