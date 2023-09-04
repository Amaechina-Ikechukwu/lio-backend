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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const firestore_1 = require("firebase-admin/firestore");
function AddUserToDatabase(uid, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const { metadata, providerData } = data, userDataWithoutMetadata = __rest(data, ["metadata", "providerData"]); // Extract metadata and other properties
        const userdata = Object.assign({}, metadata, providerData[0], userDataWithoutMetadata, {
            timestamp: firestore_1.Timestamp.now(),
            username: userDataWithoutMetadata.displayName
                .toLowerCase()
                .split(" ")
                .join("-"),
        }); // Creating a new object with the timestamp field
        try {
            const firestore = (0, firestore_1.getFirestore)();
            // Set Firestore settings
            const doc = yield firestore.collection("profile").doc(uid).get();
            if (!doc.exists) {
                yield firestore.collection("profile").doc(uid).set(userdata);
            }
            else {
                null;
            }
            return "done"; // Returning the result directly
        }
        catch (error) {
            throw new Error(`Error adding user to database ${error}`);
        }
    });
}
exports.default = AddUserToDatabase;
//# sourceMappingURL=AddUserToDatabase.js.map