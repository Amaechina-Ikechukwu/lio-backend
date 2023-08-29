import { getFirestore } from "firebase-admin/firestore";

interface PortfolioItem {
  id: string;
  // Define other properties here
}

export default async function GetUserProjects(
  uid: string | string[]
): Promise<{ userportfolio: PortfolioItem[] }> {
  try {
    const userportfolio: PortfolioItem[] = [];
    const firestore = getFirestore(); // Get Firestore instance

    const uidArray = Array.isArray(uid) ? uid : [uid]; // Convert to array if not already

    for (const singleUid of uidArray) {
      const snapshot = await firestore
        .collection("portfolio")
        .doc(singleUid)
        .collection("lio")
        .get();

      snapshot.forEach((doc) => {
        if (doc.exists) {
          userportfolio.push({ id: doc.id, ...doc.data() } as PortfolioItem);
        } else {
          // You might want to handle the case when doc doesn't exist
          console.log(`Document ${doc.id} does not exist.`);
        }
      });
    }

    return { userportfolio };
  } catch (error) {
    throw new Error(`Error fetching user projects from the database: ${error}`);
  }
}
