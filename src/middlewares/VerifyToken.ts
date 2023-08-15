// import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// interface AuthenticatedRequest extends Request {
//   user?: any; // You can replace 'any' with the actual user information type
// }

export default function VerifyToken(token: string): any {
  //   const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    // res.status(401).json({ message: "No token provided" });
    throw new Error("No token provided");
  } else {
    try {
      const decoded = jwt.verify(token, ".lio@(#&($)%*%&$(");
      return decoded; // Attach the decoded user information to the request object
      //   next();
    } catch (error) {
      //   res.status(403).json({ message: "Invalid token" });
      throw new Error("Invalid token");
    }
  }
}
