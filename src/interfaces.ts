export interface PortfolioItem {
  id: string;
  name: string; // Assuming name is a property of the PortfolioItem
  description: string; // Assuming description is a property of the PortfolioItem
  heroimage: string; // Assuming image is a property of the PortfolioItem
  nickname: string;
}
export interface ExplorePortfolioItem {
  id: string;
  name: string; // Assuming name is a property of the PortfolioItem
  description: string; // Assuming description is a property of the PortfolioItem
  heroimage: string; // Assuming image is a property of the PortfolioItem
  nickname: string;
  portfolioClicks: string | number;
}
export interface PublicUserProfile {
  displayName: string;
  username: string;
  bio: string;
  photoURL: string;
  coverimage: string;
  technologyStack: string;
}

export interface PublicPortfolio {
  userprofile: PublicUserProfile;
  portfolioClicks?: number;
}
