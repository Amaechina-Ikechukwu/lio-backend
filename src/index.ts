import express from "express";
// import { initializeApp } from "firebase-admin/app";
import "dotenv/config";
import router from "./controllers";
import { getFirestore } from "firebase-admin/firestore";
import explorerouter from "./controllers/explore";

import expressWinston from "express-winston";
import logger from "./middlewares/logger";
import errorHandler from "./middlewares/errorHandler";
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
app.use("/explore", explorerouter);
app.use(errorHandler);

// Logging errors with Winston
app.use(
  expressWinston.errorLogger({
    winstonInstance: logger,
  })
);
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("Accepted to lio new");
});
