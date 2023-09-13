import { getAuth } from "firebase-admin/auth";
export default async function UserAuthenticationData(uid: string) {
  return getAuth()
    .getUser(uid)
    .then((userRecord: any) => {
      // See the UserRecord reference doc for the contents of userRecord.

      return userRecord;
    })
    .catch((error: any) => {
      console.log("Error fetching user data:", error);
    });
}
