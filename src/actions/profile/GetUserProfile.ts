import { getFirestore } from "firebase-admin/firestore";
import logger from "../../middlewares/logger";

export default async function GetUserProfile(uid: string) {
  try {
    const firestore = getFirestore();
    const doc = await firestore.collection("profile").doc(uid).get();

    if (!doc.exists) {
      logger.error("No such document!");
      return { userprofile: null };
    }

    const userdata = doc.data();

    // Remove specified keys
    const {
      updatedAt,
      lastRefreshTime,
      lastSignInTime,
      creationTime,
      providerId,
      ...filteredData
    } = userdata || {};

    return { userprofile: filteredData };
  } catch (error) {
    throw new Error(`Error fetching user profile: ${error}`);
  }
}
