import { getFirestore, Timestamp } from "firebase-admin/firestore";

export default async function AddUserToDatabase(uid: string, data: any) {
  const { metadata, providerData, ...userDataWithoutMetadata } = data; // Extract metadata and other properties

  const userdata = Object.assign(
    {},
    metadata,
    providerData[0],
    userDataWithoutMetadata,
    {
      timestamp: Timestamp.now(),
    }
  ); // Creating a new object with the timestamp field

  try {
    const firestore = getFirestore();
    firestore.settings({ ignoreUndefinedProperties: true }); // Set Firestore settings

    await firestore.collection("profile").doc(uid).set(userdata);

    return "done"; // Returning the result directly
  } catch (error) {
    throw new Error(`Error adding user to database ${error}`);
  }
}
