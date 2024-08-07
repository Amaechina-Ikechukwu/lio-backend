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
const AddToGeneral = (data, uid) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, firestore_1.getFirestore)()
        .collection("general-portfolios")
        .doc()
        .set(Object.assign(data, { createdAt: firestore_1.Timestamp.now() }));
    return;
});
function CreateProfolio(data, uid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return (0, firestore_1.getFirestore)()
                .collection("portfolios")
                .doc(uid)
                .collection("lio")
                .doc()
                .set(Object.assign(data, {
                createdAt: firestore_1.Timestamp.now(),
                nickname: data.name.trim().toLowerCase().split(" ").join("-"),
            }))
                .then((result) => {
                AddToGeneral(Object.assign(data, {
                    nickname: data.name.trim().toLowerCase().split(" ").join("-"),
                }), uid);
                return result;
            })
                .catch((error) => {
                throw new Error(`Error creating portfolio ${error}`);
            });
        }
        catch (error) {
            throw new Error(`Error in Creating portfolio ${error}`);
        }
    });
}
exports.default = CreateProfolio;
//# sourceMappingURL=CreatePortfolio.js.map