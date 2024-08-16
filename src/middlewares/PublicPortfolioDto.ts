import { truncateDescription } from "../actions/profile/GetProjectsByUsername";
import { PublicPortfolioDTO } from "../interfaces";

export function PublicPortfolioDTO(portfolio: any): PublicPortfolioDTO {
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
