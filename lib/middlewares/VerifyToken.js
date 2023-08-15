"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { Request, Response, NextFunction } from "express";
const auth_1 = require("firebase-admin/auth");
// interface AuthenticatedRequest extends Request {
//   user?: any; // You can replace 'any' with the actual user information type
// }
function VerifyToken(token) {
    // idToken comes from the client app
    return (0, auth_1.getAuth)()
        .verifyIdToken(token)
        .then((decodedToken) => {
        const uid = decodedToken.uid;
        return uid;
    })
        .catch((error) => {
        // Handle error
    });
}
exports.default = VerifyToken;
//# sourceMappingURL=VerifyToken.js.map