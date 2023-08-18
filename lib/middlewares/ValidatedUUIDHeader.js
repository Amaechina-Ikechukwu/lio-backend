"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const VerifyToken_1 = __importDefault(require("./VerifyToken"));
// External middleware to validate UUID in the bearer token
const ValidatedUUIDHeader = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorizationHeader = req.header("Authorization");
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        return res.status(400).json({ error: "Invalid or missing bearer token" });
    }
    const token = authorizationHeader.substring(7); // Remove "Bearer " from the header
    const verifiedToken = yield (0, VerifyToken_1.default)(token);
    // const uuid = extractUUIDFromToken(verifiedToken?.uuid);
    const uid = verifiedToken.data;
    if (!uid) {
        return res.status(400).json({ error: "Missing UUID in the bearer token" });
    }
    // If the UUID is valid, attach it to the request object for use in the route handler
    req.uid = uid;
    next(); // Call next() to pass control to the next middleware/route handler
});
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