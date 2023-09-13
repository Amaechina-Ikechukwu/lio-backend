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
const auth_1 = require("firebase-admin/auth");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const doesUserExists = (uid) => {
    try {
        return (0, auth_1.getAuth)()
            .getUser(uid)
            .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            return true;
        })
            .catch((error) => {
            console.log("Error fetching user data:", error);
        });
    }
    catch (error) {
        throw new Error(`Error checking if user exists user ${error}`);
    }
};
function RegisterUser(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const uid = data;
            if (doesUserExists(uid)) {
                try {
                    const token = jsonwebtoken_1.default.sign({
                        data: uid,
                    }, ".lio@(#&($)%*%&$(");
                    return token;
                }
                catch (error) {
                    throw new Error("Error creating new user:" + error.message);
                }
            }
            else {
                return "User does not exist";
            }
        }
        catch (error) {
            throw new Error(`Error registering user ${error}`);
        }
    });
}
exports.default = RegisterUser;
//# sourceMappingURL=RegisterUser.js.map