import { getFirestore } from "firebase-admin/firestore";

interface PortfolioItem {
  id: string;
  name: string; // Assuming name is a property of the PortfolioItem
  description: string; // Assuming description is a property of the PortfolioItem
  heroimage: string; // Assuming image is a property of the PortfolioItem
  nickname: string;
}
function truncateDescription(description: string, maxLength: number) {
  if (description.length > maxLength) {
    return description.slice(0, maxLength - 3) + "...";
  }
  return description;
}
export default async function GetProjectsByUsername(
  username: string
): Promise<{ userportfolio: PortfolioItem[] }> {
  try {
    const userportfolio: PortfolioItem[] = [];
    const firestore = getFirestore(); // Get Firestore instance

    const snapshot = await firestore
      .collection("general-portfolios")
      .where("user", "==", username)
      .get();

    snapshot.forEach((doc) => {
      if (doc.exists) {
        const { name, description, heroimage, nickname } = doc.data(); // Extract desired properties
        const truncatedDescription = truncateDescription(description, 200);

        userportfolio.push({
          id: doc.id,
          name,
          description: truncatedDescription,
          heroimage,
          nickname,
        });

        userportfolio.push({
          id: doc.id,
          name,
          description,
          heroimage,
          nickname,
        });
      } else {
        // You might want to handle the case when doc doesn't exist
        console.log(`Document ${doc.id} does not exist.`);
      }
    });

    return { userportfolio };
  } catch (error) {
    throw new Error(`Error fetching user projects from the database: ${error}`);
  }
}
