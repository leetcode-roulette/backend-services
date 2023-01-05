import { AxiosResponse } from "axios";
import { getGraphQLResponse } from "./query";
import { UserStatus } from "./types";

/**
 * Gets an object containing a users information from leetcodes graphql client.
 * @param session - Session cookie used to retrieve authenticated information.
 * @returns An object containing the users information.
 */
const scrape = async (session: string): Promise<UserStatus> => {
	const response: AxiosResponse = await getGraphQLResponse(session);
	return response.data.data.userStatus;
};

export default scrape;
