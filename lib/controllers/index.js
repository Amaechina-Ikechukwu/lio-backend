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
const UpdateUserProfile_1 = __importDefault(require("../actions/profile/UpdateUserProfile"));
const RequestValidator_1 = require("../middlewares/RequestValidator");
const ValidatedUUIDHeader_1 = __importDefault(require("../middlewares/ValidatedUUIDHeader"));
const axios_1 = __importDefault(require("axios"));
require("dotenv/config");
const VerifyToken_1 = __importDefault(require("../middlewares/VerifyToken"));
const GetUserProfile_1 = __importDefault(require("../actions/profile/GetUserProfile"));
const GetUserProjects_1 = __importDefault(require("../actions/profile/GetUserProjects"));
const CreatePortfolio_1 = __importDefault(require("../actions/profile/CreatePortfolio"));
const EditProject_1 = __importDefault(require("../actions/profile/EditProject"));
const Project_1 = __importDefault(require("../actions/profile/Project"));
const GetPortfolioFromGeneral_1 = __importDefault(require("../actions/profile/GetPortfolioFromGeneral"));
const GetGeneralUsers_1 = __importDefault(require("../actions/profile/GetGeneralUsers"));
const GetSingleUser_1 = __importDefault(require("../actions/profile/GetSingleUser"));
const GetSingleProject_1 = __importDefault(require("../actions/profile/GetSingleProject"));
const GetProjectsByUsername_1 = __importDefault(require("../actions/profile/GetProjectsByUsername"));
const DeleteProject_1 = __importDefault(require("../actions/profile/DeleteProject"));
const AddToClicks_1 = __importDefault(require("../actions/profile/AddToClicks"));
const GetNumberOfClicks_1 = __importDefault(require("../actions/profile/GetNumberOfClicks"));
const ProjectClicks_1 = __importDefault(require("../actions/profile/ProjectClicks"));
const router = (0, express_1.Router)();
const REDIRECT_URI = "https://lio-uec9.onrender.com/auth/google/callback"; // Adjust the URI
router.use((req, res, next) => {
    const { redirectUri } = req.query;
    if (redirectUri) {
        req.redirectUri = redirectUri;
    }
    next();
});
router.get("/userid", ValidatedUUIDHeader_1.default, // Assuming RequestValidator middleware is correctly implemented
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorizationHeader = req.header("Authorization");
        if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
            res.status(400).json({ error: "Invalid or missing bearer token" });
        }
        const token = authorizationHeader.substring(7); // Remove "Bearer " from the header
        const verifiedToken = yield (0, VerifyToken_1.default)(token);
        // const uuid = extractUUIDFromToken(verifiedToken?.uuid);
        const uid = verifiedToken.data;
        res.status(200).json({ userid: uid });
    }
    catch (error) {
        console.error("Error validating user", error);
        res.status(500).json({ error: "Internal server error" }); // Handle error properly
    }
}));
router.get("/userprofile", ValidatedUUIDHeader_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, GetUserProfile_1.default)(req.uid);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" + error });
    }
}));
router.get("/userprojects", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.query;
    if (typeof uid === "string") {
        try {
            const result = yield (0, GetUserProjects_1.default)(uid);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ error: "Internal server error" + error });
        }
    }
    else {
        res.status(400).json({ error: "Invalid user parameter" });
    }
}));
router.get("/userprojectsbyusername", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.query;
    if (typeof username === "string") {
        try {
            const result = yield (0, GetProjectsByUsername_1.default)(username);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ error: "Internal server error" + error });
        }
    }
    else {
        res.status(400).json({ error: "Invalid user parameter" });
    }
}));
router.get("/searchprojects", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search } = req.query;
    if (typeof search === "string") {
        try {
            const result = yield (0, GetPortfolioFromGeneral_1.default)(search);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ error: "Internal server error" + error });
        }
    }
    else {
        res.status(400).json({ error: "Invalid user parameter" });
    }
}));
router.get("/searchusers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search } = req.query;
    if (typeof search === "string") {
        try {
            const result = yield (0, GetGeneralUsers_1.default)(search);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ error: "Internal server error" + error });
        }
    }
    else {
        res.status(400).json({ error: "Invalid user parameter" });
    }
}));
router.get("/searchuser", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search } = req.query;
    if (typeof search === "string") {
        try {
            const result = yield (0, GetSingleUser_1.default)(search);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ error: "Internal server error" + error });
        }
    }
    else {
        res.status(400).json({ error: "Invalid user parameter" });
    }
}));
router.get("/searchproject", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { search } = req.query;
    if (typeof search === "string") {
        try {
            const result = yield (0, GetSingleProject_1.default)(search);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ error: "Internal server error" + error });
        }
    }
    else {
        res.status(400).json({ error: "Invalid user parameter" });
    }
}));
router.get("/userproject", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user, projectId } = req.query;
    if (typeof user === "string" && typeof projectId === "string") {
        try {
            const result = yield (0, Project_1.default)(user, projectId);
            res.status(200).json(result);
        }
        catch (error) {
            res.status(500).json({ error: "Internal server error" + error });
        }
    }
    else {
        res.status(400).json({ error: "Invalid user parameter" });
    }
}));
router.get("/getuserprojects", ValidatedUUIDHeader_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, GetUserProjects_1.default)(req.uid);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" + error });
    }
}));
router.post("/registeruser", (0, RequestValidator_1.RequestValidator)(["uid"]), // Assuming RequestValidator middleware is correctly implemented
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.body; // Destructure 'uid' directly from req.bodys
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
router.post("/addtoclicks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid } = req.body;
        yield (0, AddToClicks_1.default)(uid);
        res.status(200).json();
    }
    catch (error) {
        console.error("Error validating user", error);
        res.status(500).json({ error: "Internal server error" }); // Handle error properly
    }
}));
router.post("/projectclicks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { uid, projectId } = req.body;
        yield (0, ProjectClicks_1.default)(uid, projectId);
        res.status(200).json();
    }
    catch (error) {
        console.error("Error validating user", error);
        res.status(500).json({ error: "Internal server error" }); // Handle error properly
    }
}));
router.get("/numberofclicks", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req.query;
    if (typeof uid == "string") {
        try {
            const { number } = yield (0, GetNumberOfClicks_1.default)(uid);
            res.status(200).json({ number });
        }
        catch (error) {
            console.error("Error validating user", error);
            res.status(500).json({ error: "Internal server error" }); // Handle error properly
        }
    }
}));
router.post("/updateuserprofile", ValidatedUUIDHeader_1.default, // Assuming RequestValidator middleware is correctly implemented
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Destructure 'uid' directly from req.body
        const result = yield (0, UpdateUserProfile_1.default)(req.uid, req.body); // Pass 'uid' directly to RegisterUser function
        res.status(200).json({ token: result });
    }
    catch (error) {
        console.error("Add user to database user", error);
        res.status(500).json({ error: "Internal server error" }); // Handle error properly
    }
}));
router.post("/updateproject", ValidatedUUIDHeader_1.default, // Assuming RequestValidator middleware is correctly implemented
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Destructure 'uid' directly from req.body
        const { projectId } = req.query;
        if (typeof projectId === "string") {
            const result = yield (0, EditProject_1.default)(req.body, req.uid, projectId); // Pass 'uid' directly to RegisterUser function
            res.status(200).json({ token: result });
        }
    }
    catch (error) {
        console.error("Add user to database user", error);
        res.status(500).json({ error: "Internal server error" }); // Handle error properly
    }
}));
router.delete("/deleteproject", ValidatedUUIDHeader_1.default, // Assuming RequestValidator middleware is correctly implemented
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Destructure 'uid' directly from req.body
        const { projectId } = req.query;
        if (typeof projectId === "string") {
            const result = yield (0, DeleteProject_1.default)(req.body, req.uid, projectId); // Pass 'uid' directly to RegisterUser function
            res.status(200).json({ token: result });
        }
    }
    catch (error) {
        console.error("Add user to database user", error);
        res.status(500).json({ error: "Internal server error" }); // Handle error properly
    }
}));
router.post("/createportfolio", (0, RequestValidator_1.RequestValidator)([
    "name",
    "description",
    "heroimage",
    "status",
    "overcome",
    "challenges",
    "url",
    // "testinomials",
    // "collectionOfAlbums",
]), ValidatedUUIDHeader_1.default, // Assuming RequestValidator middleware is correctly implemented
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Destructure 'uid' directly from req.body
        const result = yield (0, CreatePortfolio_1.default)(req.body, req.uid); // Pass 'uid' directly to RegisterUser function
        res.status(200).json({ token: result });
    }
    catch (error) {
        console.error("Add user to database user", error);
        res.status(500).json({ error: "Internal server error" }); // Handle error properly
    }
}));
router.get("/auth/google", (req, res) => {
    const authEndpoint = "https://accounts.google.com/o/oauth2/v2/auth";
    const params = {
        client_id: process.env.CLIENTID,
        redirect_uri: REDIRECT_URI,
        response_type: "code",
        scope: "openid email",
        include_granted_scopes: "true",
        state: `${req.redirectUri}`,
        expo: `${req.redirectUri}`,
    };
    const authUrl = `${authEndpoint}?${new URLSearchParams(params)}`;
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    </head>
    <body class="bg-gray-100 h-screen flex justify-center items-center">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        <a href="${authUrl}">Login with Google</a>
      </button>
      <script>
        const receiveMessage = (event) => {
          if (event.origin !== "${"your-redirect-uri"}") return;
          const token = event.data.token;
          console.log("Access token:", token);
          window.close();
        };
        window.addEventListener("message", receiveMessage, false);
      </script>
    </body>
    </html>
  `;
    res.send(html);
});
router.get("/auth/google/callback", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { code, state } = req.query;
    try {
        const tokenEndpoint = "https://www.googleapis.com/oauth2/v4/token";
        const tokenResponse = yield axios_1.default.post(tokenEndpoint, null, {
            params: {
                code,
                client_id: process.env.CLIENTID,
                client_secret: process.env.CLIENTSECRET,
                redirect_uri: REDIRECT_URI,
                grant_type: "authorization_code",
            },
        });
        const { access_token, id_token } = tokenResponse.data;
        res.redirect(`${state}?access_token=${access_token}&id_token=${id_token}&code=${code}`);
    }
    catch (error) {
        // Handle errors
        console.error("Error during authentication:", error.message);
        res.status(500).send("Authentication error");
    }
}));
router.get("/auth/firebase", (req, res) => {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Google Sign-In</title>
    </head>
    <body class="container mx-auto p-4 px-10">
    <div class="w-full h-full  sm:px-20  items-center justify-center"><button id="googleSignInButton" class=" bg-black text-gray-200 rounded-xl shadow-xl py-4 px-4 font-bold transition duration-300 transform hover:scale-105 hover:ring-light-accent focus:outline-none ring ring-gray-300">
        Sign in with Google
      </button></div>
      

      <script>
        document.addEventListener('DOMContentLoaded', function() {
          const googleSignInButton = document.getElementById('googleSignInButton');

          googleSignInButton.addEventListener('click', async function() {
            try {
              // Import the necessary Firebase modules
              const { GoogleAuthProvider, signInWithPopup, getAuth } = require("firebase/auth");

              const auth = getAuth()
              const provider = new GoogleAuthProvider();
              const result = await signInWithPopup(auth, provider);
              const credential = GoogleAuthProvider.credentialFromResult(result);
              const token = credential?.accessToken || "";
              const user = result.user || "";

              console.log(user);
              
            } catch (error) {
              const errorCode = error?.code || "";
              const errorMessage = error?.message || "";
              const email = error.customData?.email || "";
              const credential = GoogleAuthProvider.credentialFromError(error);

              // Handle Errors here.
              console.error(errorCode, errorMessage, email, credential);
            }
          });
        });
      </script>
    </body>
    </html>
  `;
    res.send(html);
});
exports.default = router;
//# sourceMappingURL=index.js.map