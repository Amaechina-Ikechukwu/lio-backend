import { getFirestore } from "firebase-admin/firestore";
import logger from "../../middlewares/logger";

interface PortfolioItem {
  id: string;
  name: string;
  description: string;
  heroimage: string;
  nickname: string;
}

// Function to truncate long descriptions
export function truncateDescription(description: string, maxLength: number) {
  if (!description) return ""; // Prevent errors if description is missing
  return description.length > maxLength
    ? description.slice(0, maxLength - 3) + "..."
    : description;
}

export default async function GetProjectsByUsername(
  username: string
): Promise<{ userportfolio: PortfolioItem[] }> {
  try {
    const firestore = getFirestore();
    const usernameLower = username.toLowerCase(); // Normalize search input

    const snapshot = await firestore
      .collection("general-portfolios")
      .where("userLower", ">=", usernameLower) // Case-insensitive range search
      .where("userLower", "<=", usernameLower + "\uf8ff") // Firestore range trick
      .get();

    if (snapshot.empty) {
      logger.warn(`No projects found for user: ${username}`);
      return { userportfolio: [] };
    }

    const userportfolio: PortfolioItem[] = snapshot.docs
      .map((doc) => {
        const data = doc.data();

        if (!data.name || !data.heroimage || !data.nickname) {
          logger.warn(`Skipping incomplete project document: ${doc.id}`);
          return null; // Skip incomplete documents
        }

        return {
          id: doc.id,
          name: data.name,
          description: truncateDescription(data.description || "", 200),
          heroimage: data.heroimage,
          nickname: data.nickname,
        };
      })
      .filter(Boolean) as PortfolioItem[]; // Remove null values

    return { userportfolio };
  } catch (error: any) {
    logger.error(
      `Error fetching projects for user ${username}: ${error.message}`
    );
    throw new Error(`Error fetching projects: ${error.message}`);
  }
}
