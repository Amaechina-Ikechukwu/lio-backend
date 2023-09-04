import { getFirestore, Timestamp } from "firebase-admin/firestore";
const AddToGeneral = async (data: any, uid: string, projectId: string) => {
  await getFirestore()
    .collection("general-portfolios")
    .doc(uid)
    .collection("lio")
    .doc(projectId)
    .update(data);
  return;
};
export default async function UpdateProject(data: any, uid: string) {
  const userdata = Object.assign(data, { updatedAt: Timestamp.now() });

  try {
    const firestore = getFirestore(); // Set Firestore settings

    await firestore
      .collection("portfolios")
      .doc(uid)
      .collection("lio")
      .doc(data.projectId)
      .update(userdata);
    await AddToGeneral(userdata, uid, data.projectId);
    return { message: "updated" }; // Returning the result directly
  } catch (error) {
    throw new Error(`Error adding user to database ${error}`);
  }
}
