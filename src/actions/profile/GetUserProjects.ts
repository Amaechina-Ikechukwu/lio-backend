import { getFirestore } from "firebase-admin/firestore";
import logger from "../../middlewares/logger";

interface PortfolioItem {
  id: string;
  name: string; // Assuming name is a property of the PortfolioItem
  description: string; // Assuming description is a property of the PortfolioItem
  heroimage: string; // Assuming image is a property of the PortfolioItem
  nickname: string;
}

export default async function GetUserProjects(
  uid: string
): Promise<{ userportfolio: PortfolioItem[] }> {
  try {
    const userportfolio: PortfolioItem[] = [];
    const firestore = getFirestore(); // Get Firestore instance

    const snapshot = await firestore
      .collection("portfolios")
      .doc(uid)
      .collection("lio")
      .get();

    snapshot.forEach((doc) => {
      if (doc.exists) {
        const { name, description, heroimage, nickname } = doc.data(); // Extract desired properties
        userportfolio.push({
          id: doc.id,
          name,
          description,
          heroimage,
          nickname,
        });
      } else {
        // You might want to handle the case when doc doesn't exist
        logger.error(`Document ${doc.id} does not exist.`);
      }
    });

    return { userportfolio };
  } catch (error) {
    throw new Error(`Error fetching user projects from the database: ${error}`);
  }
}
