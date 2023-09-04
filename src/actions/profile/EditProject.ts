import { getFirestore, Timestamp } from "firebase-admin/firestore";
const AddToGeneral = async (data: any, uid: string, projectId: string) => {
  await getFirestore()
    .collection("general-portfolios")
    .doc(data.nickname)
    .update(data);
  return;
};
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
    await AddToGeneral(userdata, uid, projectId);
    return { message: "updated" }; // Returning the result directly
  } catch (error) {
    throw new Error(`Error adding user to database ${error}`);
  }
}
