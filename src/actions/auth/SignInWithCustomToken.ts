// import { getAuth } from "firebase-admin/auth";
// import jwt from "jsonwebtoken";
// export default function RegisterUser(data: string) {
//   try {
//     const uid = data;

//     return getAuth()
//       .signW(uid)
//       .then((customToken) => {
//         return customToken;
//       })
//       .catch((error) => {
//         console.log("Error creating custom token:", error);
//       });
//   } catch (error: any) {
//     throw new Error(`Error registering user ${error}`);
//   }
// }
