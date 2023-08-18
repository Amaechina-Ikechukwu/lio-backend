"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { Request, Response, NextFunction } from "express";
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// interface AuthenticatedRequest extends Request {
//   user?: any; // You can replace 'any' with the actual user information type
// }
function VerifyToken(token) {
    //   const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        // res.status(401).json({ message: "No token provided" });
        throw new Error("No token provided");
    }
    else {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, ".lio@(#&($)%*%&$(");
            return decoded; // Attach the decoded user information to the request object
            //   next();
        }
        catch (error) {
            //   res.status(403).json({ message: "Invalid token" });
            throw new Error("Invalid token");
        }
    }
}
exports.default = VerifyToken;
//# sourceMappingURL=VerifyToken.js.map