import { getFirestore } from "firebase-admin/firestore";
import { PublicUserProfile } from "../../interfaces";
import logger from "../../middlewares/logger";

import { truncateDescription } from "../profile/GetProjectsByUsername";

interface PortfolioItem {
  id: string;
  name: string;
  description: string;
  heroimage: string;
  technologyStack: string;
  tags: string;
  user: string;
}

const searchProjects = async (search: string, category: string) => {
  const firestore = getFirestore();
  const portfolio: PortfolioItem[] = [];
  const snapshot = await firestore.collection("general-portfolios").get();

  if (snapshot.empty) {
    logger.warn("No projects found.");
    return { projects: portfolio };
  }

  snapshot.forEach((doc) => {
    if (doc.exists) {
      const data = doc.data() as PortfolioItem;
      const { name, description, heroimage, technologyStack, tags, user } =
        data;

      const matchesSearch = (field: string) =>
        field.toLowerCase().includes(search.toLowerCase());

      let addToPortfolio = false;

      switch (category) {
        case "name":
          addToPortfolio = matchesSearch(name);
          break;
        case "technology":
          addToPortfolio = matchesSearch(technologyStack);
          break;
        case "tags":
          addToPortfolio = matchesSearch(tags);
          break;
        default:
          logger.warn("Unknown category:", category);
          break;
      }

      if (addToPortfolio) {
        portfolio.push({
          id: doc.id,
          name,
          description,
          heroimage,
          technologyStack,
          tags,
          user,
        });
      }
    } else {
      console.error("Document does not exist:", doc.id);
    }
  });

  return { projects: portfolio };
};

async function GetUsers(
  search: string
): Promise<{ userData: PublicUserProfile[] }> {
  try {
    const firestore = getFirestore();
    const userData: PublicUserProfile[] = [];

    const snapshot = await firestore.collection("profile").get();

    if (snapshot.empty) {
      logger.warn("No matching user profiles found.");
      return { userData };
    }

    snapshot.forEach((doc) => {
      if (doc.exists) {
        if (doc.data().username.includes(search))
          userData.push({
            displayName: doc.data().displayName,
            username: doc.data().username,
            bio: truncateDescription(doc.data().bio, 200),
            photoURL: doc.data().photoURL,
            coverimage: doc.data().coverimage,
            technologyStack: doc.data().technologyStack || "",
          });
      } else {
        console.error("Document does not exist:", doc.id);
      }
    });

    return { userData };
  } catch (error) {
    throw new Error(`Error fetching user projects from the database: ${error}`);
  }
}

export default async function QueryPortfolio(
  search: string,
  category: string
): Promise<{
  portfolio: { user: PublicUserProfile[]; projects: PortfolioItem[] };
}> {
  try {
    const { projects } = await searchProjects(search, category);
    const { userData } = await GetUsers(search);
    const portfolio = { user: userData, projects };
    return { portfolio };
  } catch (error) {
    throw new Error(`Error fetching user projects from the database: ${error}`);
  }
}
