import { getFirestore } from "firebase-admin/firestore";

interface PortfolioItem {}

export default async function GetUserProjects(
  uid: string
): Promise<{ userportfolio: PortfolioItem[] }> {
  try {
    const userportfolio: PortfolioItem[] = [];
    const firestore = getFirestore(); // Get Firestore instance

    const snapshot = await firestore
      .collection("portfolio")
      .doc(uid)
      .collection("lio")
      .get();

    snapshot.forEach((doc) => {
      if (doc.exists) {
        userportfolio.push({ id: doc.id, ...doc.data() });
      } else {
        // You might want to handle the case when doc doesn't exist
        console.log(`Document ${doc.id} does not exist.`);
      }
    });

    return { userportfolio };
  } catch (error) {
    throw new Error(`Error fetching user projects from database: ${error}`);
  }
}
