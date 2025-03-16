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
  try {
    const firestore = getFirestore();
    const snapshot = await firestore.collection("general-portfolios").get();

    if (snapshot.empty) {
      logger.warn("No projects found.");
      return { projects: [] };
    }

    // Ensure category is valid
    category = category || "name";

    // Function to check if a field matches the search query
    const matchesSearch = (field?: string) =>
      field?.toLowerCase().includes(search.toLowerCase()) ?? false;

    const projects = await Promise.all(
      snapshot.docs.map(async (doc) => {
        if (!doc.exists) return null;

        const data = doc.data();
        const {
          name,
          description,
          heroimage,
          technologyStack = "", // Default to empty string
          tags = "", // Default to empty string
          user,
          nickname,
        } = data;

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
            return null; // Skip invalid category
        }

        if (!addToPortfolio) return null;

        const clicks = await GetProjectClicks(nickname);
        return {
          id: doc.id,
          name,
          description,
          heroImage: heroimage,
          technologyStack,
          tags,
          user,
          nickName: nickname,
          clicks,
        };
      })
    );

    // Remove null values (failed searches or invalid docs)
    return { projects: projects.filter(Boolean) };
  } catch (error: any) {
    logger.error(`Error fetching projects: ${error.message}`);
    throw new Error(`Error fetching projects: ${error.message}`);
  }
};

async function GetUsers(
  search: string
): Promise<{ userData: PublicUserProfile[] }> {
  try {
    const firestore = getFirestore();
    const userData: PublicUserProfile[] = [];

    // Use Firestore query to filter by username (case-sensitive limitation)
    const snapshot = await firestore
      .collection("profile")
      .where("username", ">=", search)
      .where("username", "<=", search + "\uf8ff")
      .get();

    if (snapshot.empty) {
      logger.warn("No matching user profiles found.");
      return { userData };
    }

    // Batch click counts for better performance
    const clickPromises = snapshot.docs.map((doc) => NumberOfClicks(doc.id));
    const clickCounts = await Promise.all(clickPromises);

    snapshot.docs.forEach((doc, index) => {
      const data = doc.data();
      userData.push({
        displayName: data.displayName,
        username: data.username,
        bio: truncateDescription(data.bio, 200),
        photoURL: data.photoURL,
        coverimage: data.coverimage,
        technologyStack: data.technologyStack || "",
        portfolioClicks: clickCounts[index].number,
      });
    });
    console.log({ userData });
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
    // Run both functions concurrently with better error handling
    const [projectsResult, userDataResult] = await Promise.allSettled([
      searchProjects(search, category),
      GetUsers(search),
    ]);

    // Extract results safely with default values if one fails
    const projects =
      projectsResult.status === "fulfilled"
        ? projectsResult.value.projects
        : [];
    const userData =
      userDataResult.status === "fulfilled"
        ? userDataResult.value.userData
        : [];

    return { portfolio: { user: userData, projects } };
  } catch (error: any) {
    throw new Error(
      `Error fetching portfolio from the database: ${error.message}`
    );
  }
}

