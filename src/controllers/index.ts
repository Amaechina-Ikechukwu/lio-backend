import { Router, Request, Response, NextFunction } from "express";
import RegisterUser from "../actions/auth/RegisterUser";
import UserAuthenticationData from "../actions/auth/UserAuthenticationData";
import AddUserToDatabase from "../actions/profile/AddUserToDatabase";
import UpdateUserProfile from "../actions/profile/UpdateUserProfile";
import { RequestValidator } from "../middlewares/RequestValidator";
import ValidatedUUIDHeader from "../middlewares/ValidatedUUIDHeader";
import axios from "axios";
import "dotenv/config";
import VerifyToken from "../middlewares/VerifyToken";
const router = Router();
declare global {
  namespace Express {
    interface Request {
      redirectUri?: string;
    }
  }
}

const REDIRECT_URI = "https://lio-uec9.onrender.com/auth/google/callback"; // Adjust the URI
router.use((req: Request, res: Response, next: NextFunction) => {
  const { redirectUri } = req.query;
  if (redirectUri) {
    req.redirectUri = redirectUri as string;
  }
  next();
});
router.get(
  "/userid",
  ValidatedUUIDHeader, // Assuming RequestValidator middleware is correctly implemented
  async (req: Request, res: Response) => {
    try {
      const authorizationHeader = req.header("Authorization");
      if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        res.status(400).json({ error: "Invalid or missing bearer token" });
      }

      const token = authorizationHeader.substring(7); // Remove "Bearer " from the header
      const verifiedToken = await VerifyToken(token);

      // const uuid = extractUUIDFromToken(verifiedToken?.uuid);
      const uid = verifiedToken.data;
      res.status(200).json({ userid: uid });
    } catch (error) {
      console.error("Error validating user", error);
      res.status(500).json({ error: "Internal server error" }); // Handle error properly
    }
  }
);
router.post(
  "/registeruser",
  RequestValidator(["uid"]), // Assuming RequestValidator middleware is correctly implemented
  async (req: Request, res: Response) => {
    try {
      const { uid } = req.body; // Destructure 'uid' directly from req.body
      const result = await RegisterUser(uid);
      const data = await UserAuthenticationData(uid);
      await AddUserToDatabase(uid, data);
      res.status(200).json({ token: result });
    } catch (error) {
      console.error("Error validating user", error);
      res.status(500).json({ error: "Internal server error" }); // Handle error properly
    }
  }
);
router.post(
  "/updateuserprofile",
  ValidatedUUIDHeader, // Assuming RequestValidator middleware is correctly implemented
  async (req: Request, res: Response) => {
    try {
      // Destructure 'uid' directly from req.body

      const result = await UpdateUserProfile(req.uid, req.body); // Pass 'uid' directly to RegisterUser function
      res.status(200).json({ token: result });
    } catch (error) {
      console.error("Add user to database user", error);
      res.status(500).json({ error: "Internal server error" }); // Handle error properly
    }
  }
);
router.post(
  "/createportfolio",
  RequestValidator(["imageUrl", "name", "description", "languageStack"]),
  ValidatedUUIDHeader, // Assuming RequestValidator middleware is correctly implemented
  async (req: Request, res: Response) => {
    try {
      // Destructure 'uid' directly from req.body

      const result = await UpdateUserProfile(req.uid, req.body); // Pass 'uid' directly to RegisterUser function
      res.status(200).json({ token: result });
    } catch (error) {
      console.error("Add user to database user", error);
      res.status(500).json({ error: "Internal server error" }); // Handle error properly
    }
  }
);

router.get("/auth/google", (req, res) => {
  const authEndpoint = "https://accounts.google.com/o/oauth2/v2/auth";

  const params = {
    client_id: process.env.CLIENTID,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: "https://www.googleapis.com/auth/drive.metadata.readonly",
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

router.get("/auth/google/callback", async (req, res) => {
  const { code, state } = req.query;

  try {
    const tokenEndpoint = "https://oauth2.googleapis.com/token";
    const tokenResponse = await axios.post(tokenEndpoint, null, {
      params: {
        code,
        client_id: process.env.CLIENTID,
        client_secret: process.env.CLIENTSECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      },
    });

    const { access_token, id_token } = tokenResponse.data;

    res.redirect(
      `${state}?access_token=${access_token}&id_token=${id_token}&code=${code}`
    );
  } catch (error: any) {
    // Handle errors
    console.error("Error during authentication:", error.message);
    res.status(500).send("Authentication error");
  }
});

export default router;
