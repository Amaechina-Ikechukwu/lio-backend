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
const AddToGeneral = (data, uid, projectId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, firestore_1.getFirestore)()
            .collection("general-portfolios")
            .doc(projectId)
            .update(data);
        return;
    }
    catch (_a) { }
});
function UpdateProjects(data, uid, projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        const userdata = Object.assign(data, { updatedAt: firestore_1.Timestamp.now() });
        try {
            const firestore = (0, firestore_1.getFirestore)(); // Set Firestore settings
            yield firestore
                .collection("portfolios")
                .doc(uid)
                .collection("lio")
                .doc(projectId)
                .update(userdata);
            yield AddToGeneral(userdata, uid, projectId);
            return { message: "updated" }; // Returning the result directly
        }
        catch (error) {
            throw new Error(`Error adding user to database ${error}`);
        }
    });
}
exports.default = UpdateProjects;
//# sourceMappingURL=EditProject.js.map