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
function NumberOfClicks(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const firestore = (0, firestore_1.getFirestore)();
            const snapshot = yield firestore
                .collection("clicks")
                .doc(uid)
                .collection(uid)
                .get();
            if (snapshot.empty) {
                console.log("No matching documents.");
                return { number: 0 };
            }
            const numberOfDocuments = snapshot.size;
            return { number: numberOfDocuments };
        }
        catch (error) {
            throw new Error(`Error adding user to database ${error}`);
        }
    });
}
exports.default = NumberOfClicks;
//# sourceMappingURL=GetNumberOfClicks.js.map