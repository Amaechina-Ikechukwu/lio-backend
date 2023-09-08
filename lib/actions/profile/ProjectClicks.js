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
function ProjectClicks(uid, projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        // Creating a new object with the timestamp field
        const timestamp = firestore_1.Timestamp.now();
        try {
            const firestore = (0, firestore_1.getFirestore)();
            // Set Firestore settings
            yield firestore
                .collection("clicks")
                .doc(uid)
                .collection(projectId)
                .doc()
                .set({ timestamp });
            return "done"; // Returning the result directly
        }
        catch (error) {
            throw new Error(`Error adding user to database ${error}`);
        }
    });
}
exports.default = ProjectClicks;
//# sourceMappingURL=ProjectClicks.js.map