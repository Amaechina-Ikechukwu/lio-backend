import { Router, Request, Response } from "express";
import GetPortfolioByClicks from "../actions/explore/GetPortfolioByClicks";

const explorerouter = Router();

explorerouter.get(
  "/", // Assuming RequestValidator middleware is correctly implemented
  async (req: Request, res: Response) => {
    try {
      const { portfolios } = await GetPortfolioByClicks();
      // const uuid = extractUUIDFromToken(verifiedToken?.uuid);

      res.status(200).json({ portfolios });
    } catch (error) {
      console.error("Error validating user", error);
      res.status(500).json({ error: "Internal server error" }); // Handle error properly
    }
  }
);

export default explorerouter;
