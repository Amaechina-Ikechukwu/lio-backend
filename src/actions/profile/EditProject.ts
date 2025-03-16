import { getFirestore, Timestamp } from "firebase-admin/firestore";

const AddToGeneral = async (data: any, projectId: string) => {
  try {
    await getFirestore()
      .collection("general-portfolios")
      .doc(projectId)
      .update(data);
  } catch (error: any) {
    console.error(`Error updating general-portfolios: ${error.message}`);
    throw new Error(`Error updating general-portfolios: ${error.message}`);
  }
};

export default async function UpdateProjects(
  data: any,
  uid: string,
  projectId: string
) {
  // Create a new object to avoid modifying the original `data`
  const updatedData = { ...data, updatedAt: Timestamp.now() };

  try {
    const firestore = getFirestore();

    await firestore
      .collection("portfolios")
      .doc(uid)
      .collection("lio")
      .doc(projectId)
      .update(updatedData);

    await AddToGeneral(updatedData, projectId);

    return { message: "updated" };
  } catch (error: any) {
    throw new Error(`Error updating project: ${error.message}`);
  }
}
