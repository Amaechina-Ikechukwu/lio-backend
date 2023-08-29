import { getFirestore } from "firebase-admin/firestore";
export default async function GetUserProjects(uid: string) {
  try {
    let userportfolio = [];
    const firestore = getFirestore(); // Set Firestore settings

    const doc = await firestore.collection("portfolio").doc(uid).get();
    if (!doc.exists) {
      userportfolio.push();
    } else {
      userportfolio.push({ id: doc.id, ...doc.data() });
    }

    return { userportfolio: userportfolio };
  } catch (error) {
    throw new Error(`Error adding user to database ${error}`);
  }
}
