import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function submitScore(name, score) {
  await addDoc(collection(db, "scores"), {
    name,
    score,
    createdAt: new Date(),
  });
}
