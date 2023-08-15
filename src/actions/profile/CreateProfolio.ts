import { getFirestore, Timestamp } from "firebase-admin/firestore";
export default async function CreateProfolio(data: any, uid: string) {
  try {
    return getFirestore()
      .collection("portfolio")
      .doc(uid)
      .set(Object.assign(data, { createdAt: Timestamp.now() }))
      .then((result) => {
        return result;
      })
      .catch((error) => {
        throw new Error(`Error creating portfolio ${error}`);
      });
  } catch (error: any) {
    throw new Error(`Error in Creating portfolio ${error}`);
  }
}
