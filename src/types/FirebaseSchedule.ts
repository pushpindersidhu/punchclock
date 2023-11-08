import { Timestamp } from "firebase/firestore";

export default interface FirebaseSchedule {
    id: string;
    uid: string;
    start: Timestamp;
    end: Timestamp;
}
