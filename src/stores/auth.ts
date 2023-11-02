import { defineStore } from "pinia";
import { Ref, ref as vueRef } from "vue";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    User,
    onAuthStateChanged,
} from "firebase/auth";
import { firebaseAuth, firebaseDb, firebaseStorage } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const useAuthStore = defineStore("auth", () => {
    const user: Ref<User | null> = vueRef(firebaseAuth.currentUser);

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

    async function signUpEmployee({
        name,
        username,
        email,
        phone,
        password,
        photo,
    }: {
        name: string;
        username: string;
        email: string;
        phone: string;
        password: string;
        photo: File | null;
    }) {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                firebaseAuth,
                email,
                password
            );

            let photoUrl =
                "https://firebasestorage.googleapis.com/v0/b/punchclock-dev.appspot.com/o/profile%2FpMDpRPux3FPdWStroEBe4Igbd3I3?alt=media&token=95de603e-5a77-45c7-81c4-7f0b2e0918ea";

            if (photo) {
                const storageRef = ref(
                    firebaseStorage,
                    `profile/${userCredential.user.uid}`
                );

                await uploadBytes(storageRef, photo);

                photoUrl = await getDownloadURL(storageRef);
            }

            const docRef = await addDoc(collection(firebaseDb, "employees"), {
                uid: userCredential.user.uid,
                name: name,
                username: username,
                email: email,
                phone: phone,
                photo: photoUrl,
            });

            console.log("Document written: ", docRef);
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
        signUpEmployee,
    };
});
