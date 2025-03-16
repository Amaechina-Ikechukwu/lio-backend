import { getFirestore } from "firebase-admin/firestore";
import logger from "../../middlewares/logger";

interface ProjectItem {
  id: string;
  name: string;
  description: string;
  uid: string;
  url: string;
}

export default async function GetSingleProject(
  search: string
): Promise<{ projectData: ProjectItem[] }> {
  try {
    const firestore = getFirestore();

    // Perform a case-insensitive partial match search using Firestore's range queries
    const snapshot = await firestore
      .collection("general-portfolios")
      .where("nickname", ">=", search)
      .where("nickname", "<=", search + "\uf8ff") // Firestore range query trick
      .get();

    if (snapshot.empty) {
      logger.warn(`No projects found with nickname: ${search}`);
      return { projectData: [] };
    }

    // Map the results into ProjectItem objects
    const projectData: ProjectItem[] = snapshot.docs.map((doc) => {
      const data = doc.data();
      console.log(JSON.stringify(data, null, 2));
      return {
        id: doc.id,
        name: data.name,
        description: data.description,
        uid: data.uid,
        url: data.url,
      };
    });

    return { projectData };
  } catch (error: any) {
    logger.error(`Error fetching projects: ${error.message}`);
    throw new Error(`Error fetching projects: ${error.message}`);
  }
}
