import { getFirestore, Timestamp } from "firebase-admin/firestore";
export default async function UpdateUserProfile(uid: string, data: any) {
  const userdata = Object.assign(data, {
    updatedAt: Timestamp.now(),
    username: data.displayName.trim().toLowerCase().split(" ").join("-"),
  });

  try {
    const firestore = getFirestore(); // Set Firestore settings

    await firestore.collection("profile").doc(uid).update(userdata);

    return { message: "updated" }; // Returning the result directly
  } catch (error) {
    throw new Error(`Error adding user to database ${error}`);
  }
}
