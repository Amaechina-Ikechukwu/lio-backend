import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { v4 as uuidv4 } from "uuid"; // Import UUID for unique ID generation

const AddToGeneral = async (data: any, id: string) => {
  try {
    await getFirestore()
      .collection("general-portfolios")
      .doc(id) // Use the same ID
      .set({ ...data, createdAt: Timestamp.now() });
  } catch (error) {
    throw new Error(`Error adding to general-portfolios: ${error}`);
  }
};

export default async function CreatePortfolio(data: any, uid: string) {
  try {
    const firestore = getFirestore();
    const projectId = uuidv4(); // Generate a unique ID

    const processedData = {
      ...data,
      id: projectId, // Store the same ID in both collections
      createdAt: Timestamp.now(),
      nickname: data.name.trim().toLowerCase().split(" ").join("-"),
    };

    await firestore
      .collection("portfolios")
      .doc(uid)
      .collection("lio")
      .doc(projectId) // Use the same ID here
      .set(processedData);

    await AddToGeneral(processedData, projectId); // Use the same ID

    return {
      message: `${data.name} created successfully`,
      success: true,
      id: projectId,
    };
  } catch (error: any) {
    throw new Error(`Error creating portfolio: ${error.message}`);
  }
}
