import { getFirestore, Timestamp } from "firebase-admin/firestore";

export default async function ProjectClicks(uid: string, projectId: string) {
  // Creating a new object with the timestamp field
  const timestamp = Timestamp.now();

  try {
    const firestore = getFirestore();
    // Set Firestore settings

    await firestore
      .collection("clicks")
      .doc(uid)
      .collection(projectId)
      .doc()
      .set({ timestamp });

    return "done"; // Returning the result directly
  } catch (error) {
    throw new Error(`Error adding user to database ${error}`);
  }
}
