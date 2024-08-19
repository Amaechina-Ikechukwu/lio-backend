import { getFirestore } from "firebase-admin/firestore";
import logger from "../../middlewares/logger";

interface UserItem {
  displayName: string; // Assuming name is a property of the UserItem
  description: string; // Assuming description is a property of the UserItem
  uid: string;
  photoUrl: string;
}

export default async function GetSingleUser(
  search: string
): Promise<{ userData: UserItem[] }> {
  try {
    let userData;
    const firestore = getFirestore(); // Get Firestore instance

    const snapshot = await firestore
      .collection("profile")
      .where("username", "==", search)
      .get();
    if (snapshot.empty) {
      logger.error("No matching documents.");
      return { userData };
    }
    snapshot.forEach((doc) => {
      if (doc.exists) {
        // Extract desired properties

        userData = doc.data();
      } else {
        console.error("Document does not exist:", doc.id);
        // You might want to handle the case when doc doesn't exist
      }
    });

    return { userData };
  } catch (error) {
    throw new Error(`Error fetching user projects from the database: ${error}`);
  }
}
