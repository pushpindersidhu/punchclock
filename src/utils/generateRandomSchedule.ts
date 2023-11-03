import { Timestamp, addDoc, collection } from "firebase/firestore";
import { firebaseDb } from "../firebase";

export default function generateRandomSchedule() {
    const uids = [
        "3TZK7cfFDydTGT308JRQeZuS5Xk2",
        "rFgert0Xj9UtBBY4PJ6qW9KDco12",
        "ABYoGthPAgYS4TyBcixJiq6JPA33",
        "xNrAdQaC5UTjSJNZF77zeqxl2Iz2",
        "JOB8hkxkA1Ou9lHjVId2TwdvVpm2",
    ];

    interface Schedule {
        uid: string;
        start: Timestamp;
        end: Timestamp;
    }

    const ref = collection(firebaseDb, "schedule");

    const date = new Date();
    const weekStart = new Date(
        date.setDate(
            date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1)
        )
    );
    const weekEnd = new Date(date.setDate(date.getDate() - date.getDay() + 7));
    const schedule = uids.map((uid) => {
        const start = new Date(
            weekStart.getTime() +
                Math.random() * (weekEnd.getTime() - weekStart.getTime())
        );
        const end = new Date(start.getTime() + 1000 * 60 * 60 * 8);
        return {
            uid,
            start: Timestamp.fromDate(start),
            end: Timestamp.fromDate(end),
        } as Schedule;
    });

    for (const item of schedule) {
        addDoc(ref, item);
    }

    console.log("Random schedule generated");
}
