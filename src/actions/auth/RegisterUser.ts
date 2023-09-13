import { getAuth } from "firebase-admin/auth";
import jwt from "jsonwebtoken";
const doesUserExists = (uid: string) => {
  try {
    return getAuth()
      .getUser(uid)
      .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.

        return true;
      })
      .catch((error) => {
        console.log("Error fetching user data:", error);
      });
  } catch (error: any) {
    throw new Error(`Error checking if user exists user ${error}`);
  }
};

export default async function RegisterUser(data: string) {
  try {
    const uid = data;
    if (doesUserExists(uid)) {
      try {
        const token = jwt.sign(
          {
            data: uid,
          },
          ".lio@(#&($)%*%&$("
        );
        return token;
      } catch (error: any) {
        throw new Error("Error creating new user:" + error.message);
      }
    } else {
      return "User does not exist";
    }
  } catch (error: any) {
    throw new Error(`Error registering user ${error}`);
  }
}
