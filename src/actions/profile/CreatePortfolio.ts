import { getFirestore, Timestamp } from "firebase-admin/firestore";

const AddToGeneral = async (data: any, uid: string) => {
  await getFirestore()
    .collection("general-portfolios")
    .doc(data.nickname)
    .set(Object.assign(data, { createdAt: Timestamp.now(), user: uid }));
  return;
};
export default async function CreateProfolio(data: any, uid: string) {
  try {
    return getFirestore()
      .collection("portfolios")
      .doc(uid)
      .collection("lio")
      .doc()
      .set(Object.assign(data, { createdAt: Timestamp.now() }))
      .then((result) => {
        AddToGeneral(data, uid);
        return result;
      })
      .catch((error) => {
        throw new Error(`Error creating portfolio ${error}`);
      });
  } catch (error: any) {
    throw new Error(`Error in Creating portfolio ${error}`);
  }
}
