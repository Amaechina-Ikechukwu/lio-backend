import { PublicPortfolioDTO } from "../../middlewares/PublicPortfolioDto";
import GetAllUsers from "../auth/GetAllUsers";
import NumberOfClicks from "../profile/GetNumberOfClicks";
import GetUserProfile from "../profile/GetUserProfile";

export default async function GetPortfolioByClicks(): Promise<{
  portfolios: any;
}> {
  const portfolios = [];

  try {
    const users = await GetAllUsers();

    for (let i = 0; i < users.length; i++) {
      let portfolioClicks = 0;
      const { userprofile } = await GetUserProfile(users[i].uid);
      const projectClicks = await NumberOfClicks(users[i].uid);

      if (projectClicks) {
        portfolioClicks += projectClicks.number;
      }
      if (userprofile) {
        const profile = PublicPortfolioDTO(userprofile);
        portfolios.push({
          ...profile.userprofile, // Spread the properties of the individual PortfolioItem
          portfolioClicks, // Add the portfolioClicks property
        });
      }
    }

    return { portfolios };
  } catch (error) {
    console.error("Error fetching portfolios by clicks:", error);
    throw error;
  }
}