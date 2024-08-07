import express, { Request, Response, NextFunction } from "express";
// import { initializeApp } from "firebase-admin/app";
import "dotenv/config";
import router from "./controllers";
import { getFirestore } from "firebase-admin/firestore";

const app = express();
app.use(express.json());
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
const firestore = getFirestore();
firestore.settings({ ignoreUndefinedProperties: true });
app.use("/", router);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({ error: err.message });
});
const port = process.env.PORT || 3006;
app.listen(port, () => {
  console.log("Accepted to lio");
});
