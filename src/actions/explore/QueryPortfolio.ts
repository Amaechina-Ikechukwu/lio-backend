import { getFirestore } from "firebase-admin/firestore";
import { PublicUserProfile } from "../../interfaces";
import logger from "../../middlewares/logger";
import { truncateDescription } from "../profile/GetProjectsByUsername";
import NumberOfClicks from "../profile/GetNumberOfClicks";
import { GetProjectClicks } from "./GetProjectsByClicks";

interface PortfolioItem {
  id: string;
  name: string;
  description: string;
  heroImage: string;
  technologyStack: string;
  tags: string;
  user: string;
  nickName: string;
  clicks?: number | string;
}

const searchProjects = async (search: string, category: string) => {
  const firestore = getFirestore();
  const portfolio: PortfolioItem[] = [];
  const snapshot = await firestore.collection("general-portfolios").get();
  if (!category) {
    category = "name";
  }
  if (snapshot.empty) {
    logger.warn("No projects found.");
    return { projects: portfolio };
  }

  for (const doc of snapshot.docs) {
    if (doc.exists) {
      const data = doc.data();
      const {
        name,
        description,
        heroimage,
        technologyStack,
        tags,
        user,
        nickname,
      } = data;

      const matchesSearch = (field: string) =>
        field.toLowerCase().includes(search.toLowerCase());
      let clicks = 0;
      let addToPortfolio = false;

      switch (category.toLowerCase()) {
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
          logger.warn(`Unknown category: ${category}`);
          break;
      }

      if (addToPortfolio) {
        clicks = await GetProjectClicks(nickname);
        portfolio.push({
          id: doc.id,
          name,
          description,
          heroImage: heroimage,
          technologyStack,
          tags,
          user,
          nickName: nickname,
          clicks,
        });
      }
    } else {
      console.error("Document does not exist:", doc.id);
    }
  }

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

    for (const doc of snapshot.docs) {
      if (doc.exists) {
        const data = doc.data();
        if (data.username.toLowerCase().includes(search.toLowerCase())) {
          const clicks = (await NumberOfClicks(doc.id)).number;
          userData.push({
            displayName: data.displayName,
            username: data.username,
            bio: truncateDescription(data.bio, 200),
            photoURL: data.photoURL,
            coverimage: data.coverimage,
            technologyStack: data.technologyStack || "",
            clicks,
          });
        }
      } else {
        console.error("Document does not exist:", doc.id);
      }
    }

    return { userData };
  } catch (error) {
    throw new Error(`Error fetching user profiles from the database: ${error}`);
  }
}

export default async function QueryPortfolio(
  search: string,
  category: string
): Promise<{
  portfolio: { user: PublicUserProfile[]; projects: PortfolioItem[] };
}> {
  try {
    // Run both functions concurrently
    const [projectsResult, userDataResult] = await Promise.all([
      searchProjects(search, category),
      GetUsers(search),
    ]);

    // Extract the results
    const { projects } = projectsResult;
    const { userData } = userDataResult;

    const portfolio = { user: userData, projects };
    return { portfolio };
  } catch (error) {
    throw new Error(`Error fetching portfolio from the database: ${error}`);
  }
}
