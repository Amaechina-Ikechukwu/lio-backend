"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import { initializeApp } from "firebase-admin/app";
require("dotenv/config");
const controllers_1 = __importDefault(require("./controllers"));
const firestore_1 = require("firebase-admin/firestore");
const app = (0, express_1.default)();
app.use(express_1.default.json());
// const credential = require("../x.json");
var admin = require("firebase-admin");
var serviceAccount = require("../xx.json");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// const myRefreshToken = "../x.json"; // Get refresh token from OAuth2 flow
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://dot-king-default-rtdb.firebaseio.com/",
    ignoreUndefinedProperties: true,
});
const firestore = (0, firestore_1.getFirestore)();
firestore.settings({ ignoreUndefinedProperties: true });
app.use("/", controllers_1.default);
app.use((err, req, res, next) => {
    res.status(400).json({ error: err.message });
});
app.listen(3000, () => {
    console.log("Accepted to lio");
});
//# sourceMappingURL=index.js.map