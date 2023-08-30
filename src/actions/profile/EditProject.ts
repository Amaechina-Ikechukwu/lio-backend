import { getFirestore, Timestamp } from "firebase-admin/firestore";
export default async function UpdateProjects(
  data: any,
  uid: string,
  projectId: string
) {
  const userdata = Object.assign(data, { updatedAt: Timestamp.now() });

  try {
    const firestore = getFirestore(); // Set Firestore settings

    await firestore
      .collection("portfolios")
      .doc(uid)
      .collection("lio")
      .doc(projectId)
      .update(userdata);

    return { message: "updated" }; // Returning the result directly
  } catch (error) {
    throw new Error(`Error adding user to database ${error}`);
  }
}
