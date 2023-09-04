import { getFirestore } from "firebase-admin/firestore";

const deletedProjects = async (data: any, uid: string, projectId: string) => {
  try {
    await getFirestore()
      .collection("deleted")
      .doc(uid)
      .collection("projects")
      .doc(projectId)
      .set(data);
  } catch {}
};
const DeleteFromGeneral = async (data: any) => {
  try {
    await getFirestore()
      .collection("general-portfolios")
      .doc(data.nickname)
      .delete();
    return;
  } catch {}
};
export default async function DeleteProject(
  data: any,
  uid: string,
  projectId: string
) {
  try {
    deletedProjects(data, uid, projectId);
    const firestore = getFirestore(); // Set Firestore settings

    await firestore
      .collection("portfolios")
      .doc(uid)
      .collection("lio")
      .doc(projectId)
      .delete();
    await DeleteFromGeneral(data);
    return { message: "deleted" }; // Returning the result directly
  } catch (error) {
    throw new Error(`Error adding user to database ${error}`);
  }
}
