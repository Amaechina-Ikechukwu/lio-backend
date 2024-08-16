import { getAuth } from "firebase-admin/auth";

const GetAllUsers = async (nextPageToken?: string): Promise<any[]> => {
  try {
    // List batch of users, 1000 at a time.
    const listUsersResult = await getAuth().listUsers(1000, nextPageToken);

    const users = listUsersResult.users.map((userRecord) =>
      userRecord.toJSON()
    );

    if (listUsersResult.pageToken) {
      // Recursively list the next batch of users and concatenate results.
      const nextUsers = await GetAllUsers(listUsersResult.pageToken);
      return users.concat(nextUsers);
    }

    return users;
  } catch (error) {
    console.error("Error listing users:", error);
    throw error; // Propagate the error to the caller
  }
};

export default GetAllUsers;
