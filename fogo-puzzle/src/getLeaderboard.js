import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "./firebase";

export async function getTopScores() {
  const q = query(collection(db, "scores"), orderBy("time"), limit(10));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
