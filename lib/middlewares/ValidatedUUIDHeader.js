"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid"); // Import uuid4 generator
const VerifyToken_1 = __importDefault(require("./VerifyToken"));
// External middleware to validate UUID in the bearer token
const ValidatedUUIDHeader = (req, res, next) => {
    const authorizationHeader = req.header("Authorization");
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        return res.status(400).json({ error: "Invalid or missing bearer token" });
    }
    const token = authorizationHeader.substring(7); // Remove "Bearer " from the header
    const verifiedToken = (0, VerifyToken_1.default)(token);
    // const uuid = extractUUIDFromToken(verifiedToken?.uuid);
    const uid = verifiedToken;
    if (!uid) {
        return res.status(400).json({ error: "Missing UUID in the bearer token" });
    }
    if (!(0, uuid_1.validate)(uid)) {
        return res.status(400).json({ error: "Invalid bearer token" });
    }
    // If the UUID is valid, attach it to the request object for use in the route handler
    req.uuid = uid;
    next(); // Call next() to pass control to the next middleware/route handler
};
// Helper function to extract the UUID from the token
// function extractUUIDFromToken(token: string): string | null {
//   // Implement the logic to extract the UUID from the token based on your token format
//   // For example, if your token contains the UUID at a specific position, you can use string manipulation to extract it
//   // Alternatively, if the UUID is encoded in the token payload, you can decode the payload and retrieve the UUID
//   // Replace the following line with your actual implementation
//   // Example: Assuming the token contains the UUID in the last 36 characters
//   return token.slice(-36);
// }
exports.default = ValidatedUUIDHeader;
//# sourceMappingURL=ValidatedUUIDHeader.js.map