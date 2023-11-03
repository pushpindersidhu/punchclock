import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { firebaseAuth, firebaseDb } from "../firebase";

export async function generateRandomEmployees(num: number) {
    const url = `https://randomuser.me/api/?results=${num}`;
    const res = await fetch(url);
    const data = await res.json();
    const users = data.results;

    for (const user of users) {
        const u = await createUserWithEmailAndPassword(
            firebaseAuth,
            user.email,
            "123456"
        );

        const docRef = await addDoc(collection(firebaseDb, "employees"), {
            uid: u.user.uid,
            name: `${user.name.first} ${user.name.last}`,
            username: user.login.username,
            email: user.email,
            phone: user.phone,
            photo: user.picture.large,
        });

        console.log("Document written: ", docRef);
    }
}
