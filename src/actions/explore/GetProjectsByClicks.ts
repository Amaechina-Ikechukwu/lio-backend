import { getFirestore } from "firebase-admin/firestore";
import logger from "../../middlewares/logger";

export async function GetProjectClicks(projectId: string): Promise<number> {
  try {
    let clicks = 0;
    const db = getFirestore();

    // Assuming clicks are stored in subcollections named after the projectId
    const querySnapshot = await db
      .collectionGroup(projectId) // This will search across all subcollections named `projectId`
      .get();

    // Check if the query returns any documents
    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        if (doc.exists) {
          clicks++; // Increment clicks for each document
        }
      });
    } else {
      console.warn(`No documents found for projectId: ${projectId}`);
    }

    return clicks;
  } catch (error) {
    console.error("Error fetching project clicks:", error);
    throw error;
  }
}

// Main function to get projects with their click counts

export default async function GetProjectsByClicks(): Promise<{
  projects: any[];
}> {
  try {
    let projects: {
      name: any;
      user: any;
      technologyStack: any;
      category: any;
      clicks: number;
    }[] = [];

    const querySnapshot = await getFirestore().collectionGroup("lio").get();

    // Use Promise.all to handle asynchronous operations within the loop
    const projectPromises = querySnapshot.docs.map(async (doc) => {
      if (doc.exists) {
        const nickname = doc.data().nickname;

        if (nickname) {
          const clicks = await GetProjectClicks(nickname);
          return {
            name: doc.data().name,
            user: doc.data().user,
            technologyStack: doc.data().technologyStack,
            category: doc.data().category,
            nickName: doc.data().nickname,
            heroImage: doc.data().heroimage,
            description: doc.data().description,
            clicks: clicks || 0, // Default to 0 if clicks is undefined
          };
        } else {
          logger.error(`Document ${doc.id} is missing the nickname field.`);
        }
      } else {
        logger.error(`Document ${doc.id} does not exist.`);
      }
      return null; // Return null for invalid documents
    });

    // Wait for all project click counts to be resolved
    projects = (await Promise.all(projectPromises)).filter(
      (project) => project !== null
    );
    const sortedProjects = projects.sort((a, b) => b.clicks - a.clicks);

    return { projects: sortedProjects };
  } catch (error) {
    console.error("Error fetching portfolios by clicks:", error);
    throw error;
  }
}
