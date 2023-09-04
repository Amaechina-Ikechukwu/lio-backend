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
function GetGeneralUsers(search) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const userData = [];
            const firestore = (0, firestore_1.getFirestore)(); // Get Firestore instance
            const snapshot = yield firestore.collection("profile").get();
            if (snapshot.empty) {
                console.log("No matching documents.");
                return { userData };
            }
            snapshot.forEach((doc) => {
                if (doc.exists) {
                    const { displayName, description, uid, photoUrl } = doc.data(); // Extract desired properties
                    if (displayName.toLowerCase().startsWith(search.toLowerCase())) {
                        userData.push({ displayName, description, uid, photoUrl });
                    }
                }
                else {
                    console.error("Document does not exist:", doc.id);
                    // You might want to handle the case when doc doesn't exist
                }
            });
            return { userData };
        }
        catch (error) {
            throw new Error(`Error fetching user projects from the database: ${error}`);
        }
    });
}
exports.default = GetGeneralUsers;
//# sourceMappingURL=GetGeneralUsers.js.map