import { getFirestore } from "firebase-admin/firestore";
import logger from "../../middlewares/logger";

export interface UserItem {
  displayName: string; // Assuming name is a property of the UserItem
  description: string; // Assuming description is a property of the UserItem
  uid: string;
  photoUrl: string;
}

export default async function GetSingleUser(
  search: string
): Promise<{ userData: UserItem | null }> {
  try {
    const firestore = getFirestore(); // Get Firestore instance

    const snapshot = await firestore
      .collection("profile")
      .where("username", ">=", search.toLowerCase())
      .where("username", "<=", search.toLowerCase() + "\uf8ff")

      .limit(1) // We only need one user
      .get();

    if (snapshot.empty) {
      logger.error(`No user found with username: ${search}`);
      return { userData: null };
    }

    // Extract the first matching document
    const doc = snapshot.docs[0];
    const data = doc.data();

    // if (!data.displayName || !data.uid || !data.photoUrl) {
    //   logger.warn(`Skipping incomplete user profile: ${doc.id}`);
    //   return { userData: null };
    // }

    // Filter out unnecessary fields
    const {
      updatedAt,
      lastRefreshTime,
      lastSignInTime,
      creationTime,
      providerId,
      ...filteredData
    } = data;

    return { userData: filteredData as UserItem };
  } catch (error: any) {
    logger.error(`Error fetching user: ${error.message}`);
    throw new Error(`Error fetching user: ${error.message}`);
  }
}

