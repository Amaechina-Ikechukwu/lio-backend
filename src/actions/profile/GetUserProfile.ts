import { getFirestore } from "firebase-admin/firestore";
import logger from "../../middlewares/logger";
export default async function GetUserProfile(uid: string) {
  try {
    let userdata;
    const firestore = getFirestore(); // Set Firestore settings

    const doc = await firestore.collection("profile").doc(uid).get();
    if (!doc.exists) {
      logger.error("No such document!");
    } else {
      userdata = doc.data();
    }

    return { userprofile: userdata };
  } catch (error) {
    throw new Error(`Error adding user to database ${error}`);
  }
}
