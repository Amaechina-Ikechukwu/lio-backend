import { getFirestore } from "firebase-admin/firestore";
import logger from "../../middlewares/logger";

interface UserItem {
  displayName: string; // Assuming name is a property of the UserItem
  description: string; // Assuming description is a property of the UserItem
  uid: string;
  photoUrl: string;
}

export default async function GetGeneralUsers(
  search: string
): Promise<{ userData: UserItem[] }> {
  try {
    const userData: UserItem[] = [];
    const firestore = getFirestore(); // Get Firestore instance

    const snapshot = await firestore.collection("profile").get();
    if (snapshot.empty) {
      logger.error("No matching documents.");
      return { userData };
    }
    snapshot.forEach((doc) => {
      if (doc.exists) {
        const { displayName, description, uid, photoUrl } =
          doc.data() as UserItem; // Extract desired properties
        if (displayName.toLowerCase().startsWith(search.toLowerCase())) {
          userData.push({ displayName, description, uid, photoUrl });
        }
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
