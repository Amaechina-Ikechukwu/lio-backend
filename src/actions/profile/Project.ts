import { getFirestore } from "firebase-admin/firestore";
import logger from "../../middlewares/logger";
export default async function GetProject(uid: string, projectId: string) {
  try {
    let userportfolio;
    const firestore = getFirestore(); // Set Firestore settings

    const doc = await firestore
      .collection("portfolios")
      .doc(uid)
      .collection("lio")
      .doc(projectId)
      .get();
    if (!doc.exists) {
      logger.error("No such document!");
    } else {
      userportfolio = doc.data();
    }

    return userportfolio;
  } catch (error) {
    throw new Error(`Error adding user to database ${error}`);
  }
}
