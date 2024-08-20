import { getFirestore } from "firebase-admin/firestore";

interface PortfolioItem {
  id: string;
  name: string;
  description: string;
  heroimage: string;
  technologyStack: string;
  tags: string;
  user: string;
}

export default async function QueryPortfolio(
  search: string,
  category: string
): Promise<{ portfolio: PortfolioItem[] }> {
  try {
    const userportfolio: PortfolioItem[] = [];
    const firestore = getFirestore();

    const snapshot = await firestore.collection("general-portfolios").get();
    if (snapshot.empty) {
      return { portfolio: userportfolio };
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
        }

        if (addToPortfolio) {
          userportfolio.push({
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

    return { portfolio: userportfolio };
  } catch (error) {
    throw new Error(`Error fetching user projects from the database: ${error}`);
  }
}
