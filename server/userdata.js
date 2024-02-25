import { app, firebaseConfig } from "./firebaseConfig.js";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
const db = getFirestore(app);
export async function getUserProfile(userId) {
  const doc = await getDoc(db, "userProfiles", userId);
  if (doc.data() != null) {
    console.log("this is the data that's needed", doc.data());
  } else return null;
}
export async function createUserProfile(userData) {
  const userId = generateRandomString();
  await setDoc(doc(db, "userProfiles", userId), {
    ...userData,
  });
  return userId;
}
export async function createPaymentProfile(userCard) {
  await setDoc(doc(db, "cardDetails", userCard["userId"]), {
    ...userCard,
  });
}
export async function getUsersPaymentProfile(userId) {
  const docRef = doc(db, "cardDetails", userId);
  const gottenDoc = await getDoc(docRef);
  if (gottenDoc.data() != null) {
    console.log("this is the data that's needed", gottenDoc.data());
    return gottenDoc.data();
  } else return null;
}
function generateRandomString() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";
  const length = 8;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

// Example usage:
const randomString = generateRandomString();
console.log(randomString);
