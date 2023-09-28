<script setup lang="ts">
import Input from "../components/common/Input.vue";
import Button from "../components/common/Button.vue";
import { RouterLink, useRouter } from "vue-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";

import { firebaseApp } from "../firebase";

const email = ref("");
const password = ref("");

const router = useRouter();

const signIn = async () => {
    const auth = getAuth(firebaseApp);
    await signInWithEmailAndPassword(auth, email.value, password.value);
    if (auth.currentUser) {
        router.push("/");
    } else {
        alert("Invalid credentials");
    }
};

</script>

<template>
    <div class="z-10 flex h-screen w-screen items-center justify-center bg-white backdrop-blur dark:bg-black/50">
        <div class="flex w-full max-w-sm flex-col items-center rounded-lg bg-zinc-100 p-8 shadow-lg dark:bg-zinc-950">
            <h1 class="text-md m-4 py-2 font-bold text-zinc-800 dark:text-zinc-300">
                Sign In
            </h1>

            <Input v-model:value="email" placeholder="Email" type="email" />
            <Input v-model:value="password" placeholder="Password" type="password" />

            <Button text="Sign in" @click="signIn" />

            <div class="mt-4 text-sm text-gray-400">
                Don't have an account ?
                <RouterLink to="/signup" class="text-accent-500 hover:underline">
                    Sign up
                </RouterLink>
            </div>
        </div>
    </div>
</template>
