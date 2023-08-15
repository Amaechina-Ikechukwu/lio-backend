import { Router, Request, Response } from "express";
import RegisterUser from "../actions/auth/RegisterUser";
import UserAuthenticationData from "../actions/auth/UserAuthenticationData";
import AddUserToDatabase from "../actions/profile/AddUserToDatabase";
import UpdateUserProfile from "../actions/profile/UpdateUserProfile";
import { RequestValidator } from "../middlewares/RequestValidator";
import ValidatedUUIDHeader from "../middlewares/ValidatedUUIDHeader";

const router = Router();

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

export default router;
