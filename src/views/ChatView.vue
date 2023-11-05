<script setup lang="ts">
import { ref, onBeforeUnmount, Ref, watch, nextTick } from 'vue';
import {
    collection,
    orderBy,
    query,
    limitToLast,
    serverTimestamp,
    addDoc,
    onSnapshot,
} from 'firebase/firestore';
import { Icon } from "@iconify/vue";
import Input from '../components/common/Input.vue';
import { firebaseDb } from '../firebase';
import { useAuthStore } from '../stores/auth';
import { User } from 'firebase/auth';
import Message from "../components/Message.vue"
import MessageType from '../types/Message';
const auth = useAuthStore();

const user: User | null = auth.user;

const chatRef = collection(firebaseDb, 'chat');
const chatQuery = query(chatRef, orderBy('createdAt'), limitToLast(20));

const message: Ref<string> = ref('');
const chat: Ref<MessageType[]> = ref([]);
const loading: Ref<boolean> = ref(true);
const error: Ref<Error | undefined> = ref();
const dummy: Ref<HTMLElement | null> = ref(null);

const sendMessage = async () => {
    if (message.value) {
        await addDoc(chatRef, {
            uid: user?.uid,
            text: message.value,
            createdAt: serverTimestamp(),
        });
        message.value = '';
    }
};

const unsubscribe = onSnapshot(chatQuery, (snapshot) => {
    chat.value = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            text: data.text,
            uid: data.uid,
            createdAt: data.createdAt,
        };
    });
    loading.value = false;
}, (err) => {
    console.error(err);
    error.value = err;
});


onBeforeUnmount(() => {
    unsubscribe();
});

const scrollToBottom = () => {
    dummy.value?.scrollIntoView({ behavior: 'smooth' })
};

watch(chat, () => {
    nextTick(() => {
        scrollToBottom();
    });
}, { deep: true });
</script>

<template>
    <div class="flex h-full w-full flex-col">
        <div class="my-1 flex-1 overflow-y-scroll">
            <template v-if="loading">
                <div>Loading...</div>
            </template>
            <template v-else-if="error">
                <div>Error: {{ error.message }}</div>
            </template>
            <template v-else>
                <Message v-for="message in chat" :key="message.id" :message="message" />
            </template>
            <div ref="dummy"></div>
        </div>

        <div class="flex h-12 shrink-0 content-center items-center bg-gray-50 px-4 dark:bg-bunker-1000">
            <div class="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center text-accent-400">
                <Icon icon="bi:emoji-heart-eyes-fill" />
            </div>
            <Input v-model:value="message" @keydown.enter="sendMessage" placeholder="Type a message..."
                class="h-full w-full cursor-text bg-transparent px-4 text-sm font-normal text-bunker-800 placeholder-bunker-500 outline-none selection:bg-gray-300 dark:text-gray-100 dark:placeholder-gray-500 dark:selection:bg-bunker-700" />
            <div @click="sendMessage"
                class="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center text-accent-400">
                <Icon icon="material-symbols:send-rounded" />
            </div>
        </div>
    </div>
</template>
