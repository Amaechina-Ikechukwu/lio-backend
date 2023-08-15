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
const express_1 = require("express");
const RegisterUser_1 = __importDefault(require("../actions/auth/RegisterUser"));
const UserAuthenticationData_1 = __importDefault(require("../actions/auth/UserAuthenticationData"));
const AddUserToDatabase_1 = __importDefault(require("../actions/profile/AddUserToDatabase"));
const RequestValidator_1 = require("../middlewares/RequestValidator");
const ValidatedUUIDHeader_1 = __importDefault(require("../middlewares/ValidatedUUIDHeader"));
const router = (0, express_1.Router)();
router.post("/registeruser", (0, RequestValidator_1.RequestValidator)(["uid"]), // Assuming RequestValidator middleware is correctly implemented
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.body; // Destructure 'uid' directly from req.body
        const result = yield (0, RegisterUser_1.default)(uid);
        const data = yield (0, UserAuthenticationData_1.default)(uid);
        yield (0, AddUserToDatabase_1.default)(uid, data);
        res.status(200).json({ token: result });
    }
    catch (error) {
        console.error("Error validating user", error);
        res.status(500).json({ error: "Internal server error" }); // Handle error properly
    }
}));
router.post("/addusertodatabase", ValidatedUUIDHeader_1.default, // Assuming RequestValidator middleware is correctly implemented
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Destructure 'uid' directly from req.body
        const data = yield (0, UserAuthenticationData_1.default)(req.uid);
        const result = yield (0, AddUserToDatabase_1.default)(req.uid, data); // Pass 'uid' directly to RegisterUser function
        res.status(200).json({ token: result });
    }
    catch (error) {
        console.error("Add user to database user", error);
        res.status(500).json({ error: "Internal server error" }); // Handle error properly
    }
}));
exports.default = router;
//# sourceMappingURL=index.js.map