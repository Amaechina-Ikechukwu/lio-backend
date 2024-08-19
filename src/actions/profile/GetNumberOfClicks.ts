import { getFirestore } from "firebase-admin/firestore";
import logger from "../../middlewares/logger";

export default async function NumberOfClicks(uid: string) {
  try {
    const firestore = getFirestore();

    const snapshot = await firestore
      .collection("clicks")
      .doc(uid)
      .collection(uid)
      .get();

    if (snapshot.empty) {
      logger.error("No matching documents.");
      return { number: 0 };
    }

    const numberOfDocuments = snapshot.size;

    return { number: numberOfDocuments };
  } catch (error) {
    throw new Error(`Error adding user to database ${error}`);
  }
}
