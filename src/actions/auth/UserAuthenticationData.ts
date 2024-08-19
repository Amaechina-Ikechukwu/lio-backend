import { getAuth } from "firebase-admin/auth";
import logger from "../../middlewares/logger";
export default async function UserAuthenticationData(uid: string) {
  return getAuth()
    .getUser(uid)
    .then((userRecord: any) => {
      // See the UserRecord reference doc for the contents of userRecord.

      return userRecord;
    })
    .catch((error: any) => {
      logger.error("Error fetching user data:", error);
    });
}
