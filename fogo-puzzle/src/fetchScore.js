import { collection, getDocs, orderBy, query, limit } from "firebase/firestore";
import { db } from "./firebase";

export async function fetchTopScores() {
  const q = query(collection(db, "scores"), orderBy("score", "desc"), limit(10));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => doc.data());
}
