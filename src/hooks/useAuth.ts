import { ref, watchEffect } from "vue";
import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

const firebaseAuth = getAuth();

export function useAuth() {
    const currentUser = ref(firebaseAuth.currentUser);

    watchEffect((onInvalidate) => {
        const unsubscribe = onAuthStateChanged(firebaseAuth, (newUser) => {
            currentUser.value = newUser;
        });

        onInvalidate(() => unsubscribe());
    });

    async function signUp(email: string, password: string) {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                firebaseAuth,
                email,
                password
            );
            currentUser.value = userCredential.user;
        } catch (error) {
            console.error(error);
        }
    }

    async function signIn(email: string, password: string) {
        try {
            const userCredential = await signInWithEmailAndPassword(
                firebaseAuth,
                email,
                password
            );
            currentUser.value = userCredential.user;
        } catch (error) {
            console.error(error);
        }
    }

    async function logout() {
        try {
            await signOut(firebaseAuth);
            currentUser.value = null;
        } catch (error) {
            console.error(error);
        }
    }

    return {
        user: currentUser.value,
        signUp,
        signIn,
        signOut: logout,
    };
}
