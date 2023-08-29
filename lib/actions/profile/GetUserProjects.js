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
function GetUserProjects(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let userportfolio = [];
            const firestore = (0, firestore_1.getFirestore)(); // Set Firestore settings
            const doc = yield firestore.collection("portfolio").doc(uid).get();
            if (!doc.exists) {
                console.log("No such document!");
            }
            else {
                userportfolio.push(Object.assign({ id: doc.id }, doc.data()));
            }
            return { userportfolio: userportfolio };
        }
        catch (error) {
            throw new Error(`Error adding user to database ${error}`);
        }
    });
}
exports.default = GetUserProjects;
//# sourceMappingURL=GetUserProjects.js.map