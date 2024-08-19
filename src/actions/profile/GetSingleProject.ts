import { getFirestore } from "firebase-admin/firestore";
import logger from "../../middlewares/logger";

interface ProjectItem {
  displayName: string; // Assuming name is a property of the ProjectItem
  description: string; // Assuming description is a property of the ProjectItem
  uid: string;
  photoUrl: string;
}

export default async function GetSingleProject(
  search: string
): Promise<{ projectData: ProjectItem[] }> {
  try {
    let projectData;
    const firestore = getFirestore(); // Get Firestore instance

    const snapshot = await firestore
      .collection("general-portfolios")
      .where("nickname", "==", search)
      .get();
    if (snapshot.empty) {
      logger.error("No matching documents.");
      return { projectData };
    }
    snapshot.forEach((doc) => {
      if (doc.exists) {
        // Extract desired properties

        projectData = { id: doc.id, ...doc.data() };
      } else {
        console.error("Document does not exist:", doc.id);
        // You might want to handle the case when doc doesn't exist
      }
    });

    return { projectData };
  } catch (error) {
    throw new Error(`Error fetching user projects from the database: ${error}`);
  }
}
