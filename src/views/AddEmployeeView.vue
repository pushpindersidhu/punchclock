<script setup lang="ts">
import Input from '../components/common/Input.vue';
import { Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const auth = useAuthStore();

const name = ref('');
const email = ref('');
const username = ref('');
const phone = ref('');
const password = ref('');
const confirmPassword = ref('');
const photo: Ref<File | null> = ref(null);
const photoUrl = ref("https://via.placeholder.com/150");

const addEmployee = () => {
    if (!validate()) {
        return;
    }

    auth.signUpEmployee({
        name: name.value,
        email: email.value,
        username: username.value,
        phone: phone.value,
        password: password.value,
        photo: photo.value
    }).then(() => router.push('/employees'
    )).catch((error) => console.log(error));
}

const validate = () => {
    if (name.value === '') {
        alert('Name is required');
        return false;
    }

    if (email.value === '') {
        alert('Email is required');
        return false;
    }

    if (username.value === '') {
        alert('Username is required');
        return false;
    }

    if (phone.value === '') {
        alert('Phone is required');
        return false;
    }

    if (password.value.length < 6) {
        alert('Password must be at least 6 characters');
        return false;
    }

    if (password.value !== confirmPassword.value) {
        alert('Password and Confirm Password must be same');
        return false;
    }

    return true;
}

const cancel = () => {
    router.push('/employees');
};

const handleChange = (event: Event) => {
    const element = (event.target as HTMLInputElement)
    if (element.files) {
        const reader = new FileReader();
        photo.value = element.files[0];

        reader.onload = (e) => {
            const target = e.target as FileReader;
            photoUrl.value = target.result as string;
        };

        reader.readAsDataURL(element.files[0]);
    }
}

</script>


<template>
    <div class="w-full h-full p-8 sm:p-4 overflow-scroll flex items-center justify-center">
        <div class="max-w-2xl md:p-8 rounded-lg w-full">
            <h1 class="text-lg font-semibold text-gray-700 text-center mt-8">
                Add Employee
            </h1>

            <label class="flex flex-col items-start mt-8 hover:cursor-pointer w-fit mx-auto">
                <img :src="photoUrl" alt="placeholder" class="w-32 h-32 rounded-full object-cover" />
                <input v-on:change="handleChange" type="file" id="image" name="image" accept="image/png, image/jpeg"
                    class="my-0 bg-zinc-50 shadow-md hidden" />
            </label>
            <div class="w-full flex lg:flex-row flex-col">
                <div class="flex flex-col items-start w-full lg:mr-2 mt-8">
                    <label class="text-sm font-semibold my-1" for="name">Full Name</label>
                    <Input v-model:value="name" id="name" type="text" placeholder="Full Name"
                        class="my-0 bg-zinc-50 shadow-md" />
                </div>
                <div class="flex flex-col items-start w-full lg:ml-2 mt-8">
                    <label class="text-sm font-semibold my-1" for="username">Username</label>
                    <Input v-model:value="username" id="username" type="username" placeholder="Username"
                        class="my-0 bg-zinc-50 shadow-md" />
                </div>
            </div>
            <div class="flex flex-col items-start w-full mt-8">
                <label class="text-sm font-semibold my-1" for="email">Email</label>
                <Input v-model:value="email" id="email" type="email" placeholder="Email"
                    class="my-0 bg-zinc-50 shadow-md" />
            </div>
            <div class="flex flex-col items-start w-full mt-8">
                <label class="text-sm font-semibold my-1" for="phone">Phone</label>
                <Input v-model:value="phone" id="phone" type="number" placeholder="Phone"
                    class="my-0 bg-zinc-50 shadow-md" />
            </div>

            <div class="w-full flex lg:flex-row flex-col mt-0">
                <div class="flex flex-col items-start w-full lfmr-2 lg:mr-2 mt-8">
                    <label class="text-sm font-semibold my-1" for="password">Password</label>
                    <Input v-model:value="password" id="password" type="password" placeholder="Password"
                        class="my-0 bg-zinc-50 shadow-md" />
                </div>
                <div class="flex flex-col items-start w-full lg:ml-2 mt-8">
                    <label class="text-sm font-semibold my-1" for="confirmPassword">Confirm Password</label>
                    <Input v-model:value="confirmPassword" id="confirmPassword" type="password"
                        placeholder="Confirm Password" class="my-0 bg-zinc-50 shadow-md" />
                </div>
            </div>

            <div class="flex flex-row w-full mt-8">
                <button
                    class="flex flex-row items-center justify-center w-1/2 py-3 bg-green-500 rounded-md shadow-md text-white font-semibold mr-2 text-sm"
                    @click="addEmployee">
                    Add Employee
                </button>
                <button
                    class="flex flex-row items-center justify-center w-1/2 py-3 bg-red-500 rounded-md shadow-md text-white font-semibold text-sm ml-2"
                    @click="cancel">
                    Cancel
                </button>
            </div>
        </div>
    </div>
</template>