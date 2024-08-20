import { truncateDescription } from "../actions/profile/GetProjectsByUsername";
import { PublicPortfolio } from "../interfaces";

export function PublicPortfolioDTO(portfolio: any): PublicPortfolio {
  return {
    userprofile: {
      displayName: portfolio.displayName,
      username: portfolio.username,
      bio: truncateDescription(portfolio.bio, 200),
      photoURL: portfolio.photoURL,
      coverimage: portfolio.coverimage,
      technologyStack: portfolio.technologyStack || "",
    },
    portfolioClicks: portfolio.portfolioClicks,
  };
}
