import { getFirestore } from "firebase-admin/firestore";

const deletedProjects = async (data: any, uid: string, projectId: string) => {
  try {
    await getFirestore()
      .collection("deleted")
      .doc(uid)
      .collection("projects")
      .doc(projectId)
      .set(data);
  } catch (error) {
    console.error("Error moving project to deleted:", error);
  }
};

const DeleteFromGeneral = async (projectId: string) => {
  try {
    await getFirestore()
      .collection("general-portfolios")
      .doc(projectId)
      .delete();
  } catch (error) {
    console.error("Error deleting from general portfolios:", error);
  }
};

export default async function DeleteProject(
  data: any,
  uid: string,
  projectId: string
) {
  try {
    await deletedProjects(data, uid, projectId);

    const firestore = getFirestore();

    await firestore
      .collection("portfolios")
      .doc(uid)
      .collection("lio")
      .doc(projectId)
      .delete();

    await DeleteFromGeneral(projectId);

    return { message: "deleted" };
  } catch (error) {
    throw new Error(`Error deleting project: ${error}`);
  }
}
