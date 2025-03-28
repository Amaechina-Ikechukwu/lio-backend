import { Router, Request, Response } from "express";
import GetPortfolioByClicks from "../actions/explore/GetPortfolioByClicks";
import QueryPortfolio from "../actions/explore/QueryPortfolio";
import GetProjectsByClicks from "../actions/explore/GetProjectsByClicks";

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
explorerouter.get(
  "/projects", // Assuming RequestValidator middleware is correctly implemented
  async (req: Request, res: Response) => {
    try {
      const { projects } = await GetProjectsByClicks();
      // const uuid = extractUUIDFromToken(verifiedToken?.uuid);

      res.status(200).json({ projects });
    } catch (error) {
      console.error("Error validating user", error);
      res.status(500).json({ error: "Internal server error" }); // Handle error properly
    }
  }
);
explorerouter.get(
  "/search", // Assuming RequestValidator middleware is correctly implemented
  async (req: Request, res: Response) => {
    const search = (req.query.search as string) || "";
    const category = (req.query.category as string) || "";

    try {
      const { portfolio } = await QueryPortfolio(search, category);
      // const uuid = extractUUIDFromToken(verifiedToken?.uuid);

      res.status(200).json({ portfolio });
    } catch (error) {
      console.error("Error validating user", error);
      res.status(500).json({ error: "Internal server error" }); // Handle error properly
    }
  }
);

export default explorerouter;
