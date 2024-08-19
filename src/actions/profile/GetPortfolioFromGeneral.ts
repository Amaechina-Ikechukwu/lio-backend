import { getFirestore } from "firebase-admin/firestore";
import logger from "../../middlewares/logger";

interface PortfolioItem {
  id: string;
  name: string; // Assuming name is a property of the PortfolioItem
  description: string; // Assuming description is a property of the PortfolioItem
  heroimage: string; // Assuming image is a property of the PortfolioItem
}

export default async function GetPortfolioFromGeneral(
  search: string
): Promise<{ userportfolio: PortfolioItem[] }> {
  try {
    const userportfolio: PortfolioItem[] = [];
    const firestore = getFirestore(); // Get Firestore instance

    const snapshot = await firestore.collection("general-portfolios").get();
    if (snapshot.empty) {
      logger.error("No matching documents.");
      return { userportfolio };
    }
    snapshot.forEach((doc) => {
      if (doc.exists) {
        const { name, description, heroimage } = doc.data() as PortfolioItem; // Extract desired properties
        if (name.toLowerCase().startsWith(search.toLowerCase())) {
          userportfolio.push({ id: doc.id, name, description, heroimage });
        }
      } else {
        console.error("Document does not exist:", doc.id);
        // You might want to handle the case when doc doesn't exist
      }
    });

    return { userportfolio };
  } catch (error) {
    throw new Error(`Error fetching user projects from the database: ${error}`);
  }
}
