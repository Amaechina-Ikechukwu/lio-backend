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
Object.defineProperty(exports, "__esModule", { value: true });
const firestore_1 = require("firebase-admin/firestore");
function truncateDescription(description, maxLength) {
    if (description.length > maxLength) {
        return description.slice(0, maxLength - 3) + "...";
    }
    return description;
}
function GetProjectsByUsername(username) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userportfolio = [];
            const firestore = (0, firestore_1.getFirestore)(); // Get Firestore instance
            const snapshot = yield firestore
                .collection("general-portfolios")
                .where("user", "==", username)
                .get();
            snapshot.forEach((doc) => {
                if (doc.exists) {
                    const { name, description, heroimage, nickname } = doc.data(); // Extract desired properties
                    const truncatedDescription = truncateDescription(description, 200);
                    userportfolio.push({
                        id: doc.id,
                        name,
                        description: truncatedDescription,
                        heroimage,
                        nickname,
                    });
                }
                else {
                    // You might want to handle the case when doc doesn't exist
                    console.log(`Document ${doc.id} does not exist.`);
                }
            });
            return { userportfolio };
        }
        catch (error) {
            throw new Error(`Error fetching user projects from the database: ${error}`);
        }
    });
}
exports.default = GetProjectsByUsername;
//# sourceMappingURL=GetProjectsByUsername.js.map