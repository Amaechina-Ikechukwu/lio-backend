import express from "express";
import "dotenv/config";
import cors from "cors"; // Import CORS
import router from "./controllers";
import { getFirestore } from "firebase-admin/firestore";
import explorerouter from "./controllers/explore";
import expressWinston from "express-winston";
import logger from "./middlewares/logger";
import errorHandler from "./middlewares/errorHandler";

const app = express();

// Allow specific origins, including localhost and others
const allowedOrigins = [
  "http://localhost:3000",
  "https://lio-beta.vercel.app/",
  "https://lio-amaechinaikechukwus-projects.vercel.app/",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allows sending cookies and authorization headers
  })
);

app.use(express.json());

var admin = require("firebase-admin");
var serviceAccount = require("../xx.json");

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
  console.log(`Server running on port ${port}`);
});
