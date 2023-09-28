<script setup lang="ts">
import Input from "../components/common/Input.vue";
import Button from "../components/common/Button.vue";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { firebaseApp } from "../firebase";

const auth = getAuth(firebaseApp);
const router = useRouter();

const email = ref("");
const password = ref("");
const confirmPassword = ref("");

function signUp() {
    if (email.value === "") {
        alert("Email cannot be empty");
        return;
    }
    
    if (password.value.length < 6) {
        alert("Password must be at least 6 characters");
        return;
    }

    if (password.value !== confirmPassword.value) {
        alert("Passwords do not match");
        return;
    }

    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((_userCredential) => {
            router.push("/");
        })
        .catch((error) => {
            console.log(error);
        });
}
</script>

<template>
    <div class="z-10 flex h-full w-full items-center justify-center bg-white backdrop-blur dark:bg-black/50">
        <div class="flex w-full max-w-sm flex-col items-center rounded-lg bg-zinc-100 p-8 shadow-lg dark:bg-zinc-950">
            <h1 class="text-md m-4 py-2 font-bold text-zinc-800 dark:text-zinc-300">
                Register
            </h1>

            <Input v-model:value="email" placeholder="Email" type="email" />
            <Input v-model:value="password" placeholder="Password" type="password" />
            <Input v-model:value="confirmPassword" placeholder="Confirm Password" type="password" />

            <Button text="Register" :clickHandler="signUp" />

            <div class="mt-4 text-sm text-gray-400">
                Already have an account ?
                <RouterLink to="/signin" class="text-accent-500 hover:underline">
                    Sign in
                </RouterLink>
            </div>
        </div>
    </div>
</template>
2
